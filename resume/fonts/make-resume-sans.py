"""Build ResumeSans-*.otf: Source Sans 3 with its hyphen glyph mapped to U+002D only.

Source Sans 3 maps U+002D, U+00AD, U+2010 and U+2011 to one glyph, and XeLaTeX
writes U+2011 into the PDF's text layer, so ATS parsers read "E-commerce" with a
non-breaking hyphen. Dropping the three extra mappings leaves only "-".
Renamed because "Source" is a Reserved Font Name under the SIL OFL 1.1.

Run with fontTools installed: python make-resume-sans.py
"""
import subprocess
from pathlib import Path

from fontTools.ttLib import TTFont

STYLES = ["Regular", "RegularIt", "Bold", "BoldIt", "Light", "LightIt", "Semibold", "SemiboldIt"]
EXTRA_HYPHENS = (0x00AD, 0x2010, 0x2011)
here = Path(__file__).parent

for style in STYLES:
    src = subprocess.run(["kpsewhich", f"SourceSans3-{style}.otf"], capture_output=True, text=True, check=True).stdout.strip()
    font = TTFont(src)
    for table in font["cmap"].tables:
        for cp in EXTRA_HYPHENS:
            table.cmap.pop(cp, None)
    for rec in font["name"].names:
        text = rec.toUnicode()
        renamed = text.replace("Source Sans 3", "Resume Sans").replace("SourceSans3", "ResumeSans")
        if renamed != text:
            rec.string = renamed
    cff = font["CFF "].cff
    cff.fontNames = [n.replace("SourceSans3", "ResumeSans") for n in cff.fontNames]
    for key in ("FullName", "FamilyName"):
        top = cff.topDictIndex[0]
        if hasattr(top, key):
            setattr(top, key, getattr(top, key).replace("Source Sans 3", "Resume Sans"))
    out = here / f"ResumeSans-{style}.otf"
    font.save(out)
    assert all(cp not in TTFont(out).getBestCmap() for cp in EXTRA_HYPHENS)
    print("wrote", out.name)
