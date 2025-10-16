export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body || '{}');
  const nome = body.nome || '';
  const idade = body.idade || '';

  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const TELEGRAM_CHAT  = process.env.TELEGRAM_CHAT;

  const text = `📥 *Novo Registro*\n*Nome:* ${nome}\n*Idade:* ${idade}`;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT, text, parse_mode: 'Markdown' })
  });

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
}
