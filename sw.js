const CACHE = 'foqui-v54';
const STATIC = [
  '/', '/producao', '/finalizacao', '/atendimento', '/login', '/admin',
  '/index.html', '/producao-tablet.html', '/finalizacao-tablet.html',
  '/atendimento-tablet.html', '/login.html', '/admin.html',
  '/assets/avatar.png', '/assets/icon-192.png', '/assets/icon-512.png',
  '/assets/focaccia-banner.png', '/assets/sanduiche-rosa.png',
  '/assets/chapeu-chef-v2.png', '/assets/calendario-icon.png',
  '/assets/estoque-icon.png', '/assets/compras-icon.png',
  '/assets/checklist-icon.png', '/assets/contagem-icon.png',
  '/assets/el-rosa-01.png', '/assets/el-rosa-02.png', '/assets/el-rosa-05.png',
  '/assets/el-verde-02.png', '/assets/el-verde-04.png',
  '/assets/el-off-04.png', '/assets/el-selo-08.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  // Nunca cachear: API routes, Supabase (dados autenticados), CDNs externos
  if (url.includes('/api/') || url.includes('supabase.co') || url.includes('esm.sh') || url.includes('qrserver.com')) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      const clone = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return resp;
    }))
  );
});
