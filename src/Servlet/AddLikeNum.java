package Servlet;

import DB.DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/AddLikeNum")
public class AddLikeNum extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        String ID = request.getParameter("ID");

        DataBase dataBase = new DataBase();
        int flag = dataBase.addLikeNum(ID);

        PrintWriter out = response.getWriter();
        out.print( flag );
    }
}
