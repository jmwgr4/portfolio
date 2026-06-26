const chatBubble = document.getElementById("chat-bubble");
const chatWindow = document.getElementById("chat-window");
const closeChatBtn = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const chatMessages = document.getElementById("chat-messages");

chatBubble.addEventListener("click", () => {
    chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
});

closeChatBtn.addEventListener("click", () => {
    chatWindow.style.display = "none";
});

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = messageInput.value.trim();
    if(!userInput) return;

    displayMessage(userInput, "user");
    messageInput.value = "";

    const botReply = await getBotResponse(userInput);
    displayMessage(botReply, "bot");
}
    
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function getBotResponse(userInput) {
    try {
        const response = await fetch('/api/chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        });
        
        if (!response.ok) {
            return "Server error. Please try again.";
        }
        
        const data = await response.json();
        return data.reply;
    } catch (error) {
        // console.error("Error fetching bot response:", error);
        return "Sorry, I couldn't connect to AI right now. Please try again.";
    }
}
