/* ============================================
   ANDON 4.0 — PERSONALIZADO: widgets configuráveis
   ============================================ */

const WIDGET_CATALOG = [
  { id: 'oee-geral', area: 'OEE', icon: 'chart', color: '#5BA3F0', bg: 'rgba(91,163,240,0.12)', name: 'OEE Geral (gauge)', type: 'gauge', w: 'cw-w3', h: 'cw-h1' },
  { id: 'oee-linha', area: 'OEE', icon: 'chart', color: '#5BA3F0', bg: 'rgba(91,163,240,0.12)', name: 'OEE por Linha (barras)', type: 'bars', w: 'cw-w4', h: 'cw-h2' },
  { id: 'producao-hoje', area: 'Produção', icon: 'bars', color: '#5FD66B', bg: 'rgba(95,214,107,0.12)', name: 'Produção Hoje', type: 'kpi', w: 'cw-w3', h: 'cw-h1' },
  { id: 'meta-diaria', area: 'Produção', icon: 'target', color: '#5FD66B', bg: 'rgba(95,214,107,0.12)', name: 'Meta Diária', type: 'kpi', w: 'cw-w3', h: 'cw-h1' },
  { id: 'paradas-ativas', area: 'Alertas', icon: 'alert', color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)', name: 'Paradas Ativas', type: 'alertlist', w: 'cw-w4', h: 'cw-h2' },
  { id: 'perdas-r$', area: 'Alertas', icon: 'alert', color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)', name: 'Perdas Estimadas (R$)', type: 'kpi', w: 'cw-w3', h: 'cw-h1' },
  { id: 'qualidade-refugo', area: 'Qualidade', icon: 'shield', color: '#C9A8FF', bg: 'rgba(150,100,255,0.12)', name: 'Índice de Refugo', type: 'kpi', w: 'cw-w3', h: 'cw-h1' },
  { id: 'qualidade-linha', area: 'Qualidade', icon: 'shield', color: '#C9A8FF', bg: 'rgba(150,100,255,0.12)', name: 'Qualidade por Linha', type: 'bars', w: 'cw-w4', h: 'cw-h2' },
  { id: 'manut-os', area: 'Manutenção', icon: 'wrench', color: '#FFA94D', bg: 'rgba(255,169,77,0.12)', name: 'Ordens de Serviço Abertas', type: 'kpi', w: 'cw-w3', h: 'cw-h1' },
  { id: 'manut-preventiva', area: 'Manutenção', icon: 'wrench', color: '#FFA94D', bg: 'rgba(255,169,77,0.12)', name: 'Manutenções em Atraso', type: 'alertlist', w: 'cw-w4', h: 'cw-h2' },
  { id: 'logistica-fila', area: 'Logística', icon: 'truck', color: '#5BA3F0', bg: 'rgba(91,163,240,0.12)', name: 'Fila de Expedição', type: 'kpi', w: 'cw-w3', h: 'cw-h1' },
  { id: 'energia-consumo', area: 'Energia', icon: 'bolt', color: '#FFD23F', bg: 'rgba(255,210,63,0.12)', name: 'Consumo de Energia', type: 'kpi', w: 'cw-w3', h: 'cw-h1' },
  { id: 'colaboradores', area: 'Equipe', icon: 'users', color: '#5FD66B', bg: 'rgba(95,214,107,0.12)', name: 'Colaboradores Presentes', type: 'kpi', w: 'cw-w3', h: 'cw-h1' },
  { id: 'mapa-mini', area: 'Produção', icon: 'factory', color: '#FF8A4C', bg: 'rgba(232,92,28,0.12)', name: 'Mini Mapa da Fábrica', type: 'map', w: 'cw-w6', h: 'cw-h2' },
  { id: 'eventos-feed', area: 'Alertas', icon: 'clock', color: '#5BA3F0', bg: 'rgba(91,163,240,0.12)', name: 'Feed de Eventos', type: 'alertlist', w: 'cw-w4', h: 'cw-h2' },
  { id: 'ia-insight', area: 'IA', icon: 'ai', color: '#C9A8FF', bg: 'rgba(150,100,255,0.12)', name: 'Insight da IA', type: 'ia', w: 'cw-w4', h: 'cw-h1' },
];

const AREAS = ['Todos', 'Produção', 'OEE', 'Alertas', 'Qualidade', 'Manutenção', 'Logística', 'Energia', 'Equipe', 'IA'];

// Layout inicial pré-montado (exemplo de "o que o supervisor já configurou")
let currentLayout = [
  { catalogId: 'oee-geral', uid: 'w1' },
  { catalogId: 'producao-hoje', uid: 'w2' },
  { catalogId: 'perdas-r$', uid: 'w3' },
  { catalogId: 'paradas-ativas', uid: 'w4' },
  { catalogId: 'oee-linha', uid: 'w5' },
  { catalogId: 'ia-insight', uid: 'w6' },
  { catalogId: 'qualidade-linha', uid: 'w7' },
];

let editMode = false;
let uidCounter = 100;

function findCatalog(id) { return WIDGET_CATALOG.find(w => w.id === id); }

function renderMiniContent(cat) {
  if (cat.type === 'kpi') {
    const sample = {
      'producao-hoje': ['1.256', 'unidades · meta 1.600'],
      'meta-diaria': ['78%', 'da meta diária atingida'],
      'perdas-r$': ['R$ 11.4k', 'perdidos no turno'],
      'qualidade-refugo': ['2,3%', 'dentro do limite de 3%'],
      'manut-os': ['7', 'ordens abertas'],
      'logistica-fila': ['12', 'paletes aguardando'],
      'energia-consumo': ['238 kWh', 'dentro do esperado'],
      'colaboradores': ['1.248', 'presentes em 7 turnos'],
    }[cat.id] || ['—', ''];
    return `<div class="mini-kpi"><span class="mini-kpi-value" style="color:${cat.color}">${sample[0]}</span><span class="mini-kpi-label">${sample[1]}</span></div>`;
  }
  if (cat.type === 'gauge') {
    return `<div class="mini-gauge"><span class="mini-gauge-val" style="color:${cat.color}">78%</span><div style="flex:1"><div class="mini-bar-track"><div class="mini-bar-fill" style="width:78%;background:${cat.color}"></div></div><span style="font-size:10px;color:var(--text-tertiary)">Meta: 85%</span></div></div>`;
  }
  if (cat.type === 'bars') {
    const rows = LINES_DATA ? LINES_DATA.slice(0, 4) : [];
    return `<div class="mini-bar-list">${rows.map(l => {
      const color = l.oee >= 80 ? '#5FD66B' : l.oee >= 60 ? '#FFA94D' : '#FF6B6B';
      return `<div class="mini-bar-row"><span>${l.name.replace('Linha ', 'L')}</span><div class="mini-bar-track"><div class="mini-bar-fill" style="width:${l.oee}%;background:${color}"></div></div><span>${l.oee}%</span></div>`;
    }).join('')}</div>`;
  }
  if (cat.type === 'alertlist') {
    const items = [
      { t: 'Linha 03 — Parada não programada', d: '14:31 · falha no motor' },
      { t: 'Linha 07 — Refugo acima do limite', d: '14:29 · qualidade' },
      { t: 'Linha 12 — Manutenção em atraso', d: '14:27 · 3 dias' },
    ];
    return `<div>${items.map(i => `<div class="mini-alert-item"><strong>${i.t}</strong><span>${i.d}</span></div>`).join('')}</div>`;
  }
  if (cat.type === 'ia') {
    return `<div style="display:flex;gap:10px;align-items:flex-start;">
      <div style="width:30px;height:30px;border-radius:8px;background:rgba(150,100,255,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#C9A8FF;">${icon('ai')}</div>
      <div style="font-size:11.5px;color:var(--text-secondary);line-height:1.45;">Linha 03 tem <strong style="color:#C9A8FF">78% de chance</strong> de ser falha recorrente do motor — última ocorrência há 12 dias. Priorize manutenção corretiva.</div>
    </div>`;
  }
  if (cat.type === 'map') {
    return `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-tertiary);font-size:11px;gap:14px;">
      <svg viewBox="0 0 200 100" width="100%" height="100%" style="max-height:110px;">
        <polygon points="20,50 60,30 100,50 60,70" fill="var(--bg-panel-raised)" stroke="var(--border-strong)"/>
        <polygon points="100,50 140,30 180,50 140,70" fill="var(--bg-panel-raised)" stroke="var(--border-strong)"/>
        <circle cx="60" cy="50" r="6" fill="#FF3B3B"/>
        <circle cx="140" cy="50" r="6" fill="#5FD66B"/>
      </svg>
    </div>`;
  }
  return '';
}

function renderCWidget(item) {
  const cat = findCatalog(item.catalogId);
  if (!cat) return '';
  return `
    <div class="cwidget ${cat.w} ${cat.h}" data-uid="${item.uid}" draggable="${editMode}">
      <div class="cwidget-head">
        <span class="cwidget-title">${icon(cat.icon)} ${cat.name}</span>
        <div class="cwidget-controls">
          ${editMode ? `
            <button class="drag-handle" title="Arrastar">${icon('drag')}</button>
            <button class="danger" data-remove="${item.uid}" title="Remover">${icon('trash')}</button>
          ` : `<button title="Expandir">${icon('expand')}</button>`}
        </div>
      </div>
      <div class="cwidget-body">${renderMiniContent(cat)}</div>
      <div class="resize-handle">${icon('expand')}</div>
    </div>
  `;
}

function renderCatalogList(filterArea = 'Todos', search = '') {
  let items = WIDGET_CATALOG;
  if (filterArea !== 'Todos') items = items.filter(w => w.area === filterArea);
  if (search) items = items.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));

  if (!items.length) {
    return `<div style="text-align:center;color:var(--text-tertiary);font-size:12.5px;padding:40px 0;">Nenhum widget encontrado.</div>`;
  }

  return items.map(cat => `
    <div class="widget-option" draggable="true" data-catalog-id="${cat.id}">
      <div class="widget-option-icon" style="background:${cat.bg};color:${cat.color}">${icon(cat.icon)}</div>
      <div class="widget-option-body">
        <div class="widget-option-name">${cat.name}</div>
        <div class="widget-option-area">${cat.area}</div>
      </div>
      <button class="widget-option-add" data-add-id="${cat.id}">${icon('plus')}</button>
    </div>
  `).join('');
}

function renderPersonalizado() {
  return `
    <div class="custom-toolbar">
      <div class="custom-toolbar-left">
        <span class="page-title">Personalizado</span>
        <span class="page-sub">Monte seu próprio painel combinando widgets de qualquer área da fábrica</span>
      </div>
      <div class="mode-switch">
        <span class="mode-pill" id="mode-indicator">${icon('user')} Modo visualização</span>
        <button class="btn" id="btn-toggle-edit">${icon('layoutEdit')} Editar layout</button>
        <button class="btn btn-primary" id="btn-add-widget" style="display:none;">${icon('plus')} Adicionar widget</button>
      </div>
    </div>

    <div class="perm-note">
      ${icon('lock')} <span><strong>Seu Andon, suas regras.</strong> Este layout é pessoal e fica salvo na sua conta — outros usuários têm seus próprios painéis, dentro das permissões da sua função.</span>
    </div>

    <div class="saved-layouts-bar">
      <div class="layout-chip active">${icon('layoutEdit')} Meu Painel Principal</div>
      <div class="layout-chip">${icon('layoutEdit')} Turno Noite</div>
      <div class="layout-chip">${icon('layoutEdit')} Foco Qualidade</div>
      <button class="layout-chip-add">${icon('plus')} Novo layout</button>
    </div>

    <div class="custom-grid" id="custom-grid">
      ${currentLayout.map(renderCWidget).join('')}
    </div>

    <div class="catalog-overlay" id="catalog-overlay">
      <div class="catalog-panel">
        <div class="catalog-head">
          <div>
            <div class="catalog-title">Adicionar Widget</div>
            <div class="catalog-sub">Arraste para o grid ou clique em + para adicionar</div>
          </div>
          <button class="catalog-close" id="catalog-close">${icon('x')}</button>
        </div>
        <input class="catalog-search" id="catalog-search" placeholder="Buscar widget (ex: OEE, paradas, energia...)" />
        <div class="catalog-areas" id="catalog-areas">
          ${AREAS.map((a, i) => `<span class="area-chip ${i === 0 ? 'active' : ''}" data-area="${a}">${a}</span>`).join('')}
        </div>
        <div class="catalog-list" id="catalog-list">
          ${renderCatalogList()}
        </div>
      </div>
    </div>
  `;
}

function setEditMode(on) {
  editMode = on;
  const grid = document.getElementById('custom-grid');
  const indicator = document.getElementById('mode-indicator');
  const toggleBtn = document.getElementById('btn-toggle-edit');
  const addBtn = document.getElementById('btn-add-widget');

  grid.classList.toggle('edit-mode', editMode);
  grid.innerHTML = currentLayout.map(renderCWidget).join('') + (editMode ? `<button class="add-tile" id="add-tile">${icon('plus')} Adicionar widget</button>` : '');

  indicator.innerHTML = editMode ? `${icon('layoutEdit')} Modo edição` : `${icon('user')} Modo visualização`;
  toggleBtn.innerHTML = editMode ? `${icon('check')} Concluir edição` : `${icon('layoutEdit')} Editar layout`;
  addBtn.style.display = editMode ? 'inline-flex' : 'none';

  attachGridEvents();
}

function attachGridEvents() {
  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const uid = btn.getAttribute('data-remove');
      currentLayout = currentLayout.filter(i => i.uid !== uid);
      setEditMode(true);
    });
  });

  const addTile = document.getElementById('add-tile');
  if (addTile) addTile.addEventListener('click', openCatalog);

  // Drag and drop nativo entre cwidgets (reordenar)
  if (!editMode) return;
  const grid = document.getElementById('custom-grid');
  let dragSrc = null;

  grid.querySelectorAll('.cwidget').forEach(el => {
    el.addEventListener('dragstart', (e) => {
      dragSrc = el;
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
    el.addEventListener('dragover', (e) => e.preventDefault());
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!dragSrc || dragSrc === el) return;
      const srcUid = dragSrc.getAttribute('data-uid');
      const tgtUid = el.getAttribute('data-uid');
      const srcIdx = currentLayout.findIndex(i => i.uid === srcUid);
      const tgtIdx = currentLayout.findIndex(i => i.uid === tgtUid);
      const [moved] = currentLayout.splice(srcIdx, 1);
      currentLayout.splice(tgtIdx, 0, moved);
      setEditMode(true);
    });
  });
}

function openCatalog() {
  document.getElementById('catalog-overlay').classList.add('open');
}
function closeCatalog() {
  document.getElementById('catalog-overlay').classList.remove('open');
}

function addWidgetToLayout(catalogId) {
  uidCounter++;
  currentLayout.push({ catalogId, uid: 'w' + uidCounter });
  setEditMode(true);
}

document.addEventListener('DOMContentLoaded', () => {
  mountShell('personalizado', renderPersonalizado());

  document.getElementById('btn-toggle-edit').addEventListener('click', () => setEditMode(!editMode));
  document.getElementById('btn-add-widget').addEventListener('click', openCatalog);
  document.getElementById('catalog-close').addEventListener('click', closeCatalog);
  document.getElementById('catalog-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'catalog-overlay') closeCatalog();
  });

  document.getElementById('catalog-search').addEventListener('input', (e) => {
    const activeArea = document.querySelector('.area-chip.active').getAttribute('data-area');
    document.getElementById('catalog-list').innerHTML = renderCatalogList(activeArea, e.target.value);
    attachCatalogAddButtons();
  });

  document.getElementById('catalog-areas').addEventListener('click', (e) => {
    const chip = e.target.closest('.area-chip');
    if (!chip) return;
    document.querySelectorAll('.area-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const search = document.getElementById('catalog-search').value;
    document.getElementById('catalog-list').innerHTML = renderCatalogList(chip.getAttribute('data-area'), search);
    attachCatalogAddButtons();
  });

  function attachCatalogAddButtons() {
    document.querySelectorAll('[data-add-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        addWidgetToLayout(btn.getAttribute('data-add-id'));
        closeCatalog();
      });
    });
  }
  attachCatalogAddButtons();

  attachGridEvents();
});
