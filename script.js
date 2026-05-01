// --- LIGAÇÃO COM SERVER / IA (CORRIGIDA E BLINDADA) ---
async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('Processando...', 'bot-msg', loadingId);

    try {
        // 1. Centralização da URL (Mais fácil de mudar depois)
        const RENDER_API_URL = "https://code-of-respect.onrender.com/chat"; 
        
        // 2. FETCH CORRIGIDO: Usando a variável e tratando status de erro
        const response = await fetch(RENDER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });
        
        // Se o servidor responder com erro (ex: 500), força a ida para o catch
        if (!response.ok) {
            const errorMsg = await response.json();
            throw new Error(errorMsg.text || "Erro no servidor");
        }
        
        const data = await response.json();
        const loadingElement = document.getElementById(loadingId);
        
        if (data.text) {
            loadingElement.innerText = data.text;
        } else {
            loadingElement.innerText = "A IA não retornou um texto válido.";
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            // Exibe o erro específico vindo do servidor ou uma mensagem padrão
            loadingElement.innerText = "Erro: " + error.message;
            loadingElement.style.color = "#ff4d4d"; // Opcional: destaque em vermelho
        }
    }
}
