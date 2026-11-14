const verifyAdmin = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!await verifyAdmin(req)) return res.status(403).json({ error: 'Acesso negado' });

  const { SUPABASE_URL, SUPABASE_SERVICE_KEY: SERVICE_KEY } = process.env;
  if (!SERVICE_KEY || !SUPABASE_URL) return res.status(500).json({ error: 'Variáveis não configuradas' });

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id,email,nome,perfil`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` }
    });
    const data = await r.json();
    if (!r.ok) return res.status(400).json({ error: data.message || JSON.stringify(data) });
    return res.status(200).json(Array.isArray(data) ? data : []);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
