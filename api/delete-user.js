const verifyAdmin = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end();
  if (!await verifyAdmin(req)) return res.status(403).json({ error: 'Acesso negado' });

  const uid = req.query.uid;
  if (!uid) return res.status(400).json({ error: 'uid required' });

  const { SUPABASE_URL, SUPABASE_SERVICE_KEY: SERVICE_KEY } = process.env;
  if (!SERVICE_KEY || !SUPABASE_URL) return res.status(500).json({ error: 'Variáveis não configuradas' });

  const headers = {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Prefer': 'return=minimal'
  };

  await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${uid}`, { method: 'DELETE', headers });

  const r = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${uid}`, {
    method: 'DELETE',
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` }
  });

  if (!r.ok) {
    let msg = 'Erro ao excluir';
    try { const d = await r.json(); msg = d.message || msg; } catch (_) {}
    return res.status(400).json({ error: msg });
  }

  return res.status(200).json({ ok: true });
};
