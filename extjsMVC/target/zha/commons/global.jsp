<%--
  Created by IntelliJ IDEA.
  User: java
  Date: 2016/11/15
  Time: 12:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%
  String basePath = request.getContextPath();
  String jsPath = basePath + "/resources/js";
  String cssPath = basePath + "/resources/css";
  String imagePath = basePath + "/resources/image";
%>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext-5.1.0/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css"/>
<script src="<%=basePath%>/ext-5.1.0/ext-all.js" type="text/javascript"></script>
<script src="<%=basePath%>/ext-5.1.0/packages/ext-theme-crisp/build/ext-theme-crisp.js" type="text/javascript"></script>
<script src="<%=basePath%>/ext-5.1.0/packages/ext-locale/ext-locale-zh_CN.js" type="text/javascript"></script>
<script src="<%=basePath%>/commons/ext.util.js" type="text/javascript"></script>
<script src="<%=basePath%>/commons/util.js" type="text/javascript"></script>
<script type="text/javascript">
  var global = {
    basePath:'<%=basePath%>',
    imagePath:'<%=imagePath%>',
    //mapUrl:'<%=basePath%>' + '/view/map/gaode',
    defaultPageSize:30
  }
</script>