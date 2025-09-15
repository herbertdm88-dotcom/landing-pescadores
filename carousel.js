document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll(".carousel-slide");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const dots = document.querySelectorAll(".dot");
  let current = 0;
  const total = slides.length;

  function goToSlide(n) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (n + total) % total;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    goToSlide(current + 1);
  });

  prevBtn.addEventListener("click", () => {
    goToSlide(current - 1);
  });

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-slide"));
      goToSlide(idx);
    });
  });

  // swipe/touch para celular
  let startX = 0;
  let endX = 0;
  const threshold = 50; // distância mínima para considerar swipe

  const hero = document.querySelector(".hero-carousel");
  hero.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  hero.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });
  hero.addEventListener("touchend", (e) => {
    if (startX - endX > threshold) {
      goToSlide(current + 1);
    } else if (endX - startX > threshold) {
      goToSlide(current - 1);
    }
  });

  // opcional: auto-play
  setInterval(() => {
    goToSlide(current + 1);
  }, 5000); // troca a cada 5 segundos
});
