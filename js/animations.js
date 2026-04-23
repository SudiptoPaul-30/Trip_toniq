const plane = document.getElementById('plane');
const triggerZone = document.getElementById('trigger-zone');

// Function to reset and play animation
const playFlight = () => {
  plane.style.animation = 'none';
  plane.offsetHeight; // Force reflow
  plane.style.animation = 'flyAndPark 3s ease-out forwards';
};

// 1. Trigger on Scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      playFlight();
    }
  });
}, { threshold: 0.5 });

observer.observe(triggerZone);

// 2. Trigger on Hover
triggerZone.addEventListener('mouseenter', playFlight);







  const modal = document.getElementById("bookingModal");
  const closeModal = document.getElementById("closeModal");
  const tripName = document.getElementById("tripName");

  // Common class click
  document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const place = this.getAttribute("data-place");
      tripName.innerText = place;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  // Outside click close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });







  // Configuration Helper
const getSwiperOptions = (container) => ({
  slidesPerView: 1, // Default (below 600px)
  spaceBetween: 24,
  grabCursor: true, // Hand mode active
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

  // Init Domestic
  const domesticContainer = document.getElementById('domestic-section');
  let domesticSwiper = new Swiper(".domesticSwiper", getSwiperOptions(domesticContainer));

  // Init International (Lazy init on tab click)
  let internationalSwiper;

  function updatePagination(swiper) {
    const paginationContainer = document.getElementById('custom-pagination');
    // Calculate total dots based on viewable area
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

      // Update UI
      buttons.forEach(b => b.classList.remove('bg-[#1A1A1A]', 'text-white'));
      buttons.forEach(b => b.classList.add('text-gray-900'));
      btn.classList.add('bg-[#1A1A1A]', 'text-white');

      sections.forEach(s => s.classList.add('hidden'));
      const activeSection = document.getElementById(`${target}-section`);
      activeSection.classList.remove('hidden');

      // Refresh/Init Swiper
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






  






  