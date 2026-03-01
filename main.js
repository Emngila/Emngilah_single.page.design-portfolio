const track = document.querySelector('.slides');
const slides = track ? Array.from(track.querySelectorAll('.slide')) : [];
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const status = document.getElementById('slide-status');
const dotsWrap = document.getElementById('slide-dots');

if (track && slides.length > 0 && prevButton && nextButton) {
  const total = slides.length;
  let index = 0;
  let touchStartX = 0;

  const getStep = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0');
    return slideWidth + gap;
  };

  const dots = [];
  if (dotsWrap) {
    for (let i = 0; i < total; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className =
        'h-2 w-2 rounded-full bg-Neutral-400 transition-all duration-300';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        index = i;
        render(true);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }
  }

  const render = (animate) => {
    const step = getStep();
    track.style.transition = animate ? 'transform 300ms ease-out' : 'none';
    track.style.transform = `translateX(-${index * step}px)`;

    if (status) {
      status.textContent = `${index + 1} / ${total}`;
    }

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle('bg-Neutral-900', active);
      dot.classList.toggle('w-5', active);
      dot.classList.toggle('bg-Neutral-400', !active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  const next = () => {
    index = (index + 1) % total;
    render(true);
  };

  const prev = () => {
    index = (index - 1 + total) % total;
    render(true);
  };

  prevButton.addEventListener('click', prev);
  nextButton.addEventListener('click', next);

  window.addEventListener('resize', () => render(false));

  track.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  });

  track.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;

    if (Math.abs(delta) < 40) {
      return;
    }

    if (delta < 0) {
      next();
    } else {
      prev();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      next();
    }
    if (event.key === 'ArrowLeft') {
      prev();
    }
  });

  render(false);
}
