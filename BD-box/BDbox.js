
function toggleMenu() {
  const nav = document.getElementById("sideNav");
  const isOpen = nav.style.left === "0px";
  
  // Toggle with animation
  nav.style.transition = "left 0.3s ease";
  nav.style.left = isOpen ? "-200px" : "0px";
  
  // Add overlay when open
  if (!isOpen) {
    createOverlay();
  } else {
    removeOverlay();
  }
}

// 2. Create Clickable Overlay
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "navOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.zIndex = "998";
  overlay.onclick = toggleMenu;
  document.body.appendChild(overlay);
}

function removeOverlay() {
  const overlay = document.getElementById("navOverlay");
  if (overlay) overlay.remove();
}

// 3. Close with Escape Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const nav = document.getElementById("sideNav");
    if (nav.style.left === "0px") {
      toggleMenu();
    }
  }
});

// 4. Initialize in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Your existing initialization code...
  
  // Make sure sidebar starts closed
  document.getElementById("sideNav").style.left = "-200px";
});

// Quote data (unchanged)
const quotes = [
  "On this day the most beautiful miracle was born,  -You-",
  "You rise on the ruins of my nights like a relentless sun banishing the darkness...",
  "Born to outshine stars, made to outstand the noise",
  "May luck and Hope be the fuel that ignites your flame",
  "Let your smile be the weapon you face life with",
  "your birth itself is a gift, for your beauty is a bliss to this world",
  "Remember how in deadpool there's a core character in every timeline, you're the on here",
  "Happy Birth Day Wish you health and wealth"
];

const colors = [
  "#a17b82ff", "#aa9100ff", "#f08080", "#3a723fff", 
  "#3d778aff", "#834383ff", "#ac0000ff", "#7a3854ff"
];

const imageSources = [
  "../assets/images/cake.png",
  "../assets/images/Sun.png", 
  "../assets/images/Leo.png",
  "../assets/images/Clover.png",
  "../assets/images/smile.png",
  "../assets/images/lilac.png",
  "../assets/images/deadpool.png",
  "../assets/images/pulse.png"
];

// Fixed showQuotes function
function showQuotes() {
  const btn = document.querySelector('.read-btn');
  btn.disabled = true; // Prevent multiple clicks
  btn.style.opacity = '0.5';
  
  const container = document.getElementById("quote-ring-container");
  container.innerHTML = "";

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = Math.min(centerX, centerY) * 0.6;

  // Create all quotes at once with staggered animations
  quotes.forEach((text, i) => {
    const angle = (i / quotes.length) * Math.PI * 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const flipContainer = document.createElement("div");
    flipContainer.className = "flip-container";
    flipContainer.style.left = `${x}px`;
    flipContainer.style.top = `${y}px`;
    flipContainer.style.transform = "translate(-50%, -50%)";
    flipContainer.style.opacity = "0";
    flipContainer.style.animation = `fadeIn 0.5s ease ${i * 0.15}s forwards`;

    flipContainer.innerHTML = `
      <div class="flipper">
        <div class="front">
          <img src="${imageSources[i]}" alt="Quote ${i+1}">
        </div>
        <div class="back" style="background: ${colors[i]}">
          ${text}
        </div>
      </div>
    `;

    container.appendChild(flipContainer);
  });
}

// Click anywhere to close sidebar
document.addEventListener('click', (e) => {
  if (!e.target.closest('.side-nav') && !e.target.closest('.menu-icon')) {
    document.getElementById("sideNav").style.left = "-200px";
  }

});
