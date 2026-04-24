// Configuração de Partículas
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#B89650" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.2 },
        "size": { "value": 2 },
        "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.1, "width": 1 },
        "move": { "enable": true, "speed": 1 }
    }
});

function sendMessage() {
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    
    if (input.value.trim() !== "") {
        // Cybersecurity: Sanitizando contra injeção de HTML
        const safeText = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        const userDiv = document.createElement('div');
        userDiv.className = 'message user-msg';
        userDiv.innerText = safeText;
        chatWindow.appendChild(userDiv);
        
        input.value = "";

        // Resposta Simulada
        setTimeout(() => {
            const aiDiv = document.createElement('div');
            aiDiv.className = 'message ai-msg';
            aiDiv.innerText = "Sinto muito que você esteja passando por isso. O assédio moral é grave. Você já tentou registrar essas situações formalmente?";
            chatWindow.appendChild(aiDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 1000);
    }
}

function handleKeyPress(e) { if (e.key === 'Enter') sendMessage(); }

function panicExit() { window.location.href = "https://www.google.com"; }

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') panicExit(); });
