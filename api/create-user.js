module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, nome, perfil } = req.body;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;

  if (!SERVICE_KEY || !SUPABASE_URL) {
    return res.status(500).json({ error: 'Variáveis não configuradas no Vercel' });
  }

  const headers = {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`
  };

  try {
    // 1. Cria o usuário via API Admin do Supabase (GoTrue faz o hash da senha)
    const authRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { nome, perfil }
      })
    });

    const authData = await authRes.json().catch(() => ({}));
    if (!authRes.ok) {
      const msg = authData.message || authData.msg || JSON.stringify(authData);
      return res.status(400).json({ error: msg });
    }

    const uid = authData.id;

    // 2. Insere/atualiza perfil na tabela public.profiles
    await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({ id: uid, email, nome, perfil })
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
