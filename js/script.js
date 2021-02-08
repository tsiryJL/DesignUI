!function(t){"use strict";function e(){t(".a-slide-typed").each(function(){var e=t(this);if(e.hasClass("active")){var s=".a-typed-"+e.data("name");t(s).html("");var i=e.find(".a-typed").data("text");new Typed(s,{strings:[i],typeSpeed:60,startDelay:1e3,loop:!1,showCursor:!1})}})}if(t(".a-nav-toggle").on("click",function(){t("html").hasClass("body-menu-opened")?t("html").renpveClass("body-menu-opened").addClass("body-menu-close"):t("html").addClass("body-menu-opened").removeClass("body-menu-close")}),t(".a-pagepiling").length&&t(".a-pagepiling").pagepiling({scrollingSpeed:280,menu:"#menu, #menuMain",anchors:["About","Services","Skills","Resume","Portfolio","Awards","Testimonials","Clients","Contact"],loopTop:!1,loopBottom:!1,navigation:{position:"right"},onLeave:function(){t(".a-progressbar .progress-bar").each(function(){t(".slide-skills").hasClass("active")?t(this).width(t(this).attr("aria-valuenow")+"%"):t(this).width("0")}),e()}}),t(window).load(function(){e()}),t("#a-parallax").length){var s=document.getElementById("a-parallax");new Parallax(s)}t(".a-portfolio-carousel").length&&t(".a-portfolio-carousel").owlCarousel({items:3,smartSpeed:750,margin:30,autoplayHoverPause:!0,dots:!0,nav:!1,dotData:!1,responsive:{0:{items:1},600:{items:2},900:{items:3}}});t(".a-testimonial-carousel").length&&t(".a-testimonial-carousel").owlCarousel({items:1,smartSpeed:750,margin:30,autoplayHoverPause:!0,dots:!0,nav:!1});t(".a-form").length&&t(".a-form").each(function(){t(this).validate({errorClass:"error",submitHandler:function(e){t.ajax({type:"POST",url:"mail.php",data:t(e).serialize(),success:function(){t(".form-group-message").show(),t("#error").hide(),t("#success").show()},error:function(){t(".form-group-message").show(),t("#success").hide(),t("#error").show()}})}})})}($);var TxtType=function(t,e,s){this.toRotate=e,this.el=t,this.loopNum=0,this.period=parseInt(s,10)||2e3,this.txt="",this.tick(),this.isDeleting=!1};TxtType.prototype.tick=function(){var t=this.loopNum%this.toRotate.length,e=this.toRotate[t];this.isDeleting?this.txt=e.substring(0,this.txt.length-1):this.txt=e.substring(0,this.txt.length+1),this.el.innerHTML='<span class="wrap">'+this.txt+"</span>";var s=this,i=200-100*Math.random();this.isDeleting&&(i/=2),this.isDeleting||this.txt!==e?this.isDeleting&&""===this.txt&&(this.isDeleting=!1,this.loopNum++,i=500):(i=this.period,this.isDeleting=!0),setTimeout(function(){s.tick()},i)},window.onload=function(){for(var t=document.getElementsByClassName("typewrite"),e=0;e<t.length;e++){var s=t[e].getAttribute("data-type"),i=t[e].getAttribute("data-period");s&&new TxtType(t[e],JSON.parse(s),i)}var a=document.createElement("style");a.type="text/css",a.innerHTML=".typewrite > .wrap { border-right: 0.08em solid #fff}",document.body.appendChild(a)};