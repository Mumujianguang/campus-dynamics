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

@WebServlet("/GetSearchNews")
public class GetSearchNews extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        request.setCharacterEncoding("utf-8");

        String year = request.getParameter("newsY");
        String month = request.getParameter("newsM");

        System.out.println(year);
        System.out.println(month);

        PrintWriter out = response.getWriter();

        DataBase dataBase = new DataBase();
        ListToJson listToJson = new ListToJson();

        List newsList = dataBase.getSearchNews(year, month);

        out.print( listToJson.getJson( newsList ) );

    }
}
