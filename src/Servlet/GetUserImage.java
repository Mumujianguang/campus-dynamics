package Servlet;

import DB.DataBase;
import DataHandle.ListToJson;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/GetUserImage")
public class GetUserImage extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        request.setCharacterEncoding("utf-8");

        String userId = request.getParameter("userId");

        PrintWriter out = response.getWriter();

        DataBase dataBase = new DataBase();
        String userImage = dataBase.getUserImage(userId);

        out.print( userImage );
    }
}
