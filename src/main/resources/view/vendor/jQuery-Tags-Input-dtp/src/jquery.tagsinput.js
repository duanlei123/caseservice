!function(t){var a=new Array,e=new Array;t.fn.doAutosize=function(a){var e=t(this).data("minwidth"),i=t(this).data("maxwidth"),n="",u=t(this),o=t("#"+t(this).data("tester_id"));if(n!==(n=u.val())){var r=n.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");o.html(r);var d=o.width(),s=d+a.comfortZone>=e?d+a.comfortZone:e,l=u.width(),p=s<l&&s>=e||s>e&&s<i;p&&u.width(s)}},t.fn.resetAutosize=function(a){var e=t(this).data("minwidth")||a.minInputWidth||t(this).width(),i=t(this).data("maxwidth")||a.maxInputWidth||t(this).closest(".tagsinput").width()-a.inputPadding,n=t(this),u=t("<tester/>").css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:n.css("fontSize"),fontFamily:n.css("fontFamily"),fontWeight:n.css("fontWeight"),letterSpacing:n.css("letterSpacing"),whiteSpace:"nowrap"}),o=t(this).attr("id")+"_autosize_tester";!t("#"+o).length>0&&(u.attr("id",o),u.appendTo("body")),n.data("minwidth",e),n.data("maxwidth",i),n.data("tester_id",o),n.css("width",e)},t.fn.addTag=function(i,n){return n=jQuery.extend({focus:!1,callback:!0},n),this.each(function(){var u=t(this).attr("id"),o=t(this).val().split(a[u]);if(""==o[0]&&(o=new Array),i=jQuery.trim(i),n.unique){var r=t(this).tagExist(i);1==r&&t("#"+u+"_tag").addClass("not_valid")}else var r=!1;if(""!=i&&1!=r){if(t("<span>").addClass("tag").append(t("<span>").text(i).append("&nbsp;&nbsp;"),t("<a>",{href:"#",title:"Removing tag",text:"x"}).click(function(){return t("#"+u).removeTag(escape(i))})).insertBefore("#"+u+"_addTag"),o.push(i),t("#"+u+"_tag").val(""),n.focus?t("#"+u+"_tag").focus():t("#"+u+"_tag").blur(),t.fn.tagsInput.updateTagsField(this,o),n.callback&&e[u]&&e[u].onAddTag){var d=e[u].onAddTag;d.call(this,i)}if(e[u]&&e[u].onChange){var s=o.length,d=e[u].onChange;d.call(this,t(this),o[s-1])}}}),!1},t.fn.removeTag=function(n){return n=unescape(n),this.each(function(){var u=t(this).attr("id"),o=t(this).val().split(a[u]);for(t("#"+u+"_tagsinput .tag").remove(),str="",i=0;i<o.length;i++)o[i]!=n&&(str=str+a[u]+o[i]);if(t.fn.tagsInput.importTags(this,str),e[u]&&e[u].onRemoveTag){var r=e[u].onRemoveTag;r.call(this,n)}}),!1},t.fn.tagExist=function(e){var i=t(this).attr("id"),n=t(this).val().split(a[i]);return jQuery.inArray(e,n)>=0},t.fn.importTags=function(a){var e=t(this).attr("id");t("#"+e+"_tagsinput .tag").remove(),t.fn.tagsInput.importTags(this,a)},t.fn.tagsInput=function(i){var u=jQuery.extend({interactive:!0,defaultText:"add a tag",minChars:0,width:"300px",height:"100px",autocomplete:{selectFirst:!1},hide:!0,delimiter:",",unique:!0,removeWithBackspace:!0,placeholderColor:"#666666",autosize:!0,comfortZone:20,inputPadding:12},i);return this.each(function(){if("undefined"==typeof t(this).attr("data-tagsinput-init")){u.hide&&t(this).hide();var i=t(this).attr("id"),o=jQuery.extend({pid:i,real_input:"#"+i,holder:"#"+i+"_tagsinput",input_wrapper:"#"+i+"_addTag",fake_input:"#"+i+"_tag"},u);a[i]=o.delimiter,(u.onAddTag||u.onRemoveTag||u.onChange)&&(e[i]=new Array,e[i].onAddTag=u.onAddTag,e[i].onRemoveTag=u.onRemoveTag,e[i].onChange=u.onChange);var r='<div id="'+i+'_tagsinput" class="tagsinput"><div id="'+i+'_addTag">';if(u.interactive&&(r=r+'<input id="'+i+'_tag" value="" data-default="'+u.defaultText+'" />'),r+='</div><div class="tags_clear"></div></div>',t(r).insertAfter(this),t(o.holder).css("width",u.width),t(o.holder).css("min-height",u.height),t(o.holder).css("height",u.height),""!=t(o.real_input).val()&&t.fn.tagsInput.importTags(t(o.real_input),t(o.real_input).val()),u.interactive){if(t(o.fake_input).val(t(o.fake_input).attr("data-default")),t(o.fake_input).css("color",u.placeholderColor),t(o.fake_input).resetAutosize(u),t(o.holder).bind("click",o,function(a){t(a.data.fake_input).focus()}),t(o.fake_input).bind("focus",o,function(a){t(a.data.fake_input).val()==t(a.data.fake_input).attr("data-default")&&t(a.data.fake_input).val(""),t(a.data.fake_input).css("color","#000000")}),void 0!=u.autocomplete_url){autocomplete_options={source:u.autocomplete_url};for(attrname in u.autocomplete)autocomplete_options[attrname]=u.autocomplete[attrname];void 0!==jQuery.Autocompleter?(t(o.fake_input).autocomplete(u.autocomplete_url,u.autocomplete),t(o.fake_input).bind("result",o,function(a,e,n){e&&t("#"+i).addTag(e[0]+"",{focus:!0,unique:u.unique})})):void 0!==jQuery.ui.autocomplete&&(t(o.fake_input).autocomplete(autocomplete_options),t(o.fake_input).bind("autocompleteselect",o,function(a,e){return t(a.data.real_input).addTag(e.item.value,{focus:!0,unique:u.unique}),!1}))}else t(o.fake_input).bind("blur",o,function(a){var e=t(this).attr("data-default");return""!=t(a.data.fake_input).val()&&t(a.data.fake_input).val()!=e?a.data.minChars<=t(a.data.fake_input).val().length&&(!a.data.maxChars||a.data.maxChars>=t(a.data.fake_input).val().length)&&t(a.data.real_input).addTag(t(a.data.fake_input).val(),{focus:!0,unique:u.unique}):(t(a.data.fake_input).val(t(a.data.fake_input).attr("data-default")),t(a.data.fake_input).css("color",u.placeholderColor)),!1});t(o.fake_input).bind("keypress",o,function(a){return n(a)?(a.preventDefault(),a.data.minChars<=t(a.data.fake_input).val().length&&(!a.data.maxChars||a.data.maxChars>=t(a.data.fake_input).val().length)&&t(a.data.real_input).addTag(t(a.data.fake_input).val(),{focus:!0,unique:u.unique}),t(a.data.fake_input).resetAutosize(u),!1):void(a.data.autosize&&t(a.data.fake_input).doAutosize(u))}),o.removeWithBackspace&&t(o.fake_input).bind("keydown",function(a){if(8==a.keyCode&&""==t(this).val()){a.preventDefault();var e=t(this).closest(".tagsinput").find(".tag:last").text(),i=t(this).attr("id").replace(/_tag$/,"");e=e.replace(/[\s]+x$/,""),t("#"+i).removeTag(escape(e)),t(this).trigger("focus")}}),t(o.fake_input).blur(),o.unique&&t(o.fake_input).keydown(function(a){(8==a.keyCode||String.fromCharCode(a.which).match(/\w+|[áéíóúÁÉÍÓÚñÑ,\/]+/))&&t(this).removeClass("not_valid")})}}}),this},t.fn.tagsInput.updateTagsField=function(e,i){var n=t(e).attr("id");t(e).val(i.join(a[n]))},t.fn.tagsInput.importTags=function(n,u){t(n).val("");var o=t(n).attr("id"),r=u.split(a[o]);for(i=0;i<r.length;i++)t(n).addTag(r[i],{focus:!1,callback:!1});if(e[o]&&e[o].onChange){var d=e[o].onChange;d.call(n,n,r[i])}};var n=function(a){var e=!1;return 13==a.which||("string"==typeof a.data.delimiter?a.which==a.data.delimiter.charCodeAt(0)&&(e=!0):t.each(a.data.delimiter,function(t,i){a.which==i.charCodeAt(0)&&(e=!0)}),e)}}(jQuery);