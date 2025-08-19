/* ====== Poster Popup ====== */
const poster = document.getElementById("poster");
const popupPoster = document.getElementById("popupPoster");
const popupPosterImg = document.getElementById("popupPosterImg");

/* ====== QRIS Popup ====== */
const qrisBtn = document.getElementById("qrisBtn");
const popupQris = document.getElementById("popupQris");
const qrisSound = document.getElementById("qrisSound");

qrisBtn.addEventListener("click", () => {
  // mainkan SFX
  qrisSound.currentTime = 0;
  qrisSound.play();

  // tampilkan popup dengan animasi
  popupQris.classList.add("show");
});

/* ====== Close popups ====== */
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", () => {
    popupQris.classList.remove("show");
    setTimeout(() => popupQris.style.display = "none", 300); // sinkron fade-out
  });
});

window.addEventListener("click", (e) => {
  if (e.target === popupQris) {
    popupQris.classList.remove("show");
    setTimeout(() => popupQris.style.display = "none", 300);
  }
});

/* ====== Overlay ====== */
const overlay = document.getElementById("overlay");

poster.addEventListener("click", () => {
  popupPoster.style.display = "flex";
  popupPosterImg.src = poster.src;
  overlay.style.display = "block";   // <<< munculin overlay
});

qrisBtn.addEventListener("click", () => {
  popupQris.style.display = "flex";
  overlay.style.display = "block";   // <<< munculin overlay
});

/* ====== Close popups ====== */
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", () => {
    popupPoster.style.display = "none";
    popupQris.style.display = "none";
    overlay.style.display = "none";   // <<< matiin overlay
  });
});

// klik di luar popup → tutup
window.addEventListener("click", (e) => {
  if (e.target === popupPoster || e.target === popupQris) {
    e.target.style.display = "none";
    overlay.style.display = "none";   // <<< matiin overlay
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

/* ====== 3D Tilt (tanpa ganggu tombol) ====== */
const card = document.getElementById("card3d");
let rAF = null;

function handleTilt(e){
  // blokir ketika hover/klik tombol supaya card tidak “miring”
  if (e.target.closest(".btn")) return;

  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;

  const max = 4; // derajat maksimal (elegan)
  const rotY = (dx / (rect.width/2)) * max;
  const rotX = (-dy / (rect.height/2)) * max;

  if (rAF) cancelAnimationFrame(rAF);
  rAF = requestAnimationFrame(() => {
    card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    card.style.boxShadow =
      `0 ${12 + Math.abs(rotX)*1.2}px ${30 + Math.abs(rotY)*2}px rgba(0,0,0,0.7),
       inset 0 0 ${18 + Math.abs(rotY)}px rgba(99,102,241,0.22),
       0 0 ${30 + Math.abs(rotX)*2}px rgba(56,189,248,0.24)`;
  });
}
function resetTilt(){
  if (rAF) cancelAnimationFrame(rAF);
  card.style.transform = "perspective(1000px) rotateX(2.2deg)";
  card.style.boxShadow =
    "0 12px 30px rgba(0,0,0,0.65), inset 0 0 18px rgba(99,102,241,0.18), 0 0 30px rgba(56,189,248,0.18)";
}

card.addEventListener("mousemove", handleTilt);
card.addEventListener("mouseleave", resetTilt);
card.addEventListener("mouseenter", handleTilt);

// Matikan tilt di perangkat sentuh
const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (hasTouch){
  card.removeEventListener("mousemove", handleTilt);
  card.removeEventListener("mouseleave", resetTilt);
  resetTilt();
}

/* ====== (Opsional) Aksi tombol daftar ====== */
// document.getElementById("btnDaftar").href = "https://wa.me/62XXXXXXXXXX?text=Halo admin, saya mau daftar Battle of Krezy";
