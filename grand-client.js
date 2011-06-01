<!DOCTYPE html>
<html lang="en">
<head>
  <script type="text/javascript" src="http://cdn.socket.io/stable/socket.io.js"></script>
  <script type="text/javascript">
    var socket = new io.Socket(null, {port: 8080});
 
    socket.connect();
    socket.on('message', function(message){
        document.getElementById('divTime').innerHTML = message;
    });
    function GetServerTime() {
        socket.send('');
    }
  </script>
</head>
<body>
    <div id="divTime"></div>
    <input type="button" value="Get Server Time" onclick="GetServerTime();">
</body>
</html>