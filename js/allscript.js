let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.add('active');
}

document.querySelector('#nav-close').onclick = () =>{
    navbar.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.add('active');
}

document.querySelector('#close-search').onclick = () =>{
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
};

window.onload = () =>{
    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
};






// -------------------------------------------to top scroller------------------------------------

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})






// --------------------------------------------product main page js----------------------------------

let tabs = document.querySelectorAll('.tabs__toggle'),
    contents = document.querySelectorAll('.tabs__content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        contents.forEach((content) => {
            content.classList.remove('is-active');
        });
        tabs.forEach((tab) => {
            tab.classList.remove('is-active');
        });
        contents[index].classList.add('is-active');
        tabs[index].classList.add('is-active');
    });
});


const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const slides = document.querySelectorAll('.carousel-track img');
let currentIndex = 0;

function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);

// --------------------------------------------contact us page js----------------------------------
var form = document.getElementById("contactForm");
var statusDiv = document.getElementById("form-status");

form.addEventListener("submit", function(event) {
    // Prevent the default form submission to a new page
    event.preventDefault(); 

    // Get the form data
    var data = new FormData(event.target);

    // Send the data to Formspree
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            // This header is required for Formspree to send a JSON response
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // On success, display a success message and clear the form
            statusDiv.innerHTML = "Thanks for your submission! We'll get back to you shortly.";
            form.reset();
        } else {
            // On failure, parse the error message from the response and display it
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    statusDiv.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    statusDiv.innerHTML = "Oops! There was a problem submitting your form.";
                }
            });
        }
    }).catch(error => {
        // Handle network errors
        statusDiv.innerHTML = "Oops! Something went wrong with the network. Please try again.";
    });
});