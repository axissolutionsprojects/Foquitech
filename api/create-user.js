export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password, nome, perfil } = req.body;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;
  if (!SERVICE_KEY) return res.status(500).json({ error: 'SUPABASE_SERVICE_KEY não configurada' });

  // Tenta criar via GoTrue admin API
  const r = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    },
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome, perfil },
      app_metadata: { perfil }
    })
  });

  if (r.ok) {
    const data = await r.json();
    return res.status(200).json({ ok: true, user: data });
  }

  // Fallback: inserção direta via SQL (bypassa validação de domínio do GoTrue)
  const uid = crypto.randomUUID();
  const sqlRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/criar_usuario_interno`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    },
    body: JSON.stringify({ p_email: email, p_password: password, p_nome: nome, p_perfil: perfil, p_uid: uid })
  });

  if (sqlRes.ok) return res.status(200).json({ ok: true });

  // Se ambos falharam, retorna o erro original do GoTrue mas legível
  const errData = await r.json().catch(() => ({}));
  const msg = errData.msg || errData.message || errData.error_description || 'Erro ao criar usuário';
  return res.status(400).json({ error: msg });
}
