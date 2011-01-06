<?php
    $appid = $_GET['appid'];
    if($appid && file_exists($appid.'.php')){
        header('Location: '.$appid.'.html');
    }
    else{

    }
?>
<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Ipad simulator</title>
        <meta name="description" content="This is a jquery iPad simulator, this is only an experiment of what can be done with javascript in latest browsers">
        <meta name="keywords" content="Ipad, ipad simulator, apple ipad, alexw.me, altryne, alex wolkov, ipad javascript simulator">
        <meta charset="utf-8">
        <link rel="stylesheet" href="style/grid.css" type="text/css" media="screen"/>
        <link rel="stylesheet" href="style/main.css" type="text/css" media="screen"/>
    </head>
    <body>
    <div id="content" class="container_24">
        <div class="grid_4 ">
            <script type="text/javascript"><!--
            google_ad_client = "pub-4788291002967314";
            /* 160x600, created 7/13/10 */
            google_ad_slot = "5543103889";
            google_ad_width = 160;
            google_ad_height = 600;
            //-->
            </script>
            <script type="text/javascript"
            src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
            </script>
        </div>
        <div class="grid_18 push_1">
            <h1>I have yet to implement this app in this ipad experiment. soon.</h1>
            <h3 style="margin-bottom:15px !important;">
                In the meanwhie, you are welcome to checkout my blog: <a href="http://alexw.me/">alexw.me</a> <br />
                You can also fork this at <a href="https://github.com/altryne/Ipad-Simulator">https://github.com/altryne/Ipad-Simulator</a> <br/>
                and hack on this and do cool stuff because open source rulez
            </h3>
            <h4>
                Things that work:
            </h4>
            <ul style="list-style:circle !important; list-style-position:inside;font-size:16px;padding:15px 0 0 30px;line-height:20px;">
                <li>Moving Screens left and right with "spring" effect</li>
                <li>Dock icons have css3 "reflection"  ;)</li>
                <li>All icons have css3 rounded corners and shadow similar to Ipads </li>
                <li>Search works almost identically to the ios. (using modified <a href="http://ejohn.org/blog/jquery-livesearch">jquery live-search</a>  )</li>
                <li>Lock screen effect with returning lock</li>
                <li>Home button works (exits apps, goes to first page, return from sleep mode,exits edit mode)</li>
                <li>Sleep button puts iPad in sleep mode</li>

                <li><strong>Edit Mode: </strong> click and hold on any app for 2 seconds to enable edit mode</li>
                <li> - Edit mode icons shake  in chrome (using css animation)</li>
                <li> - Move apps from place to place in edit mode</li>
                <li> - Move apps to another page</li>
                <li> - Move apps to dock</li>
                <li> - Delete Apps</li>
            </ul>

        </div>
</div>

    <script>
   var _gaq = [['_setAccount', 'UA-7437527-1'], ['_trackPageview']];
   (function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    g.async = true;
    g.src = ('https:' == location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g, s);
   })(document, 'script');
  </script>
</body>
</html>