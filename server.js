const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("Chave de API não configurada no servidor.");
        }

        // 1. CORREÇÃO DA URL: Alterado de /v1/ para /v1beta/
        // 2. CORREÇÃO DO MODELO: Uso do alias "-latest" para garantir a versão mais nova
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Aja como o Assistente Ético do portal 'Code of Respect'. Responda: ${message}` }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Erro na API do Google");
        }

        // 3. PREVENÇÃO DE CRASH: Optional Chaining (?.) 
        // Se a mensagem for barrada pelos filtros de segurança, 'content' será undefined.
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            // Verifica se a resposta foi bloqueada por motivos de segurança (Safety Ratings)
            const finishReason = data.candidates?.[0]?.finishReason;
            if (finishReason === 'SAFETY') {
                return res.json({ text: "Desculpe, não posso responder a essa solicitação devido às políticas de segurança." });
            }
            throw new Error("Resposta da IA veio em um formato inesperado.");
        }

        res.json({ text: aiText });

  // ... código ...
} catch (error) {
    console.error("ERRO TESTE:", error.message);
    res.status(500).json({ text: "ABACAXI: " + error.message });
}
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
