/**
 * Created by IntelliJ IDEA.
 * User: Altryne
 * Date: Nov 20, 2010
 * Time: 4:55:41 AM
 * To change this template use File | Settings | File Templates.
 */

var intervall = 0;
var can_run_apps = false;
var tick;
var doubleclickthreshhold = 200;
var isDblClick = false;
var canScroll = true;
var active_app = '';

$('.page .delete,#dock .delete').live('click', function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    if(confirm('Are you sure you want to delete this app from you iPad?')){
        $(this).parent().css({'width':74,'height':99}).children('.delete, span').hide();
        $(this).siblings('.app_logo')
                .stop()
                .css('position','absolute')
                .animate({left:"50%",width:1,top:"50%",height: 1},'easeInQuint',function(){$(this).parent().remove()})
    }
});
$('#multitask_bar .delete').live('mousedown ', function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
        $(this).parent().css({'width':74,'height':99}).children('.delete, span').hide();
        $(this).siblings('.app_logo')
                .stop()
                .css('position','absolute')
                .animate({left:"50%",width:1,top:"50%",height: 1},'easeInQuint',function(){
                _id = $(this).parent().attr('id');
                $('#'+_id+'_app').remove();
                $(this).parent().remove();
                if(!$('#multitask_bar li').length){
                    closeMultitask(200);
                }
        })
});

$('.page.apps li,#dock li').live('mousedown mouseup', function(event) {
    if (event.type == 'mousedown') {
        $(this).addClass('mousedown');
        if (!$('#drag').is('.ui-draggable-dragging') && !$('body').is('.editMode')) {
            can_run_apps = true;
            intervall = setTimeout("edit_mode()", '2000');
        }
        
    } else {
        $(this).removeClass('mousedown');
        clearTimeout(intervall);
        if(!can_run_apps)
            clearTimeout(intervall);
        else if((!$('#drag').is('.ui-draggable-dragging') && !$('body').is('.editMode') && !$('body').is('.multitaskMode'))){
            launchApp($(this).attr('id'));
        }
    }
});

$('#search_result li.show').live('click',function(){
    can_run_apps = true;
    var _id = $(this).find('.search_str').html();
    launchApp(_id);
});

$('#multitask_bar li').live('mousedown mouseup', function(event) {
    if (event.type == 'mousedown') {
        $(this).addClass('mousedown');
        if (!$('#multitask_bar').is('.editMode')) {
            can_run_apps = true;
            intervall = setTimeout("multitask_edit_mode()", '2000');
        }

    } else {
        $(this).removeClass('mousedown');
        clearTimeout(intervall);
        if(!can_run_apps)
            clearTimeout(intervall);
        else if(!$('#multitask_bar').is('.editMode')){
             switchApps($(this).attr('id'));
            if(!$('#window').is('.out')){
                can_run_apps = true;
                closeMultitask(0);
                launchApp($(this).attr('id'));
            }
        }
    }
});


$('#slider').live('mousedown mouseup', function(event) {
    if (event.type == 'mousedown') {
        $('#slide_here').css('background-position','1500px 1500px');
    } else {
        $('#slide_here').css('background-position','right 50%');
    }
});

$('#home').live('click',function(e){
    b = setTimeout('homeBtnClick()',doubleclickthreshhold);
});
$('#home').live('dblclick',homeBtnDClick);

$('#content').live('click',function(e){
    if($('body').is('.multitaskMode')){
        closeMultitask();
    }
});
$('#sleep').live('click',function(){
   $('#lockscreen').addClass('hidden').addClass('asleep').show();
   $('#content').addClass('hide_spring');
});

function updateClock(){
    var currentDate = new Date();
    datestring = addZero(currentDate.getHours()) + ':' + addZero(currentDate.getMinutes());
    $('.time').html(datestring);
}
function addZero(num){
        return (num<10)?num="0"+num:num;
}

//        ####### document ready $$$$$$$$$$$
$(document).ready(function(){
    _page = 1;
    _pages = $('ul.page').length;
    reflectDock();

//            _page=1; unlockSpring(); slideToPage(1); can_run_apps = true; launchApp('notes'); //temporary - todo:remove this

//            create elements in quick search
    $('.page.apps li,#dock li').each(function(){
       if($(this).attr('id') != ''){
         _img = $('.app_logo',this).css('background-image').replace('"','\'');
        _elm = $('<li><div class="app_logo" style="background-image:'+_img+'"></div><span class="search_str">' +$(this).attr('id')+ '</span> </li>');
        _elm.appendTo('#search_result');
         //launch app from hash
           if('#!'+$(this).attr('id') == window.location.hash){
               can_run_apps =  true;
               launchApp($(this).attr('id'));
           }
       }
    });

    $('#search').liveUpdate($('#search_result'));
    $('#search_result').draggable({axis:'y',distance:20,revert:'invalid'});

    tick = setInterval('updateClock()', 1000 );
    $('#slider').draggable({axis:'x',containment: 'parent',revert:'invalid'})

    $('#drop').droppable({
        drop: unlockSpring
    });
    $('#drag').draggable({
            axis: 'x',
            distance: 20,
            start:function(){
                window['_dragStart'] = $('#drag').css('left');
            },
            stop:function(){
                window['_dragEnd'] = $('#drag').css('left');
                if(parseInt(window['_dragStart']) <  parseInt(window['_dragEnd'])){
                    if(_page > 0){
                        slideToPage(_page - 1);
                    }else{
                        slideToPage(_page);
                    }
                }else{
                    if(_page < _pages){
                        slideToPage(_page + 1);
                    }else{
                        slideToPage(_page);
                    }
                }

            }
    });
        //add left and right keys to navigate to pages for convenience
        $(document).keydown(function(e){
            if(e.keyCode == 39){
                slideToPage(_page+1);
            }else if(e.keyCode == 37){
                slideToPage(_page-1);
            }
        });
 });

function slideToPage(page){
    if(canScroll && page >= 0 && page <= _pages){
        canScroll = false; $('#drag').draggable('disable');
        $('#pages li').removeClass('active').eq(page).addClass('active');
        if(page == 0){
            $('#black,.corner').animate({opacity:1},300,"easeOutQuad",function(){$('#search').focus();});
        }
        else{
            $('#black,.corner').animate({opacity:0},100,"easeOutQuad");
        }
        $('#general_wrap').scrollTo('#page'+page,800,{
            "easing":'easeOutQuint',
            onAfter : function(){
                canScroll = true;
                $('#drag').draggable('enable');
                _page = page;
            }

        });

    }
};
function unlockSpring() {
    $('#general_wrap').scrollTo('#page'+1,0);
    $('#lockscreen').addClass('hidden').delay(200).fadeOut();
    $('#content').removeClass('hide_spring');
    $('#slider').css('left', 0);
    animateDock('in');
}
function homeBtnClick(){
    if(isDblClick) return;
    if($('.asleep').length){
        $('.asleep').removeClass('asleep').removeClass('hidden');
    }
    if($('body').hasClass('multitaskMode')){
       closeMultitask();
    }else if($('body').hasClass('editMode')){
        //destroy sortable
        $('body').removeClass('editMode');
        $('.apps').sortable('destroy');
    }else if($('#window').is('.out')){
        closeApp();
    }
    else{
        $('#drag').css('left',0);
        slideToPage(1); //go back home
    }
};
function homeBtnDClick(){
    isDblClick = true;
    if($('.asleep').length){
        isDblClick = false;    
    }
    openMultitaskBar();
    //clear dblclick
    t = setTimeout("isDblClick = false;",200);
    return false;
};
function edit_mode(){
        can_run_apps = false;
        clearTimeout(intervall);

        $('body').addClass('editMode');
        $('.apps').sortable({
            revert : true,
            handle : '.app_logo',
            connectWith: '.apps',
            appendTo: '#content',
            helper: 'clone',
            distance: 0,
            over: function(event, ui) {
              if($(ui.placeholder).parents('#drag').length)
                slideToPage($('#drag ul').index($(ui.placeholder).parent()));
            },
            change: function(event, ui){
                $(ui.placeholder).animate({width:75,'margin-right':50,'margin-left':50},150);
            },
            start: function(event, ui) {
                $(ui.placeholder).animate({width:1,'margin-right':0,'margin-left':0,overflow:'hidden'},150);
            },
            stop: function(event, ui) {
                reflectDock();
                $(ui.item).removeClass('mousedown');
            }
        });

    window.clearInterval(intervall);
};
function multitask_edit_mode(){
    can_run_apps = false;
    clearTimeout(intervall);
    $('#multitask_bar').addClass('editMode');
}
function openMultitaskBar(){
    can_run_apps = false;
    if($('#window').is('.out')){ //hide current runnig app from multitask bar
        $('#multitask_bar #'+active_app).hide().siblings().show();
    }else{
        $('#multitask_bar li').show();
    }
    $('#content').animate({'bottom':120},200);
    $('.page,#dock').animate({'opacity':0.5},200);
    $('.topbar, #pages').fadeOut(200);
    $('body').addClass('multitaskMode');
    
};
function closeMultitask(ms){
    var speed = ms || 200
    $('#content').removeClass('multitask').animate({'bottom':0},speed);
    $('.page,#dock').animate({'opacity':1},speed);
    $('.topbar, #pages').fadeIn(speed);
    $('body').removeClass('multitaskMode');
    $('#multitask_bar').removeClass('editMode');

};
//css "reflection" hehe
function reflectDock(){
    $('.reflection').remove();
    $('#dock li .app_logo').each(function(){
        $(this).clone().addClass('reflection').appendTo($(this).parent());
    })
}
//define custom animation based on app icon location. so Icons spead out like in iOS
function animateDock(mode){
    $('#page'+_page+'.apps li').each(function(){
        _origLeft = $(this).position().left;
        _origTop = $(this).position().top;
        switch(_origLeft){
            case 0:
            case -200:
                _newLeft = -200;
            break;
            case 174:
            case -250:
                _newLeft = -250;
            break;
            case 348:
            case 0:
                _newLeft = 0;
            break;
            case 522:
            case 250:
                _newLeft = 250;
            break;
            case 696:
            case 200:
                _newLeft = 200;
            break;
        }
        switch(_origTop){
            case 10:
            case -200:
                _newTop = -200;
            break;
            case 139:
            case -250:
                _newTop = -250;
            break;
            case 268:
            case 250:
                _newTop = +250;
            break;
            case 397:
            case 200:
                _newTop = +200;
            break;
        }

        switch(mode)
        {
            case 'in':
                $(this)
                .css({'left':(_newLeft),'top':(_newTop),'position':'relative'})
                .animate({'left':0,'top':0},500,'easeOutQuad');
            break;
            case 'outin':
                $(this)
                .animate({'left':0,'top':0},500,'easeOutQuad');
            break;
            default:
                 $(this).css({'position':'relative'})
                .animate({'left':(_newLeft),'top':(_newTop)},500,'easeOutQuad');
            break;
        }
    })
    switch(mode)
        {
            case 'out':
                $('#dock,#pages')
                .animate({'bottom':-120},500,'easeOutQuad');
            break;
            case 'in':
            case 'outin':
                $('#dock').animate({'bottom':0},500,'easeOutQuad');
                $('#pages').animate({'bottom':120},500,'easeOutQuad');
            break;
    }
}
function switchApps(app_id){
    if(app_id == active_app) return false;
    closeMultitask(0);
    $('#'+active_app+'_app').addClass('flip_top');
    $('#'+app_id+'_app').addClass('flip_bottom');
    var div = $('#'+active_app+'_app')[0];
    $(div).bind('webkitAnimationEnd', function(){
        $('#'+app_id+'_app').removeClass('flip_bottom').addClass('onFront').siblings().removeClass('flip_top onFront');
        $('#iframe_holder iframe').unbind('webkitAnimationEnd');
    }, false);
    if(!$.browser.webkit){
        $('#'+app_id+'_app').removeClass('flip_bottom').addClass('onFront').siblings().removeClass('flip_top onFront');
        $('#iframe_holder iframe').unbind('webkitAnimationEnd');
    }
    active_app = app_id;
}

function closeApp(){
    $('#iframe_holder').css({'opacity':0,'display':'none'});
    $('#window').removeClass('out').stop().html('').animate({left:"50%",width:1,top:"50%",height: 1,opacity:0},'easeInQuint',function(){

    });
    animateDock('outin');
    $('.topbar').removeClass('inapp');
    window.location.hash = "#spring";
}
function launchApp(app_id){
    if(!can_run_apps) return false;
    if(app_id == 'Safari'){
        flag = confirm("!! important !! in order to simulate a browser in browser, I'm parsing all websites you may try to access, please DO NOT post any personal info via this simulator! (your browser may warn you about this site being reported phishing attac, this is because I use techniques that may be used for harm, again DO NOT POST any PERSONAL info!");
        if(!flag) return false;
    }
    animateDock('out');
    _appToLaunch = '?appid='+app_id || null;
    $('#window').addClass('out')
            .stop()
            .animate({left:"0%",width:885,top:"0%",height:662,opacity:1},'easeInQuint',function(){
                $('#iframe_holder').css({'opacity':1,'display':'block'});
                //cehck if multitasked
                if(!$('#'+app_id+'_app').length){
                    $('#iframe_holder iframe').removeClass('onFront');
                    $('#iframe_holder').append('<iframe id="'+app_id+'_app" class="app_iframe" src="app.html'+_appToLaunch+'" scrolling="no" width="884" height="641"></iframe>');
                    $('#'+app_id+'_app').addClass('onFront');
                    $('#'+app_id).clone().prependTo('#multitask_bar ul').find('.delete').html('&ndash;');
                    if($('#multitask_bar li').length > 4){
                        $('#multitask_bar li').last().remove();
                    }
                }else{
                     $('#'+app_id+'_app').addClass('onFront').siblings().removeClass('onFront');
                     $('#multitask_bar #'+app_id).prependTo('#multitask_bar ul');
                }
            });
    active_app = app_id;
    window.location.hash = "!"+active_app;
    $('.topbar').addClass('inapp');
}
