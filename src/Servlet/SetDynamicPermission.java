package Servlet;

import DB.DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/SetDynamicPermission")
public class SetDynamicPermission extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");

        String permission = request.getParameter("permission");
        String ID = request.getParameter("ID");
        DataBase dataBase = new DataBase();

        int flag = dataBase.setDynamicPermission(permission, ID);
        System.out.println(flag);
        PrintWriter out = response.getWriter();
        out.print( flag );
    }
}
