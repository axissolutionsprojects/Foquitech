import { randomUUID } from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password, nome, perfil } = req.body;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;
  if (!SERVICE_KEY || !SUPABASE_URL) {
    return res.status(500).json({ error: 'Variáveis de ambiente não configuradas' });
  }

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/criar_usuario_interno`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      },
      body: JSON.stringify({
        p_email: email,
        p_password: password,
        p_nome: nome,
        p_perfil: perfil,
        p_uid: randomUUID()
      })
    });

    if (r.ok) return res.status(200).json({ ok: true });

    const data = await r.json().catch(() => ({}));
    const msg = data.message || data.hint || data.error || JSON.stringify(data);
    return res.status(400).json({ error: msg });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
