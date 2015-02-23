<%--
  Created by IntelliJ IDEA.
  User: Fan
  Date: 11/11/2014
  Time: 10:56 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import ="java.util.Date, java.text.DateFormat, java.text.SimpleDateFormat" %>
<%
    Date today = new Date();
    DateFormat dt1 = new SimpleDateFormat ("MM/dd/yyyy");
    String s = dt1.format(today);
%>
<%= s%>