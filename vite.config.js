import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { CONTACT_LIMITS, sendContactEmail, validateContactPayload } from './lib/contact.js';
import { services } from './src/data/services.js';

const allowedServices = services.map((service) => service.title.en);

const readJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > CONTACT_LIMITS.bodyBytes) {
        reject(Object.assign(new Error('Request body too large.'), { statusCode: 413 }));
        request.destroy();
      }
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

const contactApiPlugin = (env) => ({
  name: 'dreamspace-contact-api',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Method not allowed' });
        return;
      }

      try {
        const data = await readJsonBody(request);
        const validation = validateContactPayload(data, allowedServices);
        if (validation.spam) return sendJson(response, 200, { ok: true });
        if (validation.error) return sendJson(response, 400, { error: validation.error });
        if (!env.RESEND_API_KEY) return sendJson(response, 503, { error: 'Email service is temporarily unavailable.' });

        const result = await sendContactEmail({
          apiKey: env.RESEND_API_KEY,
          to: env.CONTACT_TO_EMAIL || 'office@dreamspaceinfra.com',
          from: env.CONTACT_FROM_EMAIL || 'Dreamspace <onboarding@resend.dev>',
          data: validation.data
        });
        sendJson(response, 200, { ok: true, id: result.id });
      } catch (error) {
        console.error('Contact enquiry failed:', error instanceof Error ? error.message : error);
        sendJson(response, error?.statusCode || 502, { error: 'Unable to send enquiry right now. Please call or WhatsApp Dreamspace.' });
      }
    });
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), contactApiPlugin(env)],
    server: { host: '127.0.0.1' }
  };
});
