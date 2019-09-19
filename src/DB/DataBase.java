package DB;

import Bean.*;
import com.sun.xml.internal.bind.v2.model.core.ID;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DataBase {
    Connection conn;
    PreparedStatement ps;
    ResultSet rs;
    public DataBase() {
        String url = "jdbc:sqlserver://localhost:1433;databaseName=test";
        String username = "sa";
        String password = "bestriven122817!";

        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            conn = DriverManager.getConnection(url, username, password);
            System.out.println("数据库连接成功!");
        } catch (Exception e){
            e.getStackTrace();
            System.out.println("数据库连接失败!");
        }
    }

    public List getUserDB() {
        String sql = "select * from user_list";
        List users = new ArrayList();
        try {
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                User user = new User(rs.getString("username"), rs.getString("password"));
                users.add(user);
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        close();
        return users;
    }


    public boolean removeUser(String username) {
        String sql = "delete from user_list where username=?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, username);
            int count = ps.executeUpdate();
            if (count != 0) {
                close();
                return true;
            }
        } catch (Exception e) {
            e.getStackTrace();
        }
        close();
        return false;
    }

    public void close() {
        try {
            conn.close();
            rs.close();
        } catch (Exception e) {
            e.getStackTrace();
        }
    }

//    检查用户是否存在
    public Boolean checkUser(String userId) {
        Boolean flag = true;
        String sql = "select * from user_list";
        try {
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                String ID = rs.getString(1);
                if ( ID.equals( userId ) ) {
                    flag = false;
                    return flag;
                }
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return flag;
    }

//    登录
public Boolean login(String userId, String password) {
    String sql = "select * from user_list";
    try {
        ps = conn.prepareStatement(sql);
        rs = ps.executeQuery();
        while (rs.next()) {
            String ID = rs.getString(1);
            String Pswd = rs.getString(2);
            if (ID.equals( userId ) && Pswd.equals( password )) {
                return true;
            }
        }
    } catch (SQLException e) {
        e.getStackTrace();
    }
    return false;
}

//    注册
    public int register(String userId, String password) {
        int val = 0;
        String sql = "insert into user_list values(?, ?)";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            ps.setString(2, password);
            val = ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return val;
    }

//    新增用户
    public void addUser (String userId) {
        String sql = "insert into userInfo(userId) values(?)";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
    }

//    获取用户主页
    public List getUser (String userId) {
        String sql = "select * from userInfo where userId = ?";
        List userList = new ArrayList();
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            rs = ps.executeQuery();
            while (rs.next()) {
                UserInfo userInfo = new UserInfo();
                userInfo.setUserId( rs.getString("userId") );
                userInfo.setUserName( rs.getString("userName") );
                userInfo.setUserSign( rs.getString("userSign") );
                userInfo.setBackImage( rs.getString("backImage") );
                userInfo.setUserImage( rs.getString("userImage") );
                userInfo.setConcernNum( rs.getString("concernNum") );
                userInfo.setDynamicNum( rs.getString("dynamicNum") );

                userList.add( userInfo );
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return userList;
    }

//    获取用户图片
    public String getUserImage(String userId) {
        String userImage = "";
        String sql = "select userImage from userInfo where userId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            rs = ps.executeQuery();
            while (rs.next()) {
                userImage = rs.getString("userImage");
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return userImage;
    }
//    获取用户信息
    public List getUserInfo (String userId) {
        String sql = "select * from userInfo where userId = ?";
        List userInfoList = new ArrayList();
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            rs = ps.executeQuery();
            while (rs.next()) {
                UserInfo userInfo = new UserInfo();
                userInfo.setUserName( rs.getString("userName") );
                userInfo.setUserSign( rs.getString("userSign") );
                userInfo.setUserSex( rs.getString("userSex") );
                userInfo.setUserAge( rs.getString("userAge") );
                userInfo.setUserCollege( rs.getString("userCollege") );
                userInfo.setUserGrade( rs.getString("userGrade") );

                userInfoList.add( userInfo );
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        close();
        return userInfoList;
    }
//    更新数据库——用户动态数量
    public int countUserDynamicNum(String userId) {
        int count = 0;
        String sql = "select userId from userDynamic";
        try {
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                String id = rs.getString("userId");
                if ( id.equals( userId ) ) {
                    ++count;
                }
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return count;
    }
    public void updateUserDynamicNum(String dynamicNum, String userId) {
        String sql = "update userInfo set dynamicNum = ? where userId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, dynamicNum);
            ps.setString(2, userId);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
    }


//    更新用户信息
    public int updataUserInfo(String userId, String userName, String userSign, String userSex, String userAge, String userCollege, String userGrade) {
        int flag = 0;
        String sql = "update userInfo set userName = ?, userSign = ?, userSex = ?, userAge = ?, userCollege = ?, userGrade = ? " +
                     "where userId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userName);
            ps.setString(2, userSign);
            ps.setString(3, userSex);
            ps.setString(4, userAge);
            ps.setString(5, userCollege);
            ps.setString(6, userGrade);
            ps.setString(7, userId);
            flag = ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return flag;
    }

//    获取用户动态信息
    public List getUserDynamic(String userId) {
        List dynamicList = new ArrayList();
        String sql = "select * from userDynamic where userId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            rs = ps.executeQuery();
            while (rs.next()) {
                UserDynamic userDynamic = new UserDynamic();
                userDynamic.setId( rs.getString("ID") );
                userDynamic.setUserId( rs.getString("userId") );
                userDynamic.setDate( rs.getString("dynamicDate") );
                userDynamic.setContent( rs.getString("content") );
                userDynamic.setReadNum( rs.getString("readNum") );
                userDynamic.setLikeNum( rs.getString("likeNum") );
                dynamicList.add( userDynamic );
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return dynamicList;
    }

//    获取全部动态
    public List getAllDynamic() {
        List allList = new ArrayList();
        String sql = "select * from userDynamic where permission != ?";
        Boolean flag = true;
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, "1");
            rs = ps.executeQuery();

            while (rs.next()) {
                UserDynamic userDynamic = new UserDynamic();

                String userId = rs.getString("userId");
                String ID = rs.getString("id");
                String dynamicDate = rs.getString("dynamicDate");
                String content = rs.getString("content");
                String readNum = rs.getString("readNum");
                String likeNum = rs.getString("likeNum");

                userDynamic.setId( ID );
                userDynamic.setUserId( userId );
                userDynamic.setDate( dynamicDate );
                userDynamic.setContent( content );
                userDynamic.setReadNum( readNum );
                userDynamic.setLikeNum( likeNum );

                allList.add( userDynamic );

            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return allList;
    }
    //  辅助方法-获取用户昵称和头像
    public String[] getUserName(String userId) {
        String[] userName = new String[2];
        String sql = "select * from userInfo where userId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            rs = ps.executeQuery();
            while (rs.next()) {
                userName[0] = rs.getString("userName");
                userName[1] = rs.getString("userImage");
            }

        } catch (SQLException e) {
            e.getStackTrace();
        }
        return userName;
    }

//    上传动态
    public int pullDynamic(String userId, String dynamicDate, String content, String readNum, String likeNum, String permission) {
        int val = 0;
        String sql = "insert into userDynamic(userId, dynamicDate, content, readNum, likeNum, permission) values(?, ?, ?, ?, ?, ?)";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            ps.setString(2, dynamicDate);
            ps.setString(3, content);
            ps.setString(4, readNum);
            ps.setString(5, likeNum);
            ps.setString(6, permission);
            val = ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return val;
    }

//    删除动态
    public int deleteDynamic(String ID) {
        int val = 0;
        String sql = "delete from userDynamic where ID = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, ID);
            val = ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return val;
    }
//    删除此动态的回复信息
    public void deleteDynamic_commentList(String dynamicId) {
        String sql = "delete from commentList where dynamicId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, dynamicId);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
    }
//    设置动态权限
    public int setDynamicPermission(String permission, String ID) {
        int val = 0;
        String sql = "update userDynamic set permission = ? where ID = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, permission);
            ps.setString(2, ID);
            val = ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return val;
    }

//    关注/取关用户
    public int changeConcernList(String curConcernState, String userId, String curUser) {
        int newState = 0;
        String insertSql = "insert into concernList(userId, concernUserId) values(?, ?)";
        String delSql = "delete from concernList where userId = ? and concernUserId = ?";
        try {
            if (curConcernState.equals("0")) {
                ps = conn.prepareStatement(insertSql);
                ps.setString(1, curUser);
                ps.setString(2, userId);
                int flag = ps.executeUpdate();
                if (flag != 0) {
                    newState = 1;
                }
            } else if (curConcernState.equals("1")) {
                ps = conn.prepareStatement(delSql);
                ps.setString(1, curUser);
                ps.setString(2, userId);
                int flag = ps.executeUpdate();
                if (flag != 0) {
                    newState = 0;
                }
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return newState;
    }
//    检查当前用户是否关注此用户
    public int checkConcern(String userId, String curUser) {
        int flag = 0;
        String sql = "select * from concernList where userId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, curUser);
            rs = ps.executeQuery();
            while (rs.next()) {
                String concernUserId = rs.getString("concernUserId");
                System.out.println(concernUserId);
                System.out.println(userId);
                if (concernUserId.equals( userId )) {
                    flag = 1;
                    return flag;
                }
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return flag;
    }

//    统计用户的关注数
    public int countConcernNum(String userId) {
        String sql = "select * from concernList where userId= ?";
        int num = 0;
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            rs = ps.executeQuery();
            while (rs.next()) {
                ++num;
            }
        } catch(SQLException e) {
            e.getStackTrace();
        }
        return num;
    }
//    更新用户的关注数
    public void updateUserConcernNum(String concernNum, String userId) {
        String sql = "update userInfo set concernNum = ? where userId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, concernNum);
            ps.setString(2, userId);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
    }
//    获取用户的关注列表
    public ArrayList getUserConcernList(String userId) {
        ArrayList list = new ArrayList();
        String sql = "select * from concernList where userId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            rs = ps.executeQuery();
            while (rs.next()) {
                list.add( rs.getString("concernUserId") );
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return list;
    }

//    保存动态回复信息
    public int pullComments(String dynamicId, String commentContent, String commentTime, String commentUserId) {
        int flag = 0;
        String sql = "insert into commentList(dynamicId, commentContent, commentTime, commentUserId) values(?, ? ,?, ?)";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, dynamicId);
            ps.setString(2, commentContent);
            ps.setString(3, commentTime);
            ps.setString(4, commentUserId);
            flag = ps.executeUpdate();
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return flag;
    }
//    获取回复信息
    public List getCommentList(String dynamicId) {
        List list = new ArrayList();
        String sql = "select * from commentList where dynamicId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, dynamicId);
            rs = ps.executeQuery();
            while (rs.next()) {
                CommentList commentList = new CommentList();
                commentList.setDynamicId( rs.getString("dynamicId") );
                commentList.setCommentContent( rs.getString("commentContent") );
                commentList.setCommentTime( rs.getString("commentTime") );
                commentList.setCommentUserId( rs.getString("commentUserId") );
                list.add(commentList);
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        return list;
    }
//    浏览
    public int addReadNum(String ID) {
        int flag = 0;
        String sql1 = "select readNum from userDynamic where ID = ?";
        String sql2 = "update userDynamic set readNum = ? where ID = ?";
        String readNum = "";
        try {
            ps = conn.prepareStatement(sql1);
            ps.setString(1, ID);
            rs = ps.executeQuery();
            while (rs.next()) {
                readNum = rs.getString("readNum");
            }
            int valInt = Integer.parseInt( readNum );
            readNum = (valInt + 1) + "";

            ps.close();
            ps = conn.prepareStatement(sql2);
            ps.setString(1, readNum);
            ps.setString(2, ID);
            flag = ps.executeUpdate();
        } catch(SQLException e) {
            e.getStackTrace();
        }
        return flag;
    }
//    点赞
    public int addLikeNum(String ID) {
        int flag = 0;
        String sql1 = "select likeNum from userDynamic where ID = ?";
        String sql2 = "update userDynamic set likeNum = ? where ID = ?";
        String likeNum = "";
        try {
            ps = conn.prepareStatement(sql1);
            ps.setString(1, ID);
            rs = ps.executeQuery();
            while (rs.next()) {
                likeNum = rs.getString("likeNum");
            }
            int valInt = Integer.parseInt( likeNum );
            likeNum = (valInt + 1) + "";

            ps.close();
            ps = conn.prepareStatement(sql2);
            ps.setString(1, likeNum);
            ps.setString(2, ID);
            flag = ps.executeUpdate();
        } catch(SQLException e) {
            e.getStackTrace();
        }
        return flag;
    }
//    获取新闻title
    public List getNewsInfo() {
        List newList = new ArrayList();
        String sql = "select * from newInfo";
        try {
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                News news = new News();
                news.setNewsDate( rs.getString("newsDate") );
                news.setNewsTitle( rs.getString("newsTitle") );
                newList.add(news);
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        close();
        return newList;
    }

//    搜索新闻信息
    public List getSearchNews(String newsY, String newsM) {
        List newList = new ArrayList();
        String sql = "select * from newInfo where newsY=? and newsM=?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, newsY);
            ps.setString(2, newsM);
            rs = ps.executeQuery();

            while (rs.next()) {
                News news = new News();
                news.setNewsDate( rs.getString("newsDate") );
                news.setNewsTitle( rs.getString("newsTitle") );
                newList.add(news);
            }
        } catch (SQLException e) {
            e.getStackTrace();
        }
        close();
        return newList;
    }

//    获取新闻详情
    public List getNewsContent(String newsTitle) {
        String sql = "select * from newInfo where newsTitle=?";
        List newList = new ArrayList();

        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, newsTitle);
            rs = ps.executeQuery();

            while (rs.next()) {
                News news = new News();
                news.setNewsContent( rs.getString("newsContent") );
                news.setNewsImage( rs.getString("newsImage") );
                newList.add( news );
            }
        } catch(SQLException e) {
            e.getStackTrace();
        }
        close();

        return newList;
    }


}
