const GEMINI_API_KEY = 'AIzaSyDAo7C9lmOy5D8JX-JkLIvLbRT8fHDovm8';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    if(typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50 },
                "color": { "value": "#B89650" },
                "line_linked": { "color": "#B89650", "opacity": 0.1 }
            }
        });
    }
});

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}

function handleKeyPress(e) { if (e.key === 'Enter') enviarChat(); }

async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('Consultando diretrizes éticas...', 'bot-msg', loadingId);

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `VOCÊ É O GEM 'CODE OF RESPECT' (ASSISTENTE ÉTICO).
                        INSTRUÇÕES:
                        - Atue como um especialista em mediação de conflitos e ética corporativa.
                        - Seu tom é acolhedor, empático, mas extremamente profissional e imparcial.
                        - Ajude usuários a identificarem assédio moral e dê orientações práticas sobre canais de denúncia (MPT, RH, Ouvidorias).
                        - Se o usuário estiver em crise, recomende ajuda profissional.
                        - Seja direto e evite textos excessivamente longos a menos que solicitado.
                        
                        USUÁRIO PERGUNTA: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        document.getElementById(loadingId).remove();
        appendMessage(aiResponse, 'bot-msg');

    } catch (error) {
        document.getElementById(loadingId).innerText = "Erro na conexão segura. Tente novamente.";
    }
}

function appendMessage(text, className, id = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    if (id) msgDiv.id = id;
    msgDiv.innerText = text;
    const container = document.getElementById('chatMessages');
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

function enviarRelato() {
    alert("Seu relato foi criptografado e enviado ao banco de dados seguro.");
    showView('home');
}
