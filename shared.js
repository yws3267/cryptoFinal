const sidebar = document.getElementById('sidebar')
const pageBody = document.getElementById('page-body')
const toggleBtn = document.getElementById('toggle-btn')

// ── 페이지 로드 시 저장된 상태 복원 (모바일 제외) ──
if (window.innerWidth > 768) {
  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    sidebar.classList.add('collapsed')
    pageBody.classList.add('expanded')
  }
} else {
  // 모바일은 항상 접힌 상태로 시작
  sidebar.classList.add('collapsed')
  pageBody.classList.add('expanded')
}

// ── 토글 버튼 클릭 ──
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed')
  pageBody.classList.toggle('expanded')

  // 모바일 제외하고 상태 저장
  if (window.innerWidth > 768) {
    localStorage.setItem(
      'sidebarCollapsed',
      sidebar.classList.contains('collapsed'),
    )
  }
})
