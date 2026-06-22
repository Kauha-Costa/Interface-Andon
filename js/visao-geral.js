/* ============================================
   ANDON 4.0 — VISÃO GERAL: render
   (dados em js/data.js)
   ============================================ */

function renderKpiRow() {
  return `
    <div class="kpi-row">
      <div class="kpi-card">
        <span class="kpi-label">OEE Geral</span>
        <div class="kpi-value-row"><span class="kpi-value">78</span><span class="kpi-unit">%</span></div>
        <span class="kpi-meta">Meta: 85%</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Produção Hoje</span>
        <div class="kpi-value-row"><span class="kpi-value">1.256</span><span class="kpi-unit">un</span></div>
        <span class="kpi-meta up">${icon('arrowUp')} +12,5% vs ontem</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Peças Produzidas</span>
        <div class="kpi-value-row"><span class="kpi-value">8.432</span><span class="kpi-unit">pç</span></div>
        <span class="kpi-meta up">${icon('arrowUp')} +8,1% vs ontem</span>
      </div>
      <div class="kpi-card alert">
        <span class="kpi-label">Paradas Agora</span>
        <div class="kpi-value-row"><span class="kpi-value">14</span><span class="kpi-unit">ativas</span></div>
        <span class="kpi-meta down">${icon('arrowDown')} R$ 11.4k perdidos hoje</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Colaboradores</span>
        <div class="kpi-value-row"><span class="kpi-value">1.248</span><span class="kpi-unit">presentes</span></div>
        <span class="kpi-meta">7 turnos ativos</span>
      </div>
    </div>
  `;
}

function renderFactoryMapSVG() {
  // posições dos "prédios" isométricos simplificados + nós de status
  const nodes = [
    { x: 140, y: 90, status: 'parada', label: 'L03' },
    { x: 330, y: 60, status: 'atencao', label: 'L02' },
    { x: 520, y: 90, status: 'atencao', label: 'L07' },
    { x: 110, y: 220, status: 'parada', label: 'L12' },
    { x: 300, y: 200, status: 'operando', label: 'L01' },
    { x: 470, y: 210, status: 'operando', label: 'L04' },
    { x: 210, y: 300, status: 'operando', label: 'L05' },
    { x: 400, y: 300, status: 'atencao', label: 'L06' },
  ];

  const buildings = `
    <g opacity="0.5" stroke="var(--border-strong)" stroke-width="1" fill="var(--bg-panel-raised)">
      <polygon points="60,120 160,80 260,120 160,160" />
      <polygon points="260,120 260,200 160,240 160,160" />
      <polygon points="60,120 60,200 160,240 160,160" />

      <polygon points="280,90 380,50 480,90 380,130" />
      <polygon points="480,90 480,170 380,210 380,130" />
      <polygon points="280,90 280,170 380,210 380,130" />

      <polygon points="460,120 560,80 660,120 560,160" />
      <polygon points="660,120 660,200 560,240 560,160" />
      <polygon points="460,120 460,200 560,240 560,160" />

      <polygon points="140,260 240,220 340,260 240,300" />
      <polygon points="340,260 340,340 240,380 240,300" />
      <polygon points="140,260 140,340 240,380 240,300" />

      <polygon points="380,260 480,220 580,260 480,300" />
      <polygon points="580,260 580,340 480,380 480,300" />
      <polygon points="380,260 380,340 480,380 480,300" />
    </g>
  `;

  const connections = `
    <g stroke="var(--border-strong)" stroke-width="1.5" fill="none" opacity="0.6" stroke-dasharray="2 4">
      <path d="M160,160 L240,300" />
      <path d="M380,130 L240,300" />
      <path d="M380,130 L480,300" />
      <path d="M560,160 L480,300" />
      <path d="M160,160 L380,130" />
      <path d="M380,130 L560,160" />
    </g>
  `;

  const nodeMarkers = nodes.map(n => {
    const color = STATUS_COLOR[n.status];
    const pulse = n.status === 'parada' ? `<circle class="map-pulse" cx="${n.x}" cy="${n.y}" r="14" fill="${color}" />` : '';
    return `
      <g class="map-node" data-line="${n.label}">
        ${pulse}
        <circle cx="${n.x}" cy="${n.y}" r="14" fill="${color}" stroke="var(--bg-canvas)" stroke-width="3"/>
        <text x="${n.x}" y="${n.y + 4}" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="var(--font-mono)">${n.label.replace('L','')}</text>
      </g>
    `;
  }).join('');

  return `
    <svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
      ${buildings}
      ${connections}
      ${nodeMarkers}
    </svg>
  `;
}

function renderAlertCard(a) {
  return `
    <div class="alert-card sev-${a.sev}">
      <div class="alert-top">
        <span class="alert-line-tag">${icon('alert')} ${a.line}</span>
        <span class="alert-time">${a.time}</span>
      </div>
      <div class="alert-desc">${a.desc}</div>
      <div class="alert-loss-row">
        <div class="alert-loss">
          <span class="alert-loss-label">${a.lossLabel}</span>
          <span class="alert-loss-value">${a.lossValue}</span>
        </div>
        ${a.ai ? `<span class="alert-ai-chip">${icon('ai')} IA</span>` : ''}
      </div>
      ${a.ai ? `<div style="font-size:10.5px;color:#C9A8FF;margin-top:6px;line-height:1.4;">${a.ai}</div>` : ''}
    </div>
  `;
}

function renderOeeRow(line) {
  const color = line.oee >= 80 ? 'var(--status-operando)' : line.oee >= 60 ? 'var(--status-atencao)' : 'var(--status-parada)';
  return `
    <div class="oee-row">
      <span class="oee-line-name">${line.name.replace('Linha ', 'L')}</span>
      <div class="oee-bar-track"><div class="oee-bar-fill" style="width:${line.oee}%;background:${color}"></div></div>
      <span class="oee-pct" style="color:${color}">${line.oee}%</span>
    </div>
  `;
}

function renderLineCard(line) {
  return `
    <div class="line-card st-${line.status}" data-line="${line.id}">
      <div class="line-card-head">
        <span class="line-card-name">${line.name}</span>
        <span class="status-pill ${line.status}"><span class="dot"></span>${STATUS_LABEL[line.status]}</span>
      </div>
      <div class="line-card-oee-label">OEE</div>
      <div class="line-card-oee" style="color:${STATUS_COLOR[line.status]}">${line.oee}%</div>
    </div>
  `;
}

function renderLossesDonut() {
  const total = 100;
  let acc = 0;
  const radius = 60, cx = 80, cy = 80, stroke = 22;
  const circumference = 2 * Math.PI * radius;
  const segments = LOSSES_DATA.map(l => {
    const dash = (l.pct / total) * circumference;
    const gap = circumference - dash;
    const offset = -((acc / total) * circumference) + circumference * 0.25;
    acc += l.pct;
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${l.color}" stroke-width="${stroke}"
      stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${offset}" transform="rotate(-90 ${cx} ${cy})" />`;
  }).join('');

  return `
    <svg viewBox="0 0 160 160" width="170" height="170">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="var(--bg-app)" stroke-width="${stroke}" />
      ${segments}
      <text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="10" fill="var(--text-tertiary)" font-weight="700">TOTAL</text>
      <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="20" fill="var(--text-primary)" font-weight="800" font-family="var(--font-mono)">8,2h</text>
    </svg>
  `;
}

function renderVisaoGeral() {
  return `
    ${renderKpiRow()}

    <div class="content-grid">
      <div class="panel">
        <div class="panel-head">
          <span class="panel-title">${icon('factory')} Visão Geral da Fábrica</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="view-toggle">
              <button>2D</button>
              <button class="active">3D</button>
            </div>
            <button class="icon-btn" title="Atualizar">${icon('refresh')}</button>
          </div>
        </div>
        <div class="factory-map">
          ${renderFactoryMapSVG()}
          <div class="map-legend">
            <div class="map-legend-item"><span class="map-legend-dot" style="background:var(--status-operando)"></span>Operando</div>
            <div class="map-legend-item"><span class="map-legend-dot" style="background:var(--status-atencao)"></span>Atenção</div>
            <div class="map-legend-item"><span class="map-legend-dot" style="background:var(--status-parada)"></span>Parada</div>
            <div class="map-legend-item"><span class="map-legend-dot" style="background:var(--status-manutencao)"></span>Manutenção</div>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:var(--space-4);">
        <div class="panel">
          <div class="panel-head">
            <span class="panel-title">${icon('alert')} Alertas Críticos</span>
            <a href="#" class="panel-link">Ver todos</a>
          </div>
          <div class="alert-stack">
            ${ALERTS_DATA.map(renderAlertCard).join('')}
          </div>
        </div>

        <div class="panel">
          <div class="panel-head">
            <span class="panel-title">${icon('chart')} OEE por Linha</span>
            <a href="#" class="panel-link">Ver todas</a>
          </div>
          <div class="oee-list">
            ${LINES_DATA.map(renderOeeRow).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:var(--space-4);">
      <div class="panel-head">
        <span class="panel-title">${icon('lines')} Linhas de Produção</span>
        <a href="#" class="panel-link">Ver todas</a>
      </div>
      <div class="lines-grid">
        ${LINES_DATA.map(renderLineCard).join('')}
      </div>
    </div>

    <div class="bottom-grid">
      <div class="panel">
        <div class="panel-head">
          <span class="panel-title">${icon('chart')} Perdas por Categoria (Hoje)</span>
        </div>
        <div class="losses-wrap">
          ${renderLossesDonut()}
          <div class="loss-legend">
            ${LOSSES_DATA.map(l => `
              <div class="loss-legend-item">
                <span class="loss-legend-dot" style="background:${l.color}"></span>
                <span class="loss-legend-name">${l.name}</span>
                <span class="loss-legend-pct">${l.pct}%</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <span class="panel-title">${icon('clock')} Eventos Recentes</span>
          <a href="historico.html" class="panel-link">Ver todos</a>
        </div>
        <div class="events-list">
          ${EVENTS_DATA.map(renderEventRow).join('')}
        </div>
      </div>
    </div>

    <div class="footer-strip">
      <div class="footer-card">
        <div class="footer-icon">${icon('target')}</div>
        <div class="footer-card-body">
          <div class="footer-card-label">Meta Diária</div>
          <div class="footer-card-value">1.600 <span>un</span></div>
          <div class="footer-bar-track"><div class="footer-bar-fill" style="width:100%"></div></div>
        </div>
      </div>
      <div class="footer-card">
        <div class="footer-icon">${icon('bars')}</div>
        <div class="footer-card-body">
          <div class="footer-card-label">Produzido</div>
          <div class="footer-card-value">1.256 <span>un · 78%</span></div>
          <div class="footer-bar-track"><div class="footer-bar-fill" style="width:78%"></div></div>
        </div>
      </div>
      <div class="footer-card">
        <div class="footer-icon">${icon('flag')}</div>
        <div class="footer-card-body">
          <div class="footer-card-label">Faltam</div>
          <div class="footer-card-value">344 <span>un · 22%</span></div>
          <div class="footer-bar-track"><div class="footer-bar-fill" style="width:22%;background:var(--status-atencao)"></div></div>
        </div>
      </div>
      <div class="footer-card">
        <div class="footer-icon">${icon('clock')}</div>
        <div class="footer-card-body">
          <div class="footer-card-label">Tempo Restante do Turno</div>
          <div class="footer-card-value mono">03:24:15</div>
          <div class="footer-bar-track"><div class="footer-bar-fill" style="width:60%;background:var(--status-info)"></div></div>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  mountShell('visao-geral', renderVisaoGeral());

  // clique nos prédios do mapa → vai pro detalhe da linha
  document.querySelectorAll('.map-node').forEach(node => {
    node.addEventListener('click', () => {
      const line = node.getAttribute('data-line');
      window.location.href = `linha-detalhe.html?linha=${line}`;
    });
  });
  document.querySelectorAll('.line-card').forEach(card => {
    card.addEventListener('click', () => {
      const line = card.getAttribute('data-line');
      window.location.href = `linha-detalhe.html?linha=${line}`;
    });
  });
});
