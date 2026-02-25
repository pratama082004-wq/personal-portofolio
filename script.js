/* --- DATA SOURCE --- */
// I have populated this with your real context based on your profile
const projects = [
    {
        id: 1,
        title: "TOYOTA SMART-VISOR",
        date: "2026-06-15", // YYYY-MM-DD for sorting
        displayDate: "June 2026",
        description: "An IoT-based system for visualizing vehicle damage in real-time. Created for Toyota Motor Manufacturing Indonesia, this project utilizes Computer Vision (YOLO) to automate inspection lines.",
        image: "https://via.placeholder.com/400x300/00f3ff/000000?text=Smart-Visor",
        link: "project.html"
    },
    {
        id: 2,
        title: "Srimaja Investment Fund",
        date: "2026-01-17",
        displayDate: "Jan 2026",
        description: "A personal investment fund project derived from the Sriwijaya and Majapahit empires. Focuses on analyzing macroeconomics and crypto markets (Bitcoin) to manage a diversified portfolio.",
        image: "https://via.placeholder.com/400x300/bc13fe/000000?text=Srimaja",
        link: "project.html"
    },
    {
        id: 3,
        title: "Astra Otoparts Internship",
        date: "2026-02-01",
        displayDate: "Feb 2026",
        description: "Professional software engineering internship focusing on automation systems. Developed internal tools to streamline production workflows and gained hands-on industry experience.",
        image: "https://via.placeholder.com/400x300/00f3ff/000000?text=Astra+Otoparts",
        link: "project.html"
    },
    {
        id: 4,
        title: "Personal Branding Portfolio",
        date: "2025-11-12",
        displayDate: "Nov 2025",
        description: "A responsive, Cyberpunk-themed web portfolio to showcase skills in Software Engineering and AI. Built using modern HTML5, CSS3 Grid, and JavaScript.",
        image: "https://via.placeholder.com/400x300/bc13fe/000000?text=Portfolio",
        link: "project.html"
    },
    {
        id: 5,
        title: "Interactive Investment Tracker Dashboard",
        date: "2026-02-24",
        displayDate: "Feb 2026",
        description: "A dashboard that visualizes investment performance over time. Built with Javascript to provide interactive design charts and real-time data updates.",
        image: "/intinvest/main.png",
        link: "project.html",
         // 👇 TAMBAHKAN BARIS INI 👇
        externalLink: "https://srimaja-wealth-portfolio.vercel.app/"
    }
];

/* --- MAIN INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Theme
    initTheme();

    // 2. Render Projects (only if on main page)
    const grid = document.getElementById('project-grid');
    if (grid) {
        renderProjects();
    }
});

/* --- THEME TOGGLE LOGIC --- */
function initTheme() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    }

    toggleSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* --- SCROLL FUNCTION --- */
function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

/* --- PROJECT RENDERING LOGIC --- */
function renderProjects() {
    const grid = document.getElementById('project-grid');
    
    // Sort projects: Newest first
    const sortedProjects = projects.sort((a, b) => new Date(b.date) - new Date(a.date));

    grid.innerHTML = sortedProjects.map(project => `
        <div class="project-card">
            <div class="card-img-container">
                <img src="${project.image}" alt="${project.title}" class="card-img">
            </div>
            <div class="card-content">
                <h3 class="card-title">${project.title}</h3>
                <span class="card-date">${project.displayDate}</span>
                <p class="card-desc">${project.description}</p>
                <button class="card-btn" onclick="goToOverview(${project.id})">See Overview</button>
            </div>
        </div>
    `).join('');
}

/* --- NAVIGATION TO OVERVIEW --- */
function goToOverview(id) {
    // In a real app, we would pass the ID via URL (e.g., project.html?id=1)
    // For this static demo, we just go to the page. 
    // You can store the ID in localStorage to load specific data on the next page.
    localStorage.setItem('currentProjectId', id);
    window.location.href = 'project.html';
}

/* --- SLIDER LOGIC (For Project Overview Page) --- */
let slideIndex = 1;

function initSlider() {
    showSlides(slideIndex);
    
    // Load specific project data based on ID
    const currentId = localStorage.getItem('currentProjectId');
    if(currentId) {
        const project = projects.find(p => p.id == currentId);
        if(project) {
            document.getElementById('detail-title').innerText = project.title;
            document.getElementById('detail-date').innerText = project.displayDate;
            document.getElementById('detail-desc').innerText = project.description;
            
            // 👇 INI LOGIKA BARU UNTUK TOMBOLNYA 👇
            const detailLinkBtn = document.getElementById('detail-link');
            
            // Cek apakah project tersebut punya externalLink
            if (project.externalLink) {
                detailLinkBtn.href = project.externalLink;
                detailLinkBtn.target = "_blank"; // Supaya link terbuka di tab baru
                detailLinkBtn.style.display = "inline-block"; // Pastikan tombol terlihat
            } else {
                // Kalau tidak ada linknya (misal project belum jadi), sembunyikan tombolnya
                detailLinkBtn.style.display = "none";
            }
        }
    }
}

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    
    if (slides.length === 0) return; // Exit if not on slider page

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        slides[i].className = slides[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";  
    slides[slideIndex-1].className += " active";
}