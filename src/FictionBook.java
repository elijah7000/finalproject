class FictionBook extends Book {
    public FictionBook(String isbn, String name, String author, String Pages) {
        setibsn(isbn);
        setName(name);
        setAuthor(author);
        setPages(Pages);
    }

    @Override
    public String toString() {
        return "Fiction" + super.toString();
    }
}
