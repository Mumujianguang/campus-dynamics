package DataHandle;

import com.alibaba.fastjson.JSONObject;

import java.util.List;

public class ListToJson {
    public String getJson(List list) {
        String json = JSONObject.toJSONString(list);
        return json;
    }
}
