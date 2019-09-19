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

@WebServlet("/GetCommentList")
public class GetCommentList extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");

        String dynamicId = request.getParameter("dynamicId");

        PrintWriter out = response.getWriter();

        DataBase dataBase = new DataBase();
        ListToJson listToJson = new ListToJson();

        List commentList = dataBase.getCommentList(dynamicId);

        JSONArray jsonArray = JSONArray.parseArray( listToJson.getJson(commentList) );
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            String userId = jsonObject.getString("commentUserId");

            String[] userInfo = dataBase.getUserName( userId );

            jsonObject.put("userName", userInfo[0]);
            jsonObject.put("userImage", userInfo[1]);
            System.out.println(userInfo[0]);
            System.out.println(userInfo[1]);
        }

        out.print( jsonArray.toJSONString() );
    }

}
