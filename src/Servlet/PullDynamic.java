package Servlet;

import DB.DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/PullDynamic")
public class PullDynamic extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        String userId = request.getParameter("userId");
        String dynamicDate = request.getParameter("dynamicDate");
        String content = request.getParameter("content");
        String readNum = request.getParameter("readNum");
        String likeNum = request.getParameter("likeNum");
        String permission = request.getParameter("permission");

        DataBase dataBase = new DataBase();
        int flag = dataBase.pullDynamic(userId, dynamicDate, content, readNum, likeNum, permission);

        PrintWriter out = response.getWriter();
        out.print( flag );
    }
}
