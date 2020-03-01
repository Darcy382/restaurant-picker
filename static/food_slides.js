/* The sideshow functions originate from https://www.w3schools.com/howto/howto_js_slideshow.asp*/
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("food_photo");
    if (n >= slides.length) {slideIndex = 1}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// Redirects the browser to the yelp link for the image being viewed
function goToYelp(biz_list) {
    const loader = document.querySelector(".loader");  // Displays loading screen
    loader.className = "loader"; // class "loader hidden
    let url = biz_list[slideIndex - 1];
    window.location.replace(url);
}

// Preforms a search function for the type of food being viewed
function showSimilar(categories) {
    console.log(categories);
    const loader = document.querySelector(".loader");  // Displays loading screen
    loader.className = "loader"; // class "loader hidden
    search("/search?", categories[slideIndex - 1]);
}