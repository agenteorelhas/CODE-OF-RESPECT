document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    
    // Partículas Neon Vibrantes
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#B89650" },
                "shape": { "type": "circle" },
                "opacity": { 
                    "value": 0.9, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.4, "sync": false } 
                },
                "size": { "value": 3, "random": true },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#B89650", 
                    "opacity": 0.5, 
                    "width": 1.5 
                },
                "size": { "value": 3, "random": true },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": true }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } } }
            },
            "retina_detect": true
        });
    }
});

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleKeyPress(e) { if (e.key === 'Enter') enviarChat(); }

async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('O Assistente Ético está processando...', 'bot-msg', loadingId);

    try {
        // --- CONFIGURAÇÃO IMPORTANTE ---
        // Substitua a URL abaixo pela URL que o Render gerou para o seu Web Service
        // Exemplo: https://code-of-respect-api.onrender.com/chat
        const RENDER_API_URL = "https://SUA-URL
