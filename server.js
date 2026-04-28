const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

// Inicializa a API com a sua chave do Render
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Mudança para o modelo 1.0 Pro - O mais estável para a região de Ohio
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

        const prompt = `Aja como o Assistente Ético do portal 'Code of Respect'. Forneça conselhos profissionais sobre ética e assédio. Pergunta: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Retorna o texto para o seu script.js
        res.json({ text: text });

    } catch (error) {
        console.error("ERRO NO GOOGLE AI:", error.message);
        
        // Retorna o erro detalhado para o chat para sabermos o que houve
        res.status(500).json({ 
            text: "Erro na IA: " + error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
