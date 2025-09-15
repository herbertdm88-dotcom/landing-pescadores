document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");
  let current = 0;
  const total = slides.length;

  function showSlide(n) {
    slides.forEach((s, i) => {
      s.style.display = (i === n) ? "block" : "none";
    });
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === n);
    });
  }

  function goNext() {
    current = (current + 1) % total;
    showSlide(current);
  }
  function goPrev() {
    current = (current - 1 + total) % total;
    showSlide(current);
  }

  next.addEventListener("click", goNext);
  prev.addEventListener("click", goPrev);
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      current = i;
      showSlide(current);
    });
  });

  // Swipe
  let startX = 0;
  let isDragging = false;

  const carousel = document.querySelector(".carousel-container");

  carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  }, {passive: true});

  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    // opcional: aqui dá pra mover visualmente
  }, {passive: true});

  carousel.addEventListener("touchend", (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      goNext();
    } else if (endX - startX > 50) {
      goPrev();
    }
  });

  // Auto play
  showSlide(current);
  setInterval(goNext, 5000);
});
