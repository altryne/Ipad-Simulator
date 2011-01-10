<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <title>Ipad simulator</title>
        <meta name="description" content="This is a jquery iPad simulator, this is only an experiment o what can be done with javascript in ast browsers">
        <meta name="keywords" content="Ipad, ipad simulator, apple ipad, alexw.me, altryne, alex wolkov, ipad javascript simulator">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="stylesheet" href="style/grid.css" type="text/css" media="screen"/>
        <link rel="stylesheet" href="style/main.css" type="text/css" media="screen"/>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
        <script>!window.jQuery && document.write(unescape('%3Cscript src="js/jquery-1.4.4.min.js"%3E%3C/script%3E'))</script>
        
        <script type="text/javascript" src="js/cookies.js"></script>
<!--        <script type="text/javascript" src="js/safari.js"></script>-->
        <script type="text/javascript">
        var cur_tab = (getCookie('tab')) ? getCookie('tab') : 0 ;
        var curr_url = [];
        var safari_user_agent = 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10';
        $(document).ready(function(){
            navigate($('#url').val());
            $('#urlgo').submit(function(){
                _url = ($('#url').val().indexOf('http://') != -1) ? $('#url').val() : 'http://'+$('#url').val() ;
                navigate(_url);
                return false;
            });
            $('#searchgo').submit(function(){
                _search = $('#search').val();
                navigate('http://www.google.com/search?q='+_search);
                return false;
            });
            $('#tabs').click(function(){
                openTabs();
            });
            $('.tab').bind('click',function(e){
            _left = $(this).offset().left;
            _top = $(this).offset().top;
            cur_tab = $(this).attr('id').replace('tab','');
            $('#navbar').animate({opacity:1},200);
            $('#browser_overlay')
//                    .css('background-image',$('#tab'+cur_tab).css('background-image'))
                    .css({'z-index':150,left:_left,top:_top,'padding-top':50}).removeClass('small')
                    .animate({
                        left:0,
                        top:0,
                        width: '100%',
                        height: 591
                        },200,'swing',function(){
                            var iframe = $('<iframe name="tab0" src="" width="100%" height="591"></iframe>').attr('src','proxy.php?url='+encodeURI($('#tab'+cur_tab).data('url'))+'&mode=native&user_agent='+safari_user_agent+'&send_cookies=1&send_session=1');
                            $('#url').val($('#tab'+cur_tab).data('url'));
                            $('#browser_overlay').append(iframe);
                        });
            });
        });
        function extractTitle(){
            cur_tab_title = $('#browser_overlay iframe').contents().find('title').html() || curr_url.replace('http://','').split('/')[0];
            $('#title').html(cur_tab_title);
            $('#tab'+cur_tab+' .tabtitle').html(cur_tab_title);

        }
        function navigate(url){
            $('#url').val(url);
            curr_url = $('#url').val();

            $('#browser_overlay iframe').attr('src','proxy.php?url='+encodeURI(url)+'&mode=native&user_agent='+safari_user_agent+'&send_cookies=1&send_session=1');

        }
        function openTabs(){

//            $('#browser_overlay').find('iframe').hide().end().css('background-image',thumb);
//            $('#tab'+cur_tab).css('background-image',thumb);
            $('#navbar').animate({opacity:0},200);
            _left = $('#tab'+cur_tab).offset().left;
            _top = $('#tab'+cur_tab).offset().top;
            $('#browser_overlay').addClass('small').animate({
                left:_left,
                top:_top,
                width: 265,
                height: 170,
                'padding-top':0
            },200,'swing',function(){
                $(this).css('z-index',50);
                $('#tab'+cur_tab).data('url',curr_url).find('iframe').attr('src','proxy.php?url='+encodeURI(curr_url)+'&mode=native&user_agent='+safari_user_agent+'&send_cookies=1&send_session=1');
                $('#browser_overlay').find('iframe').remove();
            });
        }
        </script>
    </head>
    <body>
    <div id="safari">
        <div id="navbar">
            <div id="title"> Untitled </div>
            <div id="back" class="icon">&lt;</div>
            <div id="forward" class="icon">&gt;</div>
            <div id="tabs" class="icon">0</div>
            <div id="bookmarks" class="icon">book</div>
            <div id="add" class="icon">+</div>
            <div id="urlCont">
                <form id="urlgo">
                    <input type="text" id="url" value="http://alexw.me/2011/01/ipad-simulator-in-html-and-js/"/>
                </form>
                <div id="refresh">R</div>
                <div id="stop">S</div>
            </div>
            <div id="searchCont">
                <form id="searchgo">
                    <input type="text" id="search"/>
                </form>
            </div>
        </div>
        <div id="tabs_cont">
            <div id="browser_overlay">

                <iframe src="" width="884" height="591" scrolling="no"></iframe>
            </div>
            <div id="tab0" class="tab">
                <div class="iframe_overlay"></div>
                <iframe src="" width="884" height="591" scrolling="no"></iframe>
                <div class="tabtitle">Untitled</div>
            </div>
            <div id="tab1" class="tab">
                <div class="iframe_overlay"></div>
                <iframe src="" width="884" height="591" scrolling="no"></iframe>
                <div class="tabtitle">Untitled</div>
            </div>
            <div id="tab2" class="tab">
                <div class="iframe_overlay"></div>
                <iframe src="" width="884" height="591" scrolling="no"></iframe>
                <div class="tabtitle">Untitled</div>
            </div>
            <div id="tab3" class="tab">
                <div class="iframe_overlay"></div>
                <iframe src="" width="884" height="591" scrolling="no"></iframe>
                <div class="tabtitle">Untitled</div>
            </div>
            <div id="tab4" class="tab">
                <div class="iframe_overlay"></div>
                <iframe src="" width="884" height="591" scrolling="no"></iframe>
                <div class="tabtitle">Untitled</div>
            </div>
            <div id="newtab" class="tab100">
                <div class="iframe_overlay"></div>
                <div class="tabtitle">New Page</div>
            </div>
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