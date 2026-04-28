const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

// Conecta com a API usando a variável de ambiente do Render
// Adicionamos a especificação da versão da API (v1) para evitar erros 404
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Chamada do modelo forçando a versão v1 para garantir compatibilidade
        const model = genAI.getGenerativeModel(
            { model: "gemini-1.5-flash" },
            { apiVersion: 'v1' }
        );

        const prompt = `Aja como o Assistente Ético do portal 'Code of Respect'. Forneça conselhos profissionais sobre ética e assédio. Pergunta: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error("A IA retornou uma resposta vazia.");
        }

        // Resposta formatada para o seu script.js ler corretamente
        res.json({ text: text });

    } catch (error) {
        // Log detalhado que aparecerá no painel "Logs" do Render
        console.error("ERRO DETALHADO NO SERVER:", error.message);
        
        // Envia o erro no formato esperado pelo seu front-end
        res.status(500).json({ 
            text: "Desculpe, tive um problema ao processar sua dúvida. Verifique se a API Key está correta ou se o servidor está ativo." 
        });
    }
});

// O Render injeta a porta automaticamente em process.env.PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando com sucesso na porta ${PORT}`));
