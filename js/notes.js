/**
 * Created by IntelliJ IDEA.
 * User: altryne
 * Date: Jan 17, 2011
 * Time: 10:28:05 PM
 */
var fns  = {} ,
    notes = {},
    t,
    note_tpl = '<li><span class="name"></span><time class="timeago"></time></li>',
    default_notes = {
    active_note : 0,
    notes_arr :[
        {
            'title':'About this app',
            'date':"1295308437988",
            'text': "This is a simulation of the Notes app. \n" +
                    "This demo uses localstorage to store your notes, so the nex time you open, they will be here ;)\n" +
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
$('#remove_btn').live('click',function(){
    fns.removeNote();
});

$('document').ready(function(){
    //set object from localstorage, or default from notes
    notes_from_ls = fns.getObject('notes');
    notes = (notes_from_ls && notes_from_ls.notes_arr.length > 0) ? notes_from_ls : default_notes;
    $.each(notes.notes_arr,function(i,elm){

        _temp = $(note_tpl).data('id',i);
        //templating
        $('.name',_temp).html(elm.title);
        $('time',_temp).html($.timeago(new Date(+elm.date)));
        if(i == notes.active_note) {
            fns.textAreaPopulate(i);
            $(_temp).addClass('active');
        };
        _temp.appendTo('#notes_list');
    });
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


/*
 * timeago: a jQuery plugin, version: 0.9.2 (2010-09-14)
 * @requires jQuery v1.2.3 or later
 *
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2008-2010, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) return inWords(timestamp);
    else if (typeof timestamp == "string") return inWords($.timeago.parse(timestamp));
    else return inWords($.timeago.datetime(timestamp));
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "a minute",
        minute: "a minute",
        minutes: "%d minutes",
        hour: "hour",
        hours: "%d hours",
        day: "a day",
        days: "%d days",
        month: "a month",
        months: "%d months",
        year: "a year",
        years: "%d years",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
        distanceMillis = Math.abs(distanceMillis);
      }

      var seconds = distanceMillis / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 48 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.floor(days)) ||
        days < 60 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.floor(days / 30)) ||
        years < 2 && substitute($l.year, 1) ||
        substitute($l.years, Math.floor(years));

      return $.trim([prefix, words, suffix].join(" "));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      var isTime = $(elem).get(0).tagName.toLowerCase() == "time"; // $(elem).is("time");
      var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0) element.attr("title", text);
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

})(jQuery);
