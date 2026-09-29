/* global process */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { stripComments, latexToText, parseResume, toSiteData, buildSiteData } from './resume-to-site.js';

/** Write a small resume into a temp folder and return its main file. */
function fixture(files) {
  const dir = mkdtempSync(join(tmpdir(), 'resume-'));
  for (const [name, content] of Object.entries(files)) {
    mkdirSync(join(dir, name, '..'), { recursive: true });
    writeFileSync(join(dir, name), content);
  }
  process.on('exit', () => rmSync(dir, { recursive: true, force: true }));
  return join(dir, 'resume.tex');
}

const MAIN = String.raw`
\documentclass[11pt, a4paper]{awesome-cv}
\newcommand{\web}[2]{\ignorespaces}
\newcommand{\webonly}[1]{\ignorespaces}
\newcommand{\pdfonly}[1]{#1}
\name{Ada}{Lovelace}
\mobile{+44 123}
\email{ada@example.com}
%\homepage{commented.example}
\github{ada}
\begin{document}
\makecvheader[C]
\input{sections/work}
%\input{sections/ignored}
\input{sections/projects.tex}
\end{document}
`;

test('stripComments keeps escaped percent signs', () => {
  assert.equal(stripComments('50\\% done % note'), '50\\% done ');
  assert.equal(stripComments('% whole line\nkept'), '\nkept');
  assert.equal(stripComments('line\\\\% comment'), 'line\\\\');
});

test('latexToText converts inline markup', () => {
  assert.equal(latexToText(String.raw`Built with \textbf{React 19} and \textbf{Node.js }.`), 'Built with {{React 19}} and {{Node.js}}.');
  assert.equal(latexToText(String.raw`R\&D, 100\%, a\_b, \#1`), 'R&D, 100%, a_b, #1');
  assert.equal(latexToText(String.raw`\href{https://x.io}{\faGithub \ Code}`), 'Code');
  assert.equal(latexToText("2019--2020 --- ``quoted'' \\'e \\\"{o}"), '2019–2020 — “quoted” é ö');
  assert.equal(latexToText(String.raw`\textbf{Bold \textbf{nested}} and \emph{it}`), '{{Bold nested}} and it');
  assert.equal(latexToText(String.raw`web\webonly{ only} pdf\pdfonly{ hidden}`), 'web only pdf');
  assert.equal(latexToText('Skilled in C\\# and .NET, plus .env files .'), 'Skilled in C# and .NET, plus .env files.');
  assert.equal(latexToText(String.raw`3$\times$ faster for $\sim$10k users at -40$^\circ$C`), '3× faster for ~10k users at -40°C');
  assert.equal(latexToText(String.raw`a\hspace*{2mm}b\\[2pt]c \textcolor[HTML]{FF0000}{red} 2\textsuperscript{nd}`), 'ab c red 2nd');
  assert.equal(latexToText("the `Trainee' program, Alessandro's"), 'the ‘Trainee’ program, Alessandro’s');
});

test('latexToText reports unknown commands', () => {
  const warnings = [];
  assert.equal(latexToText(String.raw`a \mystery{b} c`, { warnings }), 'a b c');
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /\\mystery/);
});

test('parseResume reads entries, web fields and site-only markers', () => {
  const main = fixture({
    'resume.tex': MAIN,
    'sections/work.tex': String.raw`
\cvsection{Work Experience}
\begin{cventries}
\cventry
  {Engineer} % Job title
  {Analytical Engines Ltd} % Organization
  {London, UK} % Location
  {Jan. 1840 - Ongoing} % Date(s)
  {
  \begin{cvitems}
    \item {Designed the \textbf{first algorithm}.}
    %\item {Commented out everywhere.}
    \webonly{\item {Shown on the website only.}}
    \pdfonly{\item {Printed in the PDF only.}}
    \item Unbraced \webonly{web text} and \pdfonly{pdf text}the rest.
  \end{cvitems}
  }
\web{badge}{AE}
\web{logo}{/logos/ae.png}
\pdfonly{
\cventry{Intern}{PDF Only Co}{Paris}{1839}{}
}
\webonly{
\cventry{Volunteer}{Website Only Org}{Rome}{1838}{\begin{cvitems}\item {Helped.}\end{cvitems}}
}
\end{cventries}
`,
    'sections/ignored.tex': String.raw`\cvsection{Ignored}`,
    'sections/projects.tex': String.raw`
\cvsection{Side Projects}
\begin{cventries}
\cventry
{\textbf{Mathematics}}
{Engine Notes (Translation of Menabrea)}
{\href{https://github.com/ada/notes}{\faGithub \ Code}}
{}
{
\begin{cvitems}
\item {Wrote \textbf{Note G} for the \textbf{Analytical Engine}.}
\end{cvitems}
}
\web{demo}{https://example.com/notes?a=1\&b=2}
\web{demolabel}{Read It}
\cventry{\textbf{Hardware}}{Difference Engine}{\href{https://engine.example.com}{Live}}{}{
\begin{cvitems}\item {Built with \textbf{Brass}.}\end{cvitems}
}
\web{featured}{false}
\web{tech}{Brass, Gears}
\end{cventries}
`,
  });

  const doc = parseResume(main);
  assert.deepEqual(doc.sections.map((s) => s.title), ['Work Experience', 'Side Projects']);
  assert.deepEqual(doc.profile, {
    firstName: 'Ada', lastName: 'Lovelace', name: 'Ada Lovelace',
    mobile: '+44 123', email: 'ada@example.com', github: 'ada',
  });

  const data = toSiteData(doc);
  assert.deepEqual(data.jobs, [
    {
      company: 'Analytical Engines Ltd',
      role: 'Engineer',
      period: 'Jan. 1840 - Ongoing',
      sub: 'London, UK',
      bullets: ['Designed the {{first algorithm}}.', 'Shown on the website only.', 'Unbraced web text and the rest.'],
      badge: 'AE',
      logo: '/logos/ae.png',
    },
    {
      company: 'Website Only Org',
      role: 'Volunteer',
      period: '1838',
      sub: 'Rome',
      bullets: ['Helped.'],
    },
  ]);

  assert.equal(data.projectsFeatured.length, 1);
  assert.deepEqual(data.projectsFeatured[0], {
    id: 1,
    title: 'Engine Notes',
    subtitle: 'Translation of Menabrea',
    blurb: 'Wrote Note G for the Analytical Engine.',
    tech: ['Note G', 'Analytical Engine'],
    image: null,
    video: null,
    repo: 'https://github.com/ada/notes',
    demo: 'https://example.com/notes?a=1&b=2',
    buttons: { demo: 'Read It' },
  });
  assert.deepEqual(data.projectsSmall.map((p) => [p.id, p.title, p.subtitle, p.demo, p.repo, p.tech]), [
    [2, 'Difference Engine', 'Hardware', 'https://engine.example.com', null, ['Brass', 'Gears']],
  ]);
});

test('section titles, sub-entries, bold names and reserved keys', () => {
  const main = fixture({
    'resume.tex': String.raw`\name{Ada}{Lovelace}\email{a@b.c}\github{ada}
\cvsection{Student Projects}
\cventry{\textbf{Web}}{\textbf{Foo} (Bar tool)}{}{}{\begin{cvitems}\item {Did it.}\end{cvitems}}
\cvsection{Relevant Coursework}
\web{site}{education}
\cventry{Course}{\textbf{Uni}}{Rome}{2024}{}
\web{details}{oops}
\cvsection{Work Experience}
\cventry{Engineer}{Beta Corp}{Paris}{2019 -- 2020}{}
\cvsubentry{}{Team Lead}{2020}{\begin{cvitems}\item {Led 5 people.}\end{cvitems}}
`,
  });
  const doc = parseResume(main);
  const data = toSiteData(doc);
  assert.deepEqual(data.projectsFeatured.map((p) => [p.title, p.subtitle]), [['Foo', 'Bar tool']]);
  assert.deepEqual(data.schools.map((s) => [s.school, s.period, s.details]), [['Uni', '2024', []]]);
  assert.deepEqual(data.jobs.map((j) => [j.company, j.period, j.bullets]), [['Beta Corp', '2019 – 2020', ['Team Lead (2020): Led 5 people.']]]);
  assert.equal(doc.warnings.length, 1);
  assert.match(doc.warnings[0], /\\web\{details\}/);
});

test('a header without \\github is an error', () => {
  const main = fixture({ 'resume.tex': String.raw`\name{Ada}{Lovelace}\email{a@b.c}%\github{ada}` });
  assert.throws(() => buildSiteData(main), /\\github\{\.\.\.\}/);
});

test('an entry before any section is an error with a line number', () => {
  const main = fixture({
    'resume.tex': String.raw`\begin{document}
\cventry{a}{b}{c}{d}{e}
\end{document}`,
  });
  assert.throws(() => parseResume(main), /resume\.tex:2: entry found before any \\cvsection/);
});

test('an unbalanced brace is an error', () => {
  const main = fixture({
    'resume.tex': String.raw`\cvsection{Work}
\cventry{a}{b}{c}{d}{\begin{cvitems}\item {oops\end{cvitems}}`,
  });
  assert.throws(() => parseResume(main), /unbalanced/);
});

test('the real resume produces the website sections', () => {
  const { data } = buildSiteData();
  assert.ok(data.profile.name && data.profile.email && data.profile.github);
  for (const key of ['schools', 'jobs', 'projectsFeatured']) {
    assert.ok(data[key].length > 0, `${key} is empty`);
  }
  for (const job of data.jobs) {
    assert.ok(job.company && job.role && job.period && job.bullets.length, JSON.stringify(job));
  }
  const ids = [...data.projectsFeatured, ...data.projectsSmall].map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length, 'project ids must be unique');
});
