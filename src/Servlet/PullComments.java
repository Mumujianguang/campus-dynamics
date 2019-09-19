package Servlet;

import DB.DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/PullComments")
public class PullComments extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        String ID = request.getParameter("ID");
        String commentUserId = request.getParameter("commentUserId");
        String commentContent = request.getParameter("commentContent");
        String commentTime = request.getParameter("commentTime");

        System.out.println(ID);
        System.out.println(commentContent);
        System.out.println(commentTime);
        DataBase dataBase = new DataBase();
        int flag = dataBase.pullComments(ID, commentContent, commentTime, commentUserId);

        PrintWriter out = response.getWriter();
        out.print( flag );
    }
}
