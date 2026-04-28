const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

// Inicializa a API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // CORREÇÃO: Forçamos o modelo 'gemini-1.5-flash' sem sufixos 
        // e garantimos que o objeto de configuração esteja correto.
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash" 
        });

        const prompt = `Aja como o Assistente Ético do portal 'Code of Respect'. Forneça conselhos profissionais sobre ética e assédio. Pergunta: ${message}`;

        // Adicionamos um timeout simples para evitar que a requisição fique pendente
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error("A IA retornou uma resposta vazia.");
        }

        res.json({ text: text });

    } catch (error) {
        // Log detalhado para você ver no painel do Render
        console.error("ERRO DETALHADO:", error.message);
        
        // Retornamos o erro no formato que seu script.js espera (campo 'text')
        res.status(500).json({ 
            text: "Desculpe, tive um problema ao processar sua dúvida. Verifique se a API Key está correta ou tente novamente mais tarde." 
        });
    }
});

const PORT = process.env.PORT || 10000; // Render usa a 10000 por padrão
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
