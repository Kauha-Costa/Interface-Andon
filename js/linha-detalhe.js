/* ============================================
   ANDON 4.0 — DETALHE DE LINHA: render
   ============================================ */

const SHIFT_SEGMENTS = [
  { pct: 8, status: 'operando' }, { pct: 3, status: 'atencao' }, { pct: 22, status: 'operando' },
  { pct: 5, status: 'parada' }, { pct: 30, status: 'operando' }, { pct: 4, status: 'atencao' },
  { pct: 13, status: 'operando' }, { pct: 15, status: 'parada' },
];

const CAUSES_DATA = [
  { causa: 'Falha no motor principal', ocorrencias: 3, tempo: '2h 10min', perda: 'R$ 4.280' },
  { causa: 'Troca de ferramenta', ocorrencias: 5, tempo: '1h 05min', perda: 'R$ 980' },
  { causa: 'Falta de matéria-prima', ocorrencias: 2, tempo: '0h 40min', perda: 'R$ 610' },
  { causa: 'Ajuste de sensor', ocorrencias: 4, tempo: '0h 28min', perda: 'R$ 340' },
];

function renderLinhaDetalhe(lineId) {
  const line = LINES_DATA.find(l => l.id === lineId) || LINES_DATA[2];
  const isParada = line.status === 'parada';

  return `
    <div class="breadcrumb">
      <a href="index.html">Visão Geral</a>
      ${icon('chevronLeft')}
      <span>Linhas de Produção</span>
      ${icon('chevronLeft')}
      <span style="color:var(--text-primary);font-weight:600;">${line.name}</span>
    </div>

    <div class="line-head">
      <div class="line-head-title">
        <span class="line-head-name">${line.name}</span>
        <span class="status-pill ${line.status}"><span class="dot"></span>${STATUS_LABEL[line.status]}</span>
      </div>
      <div class="action-row" style="margin-top:0;">
        <button class="btn">${icon('wrench')} Acionar Manutenção</button>
        <button class="btn btn-primary">${icon('check')} Reconhecer Alerta</button>
      </div>
    </div>

    ${isParada ? `
    <div class="line-status-banner parada">
      <div class="line-status-banner-icon">${icon('alert')}</div>
      <div class="line-status-banner-body">
        <div class="line-status-banner-title">Parada não programada · Falha no motor principal</div>
        <div class="line-status-banner-desc">Iniciada às 14:31 · Operador notificado · Manutenção acionada às 14:33</div>
      </div>
      <div class="line-status-banner-timer">
        <div class="t-label">Tempo parado</div>
        <div class="t-value mono" id="stop-timer">00:38:12</div>
      </div>
    </div>` : ''}

    <div class="detail-grid">
      <div class="metric-card">
        <div class="metric-card-label">OEE da Linha</div>
        <div class="metric-card-value" style="color:${STATUS_COLOR[line.status]}">${line.oee}%</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Perda Estimada Hoje</div>
        <div class="metric-card-value" style="color:var(--sev-critico)">R$ 4.280</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">IA — Probabilidade de Recorrência</div>
        <div class="metric-card-value" style="color:#C9A8FF;display:flex;align-items:center;gap:8px;">78% ${icon('ai')}</div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:var(--space-4);">
      <div class="panel-head"><span class="panel-title">${icon('clock')} Linha do Tempo do Turno</span></div>
      <div class="timeline-wrap">
        <div class="shift-timeline">
          ${SHIFT_SEGMENTS.map(s => `<div class="shift-seg" style="width:${s.pct}%;background:${STATUS_COLOR[s.status]}"></div>`).join('')}
        </div>
        <div class="shift-axis"><span>06:00</span><span>09:00</span><span>12:00</span><span>15:00</span><span>18:00</span></div>
      </div>
    </div>

    <div class="bottom-grid">
      <div class="panel">
        <div class="panel-head"><span class="panel-title">${icon('alert')} Principais Causas de Parada (Turno)</span></div>
        <table class="cause-table">
          <thead><tr><th>Causa</th><th>Ocorr.</th><th>Tempo</th><th>Perda</th></tr></thead>
          <tbody>
            ${CAUSES_DATA.map(c => `
              <tr>
                <td>${c.causa}</td>
                <td class="num">${c.ocorrencias}x</td>
                <td class="num mono">${c.tempo}</td>
                <td class="num mono" style="color:var(--sev-critico);font-weight:700;">${c.perda}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="panel">
        <div class="panel-head"><span class="panel-title">${icon('user')} Operador Responsável</span></div>
        <div class="op-card">
          <div class="op-avatar">JM</div>
          <div>
            <div class="op-name">João Marcos Silveira</div>
            <div class="op-role">Operador de Produção · Turno A</div>
          </div>
        </div>
        <div class="panel-head" style="border-top:1px solid var(--border-subtle);"><span class="panel-title">${icon('history')} Histórico Recente</span></div>
        <div class="events-list">
          ${EVENTS_DATA.filter(e => true).map(renderEventRow).join('')}
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const lineId = params.get('linha') || 'L03';
  mountShell('linhas', renderLinhaDetalhe(lineId));

  let seconds = 38 * 60 + 12;
  setInterval(() => {
    seconds++;
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    const el = document.getElementById('stop-timer');
    if (el) el.textContent = `${h}:${m}:${s}`;
  }, 1000);
});
