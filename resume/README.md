# Resume

The resume is the single source for the website's education, experience and
projects, and for the name in the hero section, the contact email and the
GitHub links. Edit the `.tex` files here: on every push to `main`, GitHub
Actions compiles the PDF (served at `/documents/Resume.pdf` and `/resume`) and
rebuilds the website from the same files.

The page title, meta tags, navbar name, footer, about text and LinkedIn link
are website-only and still live in `src/config/index.js`.

It uses the [Awesome-CV](https://github.com/posquit0/Awesome-CV) class, compiled
with XeLaTeX.

```
resume/
├── resume.tex          # header (name, contacts) and the list of sections
├── awesome-cv.cls      # Awesome-CV class
├── fonts/              # Roboto (header) and FontAwesome (icons)
└── sections/
    ├── education.tex   # -> Education on the site
    ├── experience.tex  # -> Experience
    ├── projects.tex    # -> Projects
    └── skills.tex      # -> not shown on the site yet
```

A section feeds the site based on the words in its `\cvsection` title:
"Projects", "Education", "Experience" or "Skills". For any other title, put
`\web{site}{projects}` (or `education`, `experience`, `skills`) right after the
`\cvsection` line. Sections not `\input` in `resume.tex`, and anything
commented out with `%`, appear in neither the PDF nor the site.

The header must keep `\name`, `\email` and `\github`: the build stops with an
error if one is missing, since the site uses them.

## Website-only markup

Three commands, defined at the top of `resume.tex`:

| Command | In the PDF | On the website |
|---|---|---|
| `\web{key}{value}` | nothing | adds `key` to the entry right above it |
| `\webonly{...}` | nothing | shows the entries or `\item` lines inside |
| `\pdfonly{...}` | shows the content | nothing |

`\textbf{...}` in a bullet becomes the highlighted text on the site. The
parser understands the usual inline commands (`\textbf`, `\emph`, `\href`,
accents, dashes, quotes, simple math like `$\times$`); for any other command it
prints a warning during the build and leaves the command out of the site text.
`\cvsubentry` lines are added to the bullets of the entry above them.

Keys used by the site (anything else is passed through as-is):

- Education: `badge`, `logo`, `url`
- Experience: `badge`, `logo`
- Projects: `image`, `video`, `repo`, `demo`, `tech` (comma-separated),
  `subtitle`, `title`, `blurb`, `demolabel`, `codelabel`, and
  `featured` (`false` puts the project under "Other Projects")

For projects, when a key is missing: the title and subtitle come from
`Name (Subtitle)` in the entry's name, `repo`/`demo` come from the `\href` in
the location slot (GitHub links count as `repo`), the blurb joins the bullets,
and `tech` lists the bold terms.

Example:

```latex
\cventry
    {System Administrator Intern} % Job title
    {Enaip} % Organization
    {Cesena, Italy} % Location
    {Sept. 2025 - Dec. 2025} % Date(s)
    {
      \begin{cvitems}
        \item {Configured the Windows \textbf{Domain Controller}.}
        \webonly{\item {A longer bullet only the website shows.}}
      \end{cvitems}
    }
\web{badge}{EN}
\web{logo}{/logos/enaip.png}
```

In `\web` values, escape `%`, `#`, `&` and `_` with a backslash (`\%`), as
everywhere in LaTeX.

## Working locally

- `npm run dev` rebuilds the site data whenever a `.tex` file changes.
- `npm run resume:data` writes `src/config/resume.generated.json`, which is
  what the site reads (ignored by git).
- `npm run resume:pdf` compiles the PDF into `public/documents/Resume.pdf`.
  It needs XeLaTeX and latexmk (MacTeX or TeX Live).
- `npm test` checks the parser.

On pull requests, the workflow uploads the compiled PDF as an artifact named
`resume-pdf`, so you can check the layout before merging.
