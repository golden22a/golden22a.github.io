
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 100;
const balls = [];
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
    $(i).fadeIn(300);
});
    $('header button').on("mouseleave",function(){
    $(this).attr('class','headerButton');
        $('header i').attr('class','fas fa-arrow-right');
});
}
$(document).ready(function(){
   backgroundEffect();
headerButton();
});