<?php
    $appid = strtolower($_GET['appid']);
    if($appid && file_exists($appid.'.php') && $appid != 'photos'){
        header('Location: '.$appid.'.html');
    }
    elseif($appid && $appid == 'timezones'){
        
        header('Location: http://everytimezone.com');
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
            <!-- Begin: adBrite, Generated: 2011-05-29 14:52:04  -->
<style type="text/css">
   .adHeadline {font: bold 10pt Arial; text-decoration: underline; color: #000000;}
   .adText {font: normal 10pt Arial; text-decoration: none; color: #656565;}
</style>
<script type="text/javascript">
try{var AdBrite_Iframe=window.top!=window.self?2:1;var AdBrite_Referrer=document.referrer==''?document.location:document.referrer;AdBrite_Referrer=encodeURIComponent(AdBrite_Referrer);}catch(e){var AdBrite_Iframe='';var AdBrite_Referrer='';}
document.write(String.fromCharCode(60,83,67,82,73,80,84));document.write(' src="http://ads.adbrite.com/mb/text_group.php?sid=1949030&br=1&dk=646f6d61696e206e616d655f385f325f776562&ifr='+AdBrite_Iframe+'&ref='+AdBrite_Referrer+'" type="text/javascript">');document.write(String.fromCharCode(60,47,83,67,82,73,80,84,62));</script>
<div><a class="adHeadline" target="_top" href="http://www.adbrite.com/mb/commerce/purchase_form.php?opid=1949030&afsid=1">Your Ad Here</a></div>
<!-- End: adBrite -->
        </div>
        <div class="grid_18 push_1" >
            <h1 style="font-size:18px">This app wasn't yet implemented in this experiment.</h1>
            <h3 style="margin-bottom:15px !important;">
                In the meanwhie, you are welcome to checkout my blog : <a href="http://alexw.me/" target="_blank">alexw.me</a> <br /><br />
                You can also fork this at <a href="https://github.com/altryne/Ipad-Simulator" target="_blank">https://github.com/altryne/Ipad-Simulator</a> <br/>
                and hack on this and do cool stuff because open source rulez
                <br/><br/>
                If your an iPad app developer, and would like to feature your app here, contact me ipad@alexw.me
            </h3>
            <h4>
                Things that work :
            </h4>
            <ul style="list-style:circle !important; list-style-position:inside;font-size:16px;padding:15px 0 0 30px;line-height:20px;">
                <li>Moving Screens left and right with "spring" effect</li>
                <li>Dock icons have css3 "reflection"  ;)</li>
                <li>All icons have css3 rounded corners and shadow similar to Ipads </li>
                <li>Search works almost identically to the ios. (using modified <a href="http://ejohn.org/blog/jquery-livesearch" target="_blank">jquery live-search</a>  )</li>
                <li>Lock screen effect with returning lock</li>
                <li>Home button works (exits apps, goes to first page, return from sleep mode,exits edit mode)</li>
                <li>Sleep button puts iPad in sleep mode</li>

                <li><strong>Edit Mode: </strong> click and hold on any app for 2 seconds to enable edit mode</li>
                <li> - Edit mode icons shake  in chrome (using css animation)</li>
                <li> - Move apps from place to place in edit mode</li>
                <li> - Move apps to another page</li>
                <li> - Move apps to dock</li>
                <li> - Delete Apps</li>
                <li><strong>Multitasking: </strong> launch any app, and it's in the background</li>
                <li> - multitask bar opens on double homescreen click</li>
                <li> - 3D (only safari and webkit nightly) switch between open and wanted mutitask app</li>
                <li> - remove app from multitask by editing the multitask bar (hold and hold for 2 sec.)</li>
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