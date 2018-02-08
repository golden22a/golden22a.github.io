
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 100;
const balls = [];
var dif;
var about;
var skills;
var projects;
var contact;
var left;
function backgroundEffect(){
var header=$('header');
var top=$("#top").offset();
for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("star");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * (75))}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  
  
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
	    scrollTop: $(target).offset().top
	  }, 600);
}
function displatContent(position){
   
    if(position>=about.offset().top-100){
        $("#about .row:first-of-type ").removeClass('hidden');
         $("#about h2").removeClass('hidden');
    }  if (position>=projects.offset().top-100){
       
         projects.removeClass('hidden');
    }
     if( position>=skills.offset().top-100){
        skills.removeClass('hidden');
    } if(position>=contact.offset().top-100){
        contact.removeClass('hidden');
    }
}

$(document).ready(function(){
    about=$("#about");
    skills=$("#about .row:nth-of-type(2)");
    projects=$("#projects"); 
    contact=$("#contact");
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
});
});