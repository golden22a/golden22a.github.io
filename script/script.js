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
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
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
    $('header button').on("mouseenter",function(){
    var i=$('header i');
    $(this).attr('class','hovered');
    $(i).attr('class','fas fa-arrow-down').hide();
    $(i).fadeOut(300);
    $(i).fadeIn(300);
});
    $('header button').on("mouseleave",function(){
    $(this).attr('class','headerButton');
        $('header i').attr('class','fas fa-arrow-right');
});
}
function linkScroll(target){
	 
	  $('body').animate({
	    scrollTop: $(target).offset().top-50
	  }, 600);
}
function displatContent(position){
   
    if(position>=about.offset().top/1.2){
        $("#about .row:first-of-type ").removeClass('hidden');
         $("#about h2").removeClass('hidden');
        selected("#about");
    }else{
         selected("#header");
    }  if (position>=projects.offset().top/1.5){
       
         projects.removeClass('hidden');
         selected("#projects");
    }
      if( position>=skills.offset().top/1.5){
        skills.removeClass('hidden');
         skillBar();
    }  if(position>=contact.offset().top/1.1){
        contact.removeClass('hidden');
         selected("#contact");
    } 
}
function skillBar(){
   var el=$('.bar');
    el.each(function(){
       var length=parseInt($(this).attr('data-skill'));
        $(this).width((length*0.8)+'%');
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
     
    about=$("#about");
    skills=$("#about .row:nth-of-type(2)");
    projects=$("#projects"); 
    contact=$("#contact");
    navbar = $('.navbar');
    navbarinit=navbar.offset().top;
    about.width=0;
   backgroundEffect();
headerButton();
    $('#top a').on("click",function(e){
        e.preventDefault();
        var thisTarget = $(this).attr('href');
    linkScroll(thisTarget);
             });
    $('.headerButton').on("click",function(e){
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