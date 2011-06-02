<?php
//0 page is the dock
$apps[0] = Array(
    'iPod',
    'Settings',
    'Clock',
    'Safari',
    'Mail',
    'iMovie'
);
$apps[1] = Array(
    'Maps',
    'iMovie',
    'camera',
    'Photo Booth',
    'facetime',
    'Game Center',
    'Notes',
    'Photos',
    'Timezones',
    'Weather'
);
$apps[2] = Array(
    'Mail',
    'Stocks',
    'Maps',
    'Messages',
    'Notes',
    'Photos',
    'iMovie',
);
$apps[3] = Array(
    'Mail',
    'Stocks',
    'Maps',
    'Messages',
    'Notes',
    'Photos',
    'iMovie',
);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>iPad2 simulator /w Css3, Jquery and HTML5 | alexw.me</title>
	<meta charset="utf-8">
    <meta name="description" content="This is a jquery iPad2 simulator, this is only an experiment of what can be done with javascript in ast browsers">
    <meta name="keywords" content="Ipad, ipad simulator, apple ipad,ipad2,iPad2, iPad2 simulator, apple ipad2,mobile safari simulator, alexw.me, altryne, alex wolkov, ipad javascript simulator">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=2.0; user-scalable=1;"/>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="icon" type="image/png" href="favicon.ico">
    <link rel="stylesheet" href="style/ipad.css" type="text/css" media="screen"/>
    <link rel="image_src" href="http://alexw.me/ipad2/apps/facebook.jpg" />
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script>!window.jQuery && document.write(unescape('%3Cscript src="js/jquery-1.4.4.min.js"%3E%3C/script%3E'))</script>
    <script type="text/javascript" src="js/jquery-ui-1.8.1.custom.min.js"></script>
    <script type="text/javascript" src="js/plugins.js"></script>
    <script type="text/javascript" src="js/jquery.ui.ipad.js"></script>
    <script type="text/javascript" src="js/ipad.js"></script>
</head>
<body id="ipad">
<div id="externalContainer">
    <iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Falexw.me%2Fipad2&amp;layout=box_count&amp;show_faces=false&amp;width=78&amp;action=like&amp;font&amp;colorscheme=light&amp;height=65" scrolling="no" frameborder="0" class="share_icon" allowTransparency="true"></iframe>
    <a href="http://twitter.com/share" class="twitter-share-button" data-url="http://alexw.me/ipad2" data-text="iPad2 simulator /w Css3, Jquery and HTML5" data-count="vertical" data-via="altryne">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
    <div></div>
    <g:plusone size="tall" href="http://alexw.me/ipad2"></g:plusone>
    <div id="content_overflow">
    <div id="content" class="hide_spring">
        <div id="window"></div>
        <div id="iframe_holder"></div>
        <div id="black"></div>
        <div class="topbar">
            <span class="time">--:--</span>
            <span class="percentage">99%</span>
        </div>
        <div id="general_wrap">

            <div id="drag" style="left:0">
                <div id="page0" class="page">
                    <form>
                        <input type="text" id="search" autocomplete=”off” name="app_search"/>
                    </form>
                    <div id="search_result_wrapper">
                        <ul id="search_result">

                        </ul>
                    </div>
                    <div id="tr" class="corner"></div>
                    <div id="tl" class="corner"></div>
                    <div id="br" class="corner"></div>
                    <div id="bl" class="corner"></div>
                    <div id="whiteSep"></div>
                    <div id="noResults">No Results</div>

                </div>
                <?php
                foreach($apps as $k=>$v){
                if($k != 0 && count($v)){
                    echo '<ul id="page'.$k.'" class="apps page">'."\n";
                        foreach($v as $kk=>$vv){
                        echo '<li id="'.str_replace(' ','',strtolower($vv)).'" class="app">
                                <div class="delete">x</div>
                                <div class="app_logo" style="background-image:url(\'apps/'.str_replace(' ','',strtolower($vv)).'.jpg\')"></div>
                                <span>'.$vv.'</span>
                            </li>'."\n";
                        }
                    echo '</ul>'."\n";
                    }
                }
                ?>

            </div>
        </div>
        <ul id="pages">
            <li class="first">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKVJREFUeNpi+P//PwMQSwDxfCB+AsRvgXgmEHNC5eCYiYGBgRmItzNAgAMQmwCxEFSMjQEZAHV4APEZNFOYgfgGEIegm6wOxBcYUMFfIL4GxKLIgiDFp4DYHog5kcRBbEsg/o7uDBDeCMR7gdgeiAOB+OR/BJgA8yxMMRsQV0DdfhiIc4DYFRoyIHAeiIUY0IMHDcsB8TGoBg9GsPGEAcgP3wECDACpaMIIrgD3fQAAAABJRU5ErkJggg==" width="11" height="9" />
            </li>
            <li class="active"> • </li>
            <?php
                for($i = 0;$i<count($apps)-2; $i++){
                    echo '<li> • </li>';
                }
            ?>

        </ul>
        <ul id="dock" class="apps">
            <?php
                foreach($apps[0] as $kk=>$vv){
                        echo '<li id="'.str_replace(' ','',strtolower($vv)).'" class="app">
                                <div class="delete">x</div>
                                <div class="app_logo" style="background-image:url(\'apps/'.str_replace(' ','',strtolower($vv)).'.jpg\')"></div>
                                <span>'.$vv.'</span>
                            </li>'."\n";
                        }
            ?>
        </ul>


        <div id="lockscreen">
            <div class="topbar">
                <img src="apps/lock.png" alt=""/>
                <span class="percentage">99%</span>
            </div>
            <div id="lockscreentime" class="time">--:--</div>
                <div id="slide_here">
                    <div id="slider"></div>
                    <div id="drop"></div>
                </div>
        </div>


    </div>
</div>
    <div id="multitask_bar">
        <ul class="apps">
            
        </ul>
    </div>
    <div id="home"></div>
    <div id="sleep"></div>
</div>
        <!-- Place this tag in your head or just before your close body tag -->
    <script type="text/javascript" src="http://apis.google.com/js/plusone.js"></script>
<!-- asynchronous google analytics: mathiasbynens.be/notes/async-analytics-snippet
       change the UA-XXXXX-X to be your site's ID -->
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