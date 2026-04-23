// 🌌 --- Animation du fond étoilé ---
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const projectsData = {
"luxfera": {
  title: "Luxfera",
  role: "Focus: Gameplay Programming, Game Design",
  desc: "A 2D arcade shoot’em up prototype built in Unity where players survive waves of enemies across three linear levels with increasing difficulty. The gameplay combines projectile dodging, enemy wave management, and a unique close-range mechanic called the Filament Whip, allowing multi-target attacks, enemy executions, chain eliminations, and projectile parries. The prototype focuses on fast-paced combat, player responsiveness, and gameplay experimentation.",
  images: ["images/whip.png", "images/menu.png", "images/tuto.png", "images/levels.png"]
},

"sweet-reverie": {
  title: "Sweet Reverie",
  role: "Focus: Gameplay Programming, Game Design, Level Design",
  desc: "Sweet Reverie is a roguelike action prototype currently in development. Players explore dangerous dungeons, fight ingredient-themed enemies, avoid traps, and collect rare resources. After each run, players return to a bakery hub where collected ingredients are automatically stored and used for recipe progression systems. The project focuses on combat mechanics, dungeon exploration, progression loops, and integrating a unique bakery-themed gameplay experience.",
  images: ["images/SweetArt.png", "images/Sweet_Reverie00.png"]
},
"behind-wall": {
  title: "Behind the Wall",
  role: "Role: Gameplay Programming, Puzzle Design, Level Design",
  desc: "A 3D escape room prototype where players solve puzzles, avoid traps, and explore hidden paths to progress through the environment.",
  images: ["images/BH1.png", "images/BH2.png", "images/BH3.png", "images/BH4.png"]
},

"dans-ombre": {
  title: "Dans l'Ombre",
  role: "Focus: Exploration Design, Player Guidance, Interaction Systems",
  desc: "A 3D exploration prototype focused on environmental interaction, puzzle-solving, and guiding players through immersive spaces.",
  images: ["images/DO.png", "images/DO2.png", "images/DO3.png", "images/DO4.png"]
}



};

const modal = document.getElementById("project-modal");
const title = document.getElementById("modal-title");
const role = document.getElementById("modal-role");
const desc = document.getElementById("modal-desc");
const imagesContainer = document.getElementById("modal-images");

document.querySelectorAll(".episode-card").forEach(card => {
  card.addEventListener("click", (e) => {

    // éviter les conflits si on clique sur un lien (itch.io)
    if (e.target.tagName === "A") return;

    const btn = card.querySelector(".open-modal-btn");
    const projectId = btn.getAttribute("data-project");
    const project = projectsData[projectId];

    title.textContent = project.title;
    role.textContent = project.role;
    desc.textContent = project.desc;

    imagesContainer.innerHTML = "";

    project.images.forEach(img => {
      const image = document.createElement("img");
      image.src = img;
      imagesContainer.appendChild(image);
    });

    modal.style.display = "block";
  });
});

document.querySelector(".close-btn").onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

let stars = [];
const STAR_COUNT = 200;

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.5,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
    ctx.fill();
  }
}

function animateStars() {
  drawStars();

  for (let star of stars) {
    star.y -= star.speed;
    if (star.y < 0) {
      star.y = canvas.height;
      star.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(animateStars);
}

initCanvas();
animateStars();
window.addEventListener("resize", initCanvas);

//  --- SLIDER PROJECTS INFINI ---
const sliders = document.querySelectorAll(".projects-slider");

sliders.forEach((slider) => {
  const track = slider.querySelector(".slider-track");
  const cards = Array.from(track.children);

  //  Cloner les cartes pour créer l'effet infini
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  //  Boutons de navigation
  const prevBtn = slider.querySelector(".slider-btn.prev");
  const nextBtn = slider.querySelector(".slider-btn.next");

  let scrollSpeed = 0.8; // vitesse de défilement
  let autoScroll;

  //  Auto-scroll infini
  function startAutoScroll() {
    stopAutoScroll();
    autoScroll = setInterval(() => {
      track.scrollLeft += scrollSpeed;
      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft = 0;
      }
    }, 15);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  //  Lecture vidéo au survol
  track.querySelectorAll(".episode-card").forEach((card) => {
    const video = card.querySelector("video");
    if (video) {
      card.addEventListener("mouseenter", () => {
        stopAutoScroll();
        video.play();
      });
      card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
        startAutoScroll();
      });
    }
  });

  //  Contrôle manuel
  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: 400, behavior: "smooth" });
  });
  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -400, behavior: "smooth" });
  });

  //  Stop auto-scroll quand on survole le slider
  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", startAutoScroll);

  startAutoScroll();
});

//  --- GUIDE / MASCOTTE ---
const bubble = document.getElementById("guide-bubble");
const guide = document.getElementById("guide-character");

// Messages dynamiques selon le scroll
if (bubble) {
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    if (scrollPos < 600)
      bubble.textContent = "Hello! Welcome to my portfolio!";
    else if (scrollPos < 1200)
      bubble.textContent = "✨Here's a preview of my journey!";
    else if (scrollPos < 1800)
      bubble.textContent = "My preferred skills are here ✨";
    else if (scrollPos < 2600)
      bubble.textContent = "Discover my recent projects!";
    else
      bubble.textContent = "📩 Contact me if you want to collaborate 💌";
  });
}

// Animation de la mascotte (float léger)
if (guide && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(guide, {
    y: -10,
    ease: "power1.inOut",
    scrollTrigger: {
      scrub: true,
      start: "top top",
      end: "bottom bottom",
    },
  });
}