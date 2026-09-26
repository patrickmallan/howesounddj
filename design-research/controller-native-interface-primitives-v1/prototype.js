const cueButton = document.querySelector('.cue-button');
const cueLabel = cueButton?.querySelector('.cue-button-label');
const cueStatus = document.querySelector('#cue-status');

if (cueButton && cueLabel && cueStatus) {
  cueButton.addEventListener('click', () => {
    if (cueButton.dataset.state !== 'idle') return;
    cueButton.dataset.state = 'loading';
    cueButton.disabled = true;
    cueLabel.textContent = 'CHECKING…';
    cueStatus.textContent = 'Checking the date.';

    window.setTimeout(() => {
      cueButton.dataset.state = 'success';
      cueLabel.textContent = 'DATE READY';
      cueStatus.textContent = 'Date ready. Success state shown.';
    }, 900);

    window.setTimeout(() => {
      cueButton.dataset.state = 'idle';
      cueButton.disabled = false;
      cueLabel.textContent = 'CHECK YOUR DATE';
      cueStatus.textContent = 'Control reset.';
    }, 2700);
  });
}

const channels = [...document.querySelectorAll('.vu-channel')];
const segmentCount = 24;

channels.forEach((channel) => {
  for (let index = 0; index < segmentCount; index += 1) {
    const segment = document.createElement('span');
    segment.className = 'vu-segment';
    segment.style.setProperty(
      '--segment-color',
      index >= 21 ? 'var(--red)' : index >= 17 ? 'var(--orange)' : 'var(--green)'
    );
    channel.append(segment);
  }
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let levels = [0.48, 0.44];
let targets = [0.48, 0.44];
let lastFrame = 0;
let lastBeat = 0;

function drawMeter(timestamp) {
  if (reducedMotion.matches) {
    levels = [0.58, 0.52];
  } else if (timestamp - lastBeat > 120 + Math.random() * 260) {
    const shared = 0.24 + Math.random() * 0.58;
    const rarePeak = Math.random() > 0.92 ? 0.18 : 0;
    targets = [
      Math.min(1, shared + rarePeak + (Math.random() - 0.5) * 0.14),
      Math.min(1, shared + rarePeak + (Math.random() - 0.5) * 0.18)
    ];
    lastBeat = timestamp;
  }

  if (timestamp - lastFrame > 48 || reducedMotion.matches) {
    levels = levels.map((level, index) => {
      const target = targets[index];
      const factor = target > level ? 0.72 : 0.105;
      return level + (target - level) * factor;
    });

    channels.forEach((channel, channelIndex) => {
      const litCount = Math.round(levels[channelIndex] * segmentCount);
      [...channel.children].forEach((segment, index) => {
        segment.classList.toggle('is-lit', index < litCount);
      });
    });
    lastFrame = timestamp;
  }

  if (!reducedMotion.matches) requestAnimationFrame(drawMeter);
}

requestAnimationFrame(drawMeter);

const faderCap = document.querySelector('.fader-cap');
const faderSection = document.querySelector('.primitive-fader');

function updateFader() {
  if (!faderCap || !faderSection) return;
  const rect = faderSection.getBoundingClientRect();
  const viewport = window.innerHeight;
  const progress = Math.max(0.1, Math.min(0.9, (viewport - rect.top) / (viewport + rect.height)));
  faderCap.style.setProperty('--fader-progress', progress.toFixed(3));
}

updateFader();
window.addEventListener('scroll', updateFader, { passive: true });
window.addEventListener('resize', updateFader);
