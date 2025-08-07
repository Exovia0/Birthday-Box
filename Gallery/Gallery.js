// Gallery data - Add as many images as you want
const galleryData = [
      {
        src: "../assets/images/essential oils.jpg",
        title: "Essential oils",
        description: "Because you're always look edible I wanted you to smell edible too"
      },
      {
        src: "../assets/images/Leocup.jpg", 
        title: "Leo Tumbler",
        description: "what is better than this to keep you hydrated when you go outside you can use to have your tea always with you or have cooling water in the heat of summer"
      },
      {
        src: "../assets/images/pajama.jpg",
        title: "purple pajama",
        description: "stop sleeping naked! you can wear this even without underwear ; )"
      },
      {
        src: "../assets/images/coin.jpg",
        title: "Yes/No Coin",
        description: "sometimes it's nice to have a hint when you're confused, wish you luck my lady"
      },
      {
        src: "../assets/images/big snake.jpg",
        title: "snake, your spirit animal",
        description: "wanted you to have a powerful visual sign in your stories and posts about who you are"
      },
      {
        src: "../assets/images/crow.jpg",
        title: "Crow, my spirit animal",
        description: "so it keeps your snake company and it will be a reminder of me on every glance because I never want to leave your mind"
      },
      {
        src: "../assets/images/small snake.png",
        title: "cute snake with a bow",
        description: "this cute one was a nice cute plushy and a good match for the crow"
      },
      {
        src: "../assets/images/shower steamers.jpg",
        title: "Relaxing shower steamers",
        description: "My love for you means to allow you to enjoy the relaxing warm shower you deserve"
      },
    ];

    // Menu toggle function
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
    // Generate gallery items
    function createGallery() {
      const galleryGrid = document.getElementById('galleryGrid');
      
      galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.onclick = () => openModal(index);
        
        galleryItem.innerHTML = `
          <img src="${item.src}" alt="${item.title}" loading="lazy">
        `;
        
        galleryGrid.appendChild(galleryItem);
      });
    }

    // Open modal
    function openModal(index) {
      const modal = document.getElementById('imageModal');
      const modalImage = document.getElementById('modalImage');
      const modalTitle = document.getElementById('modalTitle');
      const modalDescription = document.getElementById('modalDescription');
      
      const item = galleryData[index];
      
      modalImage.src = item.src;
      modalImage.alt = item.title;
      modalTitle.textContent = item.title;
      modalDescription.textContent = item.description;
      
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

   
    function closeModal() {
      const modal = document.getElementById('imageModal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }

    
    document.addEventListener('DOMContentLoaded', () => {
      createGallery();
      
      // Close modal 
      document.querySelector('.close').onclick = closeModal;
      
      document.getElementById('imageModal').onclick = (e) => {
        if (e.target.id === 'imageModal') {
          closeModal();
        }
      };
      
      // Close modal with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      });
    });