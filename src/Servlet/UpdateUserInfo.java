package Servlet;

import DB.DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet("/UpdateUserInfo")
public class UpdateUserInfo extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        String userId = request.getParameter("userId");
        String userName = request.getParameter("userName");
        String userSign = request.getParameter("userSign");
        String userSex = request.getParameter("userSex");
        String userAge = request.getParameter("userAge");
        String userCollege = request.getParameter("userCollege");
        String userGrade = request.getParameter("userGrade");

        DataBase dataBase = new DataBase();
        int flag = dataBase.updataUserInfo(userId, userName, userSign, userSex, userAge, userCollege, userGrade);

        PrintWriter out = response.getWriter();
        out.print( flag );
    }
}
