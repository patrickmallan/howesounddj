const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const vuContainers = document.querySelectorAll('.vu');

vuContainers.forEach((channel, channelIndex) => {
  const count = channel.closest('.peak-vu') ? 28 : 22;
  for (let index = 0; index < count; index += 1) {
    const segment = document.createElement('i');
    segment.className = 'vu-segment';
    const ratio = index / count;
    segment.style.setProperty('--segment', ratio > .78 ? '#ef2727' : ratio > .55 ? '#ffe000' : '#45ef68');
    channel.append(segment);
  }
  channel.dataset.phase = String(channelIndex * 1.7);
});

function updateMeters(time = 0) {
  vuContainers.forEach((channel, index) => {
    const peakBoost = channel.closest('.peak-vu') ? .22 : 0;
    const scrollPulse = Math.sin(window.scrollY * .013 + index * 1.8) * .1;
    const timePulse = reduceMotion ? 0 : Math.sin(time * .003 + Number(channel.dataset.phase)) * .12;
    const level = Math.max(.28, Math.min(.97, .54 + peakBoost + scrollPulse + timePulse));
    const segments = channel.querySelectorAll('.vu-segment');
    segments.forEach((segment, segmentIndex) => segment.classList.toggle('is-lit', segmentIndex / segments.length < level));
  });
  if (!reduceMotion) requestAnimationFrame(updateMeters);
}

if (reduceMotion) updateMeters(0);
else requestAnimationFrame(updateMeters);

const arrival = document.querySelector('.arrival');
const fader = document.querySelector('.scroll-fader');
function updateFader() {
  const progress = Math.max(0, Math.min(1, -arrival.getBoundingClientRect().top / Math.max(1, arrival.offsetHeight * .85)));
  fader.style.setProperty('--position', String(.18 + progress * .65));
}
addEventListener('scroll', updateFader, { passive: true });
updateFader();

const chapters = [...document.querySelectorAll('.chapter')];
const links = [...document.querySelectorAll('.pad-link')];
const sectionTargets = new Map([
  ['sound-check', 0], ['room-remembers', 1], ['operator', 2], ['build', 3], ['read-room', 4], ['encore', 5]
]);

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const activeIndex = sectionTargets.get(visible.target.id);
  if (activeIndex === undefined) return;
  links.forEach((link, index) => link.classList.toggle('is-active', index === activeIndex));
}, { threshold: [.22, .48, .7] });
chapters.forEach((chapter) => observer.observe(chapter));
