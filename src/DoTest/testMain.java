package DoTest;

import DB.DataBase;

import java.util.List;

public class testMain {
    public static void main (String[] args) {
        DataBase dataBase = new DataBase();
        List userInfo = dataBase.getUser("160520117");
        System.out.println( userInfo );
    }
}
