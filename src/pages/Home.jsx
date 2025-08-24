import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("AI SaaS");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Create a beautiful, modern, and responsive landing page for a ${category} product called "${idea}".
                    The design should follow these requirements:

                    - Do NOT include any images
                    - Use only valid **HTML with Tailwind CSS classes** (no extra scripts or frameworks).
                    - A short, engaging **subheading** below the title.
                    - A bold, eye-catching **hero section** with gradient background and a large product title.
                    - A clear **call-to-action button** styled with vibrant colors, hover effects, and rounded edges.
                    - Three attractive **feature cards** with icons, shadows, rounded corners, and hover effects.
                    - Include a **footer** with placeholder links (like About, Contact, Privacy).
                    - Clean typography, good use of white space, and responsive design for both desktop and mobile.
                `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "AI Landing Page Generator",
          "Content-Type": "application/json",
        },
      }
    );

    setResult(response.data.choices[0].message.content);
    setIsLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  return (
    <div>
      <div className="min-h-screen bg-[#F6F5FF] px-4 py-10 font-sans">
        <div className="max-w-3xl bg-white mx-auto rounded-2xl shadow-xl p-8">
          <h1 className="text-purple-700 text-3xl font-bold text-center mb-6">
            AI Landing Page Generator
          </h1>

          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Enter your product idea (eg:Travel Planner, E-Commerce)"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          />

          <select
            className="w-full border border-gray-300 rounded-lg mb-4 p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="AI SaaS">AI SaaS</option>
            <option value="Productivity Tool">Productivity Tool</option>
            <option value="Startup">Startup</option>
          </select>

          <button
            className="w-full bg-purple-700 py-3 text-white rounded-lg font-bold hover:bg-purple-800"
            onClick={handleGenerate}
          >
            {isLoading ? "Generating..." : "Generate Landing Page"}
          </button>

          {result && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-3">Live Preview</h2>

              <div
                className="border rounded-lg mb-2 p-5"
                dangerouslySetInnerHTML={{
                  __html: result,
                }}
              />

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">HTML Code:</h3>
                <button
                  className="bg-gray-700 py-3 text-white rounded-lg font-bold hover:bg-gray-800 px-4"
                  onClick={copyCode}
                >
                  Copy Code
                </button>
                <pre className="bg-black text-white p-4 text-sm rounded-lg overflow-x-auto mt-6">
                  {result}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
