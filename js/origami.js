
var album = Array()
    album_quota = 30
    ,active_slide = 0
    ,tags_arr = ["sea","sunset","sunrise"]
    ,flickr_api_key = 'ed4466c173767ffe7adb18e99944ef26'
    ,horizontal_imgs = []
    ,vertical_imgs = []
    ,origami_templates = ["tpl_1","tpl_2","tpl_3","tpl_4","tpl_5","tpl_6","tpl_7","tpl_8"];
$(document).ready(function(){
    url = "http://api.flickr.com/services/rest/?format=json&sort=random&method=flickr.photos.search&tags="+tags_arr.join(',')+"&tag_mode=all&per_page="+album_quota+"&api_key="+flickr_api_key+"&jsoncallback=?";
    $.getJSON(url,function(data){

        $.each(data.photos.photo, function(i,item){
           album.push("http://farm"+item.farm+".static.flickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_b.jpg");
            if((i+1) == data.photos.photo.length){
                $.loadImages(album,function(img){pictures_ready(img)});
            }
        });
    });
});
function pictures_ready(img){
    $('#images').append(img);
    $('#images img').each(function(){
        if($(this).width() >= $(this).height()){
            horizontal_imgs.push(this);
        }else{
            vertical_imgs.push(this);
        }
    });
    prepareCanvas()
}

function prepareCanvas(){
    $.each(origami_templates,function(i,tpl){
        $('#tpl').clone().attr('id','canvas_'+i).appendTo('#canvas_area');
        can = $('#canvas_'+i)[0].getContext("2d");
        switch(tpl){
            case 'tpl_1':
            default:
                can.drawImage(rnd_img(), 0, 0, 400, 600, 0, 0, 400, 600);
                can.drawImage(rnd_img(), 0, 0, 400, 600, 400, 0, 400, 600);
            break;
            case 'tpl_2':
                can.drawImage(rnd_img(), 0, 0, 400, 300, 0, 0, 400, 300);
                can.drawImage(rnd_img(), 0, 0, 400, 300, 0, 300, 400, 300);
                can.drawImage(rnd_img(), 0, 0, 400, 600, 400, 0, 400, 600);
            break;
            case 'tpl_3':
                can.drawImage(rnd_img(), 0, 0, 600, 600, 0, 0, 600, 600);
                can.drawImage(rnd_img(), 0, 0, 200, 300, 600, 0, 200, 300);
                can.drawImage(rnd_img(), 200, 200, 200, 300, 600, 300, 200, 300);
            break;
            case 'tpl_4':
                can.drawImage(rnd_img(), 0, 0, 400, 600, 0, 0, 400, 600);
                can.drawImage(rnd_img(), 0, 0, 400, 300, 400, 0, 400, 300);
                can.drawImage(rnd_img(), 0, 0, 400, 300, 400, 300, 400, 300);
            break;
            case 'tpl_5':
                can.drawImage(rnd_img(), 200, 0, 200, 600, 0, 0, 200, 600);
                can.drawImage(rnd_img(), 200, 0, 200, 600, 200, 0, 200, 600);
                can.drawImage(rnd_img(), 200, 0, 200, 600, 400, 0, 200, 600);
                can.drawImage(rnd_img(), 200, 0, 200, 600, 600, 0, 200, 600);
            break;
            case 'tpl_6':
                can.drawImage(rnd_img(), 200, 0, 600, 600, 0, 0, 600, 600);
                can.drawImage(rnd_img(), 0, 300, 200, 200, 600, 0, 200, 200);
                can.drawImage(rnd_img(), 100, 300, 200, 200, 600, 200, 200, 200);
                can.drawImage(rnd_img(), 150, 200, 200, 200, 600, 400, 200, 200);
            break;
            case 'tpl_7':
                can.drawImage(rnd_img(), 200, 0, 600, 300, 0, 0, 600, 300);
                can.drawImage(rnd_img(), 0, 300, 200, 300, 600, 0, 200, 300);
                can.drawImage(rnd_img(), 0, 300, 300, 300, 0, 300, 300, 300);
                can.drawImage(rnd_img(), 0, 300, 500, 300, 300, 300, 500, 300);

            break;
        }
    });
    $('#canvas_'+active_slide).addClass('active').siblings().removeClass('active');
    setTimeout(animate1(),1000);
}
function rnd_img(){
        return horizontal_imgs.shift();
//      return horizontal_imgs[Math.round(Math.random()*horizontal_imgs.length)] || horizontal_imgs[Math.round(Math.random()*horizontal_imgs.length)];
}
function animate1(){
    //select random "next" slide" to copy and animate
    next_slide_id = Math.round(Math.random()*$('#canvas_area canvas').length);
    next_slide = $('#canvas_area canvas').not('.active').eq(next_slide_id)[0];
    tmp_1 = $('#tpl').clone().attr({'width':400,'class':'temp_canvas','id':''}).appendTo('#canvas_area');
    tmp_2 = $('#tpl').clone().attr({'width':400,'class':'temp_canvas','id':''}).appendTo('#canvas_area');
    try{
        var can = tmp_1[0].getContext("2d");
        var can2 = tmp_2[0].getContext("2d");
        can.drawImage(next_slide, 0, 0);
        can2.drawImage(next_slide, 400, 0, 400, 600, 0, 0, 400, 600);
    }catch(e){
        animate1();
    }
    $(tmp_1).addClass('expand');
    $(tmp_2).addClass('expand_slide');
    $('#canvas_'+active_slide).addClass('slide_right').unbind('webkitAnimationEnd').bind('webkitAnimationEnd',function(){
            $(this).removeClass('slide_right');
            $(tmp_1).remove();
            $(tmp_2).remove();
            bringToFront(next_slide_id + 1);
//            setTimeout('animate2()',1000);
    });
}
function animate2(){
    //select random "next" slide" to copy and animate
    next_slide_id = Math.round(Math.random()*$('#canvas_area canvas').length);
    next_slide = $('#canvas_area canvas').not('.active').eq(next_slide_id)[0];
    this_slide = $('#canvas_area canvas.active')[0];
    tmp_1 = $('#tpl').clone().attr({'width':400,'class':'temp_canvas','id':''}).appendTo('#canvas_area');
    tmp_2 = $('#tpl').clone().attr({'width':400,'left':400,'class':'temp_canvas','id':''}).appendTo('#canvas_area');
    try{
        var can = tmp_1[0].getContext("2d");
        var can2 = tmp_2[0].getContext("2d");
        can.drawImage(this_slide, 0, 0);
        can2.drawImage(this_slide, 400, 0, 400, 600, 0, 0, 400, 600);
    }catch(e){
        animate2();
    }
        $(tmp_1).addClass('contract_slide');
    $(tmp_2).addClass('contract');
    bringToFront(next_slide_id);
    $('#canvas_'+next_slide_id).addClass('slide_right_from_minus').unbind('webkitAnimationEnd').bind('webkitAnimationEnd',function(){
            $(this).removeClass('slide_right_from_minus');
            $(tmp_1).remove();
            $(tmp_2).remove();
    });
}

function bringToFront(next_active){
    $('#canvas_'+next_active).addClass('active').siblings().removeClass('active');
}
(function(c) {
    var h = [];
    c.loadImages = function(a, d) {
        a instanceof Array || (a = [a]);
        for (var e = a.length,f = 0,g = e; g--;) {
            var b = document.createElement("img");
            b.onload = function() {
                f++;
                f >= e && c.isFunction(d) && d(h)
            };
            b.src = a[g];
            h.push(b)
        }
    }
})(jQuery);