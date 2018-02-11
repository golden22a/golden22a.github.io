const images=[0,50,100];
var modelopen=false;
var imageindex=0;
const colors = ["#3CC157", "#2AA7FF", "#D2C1E8", "#FCBC0F", "#F85F36"];
const numBalls = 200;
const balls = [];
var navbar;
var navbarinit;
var about;
var skills;
var projects;
var contact;
var imageinterval;
function backgroundEffect(){
var header=$('header');
var top=$("#top").offset();
for (var i = 0; i < numBalls; i++) {
  var ball = document.createElement("div");
  ball.classList.add("star");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];

  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * (75))}vh`;
  ball.style.transform = `scale(${Math.random()})`;
   ball.style.height = `${Math.random()*0.5}em`;
     ball.style.width = ball.style.height;
  
  balls.push(ball);
  header.append(ball);
}

// Keyframes
balls.forEach(function(el, i,) {
  var to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };
   
  var anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
        
});
}
function headerButton(){
    $('.headerButtonContainer').on("mouseenter",function(){
         
         $('header button').text('');
    $('header button').animate({width:'30%',
    borderTopLeftRadius: 100, 
    borderTopRightRadius: 100, 
    borderBottomLeftRadius: 100, 
    borderBottomRightRadius: 100,
   fontSize:'1.2em',
    },700,function(){  
$('header button').append('<i class="fas fa-arrow-down" style="color:red;padding-right:0.4em"></i>');  
    });
        
    
});
    $('.headerButtonContainer').on("mouseleave",function(){
         $('.headerbutton i').remove();
       $('header button').animate({width:'100%',
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
   
    },700,function(){
        
           $('header button').text('View My Work');
    });
       
     
});
}
function linkScroll(target){
	 var x=(target=="#precontact") ? 0 : 50;
	  $('body').animate({
	    scrollTop: $(target).offset().top-x
	  }, 600);
}
function displatContent(position){
   
    if(position>=about[0].offset().top/1.2){
        if(about[1]){
        $("#about .row:first-of-type ").removeClass('hidden');
         $("#about h2").removeClass('hidden');
        about[1]=false;
        }
        selected("#about");
    }else{
         selected("#header");
    }  if (position>=projects[0].offset().top/1.2){
       if(projects[1]){
         projects[0].removeClass('hidden');
           projects[1]=false;
       }
        selected("#projects");
    }
      if( position>=skills[0].offset().top/1.2){
          if(skills[1]){
        skills[0].removeClass('hidden');
            skillBar();  
         skills[1]=false;
          }
         
    }  if(position>=contact[0].offset().top/1.2){
        if(contact[1]){
        contact[0].removeClass('hidden');
            contact[1]=false;
        }
         selected("#contact");
    } 
}
function skillBar(){
   var el=$('.bar');
    el.each(function(){
        var width=10;
        var current=$(this);
       var length=parseInt(current.attr('data-skill'));
        if(length>0){
     var interval=setInterval(progress,16.67); //60 fps
//      $(this).width((length*0.8)+'%');
        function progress(){
        if(width>=length)
            clearInterval(interval);
        else{
            width++;
            
            current.width((width*0.8)+'%');
           current.text((width)+'%');
            
        }

}  

        }
    });
}

function fixNav(position){
    if (position >= navbarinit) {
    navbar.addClass("fixed");

  } else{
    navbar.removeClass("fixed");
  
  }

}
function selected(target){
    $('a').removeClass('selected');
    $(`[href='${target}']`).addClass('selected');
}
function moveImage(action){
    imageindex=action;
    $('.slides').animate({'margin-left':`-${images[action]}vw`});
    $('.project-footer i').attr('class','far fa-circle');
        $(`.project-footer i[data-slide=${action}]`).attr('class','fas fa-circle');

}
function imagetimer(){
    imageindex++;
         imageindex= (imageindex == 3) ? 0:imageindex;
        console.log(imageindex);
        moveImage(imageindex);
}
function valideform(){
    $('form input,form textarea').on("focus",function(){
       $(this).siblings('.error-message').hide();
   $(this).attr('class','active'); 
});
     $('input, textarea').on("blur",function(){
        if($(this).val()==""){
           $(this).removeClass('active'); 
        }
         
    });
    $("form").on("submit",function(e){
    var toSubmit=true;
    e.preventDefault();
    $('form input,form textarea').each(function(){
    var $element=$(this);
    if($element.val()==''){
        $element.attr('class','danger');
$element.siblings('.error-message').fadeIn(350);
        toSubmit=false;
        return;
    }
        if($element.attr('type')=='email'){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var isValidEmailAddress = re.test($element.val());
        if(!isValidEmailAddress){
            $element.attr('class','danger');
 $element.siblings('.error-message').fadeIn(350);
            toSubmit=false;
            return;
        }
        }
        $element.removeClass('error');
			$element.siblings('.error-message').hide();
        });
    if(toSubmit){
        console.log("Form submitted");
    }
});
}
$(document).ready(function(){
     
    about=[$("#about")];
    about.push(true);
    skills=[$("#about .row:nth-of-type(2)")];
    skills.push(true);
    projects=[$("#projects")]; 
    projects.push(true);
    contact=[$("#contact")];
    contact.push(true);
    navbar = $('.navbar');
    navbarinit=navbar.offset().top;
    about.width=0;
   backgroundEffect();
headerButton();
    $('#top a').on("click",function(e){
        e.preventDefault();
        var thisTarget = $(this).attr('href');
        thisTarget = (thisTarget=='#contact' ? '#precontact' :thisTarget);
    linkScroll(thisTarget);
             });
    $('.headerButton').on("click",function(e){
       $('.headerbutton i').remove();
       $('header button').animate({width:'100%',
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
   
    },700,function(){
        
           $('header button').text('View My Work');
    });
         linkScroll('#about');
    });
$(document).scroll(function() {
  var y = $(this).scrollTop();
    displatContent(y);
  fixNav(y);
});
    $('.project-footer i').on("click",function(){
        clearInterval(imageinterval);
       moveImage($(this).attr('data-slide'));
        setTimeout(3000);
        imageinterval=setInterval(imagetimer,3000);
        
    });
    
    imageinterval=setInterval(imagetimer,3000);
    $('.slide img').on("click",function(){
      
        $('.modal-content img').attr('src',$(this).attr('src'));
        $('.modal').css({'display':'block'});
        setTimeout(function(){ modelopen=true;},1000);
    });
    $(window).on('click',function(){
        if(modelopen){
            $('.modal').css({'display':'none'});
            modelopen=false;
        }
        });
    valideform();
    


});