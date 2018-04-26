
const images = [0,50,100] ; //position of every image
var modelopen = false ; // to verify if modal is open
var imageindex = 0 ; // index for images
var navbaropen = false ; // to verify if navbar is open for responsive version
//testimonials //
var testimoialss = ["Keep up the excellent work. I use web developer often. It really saves me time and effort. web developer is exactly what our business has been lacking.<br>- Robert W.",
                 "We've used web developer for the last five years. Buy this now.<br> - Normand Y.","Web developer saved my business. Buy this now.<br> - Kraig Q.","Great job, I will definitely be ordering again! I will recommend you to my colleagues. Needless to say we are extremely satisfied with the results.<br>- Kacie Y.","You've saved our business! I have gotten at least 50 times the value from web developer.<br>- Judy D."] ;
var testimoialsindex = 0 ; //testimonials index

// setting for background effetcs //
const colors = ["#3CC157", "#2AA7FF", "#D2C1E8", "#FCBC0F", "#F85F36"];
var numBalls;
const balls = [];
var navbar;
var navbarinit;
var about;
var skills;
var projects;
var contact;
var imageinterval;
var content; // testimonials content
function backgroundEffect(){
var header=$('header'); //getting header location
    //creating deffirent balls with deffrent scaling and sizing
for (var i = 0; i < numBalls; i++) {
  var ball = document.createElement("div");
  ball.classList.add("star");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];

  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * (75))}vh`;
  ball.style.transform = `scale(${Math.random()})`; //random scales so a ball doesnt stick in another
   ball.style.height = `${Math.random()*0.5}em`;
     ball.style.width = ball.style.height;

  balls.push(ball);
  header.append(ball);
}

// Keyframes
balls.forEach(function(el, i,) {
  var to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11), //go right or left depending on index
    y: Math.random() * 12
  };

  var anim = el.animate(
    [
      { transform: "translate(0, 0)" }, //start
      { transform: `translate(${to.x}rem, ${to.y}rem)` } //end
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
    var header =  $('.headerButtonContainer'); // normal
    var header1 = $('.headerButtonContainer1'); // responsive
    header.on("mouseenter",function(){
         //enpty and animatie button
         header.find('button').text('');
    header.find('button').animate({width:'30%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
   fontSize:'1.2em',
    },700,function(){
header.find('button').append('<i class="fas fa-arrow-down" style="color:red;padding-right:0.4em"></i>');  //add the arrow at the end of animation
    });


});
    header.on("mouseleave",function(){
         header.find('i').remove();//remove arrow
      header.find('button').animate({width:'100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    },700,function(){

          header.find('button').text('View My Work');//add text at the end of animation
    });


});
    header.find('button').on("click",function(e){
      header.find('i').remove();
     header.find('button').animate({width:'100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    },700,function(){

           header.find('button').text('View My Work');
    });
         linkScroll('#about'); // scroll to the about section
    });

    header1.find('button').on("click",function(e){
        linkScroll('#about');
    });
}
function linkScroll(target){
    //scroll to the target
	 var x = (target=="#precontact") ? 0 : 50; //change the scroll stop incase of link leading to the form section
	  $('body').animate({
	    scrollTop: $(target).offset().top-x
	  }, 600);
}
function displayContent(position){
   //display content of page depending on scroll location
    // using a control variable to display only once for each section
    if(position >= about[0].offset().top/1.2){
        if(about[1]){
        $("#about .row:first-of-type ").removeClass('hidden');
         $("#about h2").removeClass('hidden');
        about[1] = false;
        }
        selected("#about");
    }else{
         selected("#header");
        $('#top a').removeClass('responsive');
          $('#top').removeClass('high');
        navbaropen = false;
    }  if (position >= projects[0].offset().top/1.4){
       if(projects[1]){
         projects[0].removeClass('hidden');
           projects[1] = false;
       }
        selected("#projects");
    }
      if( position >= skills[0].offset().top/1.15){
          if(skills[1]){
        skills[0].removeClass('hidden');
         skills[1] = false;
          }

    }  if(position >= contact[0].offset().top/1.2){
        if(contact[1]){
        contact[0].removeClass('hidden');
            contact[1] = false;
        }
         selected("#contact");
    }
}

//fix top navigation bar
function fixNav(position){
    if (position >= navbarinit) {
    navbar.addClass("fixed");

  } else{
    navbar.removeClass("fixed");

  }

}
function selected(target){
    $('a').removeClass('selected'); //remove class selected from all the links
    $('#top a').removeClass('responsive');// close rsponsive bar
    navbaropen = false;// update control variable to false
    $(`[href='${target}']`).addClass('selected');//add class selected to the link clicked
}


$(document).ready(function(){
  var userAgent = window.navigator.userAgent;
  console.log(userAgent);




  var ww = $(window).width();
ww <= 800 ? numBalls= ww/13 : numBalls=100;
     content = $('.testimonials-content');
   // each section is an array with element and a boolean that we will use to make sure each section is displayed only once
    about = [$("#about")];
    about.push(true);
    skills = [$("#skillsContent")];
    skills.push(true);
    projects = [$("#projects")];
    projects.push(true);
    contact = [$("#contact")];
    contact.push(true);
    ///
    navbar = $('.navbar');
    navbarinit = navbar.offset().top;
    $('#top a').on("click",function(e){
         var thisTarget = $(this).attr('href');
         e.preventDefault();
        if(thisTarget!='#'){
        thisTarget = (thisTarget=='#contact' ? '#contact' :thisTarget);
    linkScroll(thisTarget);
    $('#top a').removeClass('responsive');
        $('#top').removeClass('high');
          navbaropen=false;
        }else{
            if(!navbaropen){
        $('#top.fixed a').addClass('responsive');
        $('#top.fixed').addClass('high');
               setTimeout(function(){ navbaropen=true;},500);
                }else
                    {
                    $('#top a').removeClass('responsive');
                        $('#top').removeClass('high');
                        navbaropen=false;
                    }
        }
        });
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      console.log('heere');
      $('.hidden').removeClass('hidden');
        navbar.addClass('fixed');
        $('.headerButtonContainer1').find('button').on("click",function(e){
            linkScroll('#about');
        });
        $(document).scroll(function() {
          var y = $(this).scrollTop();
            displayContent(y); // to display content
        });
    }else{//get initial position
   backgroundEffect(); //making the backgournd effect
headerButton(); //initialising lsitener for header button control


    //scroll listener
$(document).scroll(function() {
  var y = $(this).scrollTop();
    displayContent(y); // to display content
  fixNav(y); // to fix the top navbar
});


}
});
