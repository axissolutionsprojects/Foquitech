// Shared auth guard — verifica se o caller é admin autenticado via app_metadata
// Underscore prefix = Vercel não expõe como rota pública
module.exports = async function verifyAdmin(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return false;
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: SUPABASE_SERVICE_KEY
      }
    });
    if (!r.ok) return false;
    const user = await r.json();
    // Apenas app_metadata (imutável pelo usuário) define o perfil
    return user.app_metadata?.perfil === 'admin';
  } catch (_) {
    return false;
  }
};
