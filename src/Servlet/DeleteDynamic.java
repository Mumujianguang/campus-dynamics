package Servlet;

import DB.DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/DeleteDynamic")
public class DeleteDynamic extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");

        String ID = request.getParameter("ID");
        System.out.println( ID );
        DataBase dataBase = new DataBase();

        int flag = dataBase.deleteDynamic(ID);
        dataBase.deleteDynamic_commentList(ID);

        PrintWriter out = response.getWriter();
        out.print( flag );
    }
}
