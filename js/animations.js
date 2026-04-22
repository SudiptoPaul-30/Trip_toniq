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