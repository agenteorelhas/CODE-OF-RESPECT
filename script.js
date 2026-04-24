/* -----------------------------------------------
   Configuração do Particles.js - Estilo Gold Sutil
   ----------------------------------------------- */
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#B89650" }, // Accent Gold
        "shape": { "type": "circle" },
        "opacity": { "value": 0.2, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 3, "random": true, "anim": { "enable": false } },
        "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.1, "width": 1 },
        "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false } },
        "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.3 } } }
    },
    "retina_detect": true
});

/* -----------------------------------------------
   Lógica do Chat e Segurança
   ----------------------------------------------- */

function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();

    if (text !== "") {
        // SEGURANÇA: Sanitização contra XSS (Injeção de Script)
        const sanitized = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        appendMessage('user-msg', sanitized);
        input.value = ""; // Limpa o campo

        // Simulação de Resposta IA - 1 segundo de delay
        setTimeout(() => {
            const response = "Entendo o seu relato. É importante saber que você não está sozinha(o). Para te orientar melhor, você já possui algum tipo de registro (mensagens, e-mails ou testemunhas) dessas ocorrências?";
            appendMessage('ai-msg', response);
        }, 1200);
    }
}

// Adiciona a mensagem visualmente na janela
function appendMessage(className, text) {
    const chatWindow = document.getElementById('chat-window');
    
    // Cria o elemento da mensagem
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    
    // Cria o parágrafo interno (melhor prática de HTML)
    const p = document.createElement('p');
    p.innerText = text;
    
    msgDiv.appendChild(p);
    chatWindow.appendChild(msgDiv);
    
    // Scroll automático para a última mensagem
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Atalho: Enviar com a tecla Enter
function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}

/* -----------------------------------------------
   Função de Pânico (Saída Rápida)
   ----------------------------------------------- */
function panicExit() {
    // Redireciona instantaneamente para o Google
    window.location.href = "https://www.google.com";
}

// Atalho: Tecla Esc aciona o Pânico
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') panicExit();
});
