import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

public class LibraryRunner {
    protected static HashMap<String, List<String>> borrowedBooks = new HashMap<>();
    public static void main(String[] args) throws Exception {
        int regNumber  =1000;
        Scanner userInput = new Scanner(System.in);
        boolean edgecase = true;
        Library library = new Library("inventory v2.txt");
        LibraryRunner runner = new LibraryRunner();
        borrowedBooks = runner.readFile("borrowed_books.txt");
        while (edgecase) {
            System.out.println("1. Search");
            System.out.println("2. Inventory Status");
            System.out.println("3. Register");
            System.out.println("4. Borrow");
            System.out.println("5. Return");
            System.out.println("6. Sort");
            System.out.print("Enter your choice: ");
            String input = userInput.next();
            if (input.equals("1")) {
                    System.out.println("Please Enter ISBN of Book you are looking for");
                    Scanner search = new Scanner(System.in);
                    String kb = search.next();
                    Book b = library.search(kb);
                    if(b==null)
                    {
                        System.out.println("Book Not Found Invalid ISBN");
                    }
                    else {
                        System.out.println(b.toString());
                    }
                    break;
            }
            else if (input.equals("2")) {
                InventoryChart graph = new InventoryChart("Available Books", library.availableBooks());
                graph.displayGraph();
                break;
            }
            else if (input.equals("3")) {
                System.out.println("Enter Student First and Last Name:");
                Scanner student = new Scanner(System.in);
                String name = student.next();
                library.registerStudent(new Student(name, regNumber + ""));
                System.out.println("Your Registration Number is " + regNumber);
                regNumber++;
                break;
            }
            else if (input.equals("4")) {
                System.out.println("Please enter the ISBN for the Book You Would Like to Borrow\n" +
                        "And Your Student Registration Number");
                Scanner isbn = new Scanner(System.in);
                String code = isbn.next();
                String number = isbn.next();
                List<Student> studentList = library.getStudents();
                boolean found = false;
                for (int i = 0; i < studentList.size(); i++) {
                    if (number.equalsIgnoreCase(studentList.get(i).getRegistrationNumber())) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    throw new IllegalArgumentException("Unknown Registration Number. Please Register.");
                }
                library.lend(code);
                Book book = library.search(code);
                try {
                    runner.writeFile(number + "\n" + code);

                } catch (NullPointerException e) {

                }
                break;
            }
            else if (input.equals("5")) {
                System.out.println("Please Enter Your Registration Number");
                Scanner idNum = new Scanner(System.in);
                String idnumber = idNum.next();
                List<Student> students = library.getStudents();
                boolean edge = false;
                for (int i = 0; i < students.size(); i++) {
                    if (idnumber.equalsIgnoreCase(students.get(i).getRegistrationNumber())) {
                        edge = true;
                        break;
                    }
                }
                if (!edge) {
                    throw new IllegalArgumentException("Registration Not Valid Please Enter Valid Number or " +
                            "Register");
                }
                List<String> displayBooks = borrowedBooks.get(idnumber);
                if (displayBooks.size() > 0) {
                    System.out.println("Books Borrowed: ");
                    for (int i = 0; i < displayBooks.size(); i++) {
                        System.out.println(library.search(displayBooks.get(i)).toString());
                    }
                    System.out.println("Please Enter ISBN Number for Book you would like to Put Back");
                    idnumber = idNum.next();
                    library.putBack(idnumber);
                    displayBooks.remove(idnumber);
                } else System.out.println("No Borrowed Books");
                break;
            }
            else if (input.equals("6")) {

                System.out.println("Please Select Sorting Method");
                System.out.println("1. ISBN");
                System.out.println("2. Quantity");
                Scanner method = new Scanner(System.in);
                int choice = method.nextInt();
                boolean menu = true;
                while (menu) {
                    switch (choice) {
                        case 1:
                            menu = false;
                            List<Book> top10 = library.sort(1);
                            for (int i = 0; i < top10.size(); i++) {
                                System.out.println(top10.get(i).toString());
                            }
                            break;

                        case 2:
                            menu = false;

                            List<Book> top102 = library.sort(2);
                            for (int i = 0; i < top102.size(); i++) {
                                System.out.println(top102.get(i).toString());
                            }
                            break;
                        default:
                            System.out.println("Invalid Input");
                            break;
                    }
                    library.sort(1);
                    break;
                }
            }
            else if (input.equals("q")) {
                edgecase = false;
                FileWriter clear = new FileWriter("borrowed_books.txt");
                clear.flush();
                break;
            }
            else{
                System.out.println("Unreadable");
                    break;
            }
        }
    }
    private HashMap<String, List<String>> readFile(String s) throws FileNotFoundException {
        File reader = new File(s);
        HashMap<String, List<String>> result = new HashMap<>();
        Scanner fileReader = new Scanner(reader);
        while(fileReader.hasNextLine())
        {
            String regNum = fileReader.nextLine();
            String isbn = fileReader.nextLine();
            if(result.containsKey(regNum))
            {
                List<String> books = result.get(regNum);
                books.add(isbn);
                result.put(regNum,books);
            }
            else
            {
                List<String> books = new ArrayList<>();
                books.add(isbn);
                result.put(regNum,books);
            }
        }
        if(result==null)
        {
            System.out.println("No Borrowed Books");
            return null;
        }

        return result;
    }
    private void writeFile(String s) throws IOException {
        FileWriter writer = new FileWriter("borrowed_books.txt", true);
        writer.write(s + "\n");
        writer.close();
    }
}
