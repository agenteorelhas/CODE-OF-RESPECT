const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

// Inicializa a API com a chave das variáveis de ambiente do Render
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // CORREÇÃO PARA OHIO: Forçamos a apiVersion 'v1' (estável) 
        // e usamos o modelo gemini-1.5-flash, que é o mais atual e rápido.
        const model = genAI.getGenerativeModel(
            { model: "gemini-1.5-flash" },
            { apiVersion: 'v1' }
        );

        const prompt = `Aja como o Assistente Ético do portal 'Code of Respect'. Forneça conselhos profissionais sobre ética e assédio. Pergunta: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ text: text });
    } catch (error) {
        // Log detalhado para o painel do Render
        console.error("ERRO NO SERVIDOR:", error.message);
        
        // Retorna o erro no campo 'text' para o seu script.js exibir no chat
        res.status(500).json({ 
            text: "Erro na comunicação com a IA: " + error.message 
        });
    }
});

// O Render utiliza a porta 10000 por padrão, mas deixamos dinâmico
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor Code of Respect rodando na porta ${PORT}`));
