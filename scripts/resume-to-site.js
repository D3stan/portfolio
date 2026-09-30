/* global process */

/**
 * Resume to Site Data
 *
 * Reads the Awesome-CV resume in resume/ and turns it into the data the
 * website renders (profile, education, experience, projects), plus the
 * skills lines for later use.
 * The LaTeX files are the single source: edit them, and both the PDF and
 * the website change.
 *
 * Only the macros Awesome-CV defines are read (\cvsection, \cventry,
 * \cvitems, \cvskill, \name, \email, ...), plus three markers defined at
 * the top of resume/resume.tex:
 *   \web{key}{value}  extra field for the entry right above it
 *   \webonly{...}     entries or \item lines shown on the website only
 *   \pdfonly{...}     entries or \item lines shown in the PDF only
 *
 * Usage:
 *   node scripts/resume-to-site.js            write src/config/resume.generated.json
 *   node scripts/resume-to-site.js --stdout   print the data instead
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve, extname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

export const RESUME_MAIN = join(rootDir, 'resume/resume.tex');
export const OUTPUT_FILE = join(rootDir, 'src/config/resume.generated.json');

// ============================================
// LOW-LEVEL READING
// ============================================

/** Remove LaTeX comments: an unescaped % up to the end of the line. */
export function stripComments(src) {
  return src.replace(/(^|[^\\])((?:\\\\)*)%.*$/gm, '$1$2');
}

/** Cursor over a LaTeX string that can read commands and brace groups. */
class Reader {
  constructor(src, file = '<input>') {
    this.src = src;
    this.pos = 0;
    this.file = file;
  }

  get done() {
    return this.pos >= this.src.length;
  }

  peek() {
    return this.src[this.pos];
  }

  skipSpace() {
    while (!this.done && /\s/.test(this.peek())) this.pos++;
  }

  lineAt(pos = this.pos) {
    return this.src.slice(0, pos).split('\n').length;
  }

  fail(message) {
    throw new Error(`${this.file}:${this.lineAt()}: ${message}`);
  }

  /** Read a control sequence name after "\" (letters, or a single symbol). */
  readCommandName() {
    if (this.peek() !== '\\') this.fail('expected a command');
    this.pos++;
    const start = this.pos;
    while (!this.done && /[A-Za-z@]/.test(this.peek())) this.pos++;
    if (this.pos === start && !this.done) this.pos++; // \&, \%, \\, ...
    return this.src.slice(start, this.pos);
  }

  /** Read a balanced {...} group and return its inner text. */
  readGroup() {
    if (this.peek() !== '{') this.fail(`expected "{" but found "${this.peek() ?? 'end of file'}"`);
    const start = ++this.pos;
    let depth = 1;
    while (!this.done) {
      const ch = this.src[this.pos];
      if (ch === '\\') {
        this.pos += 2;
        continue;
      }
      if (ch === '{') depth++;
      if (ch === '}' && --depth === 0) {
        return this.src.slice(start, this.pos++);
      }
      this.pos++;
    }
    this.pos = start - 1;
    this.fail('unbalanced "{"');
  }

  /** Read an optional [...] argument if one follows, else return null. */
  readOptional() {
    const save = this.pos;
    this.skipSpace();
    if (this.peek() !== '[') {
      this.pos = save;
      return null;
    }
    const start = ++this.pos;
    let depth = 0;
    while (!this.done) {
      const ch = this.src[this.pos];
      if (ch === '\\') {
        this.pos += 2;
        continue;
      }
      if (ch === '{') depth++;
      if (ch === '}') depth--;
      if (ch === ']' && depth === 0) return this.src.slice(start, this.pos++);
      this.pos++;
    }
    this.fail('unbalanced "["');
  }

  /** Read one mandatory argument: a {group}, a command, or a single character. */
  readArg() {
    this.skipSpace();
    if (this.done) this.fail('missing argument');
    if (this.peek() === '{') return this.readGroup();
    if (this.peek() === '\\') return `\\${this.readCommandName()}`;
    return this.src[this.pos++];
  }

  readArgs(count) {
    return Array.from({ length: count }, () => this.readArg());
  }
}

// ============================================
// INLINE TEXT
// ============================================

// Commands whose argument is kept as plain text.
const PASS_THROUGH = new Set([
  'textit', 'emph', 'textsc', 'textup', 'textnormal', 'textrm', 'textsf', 'texttt',
  'textsl', 'textmd', 'underline', 'mbox', 'text', 'hbox', 'uppercase', 'MakeUppercase',
  'lowercase', 'MakeLowercase', 'textsuperscript', 'textsubscript', 'webonly',
]);

// Commands dropped together with their arguments: [mandatory args].
const DROP_WITH_ARGS = {
  hspace: 1, vspace: 1, color: 1, fontsize: 2, setlength: 2, addtolength: 2,
  label: 1, phantom: 1, hphantom: 1, vphantom: 1, pdfonly: 1, web: 2,
};

// Commands replaced by a fixed string.
const SYMBOLS = {
  '&': '&', '%': '%', '$': '$', '#': '#', '_': '_', '{': '{', '}': '}',
  ' ': ' ', ',': ' ', ';': ' ', ':': ' ', '!': '', '/': '', '@': '', '-': '',
  '\\': ' ', newline: ' ', linebreak: ' ', par: ' ', quad: ' ', qquad: ' ',
  enskip: ' ', enspace: ' ', thinspace: ' ', space: ' ', nobreakspace: ' ',
  textbar: '|', textbackslash: '\\', textasciitilde: '~', textasciicircum: '^',
  textunderscore: '_', textquoteleft: '‘', textquoteright: '’', textquotedblleft: '“',
  textquotedblright: '”', textendash: '–', textemdash: '—', textbullet: '•',
  ldots: '…', dots: '…', textellipsis: '…', cdotp: '·', cdot: '·', textperiodcentered: '·',
  textdegree: '°', copyright: '©', textregistered: '®', texttrademark: '™',
  euro: '€', texteuro: '€', pounds: '£', LaTeX: 'LaTeX', TeX: 'TeX', XeLaTeX: 'XeLaTeX',
  selectfont: '', bfseries: '', itshape: '', scshape: '', normalfont: '', small: '',
  footnotesize: '', scriptsize: '', tiny: '', large: '', Large: '', normalsize: '',
  centering: '', raggedright: '', raggedleft: '', noindent: '', ignorespaces: '',
  unskip: '', relax: '', hfill: ' ', hfil: ' ', vfill: ' ', vfil: ' ', smallskip: ' ',
  medskip: ' ', bigskip: ' ',
  // math mode
  sim: '~', times: '×', pm: '±', le: '≤', leq: '≤', ge: '≥', geq: '≥', neq: '≠', ne: '≠',
  approx: '≈', to: '→', rightarrow: '→', Rightarrow: '⇒', leftarrow: '←', circ: '°',
  infty: '∞', mu: 'µ', ll: '≪', gg: '≫', cdots: '⋯',
};

// Accent commands mapped to Unicode combining marks.
const ACCENTS = {
  "'": '́', '`': '̀', '^': '̂', '"': '̈', '~': '̃',
  '=': '̄', '.': '̇', u: '̆', v: '̌', H: '̋', c: '̧',
  k: '̨', r: '̊',
};

/**
 * Convert inline LaTeX to plain text. \textbf{...} becomes {{...}}, the
 * highlight syntax the website already understands (see TextHighlight.jsx).
 * Unknown commands are dropped (their braces unwrapped) and reported.
 */
export function latexToText(src, ctx = {}) {
  const warnings = ctx.warnings ?? [];
  const file = ctx.file ?? '<input>';
  const out = convert(src, false);
  return tidy(out);

  function convert(text, inBold) {
    const r = new Reader(text, file);
    let result = '';
    while (!r.done) {
      const ch = r.peek();
      if (ch === '\\') {
        const name = r.readCommandName();
        result += command(name, r, inBold);
      } else if (ch === '{') {
        result += convert(r.readGroup(), inBold);
      } else if (ch === '}') {
        r.pos++; // stray brace, as LaTeX would complain; ignore it here
      } else if (ch === '~') {
        result += ' ';
        r.pos++;
      } else if (ch === '$') {
        // Inline math: drop ^ and _, then convert symbols like \times and \sim
        const end = text.indexOf('$', r.pos + 1);
        const math = end === -1 ? '' : text.slice(r.pos + 1, end);
        result += convert(math.replace(/[\^_]/g, ''), inBold);
        r.pos = end === -1 ? text.length : end + 1;
      } else if (text.startsWith('---', r.pos)) {
        result += '—';
        r.pos += 3;
      } else if (text.startsWith('--', r.pos)) {
        result += '–';
        r.pos += 2;
      } else if (text.startsWith('``', r.pos)) {
        result += '“';
        r.pos += 2;
      } else if (text.startsWith("''", r.pos)) {
        result += '”';
        r.pos += 2;
      } else if (ch === '`' || ch === "'") {
        result += ch === '`' ? '‘' : '’';
        r.pos++;
      } else {
        result += ch;
        r.pos++;
      }
    }
    return result;
  }

  function command(name, r, inBold) {
    if ((/^[A-Za-z]+$/.test(name) || name === '\\') && r.peek() === '*') r.pos++; // starred form
    if (name === '\\') {
      r.readOptional(); // \\[2pt]
      return ' ';
    }
    if (name === 'textbf') {
      const inner = convert(r.readArg(), true);
      return inBold ? inner : boldMarker(inner);
    }
    if (PASS_THROUGH.has(name)) return convert(r.readArg(), inBold);
    if (name === 'href') {
      r.readArg(); // url
      return convert(r.readArg(), inBold);
    }
    if (name === 'url' || name === 'nolinkurl') return r.readArg();
    if (name === 'textcolor') {
      r.readOptional();
      r.readArg();
      return convert(r.readArg(), inBold);
    }
    if (name in DROP_WITH_ARGS) {
      r.readOptional();
      r.readArgs(DROP_WITH_ARGS[name]);
      return '';
    }
    if (name in SYMBOLS) return SYMBOLS[name];
    if (name in ACCENTS) {
      const base = convert(r.readArg(), inBold);
      return (base.slice(0, 1) + ACCENTS[name] + base.slice(1)).normalize('NFC');
    }
    if (/^fa[A-Z]/.test(name)) return ''; // Font Awesome icons
    if (name === 'item') {
      r.readOptional();
      return ' ';
    }
    warnings.push(`${file}: unknown command \\${name} was dropped from the website text`);
    return '';
  }
}

/** Wrap bold text in {{ }} with surrounding spaces moved outside the marker. */
function boldMarker(inner) {
  const match = inner.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match[2]) return inner;
  return `${match[1]}{{${match[2]}}}${match[3]}`;
}

/** Collapse whitespace and fix spacing around punctuation. */
function tidy(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\{\{\s*\}\}/g, '')
    .replace(/\s+([,.;:!?)])(?!\w)/g, '$1')
    .replace(/\(\s+/g, '(')
    .trim();
}

/** Plain text without highlight markers. */
export function stripHighlights(text) {
  return text.replace(/\{\{([^}]*)\}\}/g, '$1');
}

/** Unescape a \web value that is used verbatim (URLs, paths). */
function unescapeRaw(value) {
  return value.replace(/\\([&%$#_{}~^])/g, '$1').trim();
}

// ============================================
// DOCUMENT STRUCTURE
// ============================================

const HEADER_FIELDS = [
  'mobile', 'email', 'homepage', 'github', 'linkedin', 'gitlab', 'twitter',
  'skype', 'reddit', 'medium', 'position', 'address', 'quote', 'extrainfo',
];
const RAW_WEB_KEYS = new Set(['url', 'logo', 'image', 'video', 'repo', 'demo', 'photo']);
const LIST_WEB_KEYS = new Set(['tech']);

/** Parse resume.tex and everything it \input's into a structured document. */
export function parseResume(mainFile = RESUME_MAIN) {
  const baseDir = dirname(mainFile);
  const warnings = [];
  const doc = { profile: {}, sections: [], warnings };
  let section = null;
  let lastTarget = doc.profile; // where \web{}{} attaches
  const seenFiles = new Set();

  scanFile(mainFile, { webOnly: false });
  return doc;

  function scanFile(file, flags) {
    const path = resolveInput(file);
    if (seenFiles.has(path)) throw new Error(`${path}: \\input loop`);
    seenFiles.add(path);
    scan(stripComments(readFileSync(path, 'utf-8')), path, flags);
    seenFiles.delete(path);
  }

  function resolveInput(name) {
    let path = resolve(baseDir, name);
    if (!existsSync(path) && !extname(path)) path += '.tex';
    if (!existsSync(path)) throw new Error(`Cannot find resume file ${path}`);
    return path;
  }

  function scan(src, file, flags) {
    const r = new Reader(src, file);
    const text = (value) => latexToText(value, { warnings, file });
    while (!r.done) {
      const ch = r.peek();
      if (ch === '{') {
        r.readGroup(); // e.g. arguments of \newcommand: nothing to read inside
        continue;
      }
      if (ch !== '\\') {
        r.pos++;
        continue;
      }
      const name = r.readCommandName();
      switch (name) {
        case 'input':
        case 'include':
          scanFile(r.readArg(), flags);
          break;
        case 'newcommand':
        case 'renewcommand':
        case 'providecommand':
          r.readArg();
          r.readOptional();
          r.readOptional();
          r.readArg();
          break;
        case 'name': {
          const [first, last] = r.readArgs(2).map(text);
          Object.assign(doc.profile, { firstName: first, lastName: last, name: `${first} ${last}` });
          break;
        }
        case 'cvsection':
          section = { title: text(r.readArg()), web: {}, entries: [], skills: [], paragraphs: [] };
          doc.sections.push(section);
          lastTarget = section.web;
          break;
        case 'cventry': {
          const [a, b, c, d, e] = r.readArgs(5);
          const entry = {
            position: text(a),
            organization: text(b),
            location: text(c),
            date: text(d),
            links: readLinks(c, file),
            items: readItems(e, file, flags),
            webOnly: flags.webOnly,
            web: {},
          };
          requireSection(r).entries.push(entry);
          lastTarget = entry.web;
          break;
        }
        case 'cvsubentry': {
          // \cvsubentry{position}{title}{date}{description}: its lines join the entry above
          const [a, b, c, d] = r.readArgs(4);
          const parent = requireSection(r).entries.at(-1);
          if (!parent) r.fail('\\cvsubentry found before any \\cventry');
          const date = text(c);
          const label = [text(b) || text(a), date && `(${date})`].filter(Boolean).join(' ');
          const items = readItems(d, file, flags);
          if (!items.length && label) parent.items.push({ text: label, webOnly: flags.webOnly });
          for (const item of items) {
            parent.items.push({ ...item, text: label ? `${label}: ${item.text}` : item.text });
          }
          break;
        }
        case 'cvhonor': {
          const [a, b, c, d] = r.readArgs(4);
          const entry = {
            position: text(a), organization: text(b), location: text(c), date: text(d),
            links: [], items: [], webOnly: flags.webOnly, web: {},
          };
          requireSection(r).entries.push(entry);
          lastTarget = entry.web;
          break;
        }
        case 'cvskill': {
          const [category, list] = r.readArgs(2);
          const items = splitList(text(list));
          requireSection(r).skills.push({ category: text(category), items, webOnly: flags.webOnly });
          break;
        }
        case 'begin': {
          const env = r.readArg();
          if (env === 'cvparagraph') {
            const end = src.indexOf('\\end{cvparagraph}', r.pos);
            if (end === -1) r.fail('missing \\end{cvparagraph}');
            requireSection(r).paragraphs.push(text(src.slice(r.pos, end)));
            r.pos = end;
          }
          break;
        }
        case 'web': {
          const [key, value] = r.readArgs(2);
          setWebField(lastTarget, key.trim(), value, file);
          break;
        }
        case 'webonly':
          scan(r.readArg(), file, { ...flags, webOnly: true });
          break;
        case 'pdfonly':
          r.readArg();
          break;
        default:
          if (HEADER_FIELDS.includes(name)) {
            r.readOptional();
            doc.profile[name] = text(r.readArg());
          }
      }
    }
  }

  function requireSection(r) {
    if (!section) r.fail('entry found before any \\cvsection');
    return section;
  }

  function setWebField(target, key, value, file) {
    if (!key) return;
    let parsed;
    if (RAW_WEB_KEYS.has(key)) parsed = unescapeRaw(value);
    else if (LIST_WEB_KEYS.has(key)) parsed = splitList(stripHighlights(latexToText(value, { warnings, file })));
    else parsed = latexToText(value, { warnings, file });
    if (parsed === 'true') parsed = true;
    if (parsed === 'false') parsed = false;
    target[key] = parsed;
  }

  /** Bullet points of a \cventry description, honouring \webonly / \pdfonly. */
  function readItems(src, file, flags) {
    const items = [];
    let current = null;
    const flush = () => {
      if (current && current.raw.trim()) {
        items.push({ text: latexToText(current.raw, { warnings, file }), webOnly: current.webOnly });
      }
      current = null;
    };
    const walk = (text, webOnly) => {
      const r = new Reader(text, file);
      let loose = '';
      while (!r.done) {
        const ch = r.peek();
        if (ch === '{') {
          const group = r.readGroup();
          if (current) current.raw += `{${group}}`;
          else loose += `{${group}}`;
          continue;
        }
        if (ch !== '\\') {
          if (current) current.raw += ch;
          else loose += ch;
          r.pos++;
          continue;
        }
        const start = r.pos;
        const name = r.readCommandName();
        if (name === 'item') {
          flush();
          r.readOptional();
          current = { raw: '', webOnly };
        } else if (name === 'begin' || name === 'end') {
          r.readArg();
          if (name === 'end') flush();
        } else if (name === 'webonly' || name === 'pdfonly') {
          const inner = r.readArg();
          if (/\\item(?![A-Za-z])/.test(inner)) {
            // Whole \item lines shown on one side only
            flush();
            if (name === 'webonly') walk(inner, true);
            flush();
          } else {
            // Inline text: latexToText keeps \webonly{...} and drops \pdfonly{...}
            const raw = `\\${name}{${inner}}`;
            if (current) current.raw += raw;
            else loose += raw;
          }
        } else {
          const raw = text.slice(start, r.pos);
          if (current) current.raw += raw;
          else loose += raw;
        }
      }
      if (!current && loose.trim() && !items.length) {
        const plain = latexToText(loose, { warnings, file });
        if (plain) items.push({ text: plain, webOnly });
      }
    };
    walk(src, flags.webOnly);
    flush();
    return items;
  }
}

/** Links written with \href in an entry field (e.g. the location slot). */
function readLinks(src, file) {
  const links = [];
  const r = new Reader(src, file);
  while (!r.done) {
    if (r.peek() !== '\\') {
      r.pos++;
      continue;
    }
    const name = r.readCommandName();
    if (name === 'href') {
      const url = unescapeRaw(r.readArg());
      const label = r.readArg();
      links.push({ url, label: latexToText(label), icon: (label.match(/\\(fa[A-Za-z]+)/) || [])[1] ?? null });
    } else if (name === 'url') {
      const url = unescapeRaw(r.readArg());
      links.push({ url, label: url, icon: null });
    }
  }
  return links;
}

function splitList(text) {
  return text.split(',').map((s) => s.trim()).filter(Boolean);
}

// ============================================
// SITE DATA
// ============================================

/** Which website section an Awesome-CV section feeds. */
function sectionKind(section) {
  const explicit = section.web.site;
  if (explicit) return String(explicit).toLowerCase();
  const title = section.title.toLowerCase();
  if (/\bprojects?\b/.test(title)) return 'projects';
  if (/\beducation\b|\bstudies\b|\bacademic/.test(title)) return 'education';
  if (/\bexperience\b|\bemployment\b|\bcareer\b/.test(title)) return 'experience';
  if (/\bskills?\b/.test(title)) return 'skills';
  return 'other';
}

const isRepoLink = (link) =>
  /^fa(Github|Gitlab|Bitbucket|Code)/i.test(link.icon ?? '') ||
  /\b(code|github|gitlab|source|repo)\b/i.test(link.label) ||
  (/github\.com|gitlab\.com/i.test(link.url) && !/\.github\.io/i.test(link.url));

// \web keys the site builds itself; setting them would break the page.
const RESERVED_WEB_KEYS = ['details', 'bullets', 'id'];

/** Remove the keys that are already mapped, keep any other \web field as-is. */
function extraWebFields(web, used) {
  const skip = [...used, ...RESERVED_WEB_KEYS];
  return Object.fromEntries(Object.entries(web).filter(([key]) => !skip.includes(key)));
}

const visibleItems = (entry) => entry.items.map((item) => item.text);

/** Single-line fields are rendered as plain text, so drop highlight markers. */
const plain = (value) => (typeof value === 'string' ? stripHighlights(value) : value);

export function toSiteData(doc) {
  const data = {
    profile: { ...doc.profile },
    schools: [],
    jobs: [],
    projectsFeatured: [],
    projectsSmall: [],
    skills: [],
  };
  let projectId = 0;

  for (const section of doc.sections) {
    const kind = sectionKind(section);
    for (const entry of section.entries) {
      const web = entry.web;
      for (const key of RESERVED_WEB_KEYS) {
        if (key in web) {
          doc.warnings.push(`\\web{${key}} on "${entry.organization}" is ignored: the site builds it from the entry itself`);
        }
      }
      if (kind === 'education') {
        data.schools.push({
          school: plain(web.school ?? entry.organization),
          degree: plain(web.degree ?? entry.position),
          period: plain(web.period ?? entry.date),
          address: plain(web.address ?? entry.location),
          details: visibleItems(entry),
          hasDropdownPhoto: false,
          ...extraWebFields(web, ['school', 'degree', 'period', 'address']),
        });
      } else if (kind === 'experience') {
        data.jobs.push({
          company: plain(web.company ?? entry.organization),
          role: plain(web.role ?? entry.position),
          period: plain(web.period ?? entry.date),
          sub: plain(web.sub ?? entry.location),
          bullets: visibleItems(entry),
          ...extraWebFields(web, ['company', 'role', 'period', 'sub']),
        });
      } else if (kind === 'projects') {
        // "JavaDyno (Engine Dynamometer ...)" -> title "JavaDyno", subtitle in brackets
        const name = plain(entry.organization);
        const named = name.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
        const repo = entry.links.find(isRepoLink);
        const demo = entry.links.find((link) => link !== repo);
        const bold = entry.items.flatMap((item) => [...item.text.matchAll(/\{\{([^}]+)\}\}/g)].map((m) => m[1]));
        const project = {
          id: ++projectId,
          title: plain(web.title ?? (named ? named[1] : name)),
          subtitle: plain(web.subtitle ?? (named ? named[2] : entry.position)),
          blurb: plain(web.blurb ?? entry.items.map((item) => item.text).join(' ')),
          tech: web.tech ?? [...new Set(bold)],
          image: web.image ?? null,
          video: web.video ?? null,
          repo: web.repo ?? repo?.url ?? null,
          demo: web.demo ?? demo?.url ?? null,
          ...extraWebFields(web, [
            'title', 'subtitle', 'blurb', 'tech', 'image', 'video', 'repo', 'demo',
            'featured', 'demolabel', 'codelabel',
          ]),
        };
        if (web.demolabel || web.codelabel) {
          project.buttons = {
            ...(web.demolabel && { demo: web.demolabel }),
            ...(web.codelabel && { code: web.codelabel }),
          };
        }
        (web.featured === false ? data.projectsSmall : data.projectsFeatured).push(project);
      }
    }
    if (kind === 'skills') {
      data.skills.push(...section.skills.map(({ category, items }) => ({ category, items })));
    }
  }

  return data;
}

// Header fields the site needs (hero name, contact email, GitHub links).
const REQUIRED_PROFILE = { name: '\\name{First}{Last}', email: '\\email{...}', github: '\\github{...}' };

/** Parse the resume and return the website's data. */
export function buildSiteData(mainFile = RESUME_MAIN) {
  const doc = parseResume(mainFile);
  const missing = Object.keys(REQUIRED_PROFILE).filter((key) => !doc.profile[key]);
  if (missing.length) {
    throw new Error(`${mainFile}: the website needs ${missing.map((key) => REQUIRED_PROFILE[key]).join(', ')} in the header`);
  }
  return { data: toSiteData(doc), warnings: doc.warnings };
}

/** Write the generated JSON file. Returns true if its content changed. */
export function writeSiteData({ mainFile = RESUME_MAIN, outFile = OUTPUT_FILE, log = console } = {}) {
  const { data, warnings } = buildSiteData(mainFile);
  for (const warning of new Set(warnings)) log.warn(`⚠️  ${warning}`);
  const json = `${JSON.stringify(data, null, 2)}\n`;
  const previous = existsSync(outFile) ? readFileSync(outFile, 'utf-8') : null;
  if (previous === json) return false;
  writeFileSync(outFile, json);
  return true;
}

// ============================================
// CLI
// ============================================

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.includes('--stdout')) {
      const { data, warnings } = buildSiteData();
      for (const warning of new Set(warnings)) console.warn(`⚠️  ${warning}`);
      console.log(JSON.stringify(data, null, 2));
    } else {
      writeSiteData();
      console.log(`✅ Resume data written to ${OUTPUT_FILE.replace(`${rootDir}/`, '')}`);
    }
  } catch (error) {
    console.error(`❌ Could not read the resume: ${error.message}`);
    process.exit(1);
  }
}
