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
  document.body.style.overflow = open ? "hidden" : "";
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }),
);

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

document.querySelectorAll(".video-trigger").forEach((button) =>
  button.addEventListener("click", () => {
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

document
  .querySelector("[data-copy-handle]")
  .addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("CSM54602");
      toast.textContent = "已复制微信号：CSM54602";
    } catch {
      toast.textContent = "微信号：CSM54602";
    }
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  });

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
