// ======================
// Overlay Menu Logic
// ======================
const openMenuBtn = document.getElementById("openMenuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const overlayMenu = document.getElementById("overlayMenu");
const mainMenuContent = document.getElementById("mainMenuContent");
const subMenuContent = document.getElementById("subMenuContent");
const moreBtn = document.getElementById("moreBtn");
const backBtn = document.getElementById("backBtn");
const menuItems = document.querySelectorAll(".menu-item:not(#moreBtn):not(#backBtn):not(#menuPackagesBtn):not(#menuContactBtn)");

openMenuBtn.addEventListener("click", () => {
    overlayMenu.classList.add("active");
    document.body.style.overflow = "hidden";
});

function closeMenu() {
    overlayMenu.classList.remove("active");
    document.body.style.overflow = "auto";
    setTimeout(() => {
        mainMenuContent.style.display = "flex";
        mainMenuContent.style.opacity = "1";
        subMenuContent.style.display = "none";
        subMenuContent.style.opacity = "0";
    }, 500);
}
closeMenuBtn.addEventListener("click", closeMenu);
menuItems.forEach(item => item.addEventListener("click", closeMenu));

moreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mainMenuContent.style.opacity = "0";
    setTimeout(() => {
        mainMenuContent.style.display = "none";
        subMenuContent.style.display = "flex";
        setTimeout(() => subMenuContent.style.opacity = "1", 50);
    }, 400);
});

backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    subMenuContent.style.opacity = "0";
    setTimeout(() => {
        subMenuContent.style.display = "none";
        mainMenuContent.style.display = "flex";
        setTimeout(() => mainMenuContent.style.opacity = "1", 50);
    }, 400);
});

// ======================
// Modals (Packages & Contact)
// ======================
const menuPackagesBtn = document.getElementById("menuPackagesBtn");
const packagesModal = document.getElementById("packagesModal");
const closePackagesModal = document.getElementById("closePackagesModal");

const menuContactBtn = document.getElementById("menuContactBtn");
const getInTouchBtn = document.getElementById("getInTouchBtn");
const contactModal = document.getElementById("contactModal");
const closeContactModal = document.getElementById("closeContactModal");

// Packages Modal
menuPackagesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => { packagesModal.style.display = "block"; document.body.style.overflow = "hidden"; }, 400);
});
closePackagesModal.addEventListener("click", () => {
    packagesModal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Contact Modal
function openContact() {
    closeMenu();
    setTimeout(() => { contactModal.style.display = "block"; document.body.style.overflow = "hidden"; }, 400);
}
menuContactBtn.addEventListener("click", (e) => { e.preventDefault(); openContact(); });
getInTouchBtn.addEventListener("click", openContact);

closeContactModal.addEventListener("click", () => {
    contactModal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Package Tabs Logic
const categoryBtns = document.querySelectorAll(".category-btn");
const packageLists = document.querySelectorAll(".package-list");

categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        packageLists.forEach(list => {
            list.classList.remove("active-category");
            list.classList.add("hidden-category");
        });
        categoryBtns.forEach(b => b.classList.remove("active-btn"));
        
        btn.classList.add("active-btn");
        document.getElementById(btn.getAttribute("data-target")).classList.remove("hidden-category");
        document.getElementById(btn.getAttribute("data-target")).classList.add("active-category");
    });
});

// ======================
// Misc Functions
// ======================
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    if(window.scrollY > 50) header.classList.add("sticky");
    else header.classList.remove("sticky");
});

document.querySelectorAll(".smart-video").forEach(video => {
    video.addEventListener("click", () => video.muted = !video.muted);
});

flatpickr("#eventDates", {
    mode: "multiple",
    dateFormat: "d M Y",
    minDate: "today"
});

// ======================
// FormSubmit Email Integration (AJAX)
// ======================
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Convert form data to JSON
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => object[key] = value);
    const json = JSON.stringify(object);

    // Show loading state
    submitBtn.innerText = "Sending...";
    submitBtn.style.opacity = "0.7";

    // Send data to FormSubmit
    fetch('https://formsubmit.co/ajax/docureel@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Thanks for choosing DOCUREEL! Your request has been sent to docureel@gmail.com successfully.");
            form.reset();
            contactModal.style.display = "none";
            document.body.style.overflow = "auto";
        } else {
            alert("Something went wrong! Please try again.");
        }
    })
    .catch(error => {
        console.error(error);
        alert("Network error! Please check your connection.");
    })
    .finally(() => {
        // Reset button
        submitBtn.innerText = "Submit";
        submitBtn.style.opacity = "1";
    });
});
