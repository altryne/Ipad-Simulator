<?php
//0 page is the dock
$apps[0] = Array(
    'Clock1',
    'Safari',
    'Mail'
);
$apps[1] = Array(
    'Maps',
    'Messages1',
    'Notes',
    'Timezones',
    'Weather1',
    Array('WTF',Array('Messages','Weather','Clock','bla4','bla5','bla6')),
    'Weather2',
    'Weather3',
    'Weather4',
    'Weather5',
    'Weather6',
    Array('Alex',Array('iPod','Settings','Photos')),
    'Weather7',
    'Weather8',
    'Weather9',
    'Weather10',
    'Weather11',
    'Weather12',
    'Weather13',
    'Weather14',
);
$apps[2] = Array(
    'Mail2',
    'Stocks',
    'iMovie',
);
$apps[3] = Array(
    'Mail3',
    'Stocks2',
    'Maps2',
    'Messages2',
    'Notes2',
    'Photos2',
    'iMovie2',
);
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>iPad Simulator - alexw.me</title>
	<meta charset="utf-8">
    <meta name="description" content="This is a jquery iPad simulator, this is only an experiment of what can be done with javascript in ast browsers">
    <meta name="keywords" content="Ipad, ipad simulator, apple ipad, alexw.me, altryne, alex wolkov, ipad javascript simulator">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="icon" type="image/png" href="favicon.ico">
    <link rel="stylesheet" href="style/ipad.css" type="text/css" media="screen"/>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script>!window.jQuery && document.write(unescape('%3Cscript src="js/jquery-1.4.4.min.js"%3E%3C/script%3E'))</script>
    <script type="text/javascript" src="js/jquery-ui-1.8.1.custom.min.js"></script>
    <script type="text/javascript" src="js/plugins.js"></script>
    <script type="text/javascript" src="js/jquery.ui.ipad.js"></script>
    <script type="text/javascript" src="js/ipad.js"></script>
</head>
<body id="ipad">
<div id="externalContainer">
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
                        if(!is_array($vv)){
                        echo '<li id="'.$vv.'" class="app">
                                <div class="delete">x</div>
                                <div class="app_logo" style="background:url(\'apps/'.strtolower($vv).'.jpg\')"></div>
                                <span>'.$vv.'</span>
                            </li>';
                        }else{
                           echo '<li id="'.$vv[0].'" class="app folder">
                           <div class="app_logo"">
                           <ul class="ui-sortable">';
                           foreach($vv[1] as $kkk=>$vvv){
                                echo '<li data-id="'.$vvv.'" class="app">
                                      <div class="delete">x</div>
                                      <div class="app_logo" style="background:url(\'apps/'.strtolower($vvv).'.jpg\')"></div>
                                      <span>'.$vvv.'</span>
                                     </li>';
                            }
                           echo '</ul>
                           </div>
                           <span>'.$vv[0].'</span>
                           </li>';
                        }
                        }
                    echo '</ul>';
                    }
                }
                ?>

            </div>
        </div>
        <div id="folder_cont">

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
                    if(!is_array($vv)){
                        echo '<li id="'.$vv.'" class="app">
                                <div class="delete">x</div>
                                <div class="app_logo" style="background:url(\'apps/'.strtolower($vv).'.jpg\')"></div>
                                <span>'.$vv.'</span>
                            </li>';
                        }
                    else{
                        echo '<li id="'.$vv[0].'" class="app folder">';
                        foreach($vv[1] as $kkk=>$vvv){
                            echo '<li data-id="'.$vvv.'" class="app">
                                <div class="delete">x</div>
                                <div class="app_logo" style="background:url(\'apps/'.strtolower($vvv).'.jpg\')"></div>
                                <span>'.$vvv.'</span>
                            </li>';
                        }
                        echo '</li>';
                    }
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