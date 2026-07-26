# Abdul-Sattar Kassem — Legacy Archive

A bilingual (Arabic / English) Hugo site preserving the writings, books, and life
of Dr. Abdul-Sattar Kassem — Palestinian author, academic, and political figure.

## How content is organized

```
content/
  ar/                 Arabic content (default language)
    about/            Biography
    articles/         Converted articles (one folder per article)
    books/             One folder per book
    videos/           Embedded interviews, lectures, speeches
    gallery/          Photo albums
    quotes/           Notable quotes
    press/            News coverage / media mentions
    tributes/         Public memorial messages
    contact/
  en/                 English content — mirrors the same section names
                      and, where a translation exists, the same slug as
                      its Arabic counterpart (this is what lets Hugo pair
                      them as translations of each other).

static/
  images/             Shared image files (articles, books, gallery, videos).
                      Not duplicated per language — both content/ar and
                      content/en pages reference the same file.
  originals/          Source PDF/Word documents, kept for provenance and
                      offered as a download link ("read the original").

i18n/                 UI string translations (nav labels, buttons) — not
                      content, just interface text.

archetypes/           Front-matter templates used by `hugo new`.

layouts/              Page templates (empty for now — theme/design is a
                      separate step from this content structure).
```

## Adding an article

1. Put the source file at `static/originals/articles/<slug>.pdf` (or `.docx`).
2. Create the page:
   ```
   hugo new content/ar/articles/<slug>/index.md
   ```
3. Fill in the converted text, and set `original_file` in the front matter to
   the path from step 1.
4. When translated, create the English counterpart with the **same slug**:
   ```
   hugo new content/en/articles/<slug>/index.md
   ```
   and set `translated_from` to the Arabic slug and `translation_status`
   accordingly. Matching slugs is what lets the language toggle link the
   two versions of the same page.

Books follow the same pattern under `books/`, with an added `cover` image
field. Until a book is translated, only the Arabic page needs to exist —
the English section will simply not show it.

## Not yet built

This step only creates the file/directory structure and Hugo config
(bilingual routing, RTL/LTR params). Visual design, page templates in
`layouts/`, and the actual language-switcher UI are separate next steps.