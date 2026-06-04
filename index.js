// ── 시대 박스 클릭 → timeline.html 해당 섹션으로 이동 ──
document.getElementById('phase-ancient').addEventListener('click', () => {
  location.href = 'timeline.html#ancient-sec';
});

document.getElementById('phase-medieval').addEventListener('click', () => {
  location.href = 'timeline.html#medieval-sec';
});

document.getElementById('phase-earlymodern').addEventListener('click', () => {
  location.href = 'timeline.html#early-modern-sec';
});

document.getElementById('phase-modern').addEventListener('click', () => {
  location.href = 'timeline.html#modern-sec';
});
