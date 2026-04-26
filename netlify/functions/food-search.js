exports.handler = async (event) => {
  const query = event.queryStringParameters?.q || "";
  if (!query) return { statusCode: 400, body: "No query" };

  try {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-88bfa626da754c2087243c2ea0ff997e",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content: `Ты нутрициолог и знаешь КБЖУ всех продуктов, блюд и брендовых спортивных добавок включая российские бренды (Genetic, Optimum Nutrition, Dymatize и др).
Пользователь вводит еду в свободной форме на русском языке.
Верни ТОЛЬКО JSON массив (без markdown, без пояснений) с 1-4 вариантами.
Формат: [{"name":"...","kcal":0,"p":0,"f":0,"c":0}]
- name: понятное русское название с весом/порцией
- kcal/p/f/c: числа на указанную порцию (или 100г если не указано)
- Используй реальные данные с этикеток или из баз данных питания
- Если запрос неточный — дай 2-3 наиболее вероятных варианта`,
          },
          { role: "user", content: query },
        ],
      }),
    });

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "[]";
    const clean = text.replace(/```json|```/g, "").trim();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: clean,
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
