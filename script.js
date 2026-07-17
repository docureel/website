// ======================
// 3-Dot Menu Toggle
// ======================
const threeDotBtn = document.getElementById("threeDotBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

threeDotBtn.addEventListener("click", () => dropdownMenu.classList.toggle("active"));

document.querySelectorAll(".dropdown-menu a").forEach(link => {
    link.addEventListener("click", () => dropdownMenu.classList.remove("active"));
});

window.addEventListener("click", (e) => {
    if (!threeDotBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("active");
    }
});

// ======================
// Sticky Header
// ======================
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    if(window.scrollY > 80) header.classList.add("sticky");
    else header.classList.remove("sticky");
});

// ======================
// Toggle Sections Logic
// ======================
function setupToggle(openBtnId, closeBtnId, containerId) {
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const container = document.getElementById(containerId);

    if (openBtn && closeBtn && container) {
        openBtn.addEventListener("click", () => {
            container.style.display = "block";
            openBtn.style.display = "none";
        });
        closeBtn.addEventListener("click", () => {
            container.style.display = "none";
            openBtn.style.display = "inline-block";
        });
    }
}
setupToggle("viewArchiveBtn", "closeArchiveBtn", "archiveContainer");
setupToggle("viewMomentsBtn", "closeMomentsBtn", "momentsContainer");
setupToggle("viewPackagesBtn", "closePackagesBtn", "packagesContainer");
setupToggle("viewReviewBtn", "closeReviewBtn", "reviewContainer");

// ======================
// Package Category Tabs
// ======================
const categoryBtns = document.querySelectorAll(".category-btn");
const packageLists = document.querySelectorAll(".package-list");

categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Hide all lists
        packageLists.forEach(list => {
            list.classList.remove("active-category");
            list.classList.add("hidden-category");
        });
        
        // Reset all buttons styling
        categoryBtns.forEach(b => {
            b.style.background = "transparent";
            b.style.color = "var(--primary-color)";
        });
        
        // Style active button
        btn.style.background = "var(--primary-color)";
        btn.style.color = "var(--bg-color)";

        // Show targeted list
        const targetId = btn.getAttribute("data-target");
        const targetList = document.getElementById(targetId);
        if(targetList) {
            targetList.classList.remove("hidden-category");
            targetList.classList.add("active-category");
        }
    });
});

// ======================
// Smart Video (Tap to Mute/Unmute)
// ======================
const smartVideos = document.querySelectorAll(".smart-video");
smartVideos.forEach(video => {
    video.addEventListener("click", () => {
        video.muted = !video.muted;
    });
});

// ======================
// Terms Modal
// ======================
const modal = document.getElementById("termsModal");
const viewTermsBtn = document.getElementById("viewTermsBtn");
const closeModalBtn = document.querySelector(".close-modal");

viewTermsBtn.addEventListener("click", () => modal.style.display = "block");
closeModalBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (event) => {
    if (event.target == modal) modal.style.display = "none";
});

// ======================
// Form Submit Logic (Email & WhatsApp)
// ======================
const bookingForm = document.getElementById("bookingForm");
const emailSubmitBtn = document.getElementById("emailSubmitBtn");
const waSubmitBtn = document.getElementById("waSubmitBtn");

// 1. Background Email Submission via FormSubmit AJAX
bookingForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    emailSubmitBtn.innerText = "Sending Request...";
    emailSubmitBtn.disabled = true;

    const formData = new FormData(bookingForm);

    fetch("https://formsubmit.co/ajax/Webdocureel@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert("Booking request sent successfully to DocuReel!");
        bookingForm.reset();
        emailSubmitBtn.innerText = "Submit Booking";
        emailSubmitBtn.disabled = false;
    })
    .catch(error => {
        alert("Something went wrong. Please try again or use WhatsApp.");
        emailSubmitBtn.innerText = "Submit Booking";
        emailSubmitBtn.disabled = false;
    });
});

// 2. WhatsApp Submission Button
waSubmitBtn.addEventListener("click", () => {
    // Check if form is valid before redirecting
    if(!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
    }

    const name = document.getElementById("clientName").value;
    const phone = document.getElementById("clientPhone").value;
    const eventType = document.getElementById("eventType").value;
    const date = document.getElementById("eventDate").value;
    const pack = document.getElementById("packageName").value;

    const message = `Hello DocuReel, I would like to book a package.\n\nDetails:\nName: ${name}\nPhone: ${phone}\nEvent Type: ${eventType}\nDate: ${date}\nPackage: ${pack}`;
    
    const whatsappUrl = `https://wa.me/8801771677701?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});
