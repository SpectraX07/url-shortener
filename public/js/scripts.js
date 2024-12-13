const generateBtn = document.getElementById('generate');
const urlInput = document.getElementById('url');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const outputContainer = document.getElementById('outputContainer');

generateBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (!url) {
        gsap.to(urlInput, { duration: 0.1, x: 10, yoyo: true, repeat: 5 });
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

    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        outputContainer.classList.add('visible');
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<span class="btn-text">Shorten</span><span class="btn-icon">→</span>';
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(output.textContent)
        .then(() => {
            gsap.to(copyBtn, { duration: 0.3, backgroundColor: "#388E3C" });
            copyBtn.innerHTML = '<span class="btn-text">Copied!</span><span class="btn-icon">✓</span>';
            setTimeout(() => {
                const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
                gsap.to(copyBtn, { duration: 0.3, backgroundColor: secondaryColor });
                copyBtn.innerHTML = '<span class="btn-text">Copy</span><span class="btn-icon">✓</span>';
            }, 2000);
        })
        .catch(err => {
            gsap.to(copyBtn, { duration: 0.3, backgroundColor: "#ff4136" });
            copyBtn.innerHTML = '<span class="btn-text">Error</span><span class="btn-icon">✗</span>';
        });
});
