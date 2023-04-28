public abstract class Book {
    // Attributes
    String isbn;
    String name;
    String author;
    String Pages;

    public String getibsn() {
        return isbn;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public String getPages() {
        return Pages;
    }

    public void setibsn(String isbn) {
        this.isbn = isbn;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPages(String Pages) {
        this.Pages = Pages;
    }

    @Override
    public String toString(){
        return "Book{" +
                "isbn='" + isbn + '\'' +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", Pages='" + Pages + '\'' +
                '}';
    }

}
