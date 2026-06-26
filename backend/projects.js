// document.querySelectorAll('header a').forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();
//         const section = e.target.href.split('#')[1];
//         document.querySelectorAll('section').forEach(sec => {
//             sec.style.display = sec.id === section ? 'block' : 'none';
//         });         
//     });
// });
// Project Modal
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const modalLink = document.getElementById('modal-link');
const modalLinkLabel = document.getElementById('modal-link-label');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.project-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.project-card');
        const img = card.querySelector('.project-img-wrap img');
        // Also inside the view btn click handler
        const overlayLink = card.querySelector('.project-link-btn');
        if (overlayLink) {
            overlayLink.style.display = card.dataset.link ? 'inline-flex' : 'none';
        }

        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalTitle.textContent = card.dataset.title;
        modalDesc.textContent = card.dataset.desc;
        modalTech.textContent = card.dataset.tech;
        // After - hides GitHub button if no link
        if (card.dataset.link) {
            modalLink.href = card.dataset.link;
            modalLinkLabel.textContent = card.dataset.linkLabel || 'View on GitHub';
            modalLink.style.display = 'inline-flex';
        } else {
            modalLink.style.display = 'none';
        }

        // Play button — show only if data-site exists
        const modalSite = document.getElementById('modal-site');
        if (card.dataset.site) {
            modalSite.href = card.dataset.site;
            modalSite.style.display = 'inline-flex';
        } else {
            modalSite.style.display = 'none';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

const skillsRow = document.querySelector('.skills-row');
const planets = Array.from(skillsRow.children);

let position = 0;
const speed = 0.30;
let conveyorPaused = false;
let isDragging = false;
let dragStartX = 0;
let dragStartPosition = 0;

function animate() {
    if(!conveyorPaused && !isDragging) {
    
        position -= speed;
        skillsRow.style.transform = `translateX(${position}px)`;

        recycleLeft();
    }

    requestAnimationFrame(animate);
}

function recycleLeft() {
    const firstPlanet = skillsRow.children[0];
    const frstPlanetWidth = firstPlanet.offsetWidth + 30;

    if(Math.abs(position) >= frstPlanetWidth) {
        skillsRow.appendChild(firstPlanet);
        position += frstPlanetWidth;
        if (isDragging) dragStartPosition += frstPlanetWidth;
        skillsRow.style.transform = `translateX(${position}px)`;
    }
}

function recycleRight() {
    const lastPlanet = skillsRow.children[skillsRow.children.length - 1];
    const lastPlanetWidth = lastPlanet.offsetWidth + 30;

    if(position >= 0) {
        skillsRow.prepend(lastPlanet);
        position -= lastPlanetWidth;
        if (isDragging) dragStartPosition -= lastPlanetWidth;
        skillsRow.style.transform = `translateX(${position}px)`;
    }
}

animate();

skillsRow.addEventListener('mouseenter', () => {
    conveyorPaused = true;
    skillsRow.style.cursor = 'grab';
});

skillsRow.addEventListener('mouseleave', () => {
    conveyorPaused = false;
    isDragging = false;
    skillsRow.style.cursor = '';
});

skillsRow.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartPosition = position;
    skillsRow.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if(!isDragging) return;

    const delta = e.clientX - dragStartX;
    position = dragStartPosition + delta;
    skillsRow.style.transform = `translateX(${position}px)`;

    recycleLeft();
    recycleRight();
});

document.addEventListener('mouseup', () => {
    if(!isDragging) return;
    isDragging = false;
    skillsRow.style.cursor = 'grab';
});

document.querySelectorAll('.planet').forEach(planet => {
    const body = planet.querySelector('.planet-body');
    let isLocked = false;

    body.addEventListener('mousemove', (e) => {
        if(isLocked) return;
        const rect = body.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = ((e.clientX - centerX) / (rect.width / 2)) * 15;
        const rotateY = ((e.clientY - centerY) / (rect.height / 2)) * 15;
        body.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    });

    body.addEventListener('mouseleave', () => {
        body.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
        setTimeout(() => body.style.transform = '', 300);
    });

});

//smooth scroll
document.querySelectorAll('header a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        const headerHeight = document.querySelector('header').offsetHeight;
        const targetY = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
});

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    try {
        // Using e.target directly is more reliable than a selector string
        await emailjs.sendForm('service_ox2q8ha', 'template_k5denw4', e.target);
        status.textContent = '✅ Message sent successfully!';
        status.style.color = '#2ecc71';
        e.target.reset();
    } catch (err) {
        console.error('EmailJS Error:', err);
        status.textContent = '❌ Failed to send. Please try again.';
        status.style.color = '#e74c3c';
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
});

// Scroll reveal
const revealElements = document.querySelectorAll('section, .project-card, .about-box, .education-box, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});


const sections = document.querySelectorAll('section, #home');
const navLinks = document.querySelectorAll('header a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-nav');
        }
    });
});