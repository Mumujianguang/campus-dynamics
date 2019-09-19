package Bean;

public class CommentList {
    private String ID;
    private String dynamicId;
    private String commentUserId;
    private String commentContent;
    private String commentTime;

    public String getID() {
        return ID;
    }

    public String getDynamicId() {
        return dynamicId;
    }

    public String getCommentUserId() {
        return commentUserId;
    }

    public String getCommentTime() {
        return commentTime;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentUserId(String commentUserId) {
        this.commentUserId = commentUserId;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public void setCommentTime(String commentTime) {
        this.commentTime = commentTime;
    }

    public void setDynamicId(String dynamicId) {
        this.dynamicId = dynamicId;
    }

    public void setID(String ID) {
        this.ID = ID;
    }
}
