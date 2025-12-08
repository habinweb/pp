document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("#main");
  const hero = document.querySelector(".hero");
  const aboutMeBtn = document.querySelector(".menu-title.aboutme");
  const profileTxtBox = document.querySelector(".profile-txt-box");

  // 요소 없으면 그냥 종료
  if (!main || !hero || !aboutMeBtn || !profileTxtBox) return;

  // ================================
  // 기본 상태에서 호버 시
  // ================================
  hero.addEventListener("mouseenter", () => {
    hero.classList.add("active");
  });

  aboutMeBtn.addEventListener("mouseenter", () => {
    hero.classList.add("active");
  });

  // ================================
  // 2) active 상태에서 leave → active 제거
  //    단, top 상태일 때는 아무 변화 없음
  // ================================
  hero.addEventListener("mouseleave", () => {
    const hasTop = profileTxtBox.classList.contains("top");
    if (hasTop) return; // top이면 유지
    hero.classList.remove("active");
  });

  aboutMeBtn.addEventListener("mouseleave", () => {
    const hasTop = profileTxtBox.classList.contains("top");
    if (hasTop) return;
    hero.classList.remove("active");
  });

  // ================================
  // 3) click hero / click about 이벤트
  //
  // - 기본 상태에서 클릭하면  → active만 추가
  // - active에서 클릭하면   → top 추가
  // - top에서 클릭하면      → top 제거 (active만 남김)
  // ================================
  hero.addEventListener("click", (e) => {
    e.stopPropagation(); // main으로 이벤트 안 올라가게

    const hasActive = hero.classList.contains("active");
    const hasTop = profileTxtBox.classList.contains("top");

    // default 상태: active만 추가
    if (!hasActive) {
      hero.classList.add("active");
      return;
    }

    // active 상태인데 아직 top 아님 → top 추가
    if (!hasTop) {
      profileTxtBox.classList.add("top");
      return;
    }

    // top 상태에서 다시 클릭 → top 제거
    profileTxtBox.classList.remove("top");
  });

  aboutMeBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const hasActive = hero.classList.contains("active");
    const hasTop = profileTxtBox.classList.contains("top");

    if (!hasActive) {
      hero.classList.add("active");
      return;
    }

    if (!hasTop) {
      profileTxtBox.classList.add("top");
      return;
    }

    profileTxtBox.classList.remove("top");
  });

  // ================================
  // 4) top 상태에서 #main 클릭 → 원상복귀
  //    (원상복귀는 무조건 #main 클릭시에만)
  // ================================
  main.addEventListener("click", (e) => {
    const hasTop = profileTxtBox.classList.contains("top");

    // top 아니면 아무 것도 안 함
    if (!hasTop) return;

    // hero / about / profileTxtBox 안쪽 클릭이면 리셋 안 함
    const clickedInHero = hero.contains(e.target);
    const clickedInAbout = aboutMeBtn.contains(e.target);
    const clickedInProfileBox = profileTxtBox.contains(e.target);

    if (clickedInHero || clickedInAbout || clickedInProfileBox) {
      return;
    }

    // 그 외 #main 영역 클릭 → active, top 모두 제거
    profileTxtBox.classList.remove("top");
    hero.classList.remove("active");
  });
});

//top버튼
const toTopBtn = document.getElementById("btnTop");

// 스크롤 위치를 감지해서 버튼 표시/숨김
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
});

// 버튼 클릭 시 부드럽게 위로 이동
toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
