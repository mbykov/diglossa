# **diglossa**

**slow reading tool** - detailed description <span class="external">http://diglossa.org/ru</span>

**diglossa** is free, open source, with the GNU GPL free license, a modular structure and an intuitive interface. It can be used simply as a handy e-book reader of any kind. Plugins allow you to use any language other than the commonly used

### language designations:
  the application uses the three-letter ISO 639 designations - <span class="external">https://iso639-3.sil.org/code_tables/639/data</span>

## basic capabilities:

### reading
- import of books: .epub, .pdf, .fb2, .html, .md, .txt and own .dgl
   - dictionary import - .stardict, .dsl
   - automatic detection of the text language
   - dictionary search by **alt-mouse-move** above the word
   - local and full text search with context search option
   - bookmarks
- importing and concurrently linking translations of the same book in a different format
- view parallel segments by **shift-mouse-wheel** above a paragraph in the right pane
- **arrow-left-right** browsing history works for both book texts and dictionaries

### structure editing
- editing the structure (not the text) of a book
- automatic paragraph synchronization check

## plugins
in v.1.0 diglossa was tested only with european languages - fra,deu.eng,rus,spa,ita

it is possible to use plugins for any language (instructions and examples in next version)


## format .dgl
dgl is an ebook format, similar to the epub format, but with two differences.

- First it doesn't use html internally but (pseudo)-markdown.
- Second, it does not have a special .toc table of contents file, but uses the markdown itself to build the table of contents.

In all other respects, .dgl copies .epub, you could call it a version of .epub-markdown, with all the features of .epub preserved.

pseudo-markdown because only one of the block tags is used, p, or paragraph. Headings h(n), paragraphs, and lines in lists and tables are represented by p tags. Thus, the text of the book is converted into a sequence of paragraphs.

Because of this, two or more parallel texts can easily be matched in .dgl format. A sequence of (pseudo)-paragraphs includes paragraphs, table lines, list lines, notes, and anything horizontal in the same vein. In synchronized texts, each paragraph corresponds to a parallel one. This is very handy.

## auto-synchronizer

When synchronized, no corrections are made to the book text, but a synchronizer is created. This allows you to roll back changes made at any time, even going back to editing the book after editing or reading another book, or restarting digloss.

The auto-synchronizer significantly speeds up the work on checking the paragraph synchronization of the connected book.

when exporting a batch of books, their synchronizers are lost, and only their final form is published

## export to .dgl

synchronized books can be exported into a .dgl package and published.

## indexes for full text search (FTS)

FTS indexes are created by separate command. The indexes have to be recreated after adding parallel text or after synchronization.

## context dictionaries

Full-text search databases for many parallel texts can be used to generate context multilingual dictionaries. You can see an example of working with such dictionaries on the title page <span class="external">http://diglossa.org</span>

&nbsp;
