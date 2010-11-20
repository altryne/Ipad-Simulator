<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<style type="text/css">
  html { height: 100% }
  body { height: 100%; margin: 0px; padding: 0px }
  #map_canvas { height: 100% }
</style>
    <!-- google and cloudmade maps api -->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://tile.cloudmade.com/wml/latest/web-maps-lite.js"></script>

    <script src="http://maps.google.com/maps?file=api&amp;hl=iw&amp;v=2.x&amp;sensor=false&amp;key=ABQIAAAASzKr8pzwWlefSvz4Jut0pBQRRi2OAPlbOi7XkVShKIGcvf8d5xRAf800-HqzMcdB8IF8NCzCY0hFuw"
            type="text/javascript"></script>
    <script type="text/javascript">
        CLOUDMADE_API_KEY = '990bb4c664f642e2b5c60738b4beb4d6';
    </script>
    <script type="text/javascript">

        var icons = new Array(15);
        var markersLocation = new Array(15);
        var htmlTexts = new Array(15);
        var markers = new Array(15);
        var markerLocationHome;


        CustomGetTileUrl=function(a,b){

            return "http://b.tile.cloudmade.com/3e3f6511941459a88f4f7aa0199aa757/2666/256/"+b+"/"+a.x+"/"+a.y+".png";
        }

        //var cloudmade = new CM.Tiles.CloudMade.Web({key: '3e3f6511941459a88f4f7aa0199aa757', styleId:2666});
        //var map = new CM.Map('cm-example', cloudmade);
        var map;
        $(document).ready(function()
        {
            initMap();
        });

    var initMapError=false;
    function initMap()
    {
        if (!document.getElementById("map"))
            return -1;
        try {
            map = new GMap(document.getElementById("map"));
        }catch(err){
            initMapError=true;
            return;
        }
        map.setUIToDefault();
        //map.addControl(new GScaleControl());
        //map.addControl(new GSmallMapControl());
        map.removeMapType(G_NORMAL_MAP);
        map.removeMapType(G_HYBRID_MAP);
        map.addControl(new GMapTypeControl());

        var copyright = new GCopyright(1,
            new GLatLngBounds(new GLatLng(53.8136257,-3.0981445),
            new GLatLng(53.8654855,-2.9663944) ),17, "");

        var copyrightCollection = new GCopyrightCollection("");

        copyrightCollection.addCopyright(copyright);

        var tilelayers = [new GTileLayer(copyrightCollection,1,17)];

        tilelayers[0].getTileUrl = CustomGetTileUrl;

        var osmmap = new GMapType(tilelayers, G_SATELLITE_MAP.getProjection(), "מפה");

        map.addMapType(osmmap);

        map.setCenter(new google.maps.LatLng(32.088815, 34.808167), 18, osmmap);

        markerLocationHome = new google.maps.LatLng(32.088815, 34.808167);
        var iconHome;
        iconHome = new google.maps.Icon();
        iconHome.image = "http://ira.easy.co.il/images/Easyicon.png";
        iconHome.iconSize = new google.maps.Size(43, 43);
        iconHome.iconAnchor = new google.maps.Point(12,12);

        var markerHome = new google.maps.Marker(markerLocationHome, {
                title: "?????? ???",
                icon: iconHome
        });

        map.addOverlay(markerHome);

        setMapMarkers(); //each page using the map should have its own implementation of this function

    } //initMap



// bind browser resize
    var mapResizingNow=false
    $(window).bind('resize', function () {
        if (mapResizingNow==false) {
            mapResizingNow = true;
            //initMap();
            setTimeout("initMap()", 100);
            mapResizingNow=false;
        }
    });



    </script>

</head>
<body>
  <div id="map" style="width:100%; height:100%"></div>
</body>
</html>
