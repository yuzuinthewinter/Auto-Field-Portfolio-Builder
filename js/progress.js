const  previousBtn  =  document.getElementById('previousBtn');
const  nextBtn  =  document.getElementById('nextBtn');
const  finishBtn  =  document.getElementById('finishBtn');
const  content  =  document.getElementById('content');
const  more  =  document.getElementById('moreBtn');
const  bullets  =  [...document.querySelectorAll('.bullet')];

const  profile  =  document.getElementById('profile-form');
const  purpose =  document.getElementById('purpose-form');
const  upload =  document.getElementById('upload-form');
const  template =  document.getElementById('template-form');

const heading1 = document.getElementById('heading1');
const heading2 = document.getElementById('heading2');
const heading3 = document.getElementById('heading3');
const heading4 = document.getElementById('heading4');
    
const MAX_STEPS = 4;
let currentStep = 1;

previousBtn.disabled  =  true;
nextBtn.disabled  =  false;
finishBtn.disabled  =  true;

nextBtn.addEventListener('click',  ()  =>  {
	bullets[currentStep  -  1].classList.add('completed');
	currentStep  +=  1;
	previousBtn.disabled  =  false;
	if  (currentStep  ===  MAX_STEPS)  {
		nextBtn.disabled  =  true;
        finishBtn.disabled  =  false;

        heading1.hidden = true;
        heading2.hidden = true;
        heading3.hidden = true;
        heading4.hidden = false;

        purpose.hidden = true;
        profile.hidden = true;
        upload.hidden = true;
        template.hidden = false;
    }
    if  (currentStep  ===  1)   {
        heading1.hidden = false;
        heading2.hidden = true;
        heading3.hidden = true;
        heading4.hidden = true;
        
        purpose.hidden = false;
        profile.hidden = true;
        upload.hidden = true;
        template.hidden = true;
    }
    if  (currentStep  ===  2)   {
        heading1.hidden = true;
        heading2.hidden = false;
        heading3.hidden = true;
        heading4.hidden = true;
        
        purpose.hidden = true;
        profile.hidden = false;
        upload.hidden = true;
        template.hidden = true;
    }
    if  (currentStep  ===  3)   {
        heading1.hidden = true;
        heading2.hidden = true;
        heading3.hidden = false;
        heading4.hidden = true; 
        
        purpose.hidden = true;
        profile.hidden = true;
        upload.hidden = false;
        template.hidden = true;
    }
});


previousBtn.addEventListener('click',  ()  =>  {
	bullets[currentStep  -  2].classList.remove('completed');
	currentStep  -=  1;
	nextBtn.disabled  =  false;
	finishBtn.disabled  =  true;
	if  (currentStep  ===  1)  {
        previousBtn.disabled  =  true;

        heading1.hidden = false;
        heading2.hidden = true;
        heading3.hidden = true;
        heading4.hidden = true;
        
        purpose.hidden = false;
        profile.hidden = true;
        upload.hidden = true;
        template.hidden = true;
    }
    if  (currentStep  ===  2)   {
        heading1.hidden = true;
        heading2.hidden = false;
        heading3.hidden = true;
        heading4.hidden = true;
        
        purpose.hidden = true;
        profile.hidden = false;
        upload.hidden = true;
        template.hidden = true;
    }
    if  (currentStep  ===  3)   {
        heading1.hidden = true;
        heading2.hidden = true;
        heading3.hidden = false;
        heading4.hidden = true; 
        
        purpose.hidden = true;
        profile.hidden = true;
        upload.hidden = false;
        template.hidden = true;
    }
    if  (currentStep  ===  4)   {
        heading1.hidden = true;
        heading2.hidden = true;
        heading3.hidden = true;
        heading4.hidden = false;

        purpose.hidden = true;
        profile.hidden = true;
        upload.hidden = true;
        template.hidden = false;
    }
});

finishBtn.addEventListener('click',  ()  =>  {
	location.reload();
});

$(document).ready(function() {
    var max_fields = 2;
    var wrapper = $("#add-upload-form");
    var add_button = $("#moreBtn");

    var x = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        if (x <= max_fields) {
            x++;
            $(wrapper).append('<div><input type="file" id="myFile" name="filename"><input type="submit"><button class="delete">Delete</button></div><br>'); //add input box
        } else {
            alert('You Reached the limits')
        }
    });

    $(wrapper).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })
});