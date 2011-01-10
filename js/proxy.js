/**
 * Created by IntelliJ IDEA.
 * User: Altryne
 * Date: Nov 22, 2010
 * Time: 12:40:54 AM
 * To change this template use File | Settings | File Templates.
 */

parent.extractTitle();

function load(){

    var all = document.getElementsByTagName("a");
    for (var i=0;i<all.length;i++) {
        all[i].onclick = liClickHandler;
    }

}

function liClickHandler(e)
   {
       parent.navigate(this.href);
       return false;
   }
