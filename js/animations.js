//Navbar set on top

const nav = document.getElementById('main-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.remove('top-16');
      nav.classList.add('top-0');
    } else {
      nav.classList.remove('top-0');
      nav.classList.add('top-16');
    }
  });




// plane animation hero section

const plane = document.getElementById('plane');
const triggerZone = document.getElementById('trigger-zone');

if (plane && triggerZone) {
    const playFlight = () => {
        plane.style.animation = 'none';
        plane.offsetHeight; // trigger reflow
        plane.style.animation = 'flyAndPark 3s ease-out forwards';
    };

    const planeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playFlight();
            }
        });
    }, { threshold: 0.5 });

    planeObserver.observe(triggerZone);
    triggerZone.addEventListener('mouseenter', playFlight);
}







// 2. UNIVERSAL CONTENT ANIMATION
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".content-animate, .reveal-left, .reveal-right, .reveal-fade");

    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    // A. Handle 'content-animate' sections
                    if (section.classList.contains('content-animate')) {
                        // Heading(s)
                        section.querySelectorAll(".custom-h").forEach((el) => {
                            el.animate(
                                [{ opacity: 0, transform: "translateY(50px)" }, { opacity: 1, transform: "translateY(0)" }],
                                { duration: 900, easing: "ease-out", fill: "forwards" }
                            );
                        });

                        // Paragraph(s)
                        section.querySelectorAll(".custom-p").forEach((el) => {
                            el.animate(
                                [{ opacity: 0, transform: "translateY(50px)" }, { opacity: 1, transform: "translateY(0)" }],
                                { duration: 900, delay: 200, easing: "ease-out", fill: "forwards" }
                            );
                        });

                        // Items Left
                        section.querySelectorAll(".custom-item").forEach((step, index) => {
                            step.animate(
                                [{ opacity: 0, transform: "translateX(-80px)" }, { opacity: 1, transform: "translateX(0)" }],
                                { duration: 900, delay: 500 + (index * 250), easing: "cubic-bezier(0.25,1,0.5,1)", fill: "forwards" }
                            );
                        });

                        // Items Right
                        section.querySelectorAll(".custom-item-2").forEach((step, index) => {
                            step.animate(
                                [{ opacity: 0, transform: "translateX(80px)" }, { opacity: 1, transform: "translateX(0)" }],
                                { duration: 2000, delay: 100 + (index * 250), easing: "cubic-bezier(0.25,1,0.5,1)", fill: "forwards" }
                            );
                        });

                        // Buttons & Links
                        section.querySelectorAll("button, a").forEach((item, index) => {
                            item.animate(
                                [{ opacity: 0, transform: "translateY(50px)" }, { opacity: 1, transform: "translateY(0)" }],
                                { duration: 800, delay: 800 + (index * 200), easing: "ease-out", fill: "forwards" }
                            );
                        });
                    }

                    // B. Handle legacy 'reveal' classes (if still in use in style.css)
                    if (section.classList.contains('reveal-left')) section.classList.add('animate-slide-left');
                    if (section.classList.contains('reveal-right')) section.classList.add('animate-slide-right');
                    if (section.classList.contains('reveal-fade')) section.classList.add('animate-fade-in');

                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.2 }); // Slightly lower threshold for better mobile trigger

        observer.observe(section);
    });
});






// Book Trip Modal

  const modal = document.getElementById("bookingModal");
  const closeModal = document.getElementById("closeModal");
  const tripName = document.getElementById("tripName");


  document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const place = this.getAttribute("data-place");
      tripName.innerText = place;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });






// Books domestic and interntional trip section 

const getSwiperOptions = (container) => ({
  slidesPerView: 1,
  spaceBetween: 24,
  grabCursor: true,
  navigation: {
    nextEl: container.querySelector('.nav-next'),
    prevEl: container.querySelector('.nav-prev'),
  },
  breakpoints: {
    600: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  },
  on: {
    init: function () { updatePagination(this); },
    slideChange: function () { updatePagination(this); }
  }
});

// button sithch logic
  const domesticContainer = document.getElementById('domestic-section');
  let domesticSwiper = new Swiper(".domesticSwiper", getSwiperOptions(domesticContainer));

  let internationalSwiper;

  function updatePagination(swiper) {
    const paginationContainer = document.getElementById('custom-pagination');
    const totalSteps = swiper.slides.length - Math.floor(swiper.params.slidesPerView) + 1;
    const current = swiper.activeIndex;
    
    paginationContainer.innerHTML = '';
    for (let i = 0; i < Math.max(totalSteps, 1); i++) {
      const line = document.createElement('div');
      line.className = `w-10 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-amber-700' : 'bg-gray-300'}`;
      paginationContainer.appendChild(line);
    }
  }

  // Tab Switching Logic
  const buttons = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.content-section');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');


      buttons.forEach(b => b.classList.remove('bg-[#1A1A1A]', 'text-white'));
      buttons.forEach(b => b.classList.add('text-gray-900'));
      btn.classList.add('bg-[#1A1A1A]', 'text-white');

      sections.forEach(s => s.classList.add('hidden'));
      const activeSection = document.getElementById(`${target}-section`);
      activeSection.classList.remove('hidden');

      if (target === 'international') {
        if (!internationalSwiper) {
          internationalSwiper = new Swiper(".internationalSwiper", getSwiperOptions(activeSection));
        } else {
          internationalSwiper.update();
          updatePagination(internationalSwiper);
        }
      } else {
        domesticSwiper.update();
        updatePagination(domesticSwiper);
      }
    });
  });






// Blogs scetion card left right scroll

const getBlogSwiperOptions = (container) => ({
  slidesPerView: 1,
  spaceBetween: 24,
  grabCursor: true,
  navigation: {
    nextEl: container.querySelector('.nav-next'),
    prevEl: container.querySelector('.nav-prev'),
  },
  breakpoints: {
    600: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  },
  on: {
    init: function () { updateBlogPagination(this); },
    slideChange: function () { updateBlogPagination(this); },
    resize: function () { updateBlogPagination(this); }
  }
});

function updateBlogPagination(swiper) {
  const paginationContainer = document.getElementById('blog-pagination');
  if (!paginationContainer) return;

  const totalSteps = swiper.slides.length - Math.floor(swiper.params.slidesPerView) + 1;
  const current = swiper.activeIndex;
  
  paginationContainer.innerHTML = '';
  for (let i = 0; i < Math.max(totalSteps, 1); i++) {
    const line = document.createElement('div');
    line.className = `w-10 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-amber-700' : 'bg-gray-300'}`;
    paginationContainer.appendChild(line);
  }
}

const blogSection = document.getElementById('blog-section');
if (blogSection) {
  const blogSwiper = new Swiper(".blogSwiper", getBlogSwiperOptions(blogSection));
}







// Questions section question to answer field open

document.querySelectorAll('.accordion-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const currentItem = button.closest('.faq-item');
    
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== currentItem) {
        item.classList.remove('active');
        item.classList.replace('border-[#AB8A5C]', 'border-[#E5E5E5]');
        item.classList.replace('bg-[#FFF9F0]', 'bg-[#FBFBFE]');
      }
    });

    const isActive = currentItem.classList.toggle('active');
    
    if (isActive) {
      currentItem.classList.replace('border-[#E5E5E5]', 'border-[#AB8A5C]');
      currentItem.classList.replace('bg-[#FBFBFE]', 'bg-[#FFF9F0]');
    } else {
      currentItem.classList.replace('border-[#AB8A5C]', 'border-[#E5E5E5]');
      currentItem.classList.replace('bg-[#FFF9F0]', 'bg-[#FBFBFE]');
    }
  });
});






    {/* Contact Us Modal  */}

  document.addEventListener('DOMContentLoaded', () => {
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal2');
    const modalContent = contactModal?.querySelector('div');
    
    const triggerButtons = document.querySelectorAll('.contact-trigger');

    const openModal = () => {
      contactModal.classList.remove('hidden');
      contactModal.classList.add('flex');
      setTimeout(() => {
        contactModal.classList.add('opacity-100');
        modalContent?.classList.remove('scale-95');
        modalContent?.classList.add('scale-100');
      }, 10);
    };

    const hideModal = () => {
      contactModal.classList.remove('opacity-100');
      modalContent?.classList.add('scale-95');
      setTimeout(() => {
        contactModal.classList.add('hidden');
        contactModal.classList.remove('flex');
      }, 300);
    };

    triggerButtons.forEach(btn => {
      btn.addEventListener('click', openModal);
    });

    if (closeModal) closeModal.addEventListener('click', hideModal);
    
    window.addEventListener('click', (e) => {
      if (e.target === contactModal) hideModal();
    });
  });





 {/* Nav links move */}

  window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-[#FE6A34]', 'border-b-2', 'border-[#FE6A34]', 'font-semibold');
      link.classList.add('text-[#F7F9FF]');
      
      if (link.getAttribute("href").includes(current)) {
        link.classList.add('text-[#FE6A34]', 'border-b-2', 'border-[#FE6A34]', 'font-semibold');
        link.classList.remove('text-[#F7F9FF]');
      }
    });
  });





 {/* Footer link */}

  document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const footerLinks = document.querySelectorAll('.footer-link');

    footerLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath.split('/').pop()) {
        link.classList.add('text-[#FE6A34]', 'border-[#FE6A34]');
        link.classList.remove('text-[#D2E4FB]/70', 'border-transparent');
      }
    });
  });






    // Scroll up Button

  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollTopBtn.classList.remove('hidden');
      scrollTopBtn.classList.add('flex');
    } else {
      scrollTopBtn.classList.add('hidden');
      scrollTopBtn.classList.remove('flex');
    }
  };

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });





    // Image Gravity Animation

    document.addEventListener("DOMContentLoaded", () => {
      const cards = document.querySelectorAll(".animate-card");
      const section = document.querySelector(".animate-card").parentElement;

      let played = false;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !played) {
              played = true;

              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.animate(
                    [
                      { opacity: 0, transform: "translateY(-180px) scale(0.95)" },
                      { opacity: 1, transform: "translateY(12px) scale(1.02)", offset: 0.75 },
                      { opacity: 1, transform: "translateY(0) scale(1)" }
                    ],
                    {
                      duration: 2500,
                      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                      fill: "forwards"
                    }
                  );
                }, index * 300);
              });
            }
          });
        },
        {
          threshold: 0.3
        }
      );

      observer.observe(section);
    });





    // Image small to big Animation 

    document.addEventListener("DOMContentLoaded", () => {
      const images = document.querySelectorAll(".img-animate-2");

      images.forEach((box) => {
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;

          box.animate(
            [
              { opacity: 0, transform: "translateY(100px) scale(.8) rotate(0deg)" },
              { opacity: 1, transform: "translateY(-18px) scale(1.03) rotate(0deg)", offset: 0.75 },
              { opacity: 1, transform: "translateY(0) scale(1) rotate(0deg)" }
            ],
            {
              duration: 2500,
              easing: "cubic-bezier(.22,1,.36,1)",
              fill: "forwards"
            }
          );

          observer.unobserve(box);
        }, { threshold: 0.35 });

        observer.observe(box);
      });
    });




    // Image fade-out to fade-in Animation

    document.addEventListener("DOMContentLoaded", () => {
      const images = document.querySelectorAll(".img-animate");

      images.forEach((box) => {
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;

          box.animate(
            [
              { opacity: 0, transform: "scale(0.45) rotate(0deg)" },
              { opacity: 1, transform: "scale(1.06) rotate(0deg)", offset: 0.75 },
              { opacity: 1, transform: "scale(1) rotate(0deg)" }
            ],
            {
              duration: 3000,
              easing: "cubic-bezier(0.22,1,0.36,1)",
              fill: "forwards"
            }
          );

          observer.unobserve(box);
        }, { threshold: 0.3 });

        observer.observe(box);
      });
    });








    // SLIDER 
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.card, .card-2');
        
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('reveal-visible');
          }, index * 300);
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('#destination-section, #blog-section');
  sections.forEach(sec => observer.observe(sec));
});



  // Countdown Script

document.addEventListener("DOMContentLoaded", () => {

  const targetDate = new Date(2026, 3, 24, 18, 30, 0); // April 25 2026

  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  function format(num) {
    return num < 10 ? "0" + num : String(num);
  }

  function updateCountdown() {
    const now = new Date();
    let diff = Math.floor((targetDate - now) / 1000);

    if (diff <= 0) {
      diff = 0;
      clearTimeout(timer);
    }

    const days = Math.floor(diff / 86400);
    diff %= 86400;

    const hours = Math.floor(diff / 3600);
    diff %= 3600;

    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    els.days.innerHTML = format(days);
    els.hours.innerHTML = format(hours);
    els.minutes.innerHTML = format(minutes);
    els.seconds.innerHTML = format(seconds);

    // next update exactly every second
    const delay = 1000 - (Date.now() % 1000);
    timer = setTimeout(updateCountdown, delay);
  }

  let timer;
  updateCountdown();

});




// animate-slide-left & animate-slide-right and fade in effect

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' 
  };

  const globalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        if (el.classList.contains('reveal-left')) el.classList.add('animate-slide-left');
        if (el.classList.contains('reveal-right')) el.classList.add('animate-slide-right');
        if (el.classList.contains('reveal-fade')) el.classList.add('animate-fade-in');

        globalObserver.unobserve(el);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-fade');
  elements.forEach(el => globalObserver.observe(el));
});






// animate-arrow-moving

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null, 
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const arrow = entry.target.querySelector('[class*="moving-arrow"]');
        if (arrow) {
          arrow.classList.add('animate-now');
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.path-container').forEach(container => {
    observer.observe(container);
  });
});