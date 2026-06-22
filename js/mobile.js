/* ============================================
   ANDON 4.0 — MOBILE: render
   ============================================ */

function renderMobileStatusbar() {
  return `
    <div class="m-statusbar">
      <span>20:30</span>
      <div style="display:flex;align-items:center;gap:5px;">
        <span style="font-size:11px;">📶</span>
        <span style="font-size:11px;">🔋</span>
      </div>
    </div>
  `;
}

function renderMobileTabbar(active) {
  const tabs = [
    { id: 'home', label: 'Início', icon: 'dashboard' },
    { id: 'alerts', label: 'Alertas', icon: 'alert', badge: true },
    { id: 'lines', label: 'Linhas', icon: 'lines' },
    { id: 'profile', label: 'Perfil', icon: 'user' },
  ];
  return `
    <div class="m-tabbar">
      ${tabs.map(t => `
        <div class="m-tab ${t.id === active ? 'active' : ''}">
          ${icon(t.icon)}
          ${t.badge ? '<span class="m-tab-badge"></span>' : ''}
          <span>${t.label}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderMobileHome() {
  return `
    <div class="phone-frame">
      <div class="phone-notch"></div>
      ${renderMobileStatusbar()}
      <div class="m-screen">
        <div class="m-header">
          <div class="m-header-brand"><span class="m-mark">stara</span><span class="m-sub">Andon 4.0 · Mobile</span></div>
          <div class="m-avatar-btn">RC</div>
        </div>

        <div class="m-kpi-scroll">
          <div class="m-kpi-card"><div class="l">OEE Geral</div><div class="v" style="color:#FFA94D">78%</div></div>
          <div class="m-kpi-card"><div class="l">Paradas</div><div class="v" style="color:var(--sev-critico)">14</div></div>
          <div class="m-kpi-card"><div class="l">Produzido</div><div class="v">1.256</div></div>
          <div class="m-kpi-card"><div class="l">Perdas Hoje</div><div class="v" style="color:var(--sev-critico)">R$ 11,4k</div></div>
        </div>

        <div class="m-section">
          <div class="m-section-title">Alertas críticos</div>
          ${renderMobileAlert(ALERTS_DATA[0], true)}
          ${renderMobileAlert(ALERTS_DATA[1], false)}
        </div>

        <div class="m-section">
          <div class="m-section-title">Linhas em atenção</div>
          ${LINES_DATA.filter(l => l.status !== 'operando').map(l => `
            <div class="m-line-row">
              <div class="m-line-row-left">
                <span class="m-line-dot" style="background:${STATUS_COLOR[l.status]}"></span>
                <span class="m-line-name">${l.name}</span>
              </div>
              <span class="m-line-oee" style="color:${STATUS_COLOR[l.status]}">${l.oee}%</span>
            </div>
          `).join('')}
        </div>
      </div>
      ${renderMobileTabbar('home')}
    </div>
  `;
}

function renderMobileAlert(a, expanded) {
  return `
    <div class="m-alert-card ${a.sev === 'critico' ? 'critico' : 'risco'}">
      <div class="m-alert-top">
        <span class="m-alert-line">${icon('alert')} ${a.line}</span>
        <span class="m-alert-time">${a.time}</span>
      </div>
      <div class="m-alert-desc">${a.desc}</div>
      ${expanded ? `
        <div class="m-alert-loss">
          <span class="ll">${a.lossLabel}</span>
          <span class="lv">${a.lossValue}</span>
        </div>
        ${a.ai ? `<div class="m-ai-line">${icon('ai')} ${a.ai}</div>` : ''}
        <div class="m-action-row">
          <button class="m-btn ghost">${icon('check')} Reconhecer</button>
          <button class="m-btn primary">${icon('wrench')} Acionar manutenção</button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderMobilePush() {
  return `
    <div class="phone-frame">
      <div class="phone-notch"></div>
      ${renderMobileStatusbar()}
      <div class="m-screen" style="background:linear-gradient(180deg, #1a1410 0%, var(--bg-app) 280px); position:relative; padding-top:118px;">
        <div class="m-push">
          <div class="m-push-icon">${icon('alert')}</div>
          <div class="m-push-body">
            <div class="m-push-app">ANDON 4.0 · AGORA</div>
            <div class="m-push-title">Linha 03 parou — falha no motor</div>
            <div class="m-push-desc">Perda estimada de R$ 4.280. Toque para agir.</div>
          </div>
        </div>
        <div class="m-header">
          <div class="m-header-brand"><span class="m-mark">stara</span><span class="m-sub">Andon 4.0 · Mobile</span></div>
          <div class="m-avatar-btn">RC</div>
        </div>
        <div class="m-section">
          <div class="m-section-title">Antes, o supervisor só via isso no celular...</div>
          <div style="background:var(--bg-panel);border:1px solid var(--border-subtle);border-radius:14px;padding:16px;display:flex;align-items:center;gap:12px;opacity:0.6;">
            ${icon('bell')}
            <div style="font-size:12px;color:var(--text-secondary);">Uma notificação simples — sem dados, sem contexto, sem ação possível até chegar na fábrica.</div>
          </div>
        </div>
        <div class="m-section">
          <div class="m-section-title">Agora ele pode agir na hora</div>
          ${renderMobileAlert(ALERTS_DATA[0], true)}
        </div>
      </div>
      ${renderMobileTabbar('alerts')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('phone-1').innerHTML = renderMobilePush();
  document.getElementById('phone-2').innerHTML = renderMobileHome();
});
