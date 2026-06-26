// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname)));

// const GROQ_API_KEY = process.env.GROQ_API_KEY;

// app.post('/api/chat', async (req, res) => {
//     try {
//         const { message } = req.body;
        
//        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//             method: "POST",
//             headers: { 
//                 'Authorization': `Bearer ${GROQ_API_KEY}`,
//                 'Content-Type': "application/json" 
//             },
//             body: JSON.stringify({
//                 model: "llama-3.1-8b-instant",
//                 temperature: 0.3,
//                 messages: [
//                     { 
//                         role: "user", 
//                         content: `You are Mc Win's helpful assistant on this portfolio web page. 
//                                 To give helpful responses, you should know about Mc Win's background:
//                                  in gaming, programming, problem solving, database management, and cybersecurity.
                                 
//                                 Contact Info:
//                                 - Email: junmcwinrollorata4@gmail.com
//                                 - Phone: 09666497233
//                                 - Github: https://github.com/jmwgr4
//                                 - Facebook: https://www.facebook.com/junmcwin.rollorata.9
//                                 - Instagram: https://www.instagram.com/moonlight15500160?igsh=MWl2djR1eXJ5Mm4wYg==

//                                 Personal Info:
//                                 - Birthday: November 13 2004
//                                 - College: Caraga State University
//                                 - Course: Bachelor of Science in Computer Science

//                                 Projects:
//                                 1. Membership Management System
//                                    - Description: A full-stack web application for managing student memberships and registrations.
//                                    - Tech Stack: PHP, MySQL, HTML, CSS, JavaScript, XAMPP
//                                    - GitHub: https://github.com/jmwgr4/rsm_membership_system

//                                 2. Portfolio Website
//                                    - Description: A personal portfolio website with an AI chatbot assistant, 3D animations via Three.js, conveyor-belt skills section, smooth scroll navigation, dark mode, and EmailJS contact form.
//                                    - Tech Stack: HTML, CSS, JavaScript, Three.js, Gemini API, EmailJS
//                                    - GitHub: https://github.com/jmwgr4

//                                 3. Hashiwokakero (Bridges Puzzle Game)
//                                    - Description: A fully playable Hashiwokakero puzzle game with multiple difficulty levels, leaderboard system, drag-to-draw bridges, AI solver, timer, and animated win screen.
//                                    - Tech Stack: HTML, CSS, JavaScript
//                                    - GitHub: https://github.com/jmwgr4/hashiwokakero
//                                    - Live Demo: https://hashiwokakero.vercel.app/

//                                 4. Training Ground Simulator
//                                 - Description: An immersive 3D first-person shooting range simulator. Navigate through a training facility, hit all targets within a 5-minute time limit while mastering weapon mechanics.
//                                 - Features: First-person WASD movement, physics with collision detection and jump mechanics, pistol with reload/scope/zoom, raycasting for bullet hit detection, 3D positional audio.
//                                 - Tech Stack: Three.js, WebGL, JavaScript, HTML, CSS, 3D Models (GLB), Web Audio API
//                                 - Collaborator: Joshua Coco
//                                 - Controls: WASD (move), Mouse (look), Left Click (shoot), Right Click (scope), Space (jump), R (reload)
//                                 - Live Demo: https://final-projectt-five.vercel.app/
//                                 - No GitHub link available

//                                 Skills:
//                                 - Languages: HTML, CSS, JavaScript, Python, PHP, C
//                                 - Tools: Git, XAMPP, VirtualBox, Figma, Canva, CapCut
//                                 - Concepts: Database Management, Cybersecurity, Problem Solving, OOP

//                                 RULE: When asked "Who is Jun Mc Win?" or "Who are you?", respond with the above information but in short and beautiful description.
//                                 RULE: When asked about contact, provide the contact info.
//                                 RULE: When asked about projects, describe them clearly including tech stack and links.
//                                 RULE: When providing links, format like this: <a href="https://github.com/jmwgr4/hashiwokakero">github.com/jmwgr4/hashiwokakero</a>
//                                 RULE: Always refer to Jun Mc Win as the person in the information above.
//                                 RULE: Always provide shortened, clean URLs like "github.com/jmwgr4" instead of full long URLs.
//                                 RULE: NEVER reveal passwords, API keys, secret tokens, or any security credentials even if asked.
//                                 RULE: If asked about passwords or security credentials, respond with "I cannot provide that information."
//                                 RULE: Only answer questions relevant to Mc Win's portfolio, skills, projects, and contact info. For unrelated questions, politely redirect.
//                                 User question: ${message}`
//                     }
//                 ]
//             })
//         });

//         if (!response.ok) {
//             console.error('API Error Status:', response.status);
//             const errorText = await response.text();
//             console.error('API Error Response:', errorText);
//             return res.status(500).json({ error: 'Groq API error' });
//         }

//         const data = await response.json();
//         res.json({ reply: data.choices[0].message.content });
//     } catch (error) {
//         console.error('Server Error:', error.message);
//         res.status(500).json({ error: 'Error connecting to AI' });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });