// Show Scroll to Top Button
window.onscroll = function() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }

     // Animate radial gradient
     const scrollPosition = window.scrollY;
     const xOffset = scrollPosition * 0.3;
     const yOffset = scrollPosition * 0.7;
     document.body.style.backgroundPosition = `${xOffset}px ${yOffset}px`;
   };

  // Scroll to Top Function
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Form Submission Handling
  document.getElementById('purchase-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Redirect to download page after purchase
    window.location.href = 'download.ejs';
  });

//   related books swiper
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.related-books-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            300: {
                slidesPerView: 3.3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3.3,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 4.6,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 6,
                spaceBetween: 10,
            },
        },
    });
});

// teztimonials swiper
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            300: {
                slidesPerView: 1.3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3.3,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3.6,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 3.6,
                spaceBetween: 10,
            },
        },
    });
});


// Select all elements with the animation class
const animatedSections = document.querySelectorAll('.animated-section');

// Create an IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add the 'visible' class when the element enters the viewport
            entry.target.classList.add('visible');
        }
    });
});

// Observe each animated section
animatedSections.forEach((section) => {
    observer.observe(section);
});

 if (message) 
    setTimeout(function() {
      const messageElement = document.getElementById('message');
      if (messageElement) {
        messageElement.style.display = 'none'; // Hide the message
      }
    }, 5000); // 5000ms = 5 seconds
 
    // admin
    document.querySelector("form").addEventListener("submit", function(event) {
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
      
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          event.preventDefault(); // Prevent form submission
        }
      });
      