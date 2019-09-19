package Bean;

public class UserDynamic {
    private String id;
    private String userId;
    private String date;
    private String content;
    private String readNum;
    private String likeNum;
    private String userImage;
    private String userName;

    public String getUserId() {
        return userId;
    }

    public String getContent() {
        return content;
    }

    public String getDate() {
        return date;
    }

    public String getId() {
        return id;
    }

    public String getLikeNum() {
        return likeNum;
    }

    public String getReadNum() {
        return readNum;
    }

    public String getUserImage() {
        return userImage;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setLikeNum(String likeNum) {
        this.likeNum = likeNum;
    }

    public void setReadNum(String readNum) {
        this.readNum = readNum;
    }
}
