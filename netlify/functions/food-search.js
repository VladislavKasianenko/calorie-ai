exports.handler = async (event) => {
  const query = event.queryStringParameters?.q || "";
  if (!query) return { statusCode: 400, body: "No query" };
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 600,
        messages: [
          { role: "system", content: "Ты нутрициолог. Пользователь вводит еду на русском. Верни ТОЛЬКО JSON массив без markdown: [{\"name\":\"...\",\"kcal\":0,\"p\":0,\"f\":0,\"c\":0}]. Знаешь бренды: Genetic, Optimum Nutrition, BioTech и др. КБЖУ на порцию или 100г. Всегда возвращай минимум 1 результат." },
          { role: "user", content: query },
        ],
      }),
    });
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "[]";
    const clean = text.replace(/```json|```/g, "").trim();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: clean,
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
