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
const numBalls = 200;
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
        navbaropen = false;
    }  if (position >= projects[0].offset().top/1.2){
       if(projects[1]){
         projects[0].removeClass('hidden');
               imageinterval=setInterval(imagetimer,3000);
           projects[1] = false;
       }
        selected("#projects");
    }
      if( position >= skills[0].offset().top/1.2){
          if(skills[1]){
        skills[0].removeClass('hidden');
            skillBar();  
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
//bar load 
function skillBar(){
   var el = $('.bar');
    el.each(function(){
        var width=10;
        var current=$(this);
       var length=parseInt(current.attr('data-skill'));
        if(length>0){
     var interval=setInterval(progress,16.67); //60 fps
        function progress(){
        if(width>=length)
            clearInterval(interval); //stop interval
        else{
            width++;
            //chaming text while filling skill bar
            current.width((width*0.8)+'%');
           current.text((width)+'%');
            
        }

}  

        }
    });
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
//for project slider
function moveImage(action){
    imageindex = action; //update the index
    $('.slides').animate({'margin-left':`-${images[action]}vw`});
    $('.project-footer i').attr('class','far fa-circle');
        $(`.project-footer i[data-slide=${action}]`).attr('class','fas fa-circle');

}
function imagetimer(){
    imageindex++;
    imageindex= (imageindex == 3) ? 0:imageindex;
    moveImage(imageindex);
}
//email validation
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
            toSubmit = false;
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
//for testimonials slider
function filltestimoialss(){
    
    testimoialsindex = (testimoialsindex==testimoialss.length) ? 0 : testimoialsindex; //to reset if arrived at array length 
   content.empty();
    content.append(`<p>${testimoialss[testimoialsindex]}</p>`).hide();
    content.fadeIn(1200);
    testimoialsindex++;
}
$(document).ready(function(){
     content = $('.testimonials-content');
   // each section is an array with element and a boolean that we will use to make sure each section is displayed only once
    about = [$("#about")];
    about.push(true);
    skills = [$("#about .row:nth-of-type(2)")];
    skills.push(true);
    projects = [$("#projects")]; 
    projects.push(true);
    contact = [$("#contact")];
    contact.push(true);
    ///
    navbar = $('.navbar');
    navbarinit = navbar.offset().top;//get initial position 
   backgroundEffect(); //making the backgournd effect
headerButton(); //initialising lsitener for header button control
    valideform();//initialising linsten for form valdiaiton
    
    //navbar click interaction
    $('#top a').on("click",function(e){
         var thisTarget = $(this).attr('href');
         e.preventDefault();
        if(thisTarget!='#'){
        thisTarget = (thisTarget=='#contact' ? '#precontact' :thisTarget);
    linkScroll(thisTarget);
        }else{
            if(!navbaropen){
        $('#top a').addClass('responsive');
        $('#top').addClass('high');
               setTimeout(function(){ navbaropen=true;},500);
                }else
                    {
                    $('#top a').removeClass('responsive'); 
                        $('#top').removeClass('high');
                       
                    }
        }
        });
    //scroll listener
$(document).scroll(function() {
  var y = $(this).scrollTop();
    displayContent(y); // to display content
  fixNav(y); // to fix the top navbar 
});
    //to change the project slide when clicking on the small circles
    $('.project-footer i').on("click",function(){
        clearInterval(imageinterval);
       moveImage($(this).attr('data-slide'));
        setTimeout(3000);
        imageinterval=setInterval(imagetimer,3000);
        
    });
    //modal
    $('.slide img').on("click",function(){
      
        $('.modal-content img').attr('src',$(this).attr('src'));
        $('.modal').css({'display':'block'});
        setTimeout(function(){ modelopen=true;},1000);//wait 1s to adjust control variable so it wont be a  conflict the widnow listener
    });
    $(window).on('click',function(){
        if(modelopen){
            $('.modal').css({'display':'none'});
            modelopen=false;
        }
        if(navbaropen){
            $('#top a').removeClass('responsive');
              $('#top').removeClass('high');
        navbaropen=false;
            
        }
        });
    
var testimoialsinterval=setInterval(filltestimoialss,5000);
});