package Servlet;

import DB.DataBase;
import DataHandle.ListToJson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/CheckUser")
public class CheckUser extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");

        PrintWriter out = response.getWriter();

        String userId = request.getParameter("userId");

        DataBase dataBase = new DataBase();

        Boolean flag = dataBase.checkUser(userId);

        out.print( flag );
    }
}
