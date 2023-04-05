const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

const openaiApiKey = prompt('Vul hier je OpenAI API key in:'); // Replace with your own API key

async function generateChatbotResponse(prompt) {
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const maxTokens = 100;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
    };

    const requestBody = {
        prompt: prompt,
        max_tokens: maxTokens,
        n: 1,
        stop: null,
        temperature: 1
    };

    try {
        const response = await axios.post(apiUrl, requestBody, { headers: headers });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating chatbot response:', error);
        return 'Het lijkt erop dat de API key niet juist is ingevuld. Probeer dit nogmaals door de pagina te verversen';
    }
}

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (userMessage.trim()) {
        const userDiv = document.createElement('div');
        userDiv.classList.add('message', 'user-message'); // Update the class names
        userDiv.textContent = userMessage;
        chatArea.appendChild(userDiv);
        userInput.value = '';

        const chatbotPrompt = `De chatbot is een fiscaal expert, hij geeft bij elke vraag antwoord met de insteek dat de vraag bekekeen dient te worden vanuit het helikopter overzicht die een torenvalk heeft. Zorg dat het antwoord is afgerond voordat het maximale aantal tokens is bereikt.\nGebruiker: ${userMessage}\nChatbot:`;
        const chatbotMessage = await generateChatbotResponse(chatbotPrompt);

        const chatbotDiv = document.createElement('div');
        chatbotDiv.classList.add('message', 'chatbot-message'); // Update the class names
        chatbotDiv.textContent = chatbotMessage;
        chatArea.appendChild(chatbotDiv);

        chatArea.scrollTop = chatArea.scrollHeight;
    }
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
