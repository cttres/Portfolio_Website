// Main JavaScript for Carlos Torres Portfolio
// Interactive functionality and animations

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParticleSystem();
        this.setupSkillsRadar();
        this.setupProjectFilters();
        this.setupContactForm();
        this.setupTypewriter();
        this.setupCounters();
        this.setupNavigation();
    }

    // Scroll animations using Anime.js
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('fade-in-up')) {
                        anime({
                            targets: element,
                            translateY: [24, 0],
                            opacity: [0, 1],
                            duration: 600,
                            easing: 'easeOutQuart'
                        });
                    }
                    
                    if (element.classList.contains('fade-in-left')) {
                        anime({
                            targets: element,
                            translateX: [-24, 0],
                            opacity: [0, 1],
                            duration: 600,
                            easing: 'easeOutQuart'
                        });
                    }
                    
                    if (element.classList.contains('fade-in-right')) {
                        anime({
                            targets: element,
                            translateX: [24, 0],
                            opacity: [0, 1],
                            duration: 600,
                            easing: 'easeOutQuart'
                        });
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    // Particle system using p5.js for hero background
    setupParticleSystem() {
        if (typeof p5 !== 'undefined' && document.getElementById('particle-canvas')) {
            new p5((p) => {
                let particles = [];
                let numParticles = 50;

                p.setup = () => {
                    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                    canvas.parent('particle-canvas');
                    canvas.style('position', 'absolute');
                    canvas.style('top', '0');
                    canvas.style('left', '0');
                    canvas.style('z-index', '-1');

                    // Create particles
                    for (let i = 0; i < numParticles; i++) {
                        particles.push({
                            x: p.random(p.width),
                            y: p.random(p.height),
                            vx: p.random(-0.5, 0.5),
                            vy: p.random(-0.5, 0.5),
                            size: p.random(2, 6),
                            opacity: p.random(0.3, 0.8)
                        });
                    }
                };

                p.draw = () => {
                    p.clear();
                    
                    particles.forEach(particle => {
                        // Update position
                        particle.x += particle.vx;
                        particle.y += particle.vy;

                        // Wrap around edges
                        if (particle.x < 0) particle.x = p.width;
                        if (particle.x > p.width) particle.x = 0;
                        if (particle.y < 0) particle.y = p.height;
                        if (particle.y > p.height) particle.y = 0;

                        // Draw particle
                        p.fill(0, 212, 255, particle.opacity * 255);
                        p.noStroke();
                        p.ellipse(particle.x, particle.y, particle.size);
                    });

                    // Draw connections
                    for (let i = 0; i < particles.length; i++) {
                        for (let j = i + 1; j < particles.length; j++) {
                            const dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                            if (dist < 100) {
                                p.stroke(0, 212, 255, (1 - dist / 100) * 50);
                                p.strokeWeight(1);
                                p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                            }
                        }
                    }
                };

                p.windowResized = () => {
                    p.resizeCanvas(p.windowWidth, p.windowHeight);
                };
            });
        }
    }

    // Skills radar chart using ECharts
    setupSkillsRadar() {
        if (typeof echarts !== 'undefined' && document.getElementById('skills-radar')) {
            const chart = echarts.init(document.getElementById('skills-radar'));
            
            const option = {
                backgroundColor: 'transparent',
                radar: {
                    indicator: [
                        { name: 'Machine Learning', max: 100 },
                        { name: 'Data Analysis', max: 100 },
                        { name: 'Python', max: 100 },
                        { name: 'SQL', max: 100 },
                        { name: 'Visualization', max: 100 },
                        { name: 'Deep Learning', max: 100 },
                        { name: 'Statistics', max: 100 },
                        { name: 'Big Data', max: 100 }
                    ],
                    shape: 'polygon',
                    splitNumber: 4,
                    axisName: {
                        color: '#2c3e50',
                        fontSize: 12
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#e0e0e0'
                        }
                    },
                    splitArea: {
                        show: false
                    }
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: [85, 90, 95, 88, 82, 78, 85, 75],
                        name: 'Skills',
                        areaStyle: {
                            color: 'rgba(0, 212, 255, 0.2)'
                        },
                        lineStyle: {
                            color: '#00d4ff',
                            width: 2
                        },
                        itemStyle: {
                            color: '#00d4ff'
                        }
                    }]
                }]
            };

            chart.setOption(option);
            
            // Responsive
            window.addEventListener('resize', () => {
                chart.resize();
            });
        }
    }

    // Project filtering system
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.dataset.categories.split(',');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        anime({
                            targets: card,
                            opacity: [0, 1],
                            scale: [0.8, 1],
                            duration: 400,
                            easing: 'easeOutQuart'
                        });
                    } else {
                        anime({
                            targets: card,
                            opacity: [1, 0],
                            scale: [1, 0.8],
                            duration: 200,
                            easing: 'easeInQuart',
                            complete: () => {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }

    // Contact form handling
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Honeypot (spam check)
            const botField = form.querySelector('input[name="bot-field"]');
            if (botField && botField.value) {
                // Bot detected – silently abort
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Sending...';

            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }

            const formData = new FormData(form);

            // Make sure Netlify has the form-name field
            if (!formData.get('form-name')) {
                formData.append('form-name', form.getAttribute('name') || 'contact');
            }

            // Encode as URL form data
            const body = new URLSearchParams(formData).toString();

            fetch('/?no-cache=1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/x-www-form-urlencoded'
                },
                body
            })
            .then((response) => {
                if (response.ok) {
                    this.showNotification('Message sent successfully!', 'success');
                    form.reset();
                } else {
                    this.showNotification('There was a problem sending your message. Please try again.', 'error');
                }
            })
            .catch(() => {
                this.showNotification('There was a problem sending your message. Please try again.', 'error');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        });
    }

    // Typewriter effect for hero text
    setupTypewriter() {
        if (typeof Typed !== 'undefined' && document.getElementById('typed-text')) {
            new Typed('#typed-text', {
                strings: [
                    'Data Scientist',
                    'ML Engineer',
                    'Data Analyst',
                    'Python Developer'
                ],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    // Animated counters
    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    const duration = 2000;
                    
                    anime({
                        targets: { count: 0 },
                        count: target,
                        duration: duration,
                        easing: 'easeOutQuart',
                        update: function(anim) {
                            counter.textContent = Math.floor(anim.animatables[0].target.count);
                        }
                    });
                    
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Navigation functionality
    setupNavigation() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                anime({
                    targets: mobileMenu,
                    opacity: mobileMenu.classList.contains('hidden') ? [1, 0] : [0, 1],
                    translateY: mobileMenu.classList.contains('hidden') ? [0, -20] : [-20, 0],
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Project modal functionality
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Project data (in a real app, this would come from an API)
    const projects = {
        'guitr-ai': {
            title: 'GuitR AI - Chord Recognition System',
            description: 'Full-stack machine learning application for real-time guitar chord recognition using audio signal processing.',
            technologies: ['Python', 'TensorFlow', 'React', 'Web Audio API'],
            image: 'resources/guitr-ai.png',
            github: 'https://github.com/cttres/guitr-ai'
        },
        'bitcoin-prediction': {
            title: 'Bitcoin Price Prediction',
            description: 'Deep learning models for Bitcoin price forecasting using LSTM, GRU, and XGBoost algorithms.',
            technologies: ['Python', 'LSTM', 'GRU', 'XGBoost', 'Yahoo Finance API'],
            image: 'resources/bitcoin-chart.png',
            github: 'https://github.com/cttres/carlos-torres-portfolio/tree/main/Machine-Learning/Bitcoin-Prediction'
        },
        'forest-data': {
            title: 'Forest Data Science Pipeline',
            description: 'Scalable data pipeline analyzing 300,000+ forest plot records for ecological monitoring.',
            technologies: ['Python', 'SQL', 'Pandas', 'Geospatial Analysis'],
            image: 'resources/forest-data.png'
        }
    };
    
    const project = projects[projectId];
    if (project && modal && modalContent) {
        modalContent.innerHTML = `
            <div class="relative">
                <button onclick="closeProjectModal()" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">${project.title}</h3>
                <p class="text-gray-600 mb-6">${project.description}</p>
                <div class="mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">Technologies Used:</h4>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="flex gap-4">
                    <a href="${project.github}" target="_blank" class="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">View Code</a>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        anime({
            targets: modalContent,
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 400,
            delay: 100,
            easing: 'easeOutQuart'
        });
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalContent) {
        anime({
            targets: modalContent,
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInQuart'
        });
        
        anime({
            targets: modal,
            opacity: [1, 0],
            duration: 300,
            delay: 100,
            easing: 'easeInQuart',
            complete: () => {
                modal.classList.add('hidden');
            }
        });
    }
}
