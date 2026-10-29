(() => {
  'use strict';
  const config = window.RevelaMenteAnalyticsConfig || {};
  const $ = id => document.getElementById(id);
  const nf = new Intl.NumberFormat('pt-BR');
  let token = null, expiry = 0, requestId = 0;
  const validConfig = /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(config.url || '') && /^sb_publishable_[A-Za-z0-9_-]+$/.test(config.publishableKey || '');
  function status(text) { $('status').textContent = text; }
  function clearDashboard() {
    $('dashboard').hidden = true;
    for (const id of ['metrics','daily-chart','daily-table','ranking','quiz-table','updated']) $(id).replaceChildren();
  }
  function signedOut(message) {
    requestId++; token = null; expiry = 0; clearDashboard(); $('retry').hidden = true;
    $('logout').hidden = true; $('login-panel').hidden = !validConfig;
    status(message);
  }
  async function api(path, body, authenticated = false) {
    const headers = { apikey: config.publishableKey, 'Content-Type': 'application/json' };
    if (authenticated) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(config.url + path, { method:'POST', headers, body: JSON.stringify(body), cache: 'no-store' });
    const data = await response.json().catch(() => null);
    if (!response.ok) { const error = new Error('API indisponível'); error.status = response.status; error.code = data?.code; throw error; }
    return data;
  }
  const integer = n => { if (!Number.isSafeInteger(Number(n)) || Number(n) < 0 || n === null) throw new Error('Dados inválidos'); return Number(n); };
  const escape = str => String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(data) {
    if (!data?.totals || !Array.isArray(data.days) || !Array.isArray(data.quizzes) || !data.generated_at) throw new Error('Resposta inválida');
    const totals = data.totals;
    const metrics = [['Visitantes únicos ≈ · 90 dias',totals.visitors],['Visualizações · 90 dias',totals.views],['Acessos hoje',totals.today],['Acessos · 7 dias',totals.week],['Acessos · 30 dias',totals.month]];
    // Valida tudo antes de exibir, para nunca misturar dados antigos e incompletos.
    metrics.forEach(([,n]) => integer(n));
    const days = data.days.map(d => ({day: String(d.day), views: integer(d.views), visitors: integer(d.visitors)}));
    if (!days.length || days.some(d => !/^\d{4}-\d{2}-\d{2}$/.test(d.day))) throw new Error('Dias inválidos');
    const quizzes = window.RevelaMenteData.quizzes.map(q => {
      const row = data.quizzes.find(r => r.quiz_id === q.id) || {views:0,starts:0,completions:0,starters:0,finishers:0};
      return {...q, ...Object.fromEntries(['views','starts','completions','starters','finishers'].map(k => [k,integer(row[k])]))};
    });
    $('metrics').innerHTML = metrics.map(([label,n]) => `<div class="metric"><span>${label}</span><strong>${nf.format(n)}</strong></div>`).join('');
    const max = Math.max(1,...days.map(d => d.views));
    $('daily-chart').innerHTML = days.map(d => `<div class="day-column" title="${d.day}: ${nf.format(d.views)} visualizações"><span class="day-bar" style="height:${d.views/max*100}%"></span></div>`).join('');
    $('daily-chart').setAttribute('aria-label', `Visualizações de ${days[0].day} a ${days.at(-1).day}. Dados exatos na tabela abaixo.`);
    $('daily-table').innerHTML = days.map(d => `<tr><td>${d.day.split('-').reverse().join('/')}</td><td>${nf.format(d.views)}</td><td>${nf.format(d.visitors)}</td></tr>`).join('');
    $('daily-caption').textContent = `${days.length} dias · ${nf.format(days.reduce((s,d) => s+d.views,0))} visualizações. Datas e valores na tabela abaixo.`;
    const ranked = [...quizzes].sort((a,b) => b.views-a.views);
    const rankMax = Math.max(1,...ranked.map(q => q.views));
    $('ranking').innerHTML = ranked.map(q => `<li><div class="rank-line"><span>${escape(q.title)}</span><strong>${nf.format(q.views)}</strong></div><div class="rank-track"><span style="width:${q.views/rankMax*100}%"></span></div></li>`).join('');
    $('quiz-table').innerHTML = quizzes.map(q => `<tr><td>${escape(q.title)}</td>${['views','starts','completions','starters','finishers'].map(k => `<td>${nf.format(q[k])}</td>`).join('')}</tr>`).join('');
    $('updated').textContent = `Atualizado em ${new Date(data.generated_at).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'})} · São Paulo. Retenção: 90 dias.`;
    $('dashboard').hidden = false;
    status(totals.views === 0 ? 'Conectado. Ainda não há visualizações registradas no histórico disponível.' : 'Dados reais carregados do Supabase.');
  }
  async function load() {
    if (!token || Date.now() >= expiry) { signedOut('Sua sessão expirou. Entre novamente.'); return; }
    const id = ++requestId;
    clearDashboard(); $('retry').hidden = true; status('Buscando estatísticas…'); $('refresh').disabled = true;
    try {
      const data = await api('/rest/v1/rpc/revelamente_stats', {p_days:Number($('period').value)}, true);
      if (id !== requestId) return;
      render(data);
    } catch (error) {
      if (id !== requestId) return;
      clearDashboard();
      if ([401,403].includes(error.status) || error.code === '42501') signedOut('Sessão inválida ou usuário sem permissão administrativa. Confira a configuração no Supabase.');
      else { status('Não foi possível carregar os dados. Confira a conexão e o SQL instalado; tente atualizar. Nenhum número foi estimado.'); $('retry').hidden = false; }
    } finally { $('refresh').disabled = false; }
  }
  $('login-form').onsubmit = async event => {
    event.preventDefault(); $('login-button').disabled = true; status('Autenticando no Supabase…');
    try {
      const data = await api('/auth/v1/token?grant_type=password', {email:$('email').value.trim(),password:$('password').value});
      if (!data?.access_token || !data.expires_in) throw new Error('Sessão inválida');
      token = data.access_token; expiry = Date.now()+Number(data.expires_in)*1000;
      $('password').value = ''; $('login-panel').hidden = true; $('logout').hidden = false;
      await load();
    } catch { signedOut('Não foi possível entrar. Confira suas credenciais, conexão e configuração do projeto.'); }
    finally { $('password').value = ''; $('login-button').disabled = false; }
  };
  $('logout').onclick = async () => {
    const previous = token;
    signedOut('Você saiu do painel.');
    if (previous) { try { await fetch(config.url+'/auth/v1/logout', {method:'POST', headers:{apikey:config.publishableKey,Authorization:`Bearer ${previous}`}}); } catch {} }
  };
  $('refresh').onclick = load; $('retry').onclick = load; $('period').onchange = load;
  // Remove dados da tela no vencimento da sessão, mesmo sem uma nova consulta.
  setInterval(() => { if (token && Date.now() >= expiry) signedOut('Sua sessão expirou. Entre novamente.'); }, 10000);
  if (!validConfig) { $('setup').hidden = false; status('Configuração pendente · nenhum dado disponível.'); }
  else if (!['https:','http:'].includes(location.protocol)) { status('Abra o painel em HTTPS no GitHub Pages ou com um servidor local.'); }
  else { $('login-panel').hidden = false; status('Entre com a conta administrativa autorizada.'); }
})();
