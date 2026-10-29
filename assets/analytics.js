(() => {
  'use strict';
  const cfg = window.RevelaMenteAnalyticsConfig || {};
  const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(cfg.url || '') &&
    /^sb_publishable_[A-Za-z0-9_-]+$/.test(cfg.publishableKey || '');
  const consentName = 'rm_stats_consent';
  const visitorName = 'rm_stats_visitor';
  const runPrefix = 'rm_stats_run:';
  const days = 90;
  let enabled = false, visitor = null, currentQuiz = null, hasViewed = false;
  const runs = new Map();
  const readCookie = name => document.cookie.split('; ').find(x => x.startsWith(name + '='))?.slice(name.length + 1);
  function cookie(name, value, maxAge = days * 86400) {
    document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  }
  const uuid = () => crypto.randomUUID();
  const validId = id => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id || '');
  function activate() {
    enabled = configured && location.protocol !== 'file:' && readCookie(consentName) === 'yes';
    if (!enabled) return;
    visitor = readCookie(visitorName);
    if (!validId(visitor)) { visitor = uuid(); cookie(visitorName, visitor); }
    // Sem persistência permitida, não tentamos identificar o visitante por outros meios.
    if (readCookie(visitorName) !== visitor) enabled = false;
  }
  async function send(type, quiz = null, run = null) {
    if (!enabled || !visitor) return false;
    try {
      const response = await fetch(`${cfg.url}/rest/v1/rpc/record_revelamente_event`, {
        method: 'POST', keepalive: true, referrerPolicy: 'no-referrer',
        headers: { apikey: cfg.publishableKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_event_id: uuid(), p_visitor_id: visitor, p_event_type: type, p_quiz_id: quiz, p_run_id: run })
      });
      return response.ok;
    } catch { return false; } // A indisponibilidade da coleta nunca interrompe o quiz.
  }
  function pageView() {
    if (!enabled || hasViewed) return;
    hasViewed = true;
    void send('page_view', currentQuiz);
  }
  function getRun(id) {
    if (runs.has(id)) return runs.get(id);
    try { const value = sessionStorage.getItem(runPrefix + id); if (validId(value)) { runs.set(id, value); return value; } } catch {}
    const value = uuid(); runs.set(id, value);
    try { sessionStorage.setItem(runPrefix + id, value); } catch {}
    return value;
  }
  // Serializa início e conclusão para que a gravação do início termine primeiro.
  let pending = Promise.resolve();
  const started = new Set();
  function start(id) {
    if (!enabled) return;
    const run = getRun(id);
    const owner = visitor;
    pending = pending.then(async () => {
      if (!enabled || visitor !== owner) return false;
      if (started.has(run)) return true;
      const ok = await send('quiz_start', id, run);
      if (ok) started.add(run);
      return ok;
    }).catch(() => false);
  }
  function complete(id) {
    if (!enabled) return;
    const owner = visitor;
    const run = runs.get(id) || (() => { try { return sessionStorage.getItem(runPrefix + id); } catch { return null; } })();
    // Resultados antigos apenas reabertos não representam uma nova conclusão.
    if (!validId(run)) return;
    pending = pending.then(() => enabled && visitor === owner ? send('quiz_complete', id, run) : false).catch(() => false);
  }
  function reset(id) {
    runs.delete(id);
    try { sessionStorage.removeItem(runPrefix + id); } catch {}
  }
  function preferences() {
    let dialog = document.querySelector('#stats-preferences');
    if (!dialog) {
      dialog = document.createElement('dialog'); dialog.id = 'stats-preferences';
      dialog.innerHTML = `<h2>Estatísticas opcionais</h2><p>Com sua permissão, contamos visitas, início e conclusão de testes no Supabase. Um identificador aleatório neste navegador permite estimar visitantes únicos por até 90 dias. Não enviamos respostas, resultados, nome, e-mail, localização, endereço da página ou site de origem.</p><p>Os dados ficam armazenados por até 90 dias, se a rotina de limpeza descrita na configuração estiver ativa. O provedor recebe dados técnicos da conexão, como IP, em sua infraestrutura; esses dados não são gravados nas tabelas de estatísticas do RevelaMente.</p><p>Recusar ou retirar a permissão não afeta os testes. A retirada interrompe futuras coletas e remove o identificador deste navegador, mas não apaga automaticamente eventos já registrados.</p><div class="result-actions"><button class="secondary" id="stats-refuse">Recusar / retirar permissão</button><button class="primary" id="stats-accept">Permitir estatísticas</button></div><p id="stats-choice-status" role="status"></p><form method="dialog"><button class="text-button">Fechar sem alterar</button></form>`;
      document.body.append(dialog);
      dialog.querySelector('#stats-refuse').onclick = () => {
        enabled = false; visitor = null;
        cookie(consentName, 'no'); cookie(visitorName, '', 0);
        for (const id of window.RevelaMenteData?.quizzes?.map(q => q.id) || []) reset(id);
        dialog.close(); document.querySelector('#stats-status').textContent = 'Estatísticas opcionais recusadas.';
      };
      dialog.querySelector('#stats-accept').onclick = () => {
        cookie(consentName, 'yes'); activate(); pageView();
        if (!enabled) { dialog.querySelector('#stats-choice-status').textContent = 'O navegador bloqueou o identificador. Nenhum evento será enviado.'; return; }
        dialog.close(); document.querySelector('#stats-status').textContent = 'Estatísticas opcionais permitidas.';
      };
    }
    dialog.showModal();
  }
  function mount(quiz) {
    currentQuiz = quiz || null;
    const footer = document.querySelector('footer');
    if (!configured || location.protocol === 'file:') return;
    const block = document.createElement('div');
    block.innerHTML = `<p id="stats-status" class="disclaimer">Estatísticas opcionais: ${readCookie(consentName) === 'yes' ? 'permitidas' : readCookie(consentName) === 'no' ? 'recusadas' : 'ainda não permitidas'}. <button class="text-button" id="stats-open">Escolher preferências</button></p>`;
    footer.append(block);
    document.querySelector('#stats-open').onclick = preferences;
    activate(); pageView();
    if (!readCookie(consentName)) preferences();
  }
  const safe = fn => (...args) => { try { return fn(...args); } catch { return undefined; } };
  window.RevelaMenteAnalytics = { mount:safe(mount), start:safe(start), complete:safe(complete), reset:safe(reset), configured };
})();
