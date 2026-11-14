const verifyAdmin = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!await verifyAdmin(req)) return res.status(403).json({ error: 'Acesso negado' });

  const { uid, nome, perfil, senha } = req.body;
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY: SERVICE_KEY } = process.env;
  if (!SERVICE_KEY || !SUPABASE_URL) return res.status(500).json({ error: 'Variáveis não configuradas' });

  const headers = {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`
  };

  try {
    // Atualiza tabela profiles
    const pRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${uid}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ nome, perfil })
    });
    if (!pRes.ok) {
      const d = await pRes.json().catch(() => ({}));
      return res.status(400).json({ error: d.message || 'Erro ao atualizar perfil' });
    }

    // Atualiza app_metadata (perfil) + senha via Admin API
    const adminBody = { app_metadata: { perfil } };
    if (senha && senha.length >= 6) adminBody.password = senha;
    const aRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${uid}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(adminBody)
    });
    if (!aRes.ok) {
      const d = await aRes.json().catch(() => ({}));
      return res.status(400).json({ error: d.message || 'Erro ao atualizar usuário' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
