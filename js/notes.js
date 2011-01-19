/**
 * Created by IntelliJ IDEA.
 * User: altryne
 * Date: Jan 17, 2011
 * Time: 10:28:05 PM
 */
var fns  = {} ,
    notes = {},
    t,
    note_tpl = '<li><span class="name"></span><time class="timeago"></time><span class="search_str"></span></li>',
    default_notes = {
    active_note : 0,
    notes_arr :[
        {
            'title':'About this app',
            'date':"1295308437988",
            'text': "This is a simulation of the Notes app. \n" +
                    "This demo uses localstorage to store your notes, so the next time you open it, they will be here ;)\n" +
                    "If you want to store your notes, click \"allow\" when your browser prompts you."
        }
        ,{
            'title':'Working apps',
            'date':"1295308434988",
            'text': "working apps :\n\n - safari \n\n - google maps \n\n - everytimezone \n\n - notes"
        }
    ]
};
$('#notes_list li').live('click',function(){
    $('#note_area').focusout();
    fns.textAreaPopulate(+$(this).data('id'),this);    
});
$('#note_area').live('change keyup keydown focusout',function(evt){
    notes.notes_arr[notes.active_note].text = this.value;
    notes.notes_arr[notes.active_note].title = this.value.substring(0,17);
    $('.active .name,#main_title').removeClass('default').html(notes.notes_arr[notes.active_note].title);
    //update only if textarea has value, else remove
    if(this.value != ''){
        //setTimeout to only save after user is done typing
        clearTimeout(t);
        t = setTimeout(fns.updateLocalStorage,500);
    }else if(this.value == '' && evt.type != 'focusout'){
        $('.active .name,#main_title').html('New note').addClass('default');
    }
    else if(evt.type == 'focusout'){
        fns.removeNote();
    }
});

$('#add_btn').live('click',function(){
    fns.addNewNote();
});
$('#remove_btn.enabled').live('click',function(){
    var b = confirm ('Delete this note?');
    if(b) fns.removeNote();
});
$('#prev.enabled').live('click',function(){
    fns.textAreaPopulate(notes.active_note - 1);
});
$('#next.enabled').live('click',function(){
    fns.textAreaPopulate(notes.active_note + 1);
});
$('#text').live('focusin focusout keyup keydown',function(e){
    switch(e.type){
        case 'keyup':
        case 'keydown':
                if(this.value != ''){
                    $('#notes_list').addClass('filtered');
                    $('#number').html($('#notes_list li.show').length);
                }else{
                    $('#notes_list').removeClass('filtered');
                    $('#number').html($('#notes_list li').length);
                }
        break;
        case 'focusout':
        default:
                $('#notes_list').removeClass('filtered');
        break;
    }
});

$('document').ready(function(){
    //set object from localstorage, or default from notes
    notes_from_ls = fns.getObject('notes');
    notes = (notes_from_ls && notes_from_ls.notes_arr.length > 0) ? notes_from_ls : default_notes;
    if(notes.active_note > (notes.notes_arr.length - 1) ) notes.active_note = 0;
    $.each(notes.notes_arr,function(i,elm){
        _temp = $(note_tpl).data('id',i);
        //templating
        $('.name',_temp).html(elm.title);
        $('time',_temp).html($.timeago(new Date(+elm.date)));
        $('.search_str',_temp).html(elm.text);
        if(i == notes.active_note) {
            fns.textAreaPopulate(i);
            $(_temp).addClass('active');
        };
        _temp.appendTo('#notes_list');
    });
    $('#text').liveUpdate($('#notes_list'));
    $('#number').html(notes.notes_arr.length);
    note_list = new iScroll('notes_list', {
		momentum:true,
        desktopCompatibility:true,
		hScrollbar:true
	 });

});

//helper functions
fns.addNewNote = function(){
    var d = new Date();
    var temp = {'title':'New Note',date:d.getTime(),text:''};
    var obj = $(note_tpl);
    var newLength= notes.notes_arr.unshift(temp);
    $('.name',obj).html(temp.title);
    $('time',obj).html($.timeago(new Date(+temp.date)));
    obj.data('id',0).css('height',0).prependTo('#notes_list').animate({'height':36},500,function(){
        fns.refreshIDs();
        fns.textAreaPopulate(0);
        $('#number').html(notes.notes_arr.length);
    });
};
fns.removeNote = function(id){
    var _id = (id !== undefined)? id : notes.active_note;
    $('#notes_list li').eq(_id).animate({'height':0},500,function(){
        $(this).remove();
        notes.notes_arr.remove(_id);
        default_notes.active_note = 0;
        fns.refreshIDs();
        fns.textAreaPopulate();
        $('#number').html(notes.notes_arr.length);
    });
    //remove value from array - http://snipplr.com/view/14381/remove-item-from-array-with-jquery/
};
fns.updateLocalStorage = function(){
    fns.setObject('notes',notes);
};
fns.refreshIDs = function(){
    $('#notes_list li').each(function(i){
       $(this).data('id',i);
    });
};
fns.updateBtns = function(){
    $('#prev,#next,#remove_btn').removeClass('enabled');
    if(notes.notes_arr.length > 1){
        $('#remove_btn').addClass('enabled');
    }
    if(notes.active_note >0 && notes.notes_arr.length > 1){
        $('#prev').addClass('enabled');
    }
    if(notes.active_note < (notes.notes_arr.length-1) && notes.notes_arr.length > 1){
        $('#next').addClass('enabled');
    }
};
fns.textAreaPopulate = function(id,elm){
    var _id = id || default_notes.active_note;
    notes.active_note = _id;
    $('#note_area').attr('value',notes.notes_arr[_id].text).focus();
    $('#main_title').html(notes.notes_arr[_id].title);
    var d = new Date(+notes.notes_arr[_id].date);
    $('#relative_date').html($.timeago(d));
    $('#date_time').html(d.toLocaleDateString() +' '+  d.getDate());
    $('#notes_list li').eq(_id).addClass('active').siblings().removeClass('active');
    fns.updateLocalStorage();
    fns.updateBtns();
};
fns.setObject = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
fns.getObject = function(key) {
    return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
