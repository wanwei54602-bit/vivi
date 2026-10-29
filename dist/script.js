const header = document.querySelector("[data-header]");
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const heroVideo = document.querySelector(".hero-media");
const heroControl = document.querySelector("[data-hero-control]");
const modal = document.querySelector("[data-video-modal]");
const modalVideo = document.querySelector("[data-modal-video]");
const modalTitle = document.querySelector("[data-modal-title]");
const toast = document.querySelector("[data-toast]");

addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", scrollY > 24),
  { passive: true },
);
menu.addEventListener("click", () => {
  const open = !nav.classList.contains("open");
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  document.body.style.overflow = open ? "hidden" : "";
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "打开菜单");
    document.body.style.overflow = "";
  }),
);
addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !nav.classList.contains("open")) return;
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "打开菜单");
  document.body.style.overflow = "";
  menu.focus();
});

heroControl.addEventListener("click", () => {
  if (heroVideo.paused) {
    heroVideo.play();
    heroControl.textContent = "Ⅱ";
    heroControl.setAttribute("aria-label", "暂停背景视频");
  } else {
    heroVideo.pause();
    heroControl.textContent = "▶";
    heroControl.setAttribute("aria-label", "播放背景视频");
  }
});

const caseCarousel = document.querySelector("[data-case-carousel]");
const caseTrack = document.querySelector("[data-case-track]");
const caseSlides = [...caseTrack.children];
const caseDots = [...caseCarousel.querySelectorAll(".case-dots i")];
const caseIndex = caseCarousel.querySelector("[data-case-index]");
const casePrevious = caseCarousel.querySelector("[data-case-prev]");
const caseNext = caseCarousel.querySelector("[data-case-next]");
let activeCase = 0;

function updateCaseUi(index) {
  activeCase = index;
  caseIndex.textContent = String(index + 1).padStart(2, "0");
  caseDots.forEach((dot, dotIndex) =>
    dot.classList.toggle("active", dotIndex === index),
  );
  casePrevious.disabled = index === 0;
  caseNext.disabled = index === caseSlides.length - 1;
}
function showCase(index) {
  const target = Math.max(0, Math.min(index, caseSlides.length - 1));
  caseTrack.scrollTo({
    left: target * caseTrack.clientWidth,
    behavior: "smooth",
  });
  updateCaseUi(target);
}
casePrevious.addEventListener("click", () => showCase(activeCase - 1));
caseNext.addEventListener("click", () => showCase(activeCase + 1));
caseTrack.addEventListener(
  "scroll",
  () => {
    const index = Math.round(caseTrack.scrollLeft / caseTrack.clientWidth);
    if (index !== activeCase) updateCaseUi(index);
  },
  { passive: true },
);
updateCaseUi(0);

const creatorGrid = document.querySelector(".creator-work-grid");
const creatorItems = [...creatorGrid.children];
const creatorFragment = document.createDocumentFragment();
const creatorAvatars = {
  创摄萌: "./assets/team/创摄萌.webp",
  "戏天（可愛い）": "./assets/team/戏天（可愛い）.webp",
  小朱霍克酱: "./assets/team/小朱霍克酱.webp",
  Tintin不想剪视频: "./assets/team/Tintin不想剪视频.webp",
  绝序绝绝子: "./assets/team/绝序绝绝子.webp",
};
let creatorTrack;

creatorItems.forEach((item) => {
  if (item.matches(".creator-divider")) {
    const showcase = document.createElement("section");
    const bar = document.createElement("div");
    const identity = document.createElement("div");
    const avatar = document.createElement("img");
    const controls = document.createElement("div");
    const previous = document.createElement("button");
    const next = document.createElement("button");

    showcase.className = "creator-showcase";
    bar.className = "creator-bar";
    identity.className = "creator-identity";
    controls.className = "creator-controls";
    const track = document.createElement("div");
    creatorTrack = track;
    track.className = "creator-track";
    track.setAttribute("aria-label", `${item.innerText}作品列表`);

    const creatorName = item.querySelector("span").textContent.trim();
    avatar.className = "creator-avatar";
    avatar.src = creatorAvatars[creatorName];
    avatar.alt = `${creatorName}头像`;

    previous.type = "button";
    previous.className = "creator-arrow";
    previous.setAttribute("aria-label", "上一项作品");
    previous.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>';
    next.type = "button";
    next.className = "creator-arrow";
    next.setAttribute("aria-label", "下一项作品");
    next.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>';

    const updateWorkControls = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= maxScroll - 2;
    };

    const scrollWorks = (direction) => {
      const card = track.querySelector(".work-card");
      if (!card) return;
      track.scrollBy({
        left: direction * (card.getBoundingClientRect().width + 16),
        behavior: "smooth",
      });
    };
    previous.addEventListener("click", () => scrollWorks(-1));
    next.addEventListener("click", () => scrollWorks(1));
    track.addEventListener("scroll", updateWorkControls, { passive: true });
    addEventListener("resize", updateWorkControls, { passive: true });

    controls.append(previous, next);
    identity.append(avatar, item);
    bar.append(identity, controls);
    showcase.append(bar, track);
    creatorFragment.append(showcase);
    requestAnimationFrame(updateWorkControls);
  } else if (creatorTrack) {
    creatorTrack.append(item);
  }
});
creatorGrid.append(creatorFragment);

let lastVideoTrigger = null;
document.querySelectorAll(".video-trigger").forEach((button) =>
  button.addEventListener("click", () => {
    lastVideoTrigger = button;
    modalVideo.src = button.dataset.video;
    modalTitle.textContent = button.dataset.title;
    modal.showModal();
    modalVideo.muted = false;
    modalVideo.volume = 1;
    modalVideo.play().catch(() => {});
  }),
);
function closeModal() {
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  modal.close();
  lastVideoTrigger?.focus({ preventScroll: true });
}
document
  .querySelector("[data-modal-close]")
  .addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
modal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeModal();
});

const memberContacts = {
  创摄萌: "CSM54602",
  "戏天（可愛い）": "MH13610526149",
  小朱霍克酱: "XiaozhuHKJ",
  Tintin不想剪视频: "Tintin_FPV",
  文文没烦恼: "harryllk",
  绝序绝绝子: "juexuuuu",
  北月天: "MH13610526149",
  是薄荷吖: "bohesansan33",
};

document.querySelectorAll(".team-grid .member").forEach((member) => {
  const name = member.querySelector(".member-copy > b").textContent.trim();
  const button = document.createElement("button");
  button.type = "button";
  button.className = "member-contact";
  button.dataset.copyContact = memberContacts[name];
  button.setAttribute("aria-label", `复制${name}微信号并发起合作`);
  button.innerHTML = "发起合作 <span>↗</span>";
  member.querySelector(".member-copy").append(button);
});

document.querySelectorAll("[data-copy-contact]").forEach((button) =>
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyContact);
      toast.textContent = "已复制微信号";
    } catch {
      toast.textContent = "复制失败，请稍后重试";
    }
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }),
);

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
