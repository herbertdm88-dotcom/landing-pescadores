// carousel.js - suporta pointer (mouse + touch) e autoplay
document.addEventListener("DOMContentLoaded", function () {
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const dots = Array.from(document.querySelectorAll(".dot"));
  const hero = document.querySelector(".hero-carousel");
  if (!slides.length || !hero) return; // segurança

  let current = 0;
  const total = slides.length;
  const threshold = 50; // px para considerar swipe
  let startX = 0;
  let isPointerDown = false;

  function update() {
    slides.forEach((s, i) => s.classList.toggle("active", i === current));
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function goToSlide(n) {
    current = (n + total) % total;
    update();
  }

  // botões
  nextBtn?.addEventListener("click", () => goToSlide(current + 1));
  prevBtn?.addEventListener("click", () => goToSlide(current - 1));

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.target.dataset.slide, 10);
      if (!isNaN(idx)) goToSlide(idx);
    });
  });

  // Pointer events (funciona para mouse e touch; recomendado pelo MDN)
  hero.style.touchAction = "pan-y"; // permite scroll vertical, captura horizontal
  hero.addEventListener("pointerdown", (e) => {
    isPointerDown = true;
    startX = e.clientX;
    // garante que o elemento capture os eventos desse pointer
    if (e.target.setPointerCapture) {
      try { e.target.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }
  });

  hero.addEventListener("pointermove", (e) => {
    if (!isPointerDown) return;
    // opcional: aqui você poderia mover slides visualmente durante o drag
    // Estamos apenas coletando a posição
  });

  hero.addEventListener("pointerup", (e) => {
    if (!isPointerDown) return;
    const diff = startX - e.clientX;
    if (diff > threshold) goToSlide(current + 1);
    else if (diff < -threshold) goToSlide(current - 1);
    isPointerDown = false;
  });

  hero.addEventListener("pointercancel", () => {
    isPointerDown = false;
  });

  // Fallback para navegadores antigos: touch events (só se pointer não existir)
  if (!window.PointerEvent) {
    let tStart = 0, tEnd = 0;
    hero.addEventListener("touchstart", (ev) => { tStart = ev.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", (ev) => {
      tEnd = ev.changedTouches[0].clientX;
      const diff = tStart - tEnd;
      if (diff > threshold) goToSlide(current + 1);
      else if (diff < -threshold) goToSlide(current - 1);
    }, { passive: true });
  }

  // autoplay
  const autoplayInterval = 5000;
  let autoplayId = setInterval(() => goToSlide(current + 1), autoplayInterval);

  // pausar autoplay ao passar o mouse / tocar
  hero.addEventListener("mouseenter", () => clearInterval(autoplayId));
  hero.addEventListener("mouseleave", () => { autoplayId = setInterval(() => goToSlide(current + 1), autoplayInterval); });
  hero.addEventListener("pointerdown", () => clearInterval(autoplayId));
  hero.addEventListener("pointerup", () => { autoplayId = setInterval(() => goToSlide(current + 1), autoplayInterval); });

  // inicializa visual
  update();
});
