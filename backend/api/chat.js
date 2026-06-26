export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { message } = req.body || {};

        if (!message) {
            return res.status(400).json({ reply: "No message provided" });
        }

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    temperature: 0.3,
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant for a portfolio website."
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        // ❗ LOG REAL ERROR (VERY IMPORTANT for debugging)
        if (!response.ok) {
            console.error("GROQ ERROR RESPONSE:", data);
            return res.status(500).json({
                reply: data?.error?.message || "Groq API error"
            });
        }

        return res.status(200).json({
            reply: data?.choices?.[0]?.message?.content || "No response from AI"
        });

    } catch (err) {
        console.error("SERVER CRASH:", err);

        return res.status(500).json({
            reply: "Server error. Please try again later."
        });
    }
}
