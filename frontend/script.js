document.addEventListener('DOMContentLoaded', () => {

    // --- Core Component Animation Modules Initialization ---
    initGlobalLoader();
    initThemeEngine();
    initSidebarEngine();
    initDropdownEngine();
    initLiveSearchFilters();

});

/**
 * Orchestrates professional dashboard loading experience mask state workflows
 */
function initGlobalLoader() {
    const loader = document.getElementById('globalLoader');
    if (!loader) return;

    // Simulate metric pipeline load aggregation prior to displaying visual UI metrics
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            // Trigger numeric count telemetry tickers on visual completion
            setTimeout(executeDynamicCounters, 300);
        }, 1200); // Configured simulation buffer window
    });
}

/**
 * Handles initialization and runtime updates for standard dynamic counting counters
 */
function executeDynamicCounters() {
    const counters = document.querySelectorAll('.dynamic-counter');
    
    counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-target'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1500; // Animation lifecycle calculation constraint windows
        const stepTime = Math.max(Math.floor(duration / targetValue), 15);
        
        let currentCount = 0;
        
        const countInterval = setInterval(() => {
            currentCount++;
            counter.textContent = currentCount + suffix;
            
            if (currentCount >= targetValue) {
                counter.textContent = targetValue + suffix;
                clearInterval(countInterval);
            }
        }, stepTime);
    });
}

/**
 * Handles theme configuration options
 */
function initThemeEngine() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    const themeIcon = themeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa-solid fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });
}

/**
 * Orchestrates viewport adaptive layout drawer menus and focus modes
 */
function initSidebarEngine() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    if (!sidebar || !toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
        sidebar.classList.toggle('open');
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
            sidebar.classList.remove('open');
        }
    });
}

/**
 * Modular context event binder managing dashboard dropdown entities cleanly
 */
function initDropdownEngine() {
    const configurations = [
        { triggerId: 'langDropdownBtn', menuId: 'langDropdown' },
        { triggerId: 'notificationBtn', menuId: 'notificationDropdown' },
        { triggerId: 'profileDropdownBtn', menuId: 'profileDropdown' }
    ];

    configurations.forEach(config => {
        const trigger = document.getElementById(config.triggerId);
        const menu = document.getElementById(config.menuId);
        
        if (!trigger || !menu) return;

        trigger.addEventListener('click', (e) => {
            // Dismiss alternate active nodes prior to expanding localized container
            configurations.forEach(otherConfig => {
                if (otherConfig.menuId !== config.menuId) {
                    document.getElementById(otherConfig.menuId)?.classList.remove('active');
                }
            });
            menu.classList.toggle('active');
            e.stopPropagation();
        });
    });

    // Universal surface teardown interceptor for external context focus losses
    document.addEventListener('click', () => {
        configurations.forEach(config => {
            document.getElementById(config.menuId)?.classList.remove('active');
        });
    });
}

/**
 * Performs frontend array space data match evaluations dynamically
 */
function initLiveSearchFilters() {
    const searchInput = document.getElementById('jobSearch');
    if (!searchInput) return;

    const cardsToTrack = [
        { elements: document.querySelectorAll('.country-card'), fallbackStyle: 'flex' },
        { elements: document.querySelectorAll('.category-card'), fallbackStyle: 'flex' },
        { elements: document.querySelectorAll('.job-stream-card'), fallbackStyle: 'block' }
    ];

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase().trim();

        cardsToTrack.forEach(group => {
            group.elements.forEach(element => {
                const innerNormalizedText = element.textContent.toLowerCase();
                if (innerNormalizedText.includes(value)) {
                    element.style.display = group.fallbackStyle;
                } else {
                    element.style.display = 'none';
                }
            });
        });
    });
}
async function loadJobs() {
    const jobsContainer = document.getElementById("jobs-container");

    if (!jobsContainer) return;

    const response = await fetch("http://127.0.0.1:8000/jobs");
    const jobs = await response.json();

    jobsContainer.innerHTML = "";

    jobs.forEach(job => {
        jobsContainer.innerHTML += `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p><strong>Country:</strong> ${job.country}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Visa:</strong> ${job.visa}</p>
            <a href="apply.html?id=${job.id}">
                <button>Apply Now</button>
            </a>
        </div>
        `;
    });
}

loadJobs();