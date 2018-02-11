const images=['assets/images/project1.png','assets/images/project2.jpg','assets/images/project3.png']
var imageindex=0;
const colors = ["#3CC157", "#2AA7FF", "#D2C1E8", "#FCBC0F", "#F85F36"];
//const colors = ["white", "#D2C1E8"];
const numBalls = 200;
const balls = [];
var navbar;
var navbarinit;
var about;
var skills;
var projects;
var contact;
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
      fill: "both",
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
        setInterval(progress,16.67); //60 fps
//      $(this).width((length*0.8)+'%');
        function progress(){
        if(width>=length)
            clearInterval();
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
    if(action=='next'){
          if(imageindex+1>images.length-1){
              imageindex=0;
          }else{
              imageindex++; 
          }
    }    
    else{
        if(imageindex-1<0){
            imageindex=images.length-1;
        }else{
           imageindex--; 
        }
    }
$('.Project-container').css({backgroundImage:`url(${images[imageindex]})`});
    
}

$(document).ready(function(){
     
    about=[$("#about")];
    about.push(true);
    console.log(about[0]);
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
    $('.Project-container button').hide();

$('.Project-container').on("mouseenter",function(){
   $('.Project-container button').fadeIn(500); 
});
    $('.Project-container').on("mouseleave",function(){
   $('.Project-container button').hide(); 
});
$('.Project-container button').on("click",function(){
   moveImage($(this).attr('data-action')); 
});

});