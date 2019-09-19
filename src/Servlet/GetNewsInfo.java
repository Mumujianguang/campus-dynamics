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

@WebServlet("/GetNewsInfo")
public class GetNewsInfo extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        request.setCharacterEncoding("utf-8");

        String nT = request.getParameter("newsTitle");

        String newsTitle = new String( nT.getBytes("ISO8859-1"), "utf-8" );

        PrintWriter out = response.getWriter();

        DataBase dataBase = new DataBase();
        ListToJson listToJson = new ListToJson();

        List newsContent = dataBase.getNewsContent(newsTitle);


        out.print( listToJson.getJson( newsContent ) );

    }
}
