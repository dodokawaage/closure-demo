<%--
  Created by IntelliJ IDEA.
  User: Fan
  Date: 11/5/2014
  Time: 3:04 AM
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Simple Date Range Picker</title>

    <!-- link calendar resources -->
    <script src="js/closure-library/closure/goog/base.js"></script>
    <script src="js/TimePicker_xhrio.js"></script>


    <link href="css/demo.css" rel="stylesheet" type="text/css">
    <link href="css/datepicker.css" rel="stylesheet" type="text/css">
    <link href="css/inputdatepicker.css" rel="stylesheet" type="text/css">

</head>
<body>
<div id="start-date"></div>
<div id="end-date"></div>


<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript">
    google.load('visualization', '1', {'packages':['annotatedtimeline']});
    google.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Current');
        data.addRows([
            [new Date(2015, 1, 1), 0.1],
            [new Date(2015, 1, 2), 0.2],
            [new Date(2015, 1, 3), 0.3],
            [new Date(2015, 1, 4), 0.5],
            [new Date(2015, 1, 5), 1.0],
            [new Date(2015, 1, 6), 1.5],
            [new Date(2015, 1, 7), 1.2],
            [new Date(2015, 1, 8), 0.7]
        ]);
        var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div'));
        chart.draw(data, {displayAnnotations: true});
    }
</script>

<script>
    function main() {
        var startDate = "start date: ";
        var endDate = "end date: ";
        var startElemId = "date-field1";
        var startButtId = "date-button1";
        var endElemId = "date-filed2";
        var endButtId = "date-button2";

        var blockContainer_1 = document.getElementById('start-date');
        var startTimePicker = makeDatePickers(startDate, startElemId, startButtId, blockContainer_1);

        var blockContainer_2 = document.getElementById('end-date');
        var endTimePicker = makeDatePickers(endDate, endElemId, endButtId, blockContainer_2);
    }
    main();
</script>
<div id="chart_div" style="width:700px; height:240px;"></div>
<p></p>
</body>
</html>
