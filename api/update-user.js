module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { uid, nome, perfil, senha } = req.body;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;

  if (!SERVICE_KEY || !SUPABASE_URL) {
    return res.status(500).json({ error: 'Variáveis não configuradas' });
  }

  const headers = {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`
  };

  try {
    // Atualiza perfil na tabela profiles
    const pRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${uid}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ nome, perfil })
    });
    if (!pRes.ok) {
      const d = await pRes.json().catch(() => ({}));
      return res.status(400).json({ error: d.message || 'Erro ao atualizar perfil' });
    }

    // Atualiza senha via Admin API (só se informada)
    if (senha && senha.length >= 6) {
      const aRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${uid}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ password: senha })
      });
      if (!aRes.ok) {
        const d = await aRes.json().catch(() => ({}));
        return res.status(400).json({ error: d.message || 'Erro ao atualizar senha' });
      }
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
