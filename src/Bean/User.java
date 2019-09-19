package Bean;

public class User {
    private String userId;
    private String password;


    public User(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    public String getUsername() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String userId) {
        this.userId = userId;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
