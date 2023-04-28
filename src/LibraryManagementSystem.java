import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;

interface LibraryManagementSystem {
    void lend(String isbn) throws Exception;

    void putBack(String isbn);

    void inventory(String filePath) throws FileNotFoundException;

    void registerStudent(Student student) throws Exception;

    Book search(String isbn);

    List<Book> sort(int mode);
}
