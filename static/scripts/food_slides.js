/*
* food_slides.js holds the functions that display images of food and their associated actions when the users presses the
* "show me some food" button.
*
* Please note: The sideshow functions are modeled from https://www.w3schools.com/howto/howto_js_slideshow.asp.
* */

var slideIndex = 1;
showSlides(slideIndex);

//Goes to next food picture
function plusSlides(n) {
    showSlides(slideIndex += n);
}

//Displays the current food picture
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("food_photo");
    if (n >= slides.length) {slideIndex = 1}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// "I want this" button - Redirects the browser to the yelp link for the image being viewed
function goToYelp(biz_list) {
    let url = biz_list[slideIndex - 1];
    window.open(url, "_blank");
}

// "Show me food like this" button - Preforms a search function for the type of food being viewed
function showSimilar(categories) {
    displayLoader();
    search("/search?", categories[slideIndex - 1]);
}