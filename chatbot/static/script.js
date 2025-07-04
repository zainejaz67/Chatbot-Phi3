async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    const chatLog = document.getElementById('chat-log');

    // Add user message
    appendMessage(message, 'user');

    input.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        appendMessage(data.response.trim(), 'bot');
    } catch (error) {
        console.error('Error:', error);
        appendMessage('❌ Error connecting to the bot.', 'bot');
    }
}

function appendMessage(text, sender) {
    const chatLog = document.getElementById('chat-log');
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.innerText = text;

    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    const now = new Date();
    timestamp.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    message.appendChild(timestamp);
    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Toggle light/dark mode
function toggleTheme() {
    document.body.classList.toggle('dark');
    const icon = document.getElementById('toggle-theme');
    icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}
