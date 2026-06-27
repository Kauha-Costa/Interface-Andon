/* ============================================
   ANDON 4.0 — SHELL BUILDER (sidebar / topbar / ticker)
   Reutilizado em todas as páginas do protótipo
   ============================================ */

const NAV_ITEMS = [
  { id: 'visao-geral', label: 'Visão Geral', icon: 'dashboard', href: 'index.html' },
  { id: 'linhas', label: 'Linhas de Produção', icon: 'lines', href: 'linha-detalhe.html' },
  { id: 'andons', label: 'Andons e Alertas', icon: 'alert', href: '#', badge: 14 },
  { id: 'oee', label: 'OEE e Performance', icon: 'chart', href: '#' },
  { id: 'qualidade', label: 'Qualidade', icon: 'shield', href: '#' },
  { id: 'manutencao', label: 'Manutenção', icon: 'wrench', href: '#' },
  { id: 'logistica', label: 'Logística', icon: 'truck', href: '#' },
  { id: 'energia', label: 'Energia', icon: 'bolt', href: '#' },
  { id: 'historico', label: 'Histórico', icon: 'history', href: 'historico.html' },
  { id: 'relatorios', label: 'Relatórios', icon: 'report', href: '#' },
  { id: 'personalizado', label: 'Personalizado', icon: 'layoutEdit', href: 'personalizado.html', isNew: true },
  { id: 'config', label: 'Configurações', icon: 'settings', href: '#' },
{ id: 'mobile', label: 'Layout Mobile', icon: 'smartphone', href: 'mobile.html', isNew: true },
];

function buildSidebar(activeId) {
  const navHtml = NAV_ITEMS.map(item => {
    const isActive = item.id === activeId;
    const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
    const newTag = item.isNew && !isActive ? ' nav-new' : '';
    return `
      <a href="${item.href}" class="nav-item ${isActive ? 'active' : ''}${newTag}">
        ${icon(item.icon)}
        <span class="label">${item.label}</span>
        ${badge}
      </a>`;
  }).join('');

  return `
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div>
          <div class="sidebar-brand-mark">stara</div>
          <div class="sidebar-brand-sub">Evolução Constante</div>
        </div>
      </div>
      <nav class="sidebar-nav">${navHtml}</nav>
      <div class="sidebar-footer">
        <div class="sidebar-footer-tagline">
          <strong>Andon 4.0</strong><br/>
          Gestão da Fábrica Inteligente
        </div>
      </div>
    </aside>
  `;
}

function buildTopbar(opts = {}) {
  const { showAlerts = true, alertCount = 14 } = opts;
  return `
    <header class="topbar">
      <div class="topbar-left">
        <div class="topbar-product">
          <span class="topbar-product-name">ANDON 4.0</span>
          <span class="topbar-product-tagline">Gestão da Fábrica Inteligente</span>
        </div>
        <div class="topbar-divider"></div>
        <div class="plant-select">
          ${icon('factory')}
          <span>Planta Não-Me-Toque</span>
        </div>
      </div>
      <div class="topbar-right">
        <div class="topbar-clock">
          <span class="topbar-clock-time" id="clock-time">20:30:12</span>
          <span class="topbar-clock-date">Sáb, 20 jun 2026</span>
        </div>
        ${showAlerts ? `
        <button class="icon-btn" title="Alertas">
          ${icon('bell')}
          <span class="alert-badge">${alertCount}</span>
        </button>` : ''}
        <div class="user-chip">
          <div class="user-avatar">RC</div>
          <div class="user-meta">
            <div class="user-name">Raphael C.</div>
            <div class="user-role">Supervisor Produção</div>
          </div>
        </div>
      </div>
    </header>
  `;
}

const TICKER_ITEMS = [
  { type: 'critico', icon: 'alert', html: '<strong>LINHA 03 PARADA</strong> · falha no motor principal · perda estimada de R$ 4.280 nos últimos 38min' },
  { type: 'risco', icon: 'bars', html: '<strong>OEE GERAL EM 78%</strong> · abaixo da meta diária de 85% · faltam 344 unidades para fechar a meta' },
  { type: 'ok', icon: 'check', html: 'Manutenção preventiva da <strong>Linha 05 concluída</strong> · troca de rolamento finalizada às 14:30' },
  { type: 'info', icon: 'ai', html: '<strong>IA Andon:</strong> Linha 03 tem 78% de chance de ser falha recorrente do motor principal' },
  { type: 'risco', icon: 'shield', html: '<strong>Linha 07</strong> com índice de refúgo acima do limite · qualidade em atenção' },
  { type: 'ok', icon: 'check', html: 'Turno produziu <strong>1.256 de 1.600 unidades</strong> · ritmo necessário para fechar meta: 161 un/h' },
  { type: 'info', icon: 'bolt', html: 'Consumo de energia da planta dentro do esperado · <strong>238 kWh</strong> no turno atual' },
];

function buildTicker() {
  const itemsHtml = TICKER_ITEMS.map(t => `
    <span class="ticker-item tk-${t.type}">${icon(t.icon, 'ticker-ico')} ${t.html}</span>
    <span class="ticker-sep"></span>
  `).join('');

  return `
    <div class="ticker">
      <div class="ticker-label"><span class="dot"></span> AO VIVO</div>
      <div class="ticker-track-wrap">
        <div class="ticker-track">
          ${itemsHtml}
          ${itemsHtml}
        </div>
      </div>
    </div>
  `;
}

function mountShell(activeId, mainContentHtml, opts = {}) {
  document.getElementById('app-shell').innerHTML = `
    ${buildSidebar(activeId)}
    ${buildTopbar(opts)}
    <main class="main">${mainContentHtml}</main>
    ${buildTicker()}
  `;
  startClock();
}

function startClock() {
  function tick() {
    const el = document.getElementById('clock-time');
    if (!el) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  }
  tick();
  setInterval(tick, 1000);
}
