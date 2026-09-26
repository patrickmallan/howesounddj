const channels = [...document.querySelectorAll('.vu-channel')];
const segmentCount = 22;

channels.forEach((channel) => {
  for (let index = 0; index < segmentCount; index += 1) {
    const segment = document.createElement('span');
    segment.className = 'vu-segment';
    segment.style.setProperty(
      '--segment',
      index >= 20 ? 'var(--red)' : index >= 17 ? 'var(--orange)' : 'var(--green)'
    );
    channel.append(segment);
  }
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let levels = [0.52, 0.48];
let targets = [0.52, 0.48];
let lastFrame = 0;
let lastTransient = 0;

function renderMeter(timestamp) {
  if (reducedMotion.matches) {
    levels = [0.58, 0.53];
  } else if (timestamp - lastTransient > 135 + Math.random() * 245) {
    const sharedProgram = 0.27 + Math.random() * 0.57;
    const rarePeak = Math.random() > 0.94 ? 0.17 : 0;
    targets = [
      Math.min(1, sharedProgram + rarePeak + (Math.random() - .5) * .13),
      Math.min(1, sharedProgram + rarePeak + (Math.random() - .5) * .17)
    ];
    lastTransient = timestamp;
  }

  if (timestamp - lastFrame > 48 || reducedMotion.matches) {
    levels = levels.map((level, index) => {
      const target = targets[index];
      return level + (target - level) * (target > level ? .72 : .105);
    });

    channels.forEach((channel, channelIndex) => {
      const active = Math.round(levels[channelIndex] * segmentCount);
      [...channel.children].forEach((segment, index) => {
        segment.classList.toggle('is-lit', index < active);
      });
    });
    lastFrame = timestamp;
  }

  if (!reducedMotion.matches) requestAnimationFrame(renderMeter);
}

requestAnimationFrame(renderMeter);

const fader = document.querySelector('.chapter-fader');

function updateFader() {
  if (!fader) return;
  const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.max(.14, Math.min(.84, .14 + (window.scrollY / scrollable) * .7));
  fader.style.setProperty('--progress', progress.toFixed(3));
}

updateFader();
window.addEventListener('scroll', updateFader, { passive: true });
window.addEventListener('resize', updateFader);
