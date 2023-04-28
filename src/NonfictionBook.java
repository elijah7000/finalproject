class NonfictionBook extends Book {
    public NonfictionBook(String isbn, String name, String author, String pages) {

        setibsn(isbn);
        setName(name);
        setAuthor(author);
        setPages(pages);
    }

    @Override
    public String toString() {
        return "NonfictionBook" + super.toString(); }
    }
