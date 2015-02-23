/**
 * Created by Fan on 11/5/2014.
 */
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class sysTime extends HttpServlet{
    public void doGet (HttpServletRequest request,
                       HttpServletResponse response)
        throws IOException {
        PrintWriter out = response.getWriter();
        Date today = new Date();
        DateFormat dt1 = new SimpleDateFormat ("MM/dd/yyyy");
        String s = dt1.format(today);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("date", s);
        out.println(jsonObject);
    }
}
