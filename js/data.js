/* ============================================
   ANDON 4.0 — DADOS MOCK COMPARTILHADOS
   ============================================ */

const LINES_DATA = [
  { id: 'L01', name: 'Linha 01', status: 'operando', oee: 82 },
  { id: 'L02', name: 'Linha 02', status: 'atencao', oee: 65 },
  { id: 'L03', name: 'Linha 03', status: 'parada', oee: 20 },
  { id: 'L04', name: 'Linha 04', status: 'operando', oee: 91 },
  { id: 'L05', name: 'Linha 05', status: 'operando', oee: 74 },
  { id: 'L06', name: 'Linha 06', status: 'atencao', oee: 68 },
  { id: 'L07', name: 'Linha 07', status: 'atencao', oee: 55 },
  { id: 'L08', name: 'Linha 08', status: 'operando', oee: 87 },
];

const STATUS_COLOR = {
  operando: 'var(--status-operando)',
  parada: 'var(--status-parada)',
  atencao: 'var(--status-atencao)',
  manutencao: 'var(--status-manutencao)',
};
const STATUS_LABEL = { operando: 'Produzindo', parada: 'Parada', atencao: 'Atenção', manutencao: 'Manutenção' };

const ALERTS_DATA = [
  {
    sev: 'critico', line: 'Linha 03', time: '14:31',
    desc: 'Parada não programada · falha no motor principal',
    lossLabel: 'Perda estimada', lossValue: 'R$ 4.280',
    ai: 'IA: 78% chance de falha recorrente · última ocorrência há 12 dias',
  },
  {
    sev: 'risco', line: 'Linha 07', time: '14:29',
    desc: 'Índice de refugo acima do limite (qualidade)',
    lossLabel: 'Perda projetada/h', lossValue: 'R$ 860',
    ai: null,
  },
  {
    sev: 'risco', line: 'Linha 12', time: '14:27',
    desc: 'Manutenção preventiva em atraso (3 dias)',
    lossLabel: 'Risco de parada', lossValue: 'Alto',
    ai: 'IA: probabilidade de quebra sobe 4x após 5 dias de atraso',
  },
  {
    sev: 'aviso', line: 'Linha 02', time: '14:18',
    desc: 'Setup e troca de molde em andamento',
    lossLabel: 'Tempo restante', lossValue: '12 min',
    ai: null,
  },
];

const EVENTS_DATA = [
  { time: '14:34', type: 'parada', title: 'Parada na Linha 03', desc: 'Falha no motor principal' },
  { time: '14:32', type: 'atencao', title: 'Qualidade normalizada — Linha 07', desc: 'Índice de refugo dentro do limite' },
  { time: '14:30', type: 'operando', title: 'Manutenção concluída — Linha 05', desc: 'Troca de rolamento' },
  { time: '14:28', type: 'atencao', title: 'Novo apontamento — Linha 09', desc: 'Microparada · ajuste de sensor' },
  { time: '14:25', type: 'operando', title: 'Produção retomada — Linha 02', desc: 'Ajuste concluído' },
];

const LOSSES_DATA = [
  { name: 'Quebra de Máquina', pct: 35, color: '#FF3B3B' },
  { name: 'Ajustes e Regulagens', pct: 25, color: '#FFB020' },
  { name: 'Falta de Material', pct: 20, color: '#5BA3F0' },
  { name: 'Falta de Operador', pct: 10, color: '#5FD66B' },
  { name: 'Outros', pct: 10, color: '#757575' },
];

function renderEventRow(e) {
  const color = STATUS_COLOR[e.type] || 'var(--text-tertiary)';
  return `
    <div class="event-row">
      <span class="event-time">${e.time}</span>
      <div class="event-dot-wrap"><span class="event-dot" style="background:${color}"></span></div>
      <div class="event-content">
        <div class="event-title">${e.title}</div>
        <div class="event-desc">${e.desc}</div>
      </div>
    </div>
  `;
}
