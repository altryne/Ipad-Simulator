<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<style type="text/css">
  html { height: 100% }
  body { height: 100%; margin: 0px; padding: 0px }
  #map_canvas { height: 100%;width:100%; }
</style>
    <!-- google and cloudmade maps api -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script>!window.jQuery && document.write(unescape('%3Cscript src="js/libs/jquery-1.4.4.min.js"%3E%3C/script%3E'))</script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
<!--    <script type="text/javascript" src="http://tile.cloudmade.com/wml/latest/web-maps-lite.js"></script>-->

<!--    <script src="http://maps.google.com/maps?file=api&amp;hl=iw&amp;v=2.x&amp;sensor=false&amp;key=ABQIAAAASzKr8pzwWlefSvz4Jut0pBQRRi2OAPlbOi7XkVShKIGcvf8d5xRAf800-HqzMcdB8IF8NCzCY0hFuw" type="text/javascript"></script>-->

<!--    <script type="text/javascript">-->
<!--        CLOUDMADE_API_KEY = '990bb4c664f642e2b5c60738b4beb4d6';-->
<!--    </script>-->
    <script type="text/javascript">
    $(document).ready(function(){
        var myLatlng = new google.maps.LatLng(-34.397, 150.644);
        var myOptions = {
          zoom: 8,
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };


            var map = new google.maps.Map(document.getElementById("map"),    myOptions);
            get_location();
        });


        function get_location() {
          navigator.geolocation.getCurrentPosition(show_map);
        }

        function show_map(position){
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

              var myLatlng = new google.maps.LatLng(latitude,longitude);
              var myOptions = {
                zoom: 4,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
              }
             var map = new google.maps.Map(document.getElementById("map"), myOptions);

             var marker = new google.maps.Marker({
                  position: myLatlng,
                  title:"Hello World!"
              });

              // To add the marker to the map, call setMap();
              marker.setMap(map);

        }
    </script>

</head>
<body>
  <div id="map" style="width:100%; height:100%"></div>
</body>
</html>
