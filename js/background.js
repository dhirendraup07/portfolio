// Create particles for 3D background
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 8}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize parallax effect
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.getAttribute('data-speed') || 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initParallax();
});
