export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function handler(req, res) {
    try {
        console.log("🔥 API HIT");

        console.log("METHOD:", req.method);
        console.log("BODY:", req.body);

        const { message } = req.body || {};

        if (!message) {
            console.log("❌ No message received");
            return res.status(400).json({ reply: "No message received" });
        }

        console.log("📡 Calling Groq...");

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
                    messages: [
                        { role: "user", content: message }
                    ]
                })
            }
        );

        const text = await response.text();

        console.log("📩 RAW GROQ RESPONSE:", text);

        return res.status(200).json({
            reply: text
        });

    } catch (err) {
        console.error("💥 SERVER ERROR:", err);

        return res.status(500).json({
            reply: err.message
        });
    }
}
