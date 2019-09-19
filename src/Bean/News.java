package Bean;

public class News {
    private String newsDate;
    private String newsTitle;
    private String newsContent;
    private String newsImage;
    private String newsY;
    private String newsM;

    public News() {}

    public String getNewsContent() {
        return newsContent;
    }

    public String getNewsDate() {
        return newsDate;
    }

    public String getNewsM() {
        return newsM;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public String getNewsY() {
        return newsY;
    }

    public String getNewsImage() {
        return newsImage;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public void setNewsDate(String newsDate) {
        this.newsDate = newsDate;
    }

    public void setNewsM(String newsM) {
        this.newsM = newsM;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public void setNewsY(String newsY) {
        this.newsY = newsY;
    }

    public void setNewsImage(String newsImage) {
        this.newsImage = newsImage;
    }
}
