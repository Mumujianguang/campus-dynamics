package Servlet;

import DB.DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/DealLogin")
public class DealLogin extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");

        String userId = request.getParameter("userId");
        String password = request.getParameter("password");

        DataBase dataBase = new DataBase();
        Boolean flag = dataBase.login(userId, password);

        PrintWriter out = response.getWriter();
        out.print( flag );
    }
}
