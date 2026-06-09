import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const readJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });

const sendJson = (response, status, payload) => {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(payload));
};

const buildEmailHtml = (data) => `
  <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
    <h2 style="margin:0 0 16px">New Dreamspace enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email || 'Not provided')}</p>
    <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message || 'No message provided').replaceAll('\n', '<br>')}</p>
  </div>
`;

const contactApiPlugin = (env) => ({
  name: 'dreamspace-contact-api',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Method not allowed' });
        return;
      }

      try {
        const apiKey = env.RESEND_API_KEY;
        const to = env.CONTACT_TO_EMAIL || 'info@dreamspace.in';
        const from = env.CONTACT_FROM_EMAIL || 'Dreamspace <onboarding@resend.dev>';
        const data = await readJsonBody(request);

        if (!apiKey) {
          sendJson(response, 500, { error: 'Email service is not configured.' });
          return;
        }

        if (!data.name || !data.phone) {
          sendJson(response, 400, { error: 'Name and phone are required.' });
          return;
        }

        if (data.website) {
          sendJson(response, 200, { ok: true });
          return;
        }

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'User-Agent': 'dreamspace-website',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from,
            to,
            subject: `New Dreamspace enquiry from ${data.name}`,
            reply_to: data.email || undefined,
            html: buildEmailHtml(data)
          })
        });

        if (!resendResponse.ok) {
          sendJson(response, 502, { error: 'Unable to send enquiry right now.' });
          return;
        }

        const result = await resendResponse.json();
        sendJson(response, 200, { ok: true, id: result.id });
      } catch (error) {
        sendJson(response, 500, { error: 'Unable to process enquiry.' });
      }
    });
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), contactApiPlugin(env)]
  };
});
