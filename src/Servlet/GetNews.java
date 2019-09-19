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

@WebServlet("/GetNews")
public class GetNews extends HttpServlet {
     public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
         response.setContentType("text/html;charset=utf-8");

         PrintWriter out = response.getWriter();

         DataBase dataBase = new DataBase();
         ListToJson listToJson = new ListToJson();

         List news = dataBase.getNewsInfo();

         out.print( listToJson.getJson(news) );
     }
}
