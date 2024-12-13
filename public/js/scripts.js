const generateBtn = document.getElementById('generate');
const urlInput = document.getElementById('url');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const outputContainer = document.getElementById('outputContainer');

gsap.from(".card", {duration: 1, y: 50, opacity: 0, ease: "power3.out"});
gsap.from(".title", {duration: 1, y: 20, opacity: 0, delay: 0.5, ease: "power3.out"});
gsap.from(".input-wrapper", {duration: 1, y: 20, opacity: 0, delay: 0.7, ease: "power3.out"});

generateBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (!url) {
        gsap.to(urlInput, {duration: 0.1, x: 10, yoyo: true, repeat: 5});
        return;
    }

    outputContainer.classList.remove('visible');
    output.textContent = '';
    generateBtn.disabled = true;
    copyBtn.disabled = true;
    generateBtn.innerHTML = '<span class="spinner"></span><span class="btn-text">Shortening...</span>';

    try {
        const response = await fetch(`/shorten-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl: url })
        });

        if (!response.ok) {
            throw new Error('Error generating shortened URL');
        }

        const data = await response.json();
        const shortUrl = data.shortUrl;

        output.textContent = shortUrl;
        outputContainer.classList.add('visible');
        copyBtn.disabled = false;
        
        gsap.from(outputContainer, {duration: 0.5, y: 20, opacity: 0, ease: "power3.out"});

    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        outputContainer.classList.add('visible');
        gsap.to(outputContainer, {duration: 0.3, backgroundColor: "#ff4136", yoyo: true, repeat: 1});
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<span class="btn-text">Shorten</span><span class="btn-icon">→</span>';
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(output.textContent)
        .then(() => {
            gsap.to(copyBtn, {duration: 0.3, backgroundColor: "#45a049", ease: "power3.out"});
            copyBtn.innerHTML = '<span class="btn-text">Copied!</span><span class="btn-icon">✓</span>';
            setTimeout(() => {
                gsap.to(copyBtn, {duration: 0.3, backgroundColor: "#4CAF50", ease: "power3.out"});
                copyBtn.innerHTML = '<span class="btn-text">Copy</span><span class="btn-icon">✓</span>';
            }, 2000);
        })
        .catch(err => {
            gsap.to(copyBtn, {duration: 0.3, backgroundColor: "#ff4136", ease: "power3.out"});
            copyBtn.innerHTML = '<span class="btn-text">Error</span><span class="btn-icon">✗</span>';
            setTimeout(() => {
                gsap.to(copyBtn, {duration: 0.3, backgroundColor: "#4CAF50", ease: "power3.out"});
                copyBtn.innerHTML = '<span class="btn-text">Copy</span><span class="btn-icon">✓</span>';
            }, 2000);
        });
});

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateBtn.click();
    }
});

// Animate background
gsap.to(".background-animation", {
    duration: 20,
    backgroundPosition: "100% 50%",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,  // More particles for a fuller background
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"  // Particle color
        },
        shape: {
            type: "circle"  // Particle shape (circle)
        },
        opacity: {
            value: 0.5  // Particle opacity
        },
        size: {
            value: 4  // Size of particles
        },
        line_linked: {
            enable: true,
            color: "#ffffff",  // Color of lines connecting particles
            opacity: 0.3,  // Line opacity
            width: 1  // Width of the lines
        },
        move: {
            enable: true,
            speed: 6,  // Speed of particle movement
            direction: "none",  // Allow particles to move in any direction
            random: true,  // Make the particles' movement random
            straight: false,  // Don't make the particles move in straight lines
            out_mode: "out"  // Particles will exit the screen when they move out
        }
    },
    interactivity: {
        detect_on: "canvas",  // Detect interactions on the canvas
        events: {
            onhover: {
                enable: true,
                mode: "grab"  // Grabbing particles on hover
            },
            onclick: {
                enable: true,
                mode: "push"  // Push more particles on click
            }
        },
        modes: {
            grab: {
                distance: 140,  // How far the particles can be grabbed
                line_linked: {
                    opacity: 1  // Opacity of the lines when grabbing particles
                }
            },
            push: {
                particles_nb: 4  // Number of particles to push when clicked
            }
        }
    },
    retina_detect: true  // Enable retina detection for better performance
});



