/* Lightweight touch-friendly carousel: one independent slider per product category. */
document.querySelectorAll('.carousel').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.slide')];
  const section = carousel.closest('.gallery-section');
  const controls = section.querySelector('.slider-controls');
  const count = controls.querySelector('.slider-count');
  let index = 0;
  let startX = 0;
  let deltaX = 0;

  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };

  controls.querySelector('[data-direction="next"]').addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });

  controls.querySelector('[data-direction="prev"]').addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  carousel.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
    deltaX = 0;
    carousel.setPointerCapture?.(event.pointerId);
  });

  carousel.addEventListener('pointermove', (event) => {
    if (startX) deltaX = event.clientX - startX;
  });

  carousel.addEventListener('pointerup', () => {
    if (Math.abs(deltaX) > 45) {
      index = deltaX < 0 ? (index + 1) % slides.length : (index - 1 + slides.length) % slides.length;
      render();
    }
    startX = 0;
    deltaX = 0;
  });

  carousel.addEventListener('pointercancel', () => {
    startX = 0;
    deltaX = 0;
  });

  render();
});
