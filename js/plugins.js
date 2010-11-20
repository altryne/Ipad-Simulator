
// qs_score - Quicksilver Score
//
// A port of the Quicksilver string ranking algorithm
//
// "hello world".score("axl") //=> 0.0
// "hello world".score("ow") //=> 0.6
// "hello world".score("hello world") //=> 1.0
//
// Tested in Firefox 2 and Safari 3
//
// The Quicksilver code is available here
// http://code.google.com/p/blacktree-alchemy/
// http://blacktree-alchemy.googlecode.com/svn/trunk/Crucible/Code/NSString+BLTRRanking.m
//
// The MIT License
//
// Copyright (c) 2008 Lachie Cox
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


String.prototype.score = function(abbreviation,offset) {
  offset = offset || 0 // TODO: I think this is unused... remove

  if(abbreviation.length == 0) return 0.9
  if(abbreviation.length > this.length) return 0.0

  for (var i = abbreviation.length; i > 0; i--) {
    var sub_abbreviation = abbreviation.substring(0,i)
    var index = this.indexOf(sub_abbreviation)


    if(index < 0) continue;
    if(index + abbreviation.length > this.length + offset) continue;

    var next_string       = this.substring(index+sub_abbreviation.length)
    var next_abbreviation = null

    if(i >= abbreviation.length)
      next_abbreviation = ''
    else
      next_abbreviation = abbreviation.substring(i)

    var remaining_score   = next_string.score(next_abbreviation,offset+index)

    if (remaining_score > 0) {
      var score = this.length-next_string.length;

      if(index != 0) {
        var j = 0;

        var c = this.charCodeAt(index-1)
        if(c==32 || c == 9) {
          for(var j=(index-2); j >= 0; j--) {
            c = this.charCodeAt(j)
            score -= ((c == 32 || c == 9) ? 1 : 0.15)
          }

          // XXX maybe not port this heuristic
          //
          //          } else if ([[NSCharacterSet uppercaseLetterCharacterSet] characterIsMember:[self characterAtIndex:matchedRange.location]]) {
          //            for (j = matchedRange.location-1; j >= (int) searchRange.location; j--) {
          //              if ([[NSCharacterSet uppercaseLetterCharacterSet] characterIsMember:[self characterAtIndex:j]])
          //                score--;
          //              else
          //                score -= 0.15;
          //            }
        } else {
          score -= index
        }
      }

      score += remaining_score * next_string.length
      score /= this.length;
      return score
    }
  }
  return 0.0
}

//live update http://ejohn.org/blog/jquery-livesearch/
jQuery.fn.liveUpdate = function(list){
	list = jQuery(list);
    
	if ( list.length ) {
		var rows = list.children('li'),
        cache = rows.map(function(){
				return $(this).children('.search_str').html().toLowerCase();
			});

		this
			.keyup(filter).keyup()
			.parents('form').submit(function(){
				return false;
			});
	}

	return this;

	function filter(){
		var term = jQuery.trim( jQuery(this).val().toLowerCase() ), scores = [];

		if ( !term ) {
			jQuery('#search_result_wrapper').fadeOut(100);
			jQuery('#whiteSep,#noResults').fadeOut(0);

        } else {
            jQuery('#search_result_wrapper').fadeIn(100);


			rows.removeClass('odd show');

			cache.each(function(i){
				var score = this.score(term);
				if (score > 0) { scores.push([score, i]); }
			});
            jQuery.each(scores.sort(function(a, b){return b[0] - a[0];}), function(index){
                jQuery(rows[ this[1] ]).addClass('show');
            });
            //            give odd class to each odd

            jQuery('.show').each(function(index){
                if(index % 2) jQuery(this).removeClass('odd').addClass('odd');
            });
            if(jQuery('.show').length){
                $('#whiteSep').fadeIn(100);
                $('#noResults').fadeOut(0);
            }else{
                $('#noResults').fadeIn(100);
                $('#whiteSep').fadeOut(0);
            }
		}
	}
};


/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


function itouch_event_handler (e) {
    var touches = e.changedTouches,
      first = e.touches[0],
      type = '';

    switch (e.type) {
      case 'touchstart':  type='mousedown'; break;
      case 'touchmove':   type='mousemove'; break;
      case 'touchend':    type='mouseup';   break;
      default: return;
    }

    //initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //           screenX, screenY, clientX, clientY, ctrlKey,
    //           altKey, shiftKey, metaKey, button, relatedTarget);
    var se = document.createEvent('MouseEvent');
    se.initMouseEvent(type, true, true, window, 1,
                      first.screenX, first.screenY,
                      first.clientX, first.clientY,
                      false, false, false, false,
                      0/*left*/, null);
    first.target.dispatchEvent(se);
    e.preventDefault();
    return;
  }

  $(function() {
    document.documentElement.style.webkitTouchCallout = 'none';
    document.documentElement.addEventListener('touchstart',  itouch_event_handler, true);
    document.documentElement.addEventListener('touchmove',   itouch_event_handler, true);
    document.documentElement.addEventListener('touchend',    itouch_event_handler, true);
    document.documentElement.addEventListener('touchcancel', itouch_event_handler, true);
		$("#sortable").sortable();
		$("#sortable").disableSelection();
    return;
  });


jQuery.log = function (msg) {
  console.log("%s: %o", msg, this);
  return this;
};

jQuery.extend({
	random: function(X) {
	    return Math.floor(X * (Math.random() % 1));
	},
	randomBetween: function(MinV, MaxV) {
	  return MinV + jQuery.random(MaxV - MinV + 1);
	}
});

