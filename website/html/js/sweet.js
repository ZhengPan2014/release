/*! tailinserver 2017-03-02 */
!function(a,b){function c(b){var c=s(),d=c.querySelector("h2"),e=c.querySelector("p"),f=c.querySelector("button.cancel"),h=c.querySelector("button.confirm");if(d.innerHTML=x(b.title).split("\n").join("<br>"),e.innerHTML=x(b.text||"").split("\n").join("<br>"),b.text&&z(e),B(c.querySelectorAll(".icon")),b.type){for(var i=!1,j=0;j<q.length;j++)if(b.type===q[j]){i=!0;break}if(!i)return a.console.error("Unknown alert type: "+b.type),!1;var k=c.querySelector(".icon."+b.type);switch(z(k),b.type){case"success":v(k,"animate"),v(k.querySelector(".tip"),"animateSuccessTip"),v(k.querySelector(".long"),"animateSuccessLong");break;case"error":v(k,"animateErrorIcon"),v(k.querySelector(".x-mark"),"animateXMark");break;case"warning":v(k,"pulseWarning"),v(k.querySelector(".body"),"pulseWarningIns"),v(k.querySelector(".dot"),"pulseWarningIns")}}if(b.imageUrl){var l=c.querySelector(".icon.custom");l.style.backgroundImage="url("+b.imageUrl+")",z(l);var m=80,n=80;if(b.imageSize){var o=b.imageSize.split("x")[0],p=b.imageSize.split("x")[1];o&&p?(m=o,n=p,l.css({width:o+"px",height:p+"px"})):a.console.error("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+b.imageSize)}l.setAttribute("style",l.getAttribute("style")+"width:"+m+"px; height:"+n+"px")}c.setAttribute("data-has-cancel-button",b.showCancelButton),b.showCancelButton?f.style.display="inline-block":B(f),b.cancelButtonText&&(f.innerHTML=x(b.cancelButtonText)),b.confirmButtonText&&(h.innerHTML=x(b.confirmButtonText)),h.style.backgroundColor=b.confirmButtonColor,g(h,b.confirmButtonColor),c.setAttribute("data-allow-ouside-click",b.allowOutsideClick);var r=!!b.doneFunction;c.setAttribute("data-has-done-function",r),c.setAttribute("data-timer",b.timer)}function d(a,b){a=String(a).replace(/[^0-9a-f]/gi,""),a.length<6&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),b=b||0;var c,d,e="#";for(d=0;d<3;d++)c=parseInt(a.substr(2*d,2),16),c=Math.round(Math.min(Math.max(0,c+c*b),255)).toString(16),e+=("00"+c).substr(c.length);return e}function e(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function f(a){var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return b?parseInt(b[1],16)+", "+parseInt(b[2],16)+", "+parseInt(b[3],16):null}function g(a,b){var c=f(b);a.style.boxShadow="0 0 2px rgba("+c+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"}function h(){var a=s();E(t(),10),z(a),v(a,"showSweetAlert"),w(a,"hideSweetAlert"),k=b.activeElement;var c=a.querySelector("button.confirm");c.focus(),setTimeout(function(){v(a,"visible")},500);var d=a.getAttribute("data-timer");"null"!==d&&""!==d&&(a.timeout=setTimeout(function(){i()},d))}function i(){var c=s();F(t(),5),F(c,5),w(c,"showSweetAlert"),v(c,"hideSweetAlert"),w(c,"visible");var d=c.querySelector(".icon.success");w(d,"animate"),w(d.querySelector(".tip"),"animateSuccessTip"),w(d.querySelector(".long"),"animateSuccessLong");var e=c.querySelector(".icon.error");w(e,"animateErrorIcon"),w(e.querySelector(".x-mark"),"animateXMark");var f=c.querySelector(".icon.warning");w(f,"pulseWarning"),w(f.querySelector(".body"),"pulseWarningIns"),w(f.querySelector(".dot"),"pulseWarningIns"),a.onkeydown=m,b.onclick=l,k&&k.focus(),n=void 0,clearTimeout(c.timeout)}function j(){var a=s();a.style.marginTop=D(s())}var k,l,m,n,o=".sweet-alert",p=".sweet-overlay",q=["error","warning","info","success"],r={title:"",text:"",type:null,allowOutsideClick:!1,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#AEDEF4",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null},s=function(){return b.querySelector(o)},t=function(){return b.querySelector(p)},u=function(a,b){return new RegExp(" "+b+" ").test(" "+a.className+" ")},v=function(a,b){u(a,b)||(a.className+=" "+b)},w=function(a,b){var c=" "+a.className.replace(/[\t\r\n]/g," ")+" ";if(u(a,b)){for(;c.indexOf(" "+b+" ")>=0;)c=c.replace(" "+b+" "," ");a.className=c.replace(/^\s+|\s+$/g,"")}},x=function(a){var c=b.createElement("div");return c.appendChild(b.createTextNode(a)),c.innerHTML},y=function(a){a.style.opacity="",a.style.display="block"},z=function(a){if(a&&!a.length)return y(a);for(var b=0;b<a.length;++b)y(a[b])},A=function(a){a.style.opacity="",a.style.display="none"},B=function(a){if(a&&!a.length)return A(a);for(var b=0;b<a.length;++b)A(a[b])},C=function(a,b){for(var c=b.parentNode;null!==c;){if(c===a)return!0;c=c.parentNode}return!1},D=function(a){a.style.left="-9999px",a.style.display="block";var b,c=a.clientHeight;return b="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(a).getPropertyValue("padding"),10):parseInt(a.currentStyle.padding),a.style.left="",a.style.display="none","-"+parseInt(c/2+b)+"px"},E=function(a,b){if(+a.style.opacity<1){b=b||16,a.style.opacity=0,a.style.display="block";var c=+new Date,d=function(){a.style.opacity=+a.style.opacity+(new Date-c)/100,c=+new Date,+a.style.opacity<1&&setTimeout(d,b)};d()}a.style.display="block"},F=function(a,b){b=b||16,a.style.opacity=1;var c=+new Date,d=function(){a.style.opacity=+a.style.opacity-(new Date-c)/100,c=+new Date,+a.style.opacity>0?setTimeout(d,b):a.style.display="none"};d()},G=function(c){if(MouseEvent){var d=new MouseEvent("click",{view:a,bubbles:!1,cancelable:!0});c.dispatchEvent(d)}else if(b.createEvent){var e=b.createEvent("MouseEvents");e.initEvent("click",!1,!1),c.dispatchEvent(e)}else b.createEventObject?c.fireEvent("onclick"):"function"==typeof c.onclick&&c.onclick()},H=function(b){"function"==typeof b.stopPropagation?(b.stopPropagation(),b.preventDefault()):a.event&&a.event.hasOwnProperty("cancelBubble")&&(a.event.cancelBubble=!0)};a.sweetAlertInitialize=function(){var a='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert" tabIndex="-1"><div class="icon error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="icon warning"> <span class="body"></span> <span class="dot"></span> </div> <div class="icon info"></div> <div class="icon success"> <span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div> </div> <div class="icon custom"></div> <h2>Title</h2><p>Text</p><button class="cancel" tabIndex="2">Cancel</button><button class="confirm" tabIndex="1">OK</button></div>',c=b.createElement("div");c.innerHTML=a,b.body.appendChild(c)},a.sweetAlert=a.swal=function(){function f(b){var c=b||a.event,d=c.keyCode||c.which;if([9,13,32,27].indexOf(d)!==-1){for(var e=c.target||c.srcElement,f=-1,h=0;h<y.length;h++)if(e===y[h]){f=h;break}9===d?(e=f===-1?w:f===y.length-1?y[0]:y[f+1],H(c),e.focus(),g(e,o.confirmButtonColor)):(e=13===d||32===d?f===-1?w:void 0:27!==d||x.hidden||"none"===x.style.display?void 0:x,void 0!==e&&G(e,c))}}function k(b){var c=b||a.event,d=c.target||c.srcElement,e=c.relatedTarget,f=u(p,"visible");if(f){var g=-1;if(null!==e){for(var h=0;h<y.length;h++)if(e===y[h]){g=h;break}g===-1&&d.focus()}else n=d}}if(void 0===arguments[0])return a.console.error("sweetAlert expects at least 1 attribute!"),!1;var o=e({},r);switch(typeof arguments[0]){case"string":o.title=arguments[0],o.text=arguments[1]||"",o.type=arguments[2]||"";break;case"object":if(void 0===arguments[0].title)return a.console.error('Missing "title" argument!'),!1;o.title=arguments[0].title,o.text=arguments[0].text||r.text,o.type=arguments[0].type||r.type,o.allowOutsideClick=arguments[0].allowOutsideClick||r.allowOutsideClick,o.showCancelButton=void 0!==arguments[0].showCancelButton?arguments[0].showCancelButton:r.showCancelButton,o.closeOnConfirm=void 0!==arguments[0].closeOnConfirm?arguments[0].closeOnConfirm:r.closeOnConfirm,o.closeOnCancel=void 0!==arguments[0].closeOnCancel?arguments[0].closeOnCancel:r.closeOnCancel,o.timer=arguments[0].timer||r.timer,o.confirmButtonText=r.showCancelButton?"Confirm":r.confirmButtonText,o.confirmButtonText=arguments[0].confirmButtonText||r.confirmButtonText,o.confirmButtonColor=arguments[0].confirmButtonColor||r.confirmButtonColor,o.cancelButtonText=arguments[0].cancelButtonText||r.cancelButtonText,o.imageUrl=arguments[0].imageUrl||r.imageUrl,o.imageSize=arguments[0].imageSize||r.imageSize,o.doneFunction=arguments[1]||null;break;default:return a.console.error('Unexpected type of argument! Expected "string" or "object", got '+typeof arguments[0]),!1}c(o),j(),h();for(var p=s(),q=function(b){var c=b||a.event,e=c.target||c.srcElement,f="confirm"===e.className,g=u(p,"visible"),h=o.doneFunction&&"true"===p.getAttribute("data-has-done-function");switch(c.type){case"mouseover":f&&(e.style.backgroundColor=d(o.confirmButtonColor,-.04));break;case"mouseout":f&&(e.style.backgroundColor=o.confirmButtonColor);break;case"mousedown":f&&(e.style.backgroundColor=d(o.confirmButtonColor,-.14));break;case"mouseup":f&&(e.style.backgroundColor=d(o.confirmButtonColor,-.04));break;case"focus":var j=p.querySelector("button.confirm"),k=p.querySelector("button.cancel");f?k.style.boxShadow="none":j.style.boxShadow="none";break;case"click":if(f&&h&&g)o.doneFunction(!0),o.closeOnConfirm&&i();else if(h&&g){var l=String(o.doneFunction).replace(/\s/g,""),m="function("===l.substring(0,9)&&")"!==l.substring(9,10);m&&o.doneFunction(!1),o.closeOnCancel&&i()}else i()}},t=p.querySelectorAll("button"),v=0;v<t.length;v++)t[v].onclick=q,t[v].onmouseover=q,t[v].onmouseout=q,t[v].onmousedown=q,t[v].onfocus=q;l=b.onclick,b.onclick=function(b){var c=b||a.event,d=c.target||c.srcElement,e=p===d,f=C(p,d),g=u(p,"visible"),h="true"===p.getAttribute("data-allow-ouside-click");!e&&!f&&g&&h&&i()};var w=p.querySelector("button.confirm"),x=p.querySelector("button.cancel"),y=p.querySelectorAll("button:not([type=hidden])");m=a.onkeydown,a.onkeydown=f,w.onblur=k,x.onblur=k,a.onfocus=function(){a.setTimeout(function(){void 0!==n&&(n.focus(),n=void 0)},0)}},a.swal.setDefaults=function(a){if(!a)throw new Error("userParams is required");if("object"!=typeof a)throw new Error("userParams has to be a object");e(r,a)},function(){"complete"===b.readyState||"interactive"===b.readyState&&b.body?a.sweetAlertInitialize():b.addEventListener?b.addEventListener("DOMContentLoaded",function(){b.removeEventListener("DOMContentLoaded",arguments.callee,!1),a.sweetAlertInitialize()},!1):b.attachEvent&&b.attachEvent("onreadystatechange",function(){"complete"===b.readyState&&(b.detachEvent("onreadystatechange",arguments.callee),a.sweetAlertInitialize())})}()}(window,document);