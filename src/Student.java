import java.util.ArrayList;
import java.util.List;

class Student {
    // Attributes
    private String name;
    private String registrationNumber;


    // Constructor
    public Student(String name, String registrationNumber) {
        this.name = name;
        this.registrationNumber = registrationNumber;
    }

    public String getName() {
        return name;
    }
    public String getRegistrationNumber() {
        return registrationNumber;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }
}
