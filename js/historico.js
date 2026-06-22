/* ============================================
   ANDON 4.0 — HISTÓRICO: render
   ============================================ */

const HISTORY_DATA = [
  { time: '14:34', type: 'parada', title: 'Parada na Linha 03', desc: 'Falha no motor principal · operador notificado automaticamente', line: 'Linha 03', loss: 'R$ 4.280' },
  { time: '14:32', type: 'atencao', title: 'Qualidade normalizada — Linha 07', desc: 'Índice de refugo voltou para dentro do limite aceitável', line: 'Linha 07', loss: null },
  { time: '14:30', type: 'operando', title: 'Manutenção concluída — Linha 05', desc: 'Troca de rolamento finalizada dentro do prazo previsto', line: 'Linha 05', loss: null },
  { time: '14:29', type: 'atencao', title: 'Refugo acima do limite — Linha 07', desc: 'Índice de refugo passou de 3% para 4,2%', line: 'Linha 07', loss: 'R$ 860' },
  { time: '14:28', type: 'atencao', title: 'Novo apontamento — Linha 09', desc: 'Microparada para ajuste de sensor de posição', line: 'Linha 09', loss: 'R$ 90' },
  { time: '14:27', type: 'atencao', title: 'Manutenção preventiva em atraso — Linha 12', desc: 'Ordem de serviço programada há 3 dias sem execução', line: 'Linha 12', loss: null },
  { time: '14:25', type: 'operando', title: 'Produção retomada — Linha 02', desc: 'Ajuste de setup concluído, linha voltou a operar', line: 'Linha 02', loss: null },
  { time: '14:18', type: 'atencao', title: 'Setup iniciado — Linha 02', desc: 'Troca de molde programada para novo lote', line: 'Linha 02', loss: null },
  { time: '13:54', type: 'parada', title: 'Parada não programada — Linha 06', desc: 'Falta de matéria-prima na linha de alimentação', line: 'Linha 06', loss: 'R$ 1.120' },
  { time: '13:40', type: 'operando', title: 'Início de turno B', desc: '7 linhas iniciaram operação, 1.248 colaboradores presentes', line: 'Geral', loss: null },
];

function renderHistoryEntry(e) {
  const color = STATUS_COLOR[e.type] || 'var(--text-tertiary)';
  return `
    <div class="tl-entry">
      <span class="tl-dot" style="background:${color}"></span>
      <div class="tl-card">
        <div class="tl-card-head">
          <span class="tl-card-title">${e.title}</span>
          <span class="tl-card-time">${e.time}</span>
        </div>
        <div class="tl-card-desc">${e.desc}</div>
        <div class="tl-card-tags">
          <span class="tl-tag">${e.line}</span>
          <span class="tl-tag">${STATUS_LABEL[e.type] || e.type}</span>
        </div>
        ${e.loss ? `<div class="tl-card-loss">Perda associada: ${e.loss}</div>` : ''}
      </div>
    </div>
  `;
}

function renderHistorico() {
  return `
    <div class="page-head">
      <div>
        <span class="page-title">Histórico e Timeline de Eventos</span>
        <div class="page-sub">Registro cronológico de paradas, alertas e ações do turno</div>
      </div>
      <button class="btn">${icon('report')} Exportar relatório</button>
    </div>

    <div class="filters-bar">
      <select class="filter-select"><option>Todas as linhas</option><option>Linha 01</option><option>Linha 02</option><option>Linha 03</option></select>
      <select class="filter-select"><option>Turno B (atual)</option><option>Turno A</option><option>Turno C</option></select>
      <div class="filter-chip-group">
        <span class="filter-chip active">Todos</span>
        <span class="filter-chip">Paradas</span>
        <span class="filter-chip">Atenção</span>
        <span class="filter-chip">Normalizados</span>
      </div>
    </div>

    <div class="panel" style="padding:var(--space-5);">
      <div class="timeline-full">
        ${HISTORY_DATA.map(renderHistoryEntry).join('')}
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  mountShell('historico', renderHistorico());
});
