/* ====== Poster Popup ====== */
const poster = document.getElementById("poster");
const popupPoster = document.getElementById("popupPoster");
const popupPosterImg = document.getElementById("popupPosterImg");

/* ====== QRIS Popup ====== */
const qrisBtn = document.getElementById("qrisBtn");
const popupQris = document.getElementById("popupQris");
const qrisSound = document.getElementById("qrisSound");

/* ====== Overlay ====== */
const overlay = document.getElementById("overlay");

/* === QRIS tombol === */
qrisBtn.addEventListener("click", () => {
  if (qrisSound) {
    qrisSound.currentTime = 0;
    qrisSound.play().catch(err => console.log("Audio gagal diputar:", err));
  }
  popupQris.style.display = "flex";
  setTimeout(() => popupQris.classList.add("show"), 10);
  overlay.style.display = "block";
});

/* === Poster klik === */
poster.addEventListener("click", () => {
  popupPosterImg.src = poster.src;
  popupPoster.style.display = "flex";
  setTimeout(() => popupPoster.classList.add("show"), 10);
  overlay.style.display = "block";
});

/* ====== Close popups ====== */
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    popup.classList.remove("show");
    popup.classList.add("closing");
    setTimeout(() => {
      popup.style.display = "none";
      popup.classList.remove("closing");
      overlay.style.display = "none";
    }, 300);
  });
});

/* Klik luar popup */
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) {
    e.target.classList.remove("show");
    e.target.classList.add("closing");
    setTimeout(() => {
      e.target.style.display = "none";
      e.target.classList.remove("closing");
      overlay.style.display = "none";
    }, 300);
  }
});

/* ====== Reveal on Scroll ====== */
const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-bottom");
const observer = new IntersectionObserver((entries)=> {
  entries.forEach((entry)=> {
    if (entry.isIntersecting) entry.target.classList.add("active");
    else entry.target.classList.remove("active");
  });
},{ threshold: 0.18 });
reveals.forEach((el)=> observer.observe(el));

/* ====== 3D Tilt ====== */
const card = document.getElementById("card3d");
let rAF = null;

function handleTilt(e){
  if (e.target.closest(".btn")) return;
  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  const max = 4;
  const rotY = (dx / (rect.width/2)) * max;
  const rotX = (-dy / (rect.height/2)) * max;
  if (rAF) cancelAnimationFrame(rAF);
  rAF = requestAnimationFrame(() => {
    card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  });
}
function resetTilt(){
  if (rAF) cancelAnimationFrame(rAF);
  card.style.transform = "perspective(1000px) rotateX(2.2deg)";
}
card.addEventListener("mousemove", handleTilt);
card.addEventListener("mouseleave", resetTilt);
