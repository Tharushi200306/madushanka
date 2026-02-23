/**
 * B-Classy Lifestyle - All Functionalities
 * (Slider, Search, and Cart)
 */

// --- 1. Automatic Background Image Slider ---
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    if (slides.length > 0) {
        // දැනට ඇති සියලුම slide වලින් 'active' class එක ඉවත් කරන්න
        slides.forEach(s => s.classList.remove('active'));
        
        // ඊළඟ slide එකේ අංකය ගණනය කරන්න
        slideIndex = (slideIndex + 1) % slides.length;
        
        // නව slide එක පෙන්වන්න
        slides[slideIndex].classList.add('active');
    }
}

// සෑම තත්පර 4කට වරක් රූපය ස්වයංක්‍රීයව මාරු වේ (4000ms = 4s)
setInterval(showSlides, 4000);

// bar-fisht//
const ticker = document.querySelector('.ticker-content');

ticker.addEventListener('mouseover', () => {
    ticker.style.animationPlayState = 'paused';
});

ticker.addEventListener('mouseout', () => {
    ticker.style.animationPlayState = 'running';
});

document.querySelectorAll('.hover-img').forEach(img => {
    // මවුස් එක රූපය මතට ගෙන ආ විට
    img.addEventListener('mouseover', function() {
        this.style.opacity = '0'; // ස්වල්පයකට අඳුරු කර
        setTimeout(() => {
            this.src = this.getAttribute('data-hover'); // දෙවැනි රූපය දමන්න
            this.style.opacity = '1';
        }, 200);
    });

    // මවුස් එක ඉවතට ගත් විට
    img.addEventListener('mouseout', function() {
        this.style.opacity = '0';
        setTimeout(() => {
            this.src = this.getAttribute('data-original'); // මුල් රූපය දමන්න
            this.style.opacity = '1';
        }, 200);
    });
});
document.querySelectorAll('.small-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        this.querySelector('img').style.transform = 'scale(1.1)';
    });
    card.addEventListener('touchend', function() {
        this.querySelector('img').style.transform = 'scale(1.0)';
    });
});

const reviews = [
    { text: "Highly recommended", name: "Ruchika subasinghe" },
    { text: "It's nice ❤️", name: "Spiretech Software Solutions" }
];

let testiIndex = 0;
let autoSlideInterval;

// Slide එක මාරු කරන ප්‍රධාන function එක
function showTestimonial(n) {
    const testiSlides = document.querySelectorAll('.testi-slide');
    
    // සියලුම slides වලින් active class එක අයින් කරන්න
    testiSlides.forEach(slide => slide.classList.remove('active'));
    
    // Index එක හරි විදිහට ගණනය කරන්න
    testiIndex = (n + testiSlides.length) % testiSlides.length;
    
    // අදාළ slide එකට active class එක ලබා දෙන්න
    testiSlides[testiIndex].classList.add('active');
}

// Button එක එබුවහම ක්‍රියාත්මක වන function එක
function moveSlide(n) {
    showTestimonial(testiIndex + n);
    resetAutoSlide(); // Button එක එබුවහම timer එක මුල ඉඳන් පටන් ගන්නවා
}

// Auto මාරු වෙන්න timer එකක් පටන් ගැනීම
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showTestimonial(testiIndex + 1);
    }, 4000); // තත්පර 4කට වරක් මාරු වේ
}

// Timer එක Reset කිරීම (Buttons එබූ විට)
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Page එක Load වෙද්දීම Timer එක පටන් ගන්න
startAutoSlide();
const scrollElements = document.querySelectorAll(".scroll-fade");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

scrollElements.forEach(el => observer.observe(el));
// Hide preloader after page load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.transition = 'opacity 0.6s ease';
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 600);
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            // තිරයේ පළල 768px ට අඩු නම් පමණක් (Mobile)
            if (window.innerWidth <= 768) {
                e.preventDefault(); 
                
                // දැනට විවෘතව ඇති වෙනත් dropdown වසා දමන්න
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });

                // ක්ලික් කළ එක විවෘත කිරීම හෝ වැසීම
                dropdown.classList.toggle('active');
            }
        });
    });

    // 1. Handle Submenu Toggles (Mens/Womens)
    const submenuTitles = document.querySelectorAll('.submenu-title');
    submenuTitles.forEach(title => {
        title.addEventListener('click', () => {
            const parent = title.parentElement;
            parent.classList.toggle('active');
        });
    });
    
    // 2. Cleaned up Search and Cart Logic
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const cartBtn = document.getElementById('cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');

    // Open Search
    searchBtn?.addEventListener('click', () => {
        searchOverlay?.classList.add('open');
    });

    // Open Cart
    cartBtn?.addEventListener('click', () => {
        cartDrawer?.classList.add('open');
    });

    // Escape key to close overlays
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            if (searchOverlay?.classList.contains('open')) {
                searchOverlay.classList.remove('open');
            }
            if (cartDrawer?.classList.contains('open')) {
                cartDrawer.classList.remove('open');
            }
        }
    });

});

// Function for Video Muting (as referenced in your HTML)
function toggleMute(videoId, btn) {
    const video = document.getElementById(videoId);
    if (video.muted) {
        video.muted = false;
        btn.innerText = '🔊';
    } else {
        video.muted = true;
        btn.innerText = '🔇';
    }
}
