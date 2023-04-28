import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

class Library implements LibraryManagementSystem {
    // Attributes
    private List<FictionBook> fictionBooks = new ArrayList<>();
    private HashMap<String, Integer> inventory = new HashMap<>();
    private List<NonfictionBook> nonfictionBooks = new ArrayList<>();
    private List<Student> students = new ArrayList<>();
    public Library(String s) throws FileNotFoundException {
        inventory(s);
    }
    public List<FictionBook> getFictionBooks() {
        return fictionBooks;
    }
    public List<NonfictionBook> getNonfictionBooks() {
        return nonfictionBooks;
    }
    public List<Student> getStudents() {
        return students;
    }
    public HashMap<String, Integer> getInventory() {
        return inventory;
    }
    public void setFictionBooks(List<FictionBook> fictionBooks) {
        this.fictionBooks = fictionBooks;
    }
    public void setNonfictionBooks(List<NonfictionBook> nonfictionBooks) {
        this.nonfictionBooks = nonfictionBooks;
    }
    public void setStudents(List<Student> students) {
        this.students = students;
    }
    public void setInventory(HashMap<String, Integer> inventory) {
        this.inventory = inventory;
    }
    public int[] availableBooks(){
        int[] result = {fictionBooks.size(),nonfictionBooks.size()};
        return result;
    }

    // Overridden methods

    public void lend(String isbn) {
        Book book = search(isbn);
        if (book == null) {
            System.out.println("Book not found!");
        }
        else {
            if (inventory.get(isbn) > 0) {
                inventory.put(isbn, inventory.get(isbn) - 1);
                System.out.println("Book lent successfully!");
            }
            else {
                System.out.println("Book not available!");
            }
        }
    }
    public void putBack(String isbn) {
        Book book = search(isbn);
        if (book == null) {
            System.out.println("Book not found!");
        }
        else {
            inventory.put(isbn, inventory.get(isbn) + 1);
            System.out.println("Book returned successfully!");
        }
    }
    public void inventory(String s) throws FileNotFoundException {
        File inputFile = new File(s);
        Scanner file = new Scanner(inputFile);
        String Headers = file.nextLine();
        while (file.hasNext()) {
            String line = file.nextLine();
            String[] data = line.split(",");
            if(data[5].equals("fiction"))
            {
                fictionBooks.add(new FictionBook(data[2],data[0],data[1],data[3]));
            }
            else
            {
                nonfictionBooks.add(new NonfictionBook(data[2],data[0],data[1],data[3]));
            }
            inventory.put(data[0], Integer.parseInt(data[4]));
        }
    }
    public void registerStudent(Student student) {
        if (!students.contains(student)) {
            students.add(student);
            System.out.println(student.getName() + " has been registered!");
        }
        else {
            System.out.println(student.getName() + " has already been registered!");
        }
    }
    public Book search(String s){
        for(int i = 0;i< nonfictionBooks.size();i++)
        {
            if(nonfictionBooks.get(i).getibsn().equalsIgnoreCase(s))
                return nonfictionBooks.get(i);
        }
        for(int i = 0;i< fictionBooks.size();i++)
        {
            if(fictionBooks.get(i).getibsn().equalsIgnoreCase(s))
                return fictionBooks.get(i);
        }
        return null;
    }
    public List<Book> sort(int mode) {
        List<Book> books = new ArrayList<>();
        books.addAll(fictionBooks);
        books.addAll(nonfictionBooks);

        if (mode == 1) {
            Collections.sort(books, new Comparator<Book>() {
                @Override
                public int compare(Book book1, Book book2) {
                    return book1.getibsn().compareTo(book2.getibsn());
                }
            });
        } else if (mode == 2) {
            Collections.sort(books, new Comparator<Book>() {
                @Override
                public int compare(Book book1, Book book2) {
                    return Integer.compare(inventory.get(book2.getibsn()), inventory.get(book1.getibsn()));
                }
            });
        } else {
            System.out.println("Invalid sorting mode. Please choose 1 (ISBN) or 2 (quantity).");
            return null;
        }

        List<Book> topBooks = new ArrayList<>();
        int count = 0;
        for (Book book : books) {
            if (count == 10) {
                break;
            }
            topBooks.add(book);
            count++;
        }

        return topBooks;
    }
}
