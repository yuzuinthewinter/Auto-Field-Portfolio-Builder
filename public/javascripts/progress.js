const  previousBtn  =  document.getElementById('previousBtn');
const  nextBtn  =  document.getElementById('nextBtn');
const  finishBtn  =  document.getElementById('finishBtn');
const  content  =  document.getElementById('content');
const  more  =  document.getElementById('moreBtn');
const  bullets  =  [...document.querySelectorAll('.bullet')];

const  profile  =  document.getElementById('profile-form');
const  upload =  document.getElementById('upload-form');
const  template =  document.getElementById('template-form');

const heading1 = document.getElementById('heading1');
const heading2 = document.getElementById('heading2');
const heading3 = document.getElementById('heading3');
    
const MAX_STEPS = 3;
let currentStep = 1;

previousBtn.disabled  =  true;
nextBtn.disabled  =  false;

nextBtn.addEventListener('click',  ()  =>  {
	bullets[currentStep - 1].classList.add('completed');
	currentStep  +=  1;
	previousBtn.disabled  =  false;
	if  (currentStep  ===  3)  {
		nextBtn.disabled  =  true;

        heading1.hidden = true;
        heading2.hidden = true;
        heading3.hidden = false;

        profile.hidden = true;
        upload.hidden = true;
        template.hidden = false;
    }
    if  (currentStep  ===  1)   {
        heading1.hidden = false;
        heading2.hidden = true;
        heading3.hidden = true;
        
        profile.hidden = false;
        upload.hidden = true;
        template.hidden = true;
    }
    if  (currentStep  ===  2)   {
        heading1.hidden = true;
        heading2.hidden = false;
        heading3.hidden = true;
        
        profile.hidden = true;
        upload.hidden = false;
        template.hidden = true;
    }
});


previousBtn.addEventListener('click',  ()  =>  {
	bullets[currentStep  -  2].classList.remove('completed');
	currentStep  -=  1;
	nextBtn.disabled  =  false;
	if  (currentStep  ===  1)  {
        previousBtn.disabled  =  true;

        heading1.hidden = false;
        heading2.hidden = true;
        heading3.hidden = true;
        
        profile.hidden = false;
        upload.hidden = true;
        template.hidden = true;
    }
    if  (currentStep  ===  2)   {
        heading1.hidden = true;
        heading2.hidden = false;
        heading3.hidden = true;
        
        profile.hidden = true;
        upload.hidden = false;
        template.hidden = true;
    }
    if  (currentStep  ===  3)   {
        heading1.hidden = true;
        heading2.hidden = true;
        heading3.hidden = false;

        profile.hidden = true;
        upload.hidden = false;
        template.hidden = true;
    }
});


$(document).ready(function() {
    var wrapper1 = $(".upload-item");
    var wrapper2 = $("#add-skill");
    var wrapper3 = $("#expfield");

    var add_button1 = $("#moreBtn");
    var add_button2 = $("#addskillBtn");
    var add_button3 = $("#addexpBtn");

    var x = 1;

    var y = 1;
    $(add_button2).click(function(e) {
        e.preventDefault();
        if (y <= 4) {
            y++;
            $(wrapper2).append('<div id="skill'+y+'"><tr><td class="form-box"><input type="text" name="skill" placeholder="skill('+y+')" value="">&nbsp;&nbsp;<input type="number" name="level" placeholder="level (max : 5)" value=""><button class="delete">Delete</button></td></tr></div>'); //add input box
        } else {
            alert('You Reached the limits')
        }
    });

    var z = 1;
    $(add_button3).click(function(e) {
        e.preventDefault();
        if (z <= 4) {
            z++;
            $(wrapper3).append('<div id="exp'+z+'"><input type="text" name="exp" placeholder="experience('+z+')" value="">&nbsp;&nbsp;<input type="text" name="place" placeholder="place" value=""><input type="text" name="year" placeholder="year" id="yearexp" value="">&nbsp;&nbsp;<button class="delete">Delete</button></td></div>'); //add input box
        } else {
            alert('You Reached the limits')
        }
    });

    $(wrapper1).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })

    $(wrapper2).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        y--;
    })

    $(wrapper3).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        z--;
    })
});