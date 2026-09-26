const cap = document.querySelector('.scroll-cap');

function updateScrollControl() {
  const range = document.documentElement.scrollHeight - innerHeight;
  const progress = range > 0 ? scrollY / range : 0;
  cap?.style.setProperty('--progress', progress.toFixed(4));
}

addEventListener('scroll', updateScrollControl, { passive: true });
addEventListener('resize', updateScrollControl);
updateScrollControl();
