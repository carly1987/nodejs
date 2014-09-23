/**
 * Author: Mohiuddin Parekh
 * 		   www.mohi.me
 * 		   @mohiuddinparekh   
 */

$(document).ready(function(){
						
	$window = $(window);
	
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});
	
	$('section[data-type="background"]').each(function(){
	
	
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		
	    $(window).scroll(function() {
	
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
	
				var yPos = -($window.scrollTop() / $self.data('speed')); 
				
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				var coords = '50% '+ yPos + 'px';

				$self.css({ backgroundPosition: coords });
				
				$('[data-type="sprite"]', $self).each(function() {
					
					var $sprite = $(this);
					
					var yPos = -($window.scrollTop() / $sprite.data('speed'));					
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
					
					$sprite.css({ backgroundPosition: coords });													
					
				}); 
			
				$('[data-type="video"]', $self).each(function() {
					
					var $video = $(this);
					
					var yPos = -($window.scrollTop() / $video.data('speed'));					
					var coords = -(yPos + $video.data('offsetY')) + 'px';
	
					$video.css({ top: coords });													
					
				});
				$('[data-type="content"]', $self).each(function() {
					
					var $content = $(this);
					
					var yPos = -($window.scrollTop() / $content.data('speed'));					
					var coords = -(yPos + $content.data('offsetY')) + 'px';
	
					$content.css({ top: coords });													
					
				}); 
			
			}; // in view			
	
		}); // window scroll
			
	});	// each data-type
	

}); // document ready

/* 
 * Mobile safari url bar 
 


*/
var mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

if (mobile) {
     addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } 
}

/* 
 * Create HTML5 elements for IE's sake
 */

document.createElement("header");
document.createElement("footer");
document.createElement("figure");
document.createElement("nav");
document.createElement("aside");
document.createElement("article");
document.createElement("section");


// Contact us 

$(function() {
  $('.error_contact').hide();
  $('.contact_input').css({backgroundColor:"#FFFFFF"});
  $('.contact_input').focus(function(){
    $(this).css({backgroundColor:"#F4F4F4"});
  });
  $('.contact_input').blur(function(){
    $(this).css({backgroundColor:"#FFFFFF"});
  });

  $(".submit_btn").click(function() {
		// validate and process form
		// first hide any error messages
    $('.error_contact').hide();
		
	  var name = $("input#name").val();
		if (name == "") {
      $("#name_error").show();
	  $("input#name").css({border:"1px solid #B9B925"});      
      return false;
    }
		
		var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
 
        var email = $("input#email").val();
        if(email == '') {
            $("input#email").css({border:"1px solid #B9B925"}).before('<div class="error_contact" id="email_error">Please enter your email address</div>');
            hasError = true;
        }
 
        else if(!emailReg.test(email)) {
            $("input#email").css({border:"1px solid #B9B925"}).before('<div class="error_contact" id="email_error">Enter a valid email address</div>');
            hasError = true;
        }
 
        if(hasError == true) { return false; }
		
		var comment = $("textarea#comment").val();
		if (comment == "") {
      $("#comment_error").show();
	  $("textarea#comment").css({border:"1px solid #B9B925"});      
      return false;
    }		
		var dataString = '&name=' + name + '&email=' + email + '&comment=' + comment;
		//alert (dataString);return false;
		
		$.ajax({
      type: "POST",
      url: "bin/process.php",
      data: dataString,
      success: function() {
        var m = $("#message");		
		$("input#name").css({border:"1px solid #B5B5B5"});
		 $("input#email").css({border:"1px solid #B5B5B5"});
		$("textarea#comment").css({border:"1px solid #B5B5B5"});
		m.animate({			
			"top": "-73px",
			"opacity": "1"				
		},"fast");
		setTimeout(function () {
           m.animate({			   			
			"top": "-105px",
			"opacity": "0"
		},"slow");
        }, 8000);	
        
      }
     });
    return false;
	});
});
// Returns the version of Windows Internet Explorer or a -1
function getInternetExplorerVersion()
{
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}
 $(document).ready(function(){	
 
$("#actions_phone a.love").click(function () {
	$("#skills_phone, #sound_phone").hide('fast');
	$('#love_phone').slideDown('slow');
});
$("#actions_phone a.skills").click(function () {
	$("#love_phone, #sound_phone").hide('fast');
	$('#skills_phone').slideDown('slow');
});
$("#actions_phone a.sound").click(function () {
	$("#love_phone, #skills_phone").hide('fast');
	$('#sound_phone').slideDown('slow');
});

	 var browserName = navigator.appName;
	 var browserVer = getInternetExplorerVersion();

      if (browserName == 'Microsoft Internet Explorer' &&
         (browserVer == '6' || browserVer == '7' || browserVer == '8')
         ) {
            window.location.href = "http://www.mohi.me/unsupported_browser.html"
      }
});