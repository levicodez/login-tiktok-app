import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const nome = body.nome;
    const idade = body.idade;

    const token = "SEU_TOKEN_DO_TELEGRAM";
    const chatId = "@SEU_CANAL_OU_ID";
    const text = `Nome: ${nome}\nIdade: ${idade}`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Enviado com sucesso!" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
