const json = (res, status, payload) => {
  res.status(status).json(payload);
};

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'info@dreamspace.in';
  const from = process.env.CONTACT_FROM_EMAIL || 'Dreamspace <onboarding@resend.dev>';

  if (!apiKey) {
    json(res, 500, { error: 'Email service is not configured.' });
    return;
  }

  const data = req.body || {};
  if (!data.name || !data.phone) {
    json(res, 400, { error: 'Name and phone are required.' });
    return;
  }

  if (data.website) {
    json(res, 200, { ok: true });
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
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

  if (!response.ok) {
    const message = await response.text();
    json(res, 502, { error: 'Unable to send enquiry right now.', details: message });
    return;
  }

  const result = await response.json();
  json(res, 200, { ok: true, id: result.id });
}
