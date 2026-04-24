// Configuração do Particles
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 50 },
        "color": { "value": "#B89650" },
        "line_linked": { "color": "#B89650", "opacity": 0.1 }
    }
});

// Função para enviar mensagem
function sendMessage() {
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const text = input.value.trim();

    if (text !== "") {
        // SEGURANÇA: Sanitização contra XSS
        const sanitized = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        appendMessage('user-msg', sanitized);
        input.value = "";

        // Simulação de Resposta IA
        setTimeout(() => {
            const response = "Entendo o seu relato. O assédio moral pode gerar danos psicológicos graves. Você já possui registros (e-mails, mensagens ou testemunhas) dessas ocorrências?";
            appendMessage('ai-msg', response);
        }, 1000);
    }
}

function appendMessage(className, text) {
    const chatWindow = document.getElementById('chat-window');
    const div = document.createElement('div');
    div.className = `message ${className}`;
    div.innerText = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Atalho de teclado (Enter)
function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}

// Função de Pânico: Sai do site rapidamente para o Google
function panicExit() {
    window.location.href = "https://www.google.com";
}

// Atalho de teclado para Pânico (Tecla Esc)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') panicExit();
});
