// Toggle functionality for code blocks
document.addEventListener('DOMContentLoaded', function() {
    // Code block toggle
    const toggleCodeBtn = document.getElementById('toggleCodeBtn');
    const codeBlock = document.getElementById('codeBlock');
    
    toggleCodeBtn?.addEventListener('click', function() {
        const isHidden = codeBlock.classList.toggle('hidden');
        toggleCodeBtn.innerHTML = isHidden ? 
            '<i class="fas fa-code"></i><span>View Code</span>' : 
            '<i class="fas fa-eye-slash"></i><span>Hide Code</span>';
    });
    
    // Tech stack toggle
    const toggleTechBtn = document.getElementById('toggleTechBtn');
    const techBlock = document.getElementById('techBlock');
    
    toggleTechBtn?.addEventListener('click', function() {
        const isHidden = techBlock.classList.toggle('hidden');
        toggleTechBtn.innerHTML = isHidden ? 
            '<i class="fas fa-layer-group"></i><span>View Stack</span>' : 
            '<i class="fas fa-eye-slash"></i><span>Hide Stack</span>';
    });
    
    // Animate statistics
    const animateStats = () => {
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.textContent.includes('%') ? '%' : '';
            let current = 0;
            const increment = target / 30;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    };
    
    // Intersection Observer for stats animation
    const statsSection = document.getElementById('stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
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
    
    // Add loading animation to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});