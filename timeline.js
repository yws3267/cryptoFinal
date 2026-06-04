document.addEventListener('DOMContentLoaded', () => {
  const events = document.querySelectorAll('.event');
  const sections = document.querySelectorAll('.content-section');

  events.forEach((event) => {
    event.addEventListener('click', () => {
      // 1. 타임라인 노드 활성화 클래스 전환 제어
      events.forEach((ev) => ev.classList.remove('active'));
      event.classList.add('active');

      // 2. 전체 섹션 노출 리셋
      sections.forEach((sec) => sec.classList.remove('active'));

      // 3. 클릭된 이벤트의 data-target에 매핑된 섹션 활성화
      const targetId = event.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
});
