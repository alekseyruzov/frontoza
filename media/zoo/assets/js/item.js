/* Copyright (C) YOOtheme GmbH, http://www.gnu.org/licenses/gpl.html GNU/GPL */

!function(t){var e=function(){};e.prototype=t.extend(e.prototype,{name:"BrowseItems",initialize:function(e){this.timer=null,this.delay=1500,e.find("td.priority").each(function(){var a=t(this).find("input.value:first");a.bind("change",function(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){var a={},i=e.find("table.list:first");t.each(e.serializeArray(),function(t,e){a[e.name]=e.value}),i.addClass("loader"),t.ajax({url:e.attr("action"),type:"post",datatype:"json",data:t.extend(a,{task:"savepriority",format:"raw"}),success:function(e){i.removeClass("loader"),t.Message(e,!0)}})},this.delay)}),t(this).find("span.plus:first, span.minus:first").bind("click",function(){var e=t(this).is(".plus")?1:-1;a.val(a.val().toInt()+e).trigger("change")})})}}),t.fn[e.prototype.name]=function(){var a=arguments,i=a[0]?a[0]:null;return this.each(function(){var n=t(this);if(e.prototype[i]&&n.data(e.prototype.name)&&"initialize"!=i)n.data(e.prototype.name)[i].apply(n.data(e.prototype.name),Array.prototype.slice.call(a,1));else if(!i||t.isPlainObject(i)){var o=new e;e.prototype.initialize&&o.initialize.apply(o,t.merge([n],a)),n.data(e.prototype.name,o)}else t.error("Method "+i+" does not exist on jQuery."+e.name)})}}(jQuery),function(t){var e=function(){};e.prototype=t.extend(e.prototype,{name:"EditItem",initialize:function(e){t.each(["apply","save","sav-new"],function(a,i){t("#toolbar-"+i+" a, #toolbar-"+i+" button").bind("validate.adminForm",function(t){""==e.find('input[name="name"]').val()&&(e.find("span.message-name").css("display","block"),t.preventDefault())})});var a=t("#categories"),i=t("#paramsprimary_category");a.bind("change",function(){var e=t(this).val()?t(this).val():[],a=i.val();-1==t.inArray(a,e)&&i.val(e.length?e.shift():""),i.trigger("liszt:updated")}),i.bind("change",function(){var e=a.val()?a.val():[],i=t(this).val();-1==t.inArray(i,e)&&(e.push(i),a.val(e),a.trigger("liszt:updated"))}),e.find("div.element").each(function(){t(this).delegate("div.more-options div.trigger div.button","click",function(){var e=t(this).closest("div.more-options"),a="show-"+t(this).attr("class").split(" ").shift();e.hasClass(a)?e.attr("class","more-options"):e.attr("class","more-options "+a)}).find("div.row > input:text").placeholder()})}}),t.fn[e.prototype.name]=function(){var a=arguments,i=a[0]?a[0]:null;return this.each(function(){var n=t(this);if(e.prototype[i]&&n.data(e.prototype.name)&&"initialize"!=i)n.data(e.prototype.name)[i].apply(n.data(e.prototype.name),Array.prototype.slice.call(a,1));else if(!i||t.isPlainObject(i)){var o=new e;e.prototype.initialize&&o.initialize.apply(o,t.merge([n],a)),n.data(e.prototype.name,o)}else t.error("Method "+i+" does not exist on jQuery."+e.name)})}}(jQuery);