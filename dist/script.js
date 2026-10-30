const header = document.querySelector("[data-header]");
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const heroVideo = document.querySelector(".hero-media");
const heroControl = document.querySelector("[data-hero-control]");
const modal = document.querySelector("[data-video-modal]");
const modalVideo = document.querySelector("[data-modal-video]");
const modalTitle = document.querySelector("[data-modal-title]");
const toast = document.querySelector("[data-toast]");
const backToTop = document.querySelector("[data-back-to-top]");
const quoteModal = document.querySelector("[data-quote-modal]");
const quoteClose = document.querySelector("[data-quote-close]");
const quoteTitle = document.querySelector("[data-quote-title]");
const quoteCards = [...document.querySelectorAll(".quote-card")];

function updateScrollUi() {
  header.classList.toggle("scrolled", scrollY > 24);
  backToTop.classList.toggle("visible", scrollY > innerHeight * 0.7);
}
addEventListener(
  "scroll",
  updateScrollUi,
  { passive: true },
);
updateScrollUi();
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

function playCaseVideo(video) {
  if (!video) return;
  video.play().catch(() => {});
}

function updateCaseUi(index) {
  activeCase = index;
  caseIndex.textContent = String(index + 1).padStart(2, "0");
  caseDots.forEach((dot, dotIndex) =>
    dot.classList.toggle("active", dotIndex === index),
  );
  casePrevious.disabled = index === 0;
  caseNext.disabled = index === caseSlides.length - 1;
  caseSlides.forEach((slide, slideIndex) => {
    const video = slide.querySelector("video");
    if (!video) return;
    if (slideIndex === index) playCaseVideo(video);
    else video.pause();
  });
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
const creatorAvatars = {
  创摄萌: "./assets/team/创摄萌.webp",
  "戏天（可愛い）": "./assets/team/戏天（可愛い）.webp",
  小朱霍克酱: "./assets/team/小朱霍克酱.webp",
  Tintin不想剪视频: "./assets/team/Tintin不想剪视频.webp",
  绝序绝绝子: "./assets/team/绝序绝绝子.webp",
};
const creatorWorks = [
  {
    name: "创摄萌",
    prefix: "csm",
    titles: [
      "CICF · CosplayMax 嘉宾公布",
      "萤火虫 39th · PSD Cosplay 年度盛典",
      "CPG08 · 14 个专区信号接入",
      "国内大型漫展规模 TOP5",
      "萤火虫 EX 次元派对",
      "王者荣耀 2026 周年庆嘉年华",
    ],
  },
  {
    name: "戏天（可愛い）",
    prefix: "xitian",
    titles: ["付慧琳 · 王者荣耀 2026 周年庆", "指挥官配兰博", "甜妹暴击", "萌妹怎么选"],
  },
  {
    name: "小朱霍克酱",
    prefix: "xiaozhu",
    titles: [
      "BW 漫展 · 10 分钟拍守岸人花嫁",
      "来当漂泊者吧",
      "摄影拍腿的实际成片",
      "漫展 10 分钟能出片吗",
    ],
  },
  {
    name: "Tintin不想剪视频",
    prefix: "tintin",
    titles: ["大黑塔", "海琴烟 · 鬼刀冰公主", "请选择你的小麋鹿", "英梨梨", "铃兰生气也这么可爱"],
  },
  {
    name: "绝序绝绝子",
    prefix: "juexu",
    titles: ["绝区零 · UID 老玩家", "不要丢了荣耀", "2024 赛车初音", "绿梦时空之声 · BW2026"],
  },
];

creatorGrid.replaceChildren();
creatorWorks.forEach(({ name, prefix, titles }) => {
  const showcase = document.createElement("section");
  const bar = document.createElement("div");
  const identity = document.createElement("div");
  const avatar = document.createElement("img");
  const heading = document.createElement("h3");
  const controls = document.createElement("div");
  const previous = document.createElement("button");
  const next = document.createElement("button");
  const track = document.createElement("div");

  showcase.className = "creator-showcase reveal";
  bar.className = "creator-bar";
  identity.className = "creator-identity";
  controls.className = "creator-controls";
  track.className = "creator-track";
  track.setAttribute("aria-label", `${name}作品列表`);
  avatar.className = "creator-avatar";
  avatar.src = creatorAvatars[name];
  avatar.alt = `${name}头像`;
  heading.className = "creator-divider";
  heading.innerHTML = `<span>${name}</span>`;

  previous.type = "button";
  previous.className = "creator-arrow";
  previous.setAttribute("aria-label", "上一项作品");
  previous.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>';
  next.type = "button";
  next.className = "creator-arrow";
  next.setAttribute("aria-label", "下一项作品");
  next.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>';

  titles.forEach((title, index) => {
    const number = String(index + 1).padStart(2, "0");
    const card = document.createElement("button");
    const image = document.createElement("img");
    const caption = document.createElement("span");
    const label = document.createElement("b");
    const meta = document.createElement("small");
    card.type = "button";
    card.className = "work-card video-trigger";
    card.dataset.video = `./assets/team-work-2026/${prefix}-${number}.mp4`;
    card.dataset.hls = `./assets/hls/${prefix}-${number}/index.m3u8`;
    card.dataset.title = `${name} · ${title}`;
    image.src = `./assets/team-work-2026/${prefix}-${number}.webp`;
    image.alt = `${title}作品封面`;
    label.textContent = title;
    meta.textContent = "有声播放 ↗";
    caption.append(label, meta);
    card.append(image, caption);
    track.append(card);
  });

  const updateWorkControls = () => {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScroll - 2;
  };
  const scrollWorks = (direction) => {
    const card = track.querySelector(".work-card");
    if (!card) return;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };
  previous.addEventListener("click", () => scrollWorks(-1));
  next.addEventListener("click", () => scrollWorks(1));
  track.addEventListener("scroll", updateWorkControls, { passive: true });
  addEventListener("resize", updateWorkControls, { passive: true });

  controls.append(previous, next);
  identity.append(avatar, heading);
  bar.append(identity, controls);
  showcase.append(bar, track);
  creatorGrid.append(showcase);
  requestAnimationFrame(updateWorkControls);
});

const hlsPlayers = new WeakMap();
function destroyHls(video) {
  const hls = hlsPlayers.get(video);
  if (hls) {
    hls.destroy();
    hlsPlayers.delete(video);
  }
}
function loadVideoSource(video, hlsSource, fallbackSource) {
  destroyHls(video);
  video.removeAttribute("src");
  if (hlsSource && window.Hls?.isSupported()) {
    const hls = new Hls({
      enableWorker: true,
      startLevel: -1,
      maxBufferLength: 20,
      backBufferLength: 10,
    });
    hls.loadSource(hlsSource);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      const slide = video.closest(".case-hero");
      if (video.autoplay && (!slide || caseSlides[activeCase] === slide)) {
        playCaseVideo(video);
      }
    });
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (!data.fatal) return;
      destroyHls(video);
      video.src = fallbackSource;
      video.load();
      const slide = video.closest(".case-hero");
      if (video.autoplay && (!slide || caseSlides[activeCase] === slide)) {
        playCaseVideo(video);
      }
    });
    hlsPlayers.set(video, hls);
    return;
  }
  if (hlsSource && video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = hlsSource;
    return;
  }
  video.src = fallbackSource;
}

document.querySelectorAll(".hls-video").forEach((video) =>
  loadVideoSource(video, video.dataset.hls, video.dataset.fallback),
);

let lastVideoTrigger = null;
document.querySelectorAll(".video-trigger").forEach((button) =>
  button.addEventListener("click", () => {
    lastVideoTrigger = button;
    loadVideoSource(modalVideo, button.dataset.hls, button.dataset.video);
    modalTitle.textContent = button.dataset.title;
    modal.showModal();
    modalVideo.muted = false;
    modalVideo.volume = 1;
    modalVideo.play().catch(() => {});
  }),
);
function closeModal() {
  modalVideo.pause();
  destroyHls(modalVideo);
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

let lastQuoteTrigger = null;
function openQuoteModal(name, trigger) {
  const matchedCard = quoteCards.find(
    (card) => card.querySelector("h3").textContent.trim() === name,
  );
  if (!matchedCard) return;
  quoteCards.forEach((card) => {
    card.hidden = card !== matchedCard;
  });
  quoteTitle.textContent = `${name} · 个人报价`;
  lastQuoteTrigger = trigger;
  quoteModal.classList.add("member-rate");
  quoteModal.showModal();
  document.body.style.overflow = "hidden";
}
function closeQuoteModal() {
  quoteModal.close();
  document.body.style.overflow = "";
  lastQuoteTrigger?.focus({ preventScroll: true });
}
quoteClose.addEventListener("click", closeQuoteModal);
quoteModal.addEventListener("click", (event) => {
  if (event.target === quoteModal) closeQuoteModal();
});
quoteModal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeQuoteModal();
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
const douyinProfiles = {
  创摄萌: "https://www.douyin.com/user/MS4wLjABAAAApZLcAtd-XphiHCB3YQvJ3El3f50B2D62Hm5ZDevDn7g?from_tab_name=main",
  绝序绝绝子: "https://www.douyin.com/user/MS4wLjABAAAABrvVMQxJqUZLXe8TdosFelhm6GKfyml9xAPcrB5HHJq0dUbpnzqSgkm_M6gGpfTq?from_tab_name=main",
  小朱霍克酱: "https://www.douyin.com/user/MS4wLjABAAAARtZlZRzRHxSe2JwuKxqPFM1TPzKnvOeQJXyIA5QWY9w?from_tab_name=main",
  Tintin不想剪视频: "https://www.douyin.com/user/MS4wLjABAAAAR5BD9a5SqdWuS_9KeRpC7D0s1kr0fLjDaSIFttHxBh7FTiVILmMtVH6ovCvhOOFB?from_tab_name=main",
  "戏天（可愛い）": "https://www.douyin.com/user/MS4wLjABAAAAT8x_tsuYvbN9KsGTYmHGB0oSfWvGdfTZTP1SlFsjanA?from_tab_name=main",
  文文没烦恼: "https://www.douyin.com/user/MS4wLjABAAAAjeAbMeCP3E8BKUDNRDai6_HFSg02nhCxSVkccRU5x9s?from_tab_name=main",
  北月天: "https://www.douyin.com/user/MS4wLjABAAAAmmPkDtZEzUYHt6CmwBGsDm-fyFEc42x245A-V2BMe9H9UEf_EYu8ewi9WSVRZEl5?from_tab_name=main",
  是薄荷吖: "https://www.douyin.com/user/MS4wLjABAAAAfFtEsSAlWt-TcnDmkgudkNBIK0ilQVHmaiOEacIjF_c?from_tab_name=main",
};
const additionalPlatformStats = {
  小朱霍克酱: { "小红书": "6.2万", "哔哩哔哩": "6.8万" },
  Tintin不想剪视频: { "小红书": "1.2万", "哔哩哔哩": "2.3万" },
  绝序绝绝子: { "小红书": "1.5万", "哔哩哔哩": "1.2万" },
};

document.querySelectorAll(".team-grid .member").forEach((member) => {
  const name = member.querySelector(".member-copy > b").textContent.trim();
  const accountLine = member.querySelector(".member-copy > span");
  const profileLink = document.createElement("a");
  const profileIcon = document.createElement("img");
  profileLink.className = "douyin-profile";
  profileLink.href = douyinProfiles[name];
  profileLink.target = "_blank";
  profileLink.rel = "noreferrer";
  profileLink.setAttribute("aria-label", `打开${name}的抖音主页`);
  profileIcon.src = "./assets/logos/douyin.svg";
  profileIcon.alt = "";
  profileLink.append(profileIcon);
  accountLine.append(profileLink);

  const platformStats = member.querySelector(".platform-stats");
  const extraStats = additionalPlatformStats[name];
  [...platformStats.children].forEach((item, index) => {
    const platform = item.querySelector("dt").textContent.trim();
    if (extraStats?.[platform]) item.querySelector("dd").textContent = extraStats[platform];
    if (!extraStats && index > 0) item.remove();
  });
  if (!extraStats) platformStats.classList.add("platform-stats-single");

  const button = document.createElement("button");
  button.type = "button";
  button.className = "member-contact";
  button.dataset.copyContact = memberContacts[name];
  button.setAttribute("aria-label", `复制${name}微信号并发起合作`);
  button.innerHTML = "发起合作 <span>↗</span>";
  const quoteButton = document.createElement("button");
  quoteButton.type = "button";
  quoteButton.className = "member-quote";
  quoteButton.setAttribute("aria-label", `查看${name}的个人报价`);
  quoteButton.innerHTML = "个人报价 <span>↗</span>";
  quoteButton.addEventListener("click", () => openQuoteModal(name, quoteButton));
  member.querySelector(".member-copy").append(button, quoteButton);
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
