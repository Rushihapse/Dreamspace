export const CONTACT_LIMITS = {
  name: 80,
  phone: 24,
  email: 160,
  service: 120,
  message: 3000,
  bodyBytes: 16_384
};

const phonePattern = /^[+()\d][+()\d\s.-]{6,23}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const asText = (value) => (typeof value === 'string' ? value.trim() : '');

export const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export function validateContactPayload(input, allowedServices = []) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { error: 'Invalid enquiry data.' };
  }

  const data = {
    name: asText(input.name),
    phone: asText(input.phone),
    email: asText(input.email),
    service: asText(input.service),
    message: asText(input.message),
    website: asText(input.website)
  };

  if (data.website) return { spam: true, data };
  if (!data.name || !data.phone) return { error: 'Name and phone are required.' };
  if (data.name.length < 2 || data.name.length > CONTACT_LIMITS.name) return { error: 'Please enter a valid name.' };
  if (!phonePattern.test(data.phone)) return { error: 'Please enter a valid phone number.' };
  if (data.email && (!emailPattern.test(data.email) || data.email.length > CONTACT_LIMITS.email)) return { error: 'Please enter a valid email address.' };
  if (data.service.length > CONTACT_LIMITS.service) return { error: 'Please select a valid service.' };
  if (allowedServices.length && data.service && !allowedServices.includes(data.service)) return { error: 'Please select a valid service.' };
  if (data.message.length > CONTACT_LIMITS.message) return { error: `Message must be ${CONTACT_LIMITS.message} characters or fewer.` };

  return { data };
}

export const buildEmailHtml = (data) => `
  <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
    <h2 style="margin:0 0 16px">New Dreamspace enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email || 'Not provided')}</p>
    <p><strong>Service:</strong> ${escapeHtml(data.service || 'Not selected')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message || 'No message provided').replaceAll('\n', '<br>')}</p>
  </div>
`;

export async function sendContactEmail({ apiKey, to, from, data, fetchImpl = fetch }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetchImpl('https://api.resend.com/emails', {
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
      }),
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`Email provider returned ${response.status || 'an error'}.`);
    const result = await response.json();
    if (!result?.id) throw new Error('Email provider returned an invalid response.');
    return result;
  } finally {
    clearTimeout(timeout);
  }
}
