package Servlet;

import DB.DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/ChangeConcernList")
public class ChangeConcernList extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");

        String userId = request.getParameter("userId");
        String curUser = request.getParameter("curUser");
        String curConcernState = request.getParameter("curConcernState");

        DataBase dataBase = new DataBase();
        int flag = dataBase.changeConcernList(curConcernState, userId, curUser);
        int concernNum = dataBase.countConcernNum(curUser);
        System.out.println(concernNum);
        dataBase.updateUserConcernNum(concernNum + "", curUser);
        PrintWriter out = response.getWriter();
        out.print( flag );
    }
}
