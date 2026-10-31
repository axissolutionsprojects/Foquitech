export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password, nome, perfil } = req.body;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;
  if (!SERVICE_KEY) return res.status(500).json({ error: 'SUPABASE_SERVICE_KEY não configurada' });
  const r = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    },
    body: JSON.stringify({ email, password, email_confirm: true, user_metadata: { nome, perfil }, app_metadata: { perfil } })
  });
  const data = await r.json();
  if (!r.ok) return res.status(400).json(data);
  return res.status(200).json({ ok: true, user: data });
}
