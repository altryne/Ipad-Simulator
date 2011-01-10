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
        <script type="text/javascript" src="js/jquery.css.transform.js"></script>
<!--        <script type="text/javascript" src="js/jquery.css.rotate.js"></script>-->
        <script type="text/javascript" src="js/jquery.loadImages.1.0.1.min.js"></script>
        <script type="text/javascript">
        album = Array();
        album[0] =  ["photos/ipad_photos (1).jpg", "photos/ipad_photos (2).jpg", "photos/ipad_photos (3).jpg", "photos/ipad_photos (4).jpg", "photos/ipad_photos (5).jpg", "photos/ipad_photos (6).jpg", "photos/ipad_photos (7).jpg", "photos/ipad_photos (8).jpg", "photos/ipad_photos (9).jpg", "photos/ipad_photos (10).jpg", "photos/ipad_photos (11).jpg", "photos/ipad_photos (12).jpg", "photos/ipad_photos (13).jpg", "photos/ipad_photos (14).jpg", "photos/ipad_photos (15).jpg", "photos/ipad_photos (16).jpg", "photos/ipad_photos (17).jpg", "photos/ipad_photos (18).jpg", "photos/ipad_photos (19).jpg", "photos/ipad_photos (20).jpg", "photos/ipad_photos (21).jpg", "photos/ipad_photos (22).jpg", "photos/ipad_photos (23).jpg", "photos/ipad_photos (24).jpg", "photos/ipad_photos (25).jpg"];
        album[1] =  ["photos/ipad_photos (1).jpg", "photos/ipad_photos (2).jpg", "photos/ipad_photos (3).jpg", "photos/ipad_photos (4).jpg", "photos/ipad_photos (5).jpg", "photos/ipad_photos (6).jpg", "photos/ipad_photos (7).jpg", "photos/ipad_photos (8).jpg", "photos/ipad_photos (9).jpg", "photos/ipad_photos (10).jpg", "photos/ipad_photos (11).jpg", "photos/ipad_photos (12).jpg", "photos/ipad_photos (13).jpg", "photos/ipad_photos (14).jpg", "photos/ipad_photos (15).jpg", "photos/ipad_photos (16).jpg", "photos/ipad_photos (17).jpg", "photos/ipad_photos (18).jpg", "photos/ipad_photos (19).jpg", "photos/ipad_photos (20).jpg", "photos/ipad_photos (21).jpg", "photos/ipad_photos (22).jpg", "photos/ipad_photos (23).jpg", "photos/ipad_photos (24).jpg", "photos/ipad_photos (25).jpg"];
        album[2] =  ["photos/ipad_photos (1).jpg", "photos/ipad_photos (2).jpg", "photos/ipad_photos (3).jpg", "photos/ipad_photos (4).jpg", "photos/ipad_photos (5).jpg", "photos/ipad_photos (6).jpg", "photos/ipad_photos (7).jpg", "photos/ipad_photos (8).jpg", "photos/ipad_photos (9).jpg", "photos/ipad_photos (10).jpg", "photos/ipad_photos (11).jpg", "photos/ipad_photos (12).jpg", "photos/ipad_photos (13).jpg", "photos/ipad_photos (14).jpg", "photos/ipad_photos (15).jpg", "photos/ipad_photos (16).jpg", "photos/ipad_photos (17).jpg", "photos/ipad_photos (18).jpg", "photos/ipad_photos (19).jpg", "photos/ipad_photos (20).jpg", "photos/ipad_photos (21).jpg", "photos/ipad_photos (22).jpg", "photos/ipad_photos (23).jpg", "photos/ipad_photos (24).jpg", "photos/ipad_photos (25).jpg"];

        album_screen = true;
        $(document).ready(function(){
            $.loadImages(["img/hold.jpg","img/ajax-loader.gif"],function(){
                _temp = Array();
                $.each(album,function(i){
                    _temp[i] = '';
                    $.each(album[i],function(j){
                            _temp[i] += '<img alt="" data-src="'+album[i][j]+'"/>';
                    })
                });
                $('.album').each(function(i){
                    $(this).append($(_temp[i]));
                });
                album_cache = $('.album img');
                album_cache.each(function(i){
                    $(this).data({'left':$(this).position().left,'top':$(this).position().top});
                })
            });

        });

        $(window).load(function() {
            $.loadImages(album[0].concat(album[1],album[2]), albumLoaded());
        });
        
        $('.album img:last-child').live('mouseenter mouseleave click',function(e){
            _cache = $(this).parent().find('img');
            _top_cache = _cache.slice(-4,-1);
            switch(e.type){
                case 'mouseenter':
                    expand(_top_cache);
                break;
                case 'click':
                    expand_full(_cache);
                break;
                case 'mouseleave':
                        contract(_top_cache);
                break;
            }
        });
        function expand(obj_arr){
            if (album_screen) {
                obj_arr.each(function(i) {
                    $(this).data({'orig_rot':$(this).rotate(),'orig_pos':$(this).position()})
                        .rotate($(this).rotate()).css({'left':$(this).position().left,top:$(this).position().top})
                        .animate({
                        rotate:(Math.floor(Math.random() * 120) - 60) + 'deg',
                        left:$(this).position().left + (Math.floor(Math.random() * 60) - 10),
                        top:$(this).position().top + (Math.floor(Math.random() * 60))
                    }, 500);
                });
            }
        }
        function expand_full(obj_arr) {
            album_screen = false;
            obj_arr.each(function(i) {
                $(this).rotate($(this).rotate()).css({'left':$(this).position().left,top:$(this).position().top})
               .animate({
                    rotate:0,
                    left:$(this).data('left') + (($(this).data('left')-$(this).position().left) / 40),
                    top:$(this).data('top') + (($(this).data('top') - $(this).position().top) / 40),
                    width:98,
                    height:57
                }, 700)
                        .animate({
                    left:$(this).data('left'),
                    top:$(this).data('top')
                }, 200);
            });
        }
        function contract(obj_arr){
            if (album_screen) {
                obj_arr.each(function(i) {
                    $(this).stop().clearQueue().animate({
                        rotate:$(this).data('orig_rot'),
                        left:$(this).data('orig_pos').left,
                        top:$(this).data('orig_pos').top
                    }, 500);
                });
            }
        }

        function albumLoaded() {
            $('.album').addClass('loaded');

            _album_cache = $('.album img');
            _album_cache.each(function(i) {
                $(this).attr('src', $(this).data('src'))
                        .addClass('stacked')
                        .css({'position':'absolute'});
                _index = $(this).parent().children().index($(this));
                
                switch ($(this).parent().children().length - _index) {
                    case 3:
                        $(this).rotate('10deg');
                        break;
                    case 2:
                        $(this).rotate('-10deg');
                        break;
                    case 1:
                        $(this).addClass('main');
                        break;
                    default:
                        break;
                }
            })

            setTimeout(remove_hold,5000);
        };
        function remove_hold(){
            $("#please_hold").toggle(800);
        }
        </script>
    </head>
    <body>
    <div id="photos">
        <div id="navbar">
            
        </div>
        <div id="please_hold"></div>
        <div id="photos_cont">

            <div id="album0" class="album" data-index="0">

            </div>
            <div id="album1" class="album" data-index="1">

            </div>
            <div id="album2" class="album" data-index="1">

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