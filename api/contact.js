const json = (res, status, payload) => {
  res.status(status).json(payload);
};

import { sendContactEmail, validateContactPayload } from '../lib/contact.js';
import { services } from '../src/data/services.js';

const allowedServices = services.map((service) => service.title.en);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const validation = validateContactPayload(req.body, allowedServices);
    if (validation.spam) return json(res, 200, { ok: true });
    if (validation.error) return json(res, 400, { error: validation.error });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return json(res, 503, { error: 'Email service is temporarily unavailable.' });

    const result = await sendContactEmail({
      apiKey,
      to: process.env.CONTACT_TO_EMAIL || 'office@dreamspaceinfra.com',
      from: process.env.CONTACT_FROM_EMAIL || 'Dreamspace <onboarding@resend.dev>',
      data: validation.data
    });
    return json(res, 200, { ok: true, id: result.id });
  } catch (error) {
    console.error('Contact enquiry failed:', error instanceof Error ? error.message : error);
    return json(res, 502, { error: 'Unable to send enquiry right now. Please call or WhatsApp Dreamspace.' });
  }
}
