/* ==========================================================================
   Taskboard – Clean, Modern & Lightweight Task Manager
   Vanilla HTML5, CSS3 & JavaScript (ES6+).
   Features: LocalStorage persistence, drag & drop, priorities, categories,
   due dates, filter tabs, instant search, inline edit, dark/light theme.
   ========================================================================== */

(() => {
  'use strict';

  // ---------- Storage Keys & Constants ----------
  const STORAGE_KEY = 'taskboard.tasks.v2';
  const LEGACY_STORAGE_KEY = 'taskboard.tasks.v1';
  const THEME_KEY = 'taskboard.theme';

  const CATEGORIES = ['Work', 'Personal', 'Study', 'Health', 'Finance'];
  const PRIORITIES = [
    { id: 'high', label: 'High', color: 'var(--prio-high)' },
    { id: 'medium', label: 'Medium', color: 'var(--prio-med)' },
    { id: 'low', label: 'Low', color: 'var(--prio-low)' }
  ];

  // ---------- Starter Sample Data ----------
  const SAMPLE_TASKS = [
    {
      id: 'welcome-1',
      title: 'Welcome to Taskboard! 👋 Click the circle to complete',
      description: 'You can add due dates, categories, notes, or set priority flags.',
      category: 'Personal',
      priority: 'medium',
      due: getRelativeDateISO(0),
      done: false,
      created: Date.now() - 3600000
    },
    {
      id: 'welcome-2',
      title: 'Click the edit icon to edit or trash icon to delete ✏️',
      description: '',
      category: 'Work',
      priority: 'high',
      due: getRelativeDateISO(1),
      done: false,
      created: Date.now() - 1800000
    }
  ];

  // ---------- Application State ----------
  let tasks = [];
  let currentTab = 'all';      // all | today | active | high | completed
  let currentCategory = 'all'; // all | Work | Personal | Study | Health | Finance
  let searchQuery = '';
  let sortBy = 'order';        // order | due-asc | priority-desc | newest | alpha
  let editingTaskId = null;
  let draggedTaskId = null;

  // ---------- Helper Functions ----------
  const $ = id => document.getElementById(id);
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  function getRelativeDateISO(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  }

  const todayISO = () => getRelativeDateISO(0);

  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: (new Date().getFullYear() !== y) ? 'numeric' : undefined
    });
  }

  function createElement(tag, attributes = {}, ...children) {
    const el = document.createElement(tag);
    Object.entries(attributes).forEach(([k, v]) => {
      if (k === 'className') el.className = v;
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v !== null && v !== undefined) el.setAttribute(k, v);
    });
    children.flat().forEach(c => {
      if (c !== null && c !== undefined) {
        el.append(typeof c === 'string' ? document.createTextNode(c) : c);
      }
    });
    return el;
  }

  // ---------- Persistence ----------
  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }
  }

  function loadTasks() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        tasks = JSON.parse(raw);
        if (Array.isArray(tasks) && tasks.length) return;
      }

      // Check legacy key
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) {
        const legacy = JSON.parse(raw);
        if (Array.isArray(legacy) && legacy.length) {
          tasks = legacy.map(t => ({
            id: t.id || uid(),
            title: t.title || 'Untitled task',
            description: t.description || '',
            category: CATEGORIES.includes(t.category) ? t.category : 'Work',
            priority: t.priority || 'medium',
            due: t.due || '',
            done: Boolean(t.done),
            created: t.created || Date.now()
          }));
          saveTasks();
          return;
        }
      }

      // Default sample starter tasks
      tasks = JSON.parse(JSON.stringify(SAMPLE_TASKS));
      saveTasks();
    } catch (err) {
      tasks = JSON.parse(JSON.stringify(SAMPLE_TASKS));
    }
  }

  // ---------- CRUD Operations ----------
  function createTask({ title, description, category, priority, due }) {
    const newTask = {
      id: uid(),
      title: title.trim(),
      description: (description || '').trim(),
      category: category || 'Work',
      priority: priority || 'medium',
      due: due || '',
      done: false,
      created: Date.now()
    };
    tasks.unshift(newTask);
    saveTasks();
    render(newTask.id);
    toast('Task added to board');
  }

  function updateTask(id, changes) {
    const item = tasks.find(t => t.id === id);
    if (!item) return;

    Object.assign(item, changes);
    saveTasks();
    render();
  }

  function deleteTask(id, domNode) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return;

    const removed = tasks[idx];
    const performDelete = () => {
      const currentIdx = tasks.findIndex(t => t.id === id);
      if (currentIdx !== -1) {
        tasks.splice(currentIdx, 1);
        saveTasks();
        render();
        toast('Task deleted', 'Undo', () => {
          tasks.splice(Math.min(idx, tasks.length), 0, removed);
          saveTasks();
          render(removed.id);
        });
      }
    };

    if (domNode) {
      domNode.classList.add('removing');
      setTimeout(performDelete, 260);
    } else {
      performDelete();
    }
  }

  // ---------- Filter & Sort Logic ----------
  function getFilteredAndSortedTasks() {
    const today = todayISO();
    const q = searchQuery.trim().toLowerCase();

    let list = tasks.filter(t => {
      // Tab filter
      if (currentTab === 'today') {
        if (t.due !== today) return false;
      } else if (currentTab === 'active') {
        if (t.done) return false;
      } else if (currentTab === 'high') {
        if (t.priority !== 'high' || t.done) return false;
      } else if (currentTab === 'completed') {
        if (!t.done) return false;
      }

      // Category filter
      if (currentCategory !== 'all' && t.category !== currentCategory) {
        return false;
      }

      // Search query
      if (q) {
        const inTitle = t.title.toLowerCase().includes(q);
        const inDesc = t.description && t.description.toLowerCase().includes(q);
        const inCat = t.category.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inCat) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'due-asc') {
      list.sort((a, b) => {
        if (!a.due && !b.due) return 0;
        if (!a.due) return 1;
        if (!b.due) return -1;
        return a.due.localeCompare(b.due);
      });
    } else if (sortBy === 'priority-desc') {
      const prioWeight = { high: 3, medium: 2, low: 1 };
      list.sort((a, b) => (prioWeight[b.priority] || 0) - (prioWeight[a.priority] || 0));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.created || 0) - (a.created || 0));
    } else if (sortBy === 'alpha') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }

  // ---------- Render DOM Nodes ----------
  function render(highlightId) {
    const visible = getFilteredAndSortedTasks();
    const listEl = $('list');
    listEl.replaceChildren();

    if (!visible.length) {
      listEl.append(createEmptyStateNode());
    } else {
      visible.forEach(task => {
        if (task.id === editingTaskId) {
          listEl.append(createEditTaskNode(task));
        } else {
          listEl.append(createTaskNode(task, task.id === highlightId));
        }
      });
    }

    updateDashboardMetrics();
    updateTabCounts();
  }

  function createEmptyStateNode() {
    const isFiltered = tasks.length > 0;
    const title = isFiltered ? 'No tasks found' : 'All clear for now!';
    const desc = isFiltered
      ? 'Try adjusting your search query, status view, or category filters.'
      : 'You have no tasks scheduled. Add your first task above to start organizing.';

    const li = createElement('li', { className: 'empty-state' },
      createElement('div', { className: 'empty-icon-wrap' },
        createSvgIcon('check-circle', 28)
      ),
      createElement('h3', { className: 'empty-title', textContent: title }),
      createElement('p', { className: 'empty-desc', textContent: desc })
    );

    if (!isFiltered) {
      const btn = createElement('button', {
        className: 'btn btn-primary',
        style: 'margin-top: 14px',
        onclick: () => $('titleInput').focus()
      }, 'Add your first task');
      li.append(btn);
    }
    return li;
  }

  function createTaskNode(task, isNew) {
    const li = createElement('li', {
      className: `task-item ${task.done ? 'done' : ''} ${isNew ? 'enter' : ''}`,
      dataset: {
        id: task.id,
        cat: task.category,
        prio: task.priority
      },
      draggable: sortBy === 'order' ? 'true' : 'false'
    });

    // 1. Drag grip
    const grip = createElement('span', {
      className: 'drag-grip',
      title: sortBy === 'order' ? 'Drag to reorder' : 'Sorting active (switch to Custom Order to reorder)',
      textContent: '⋮⋮'
    });

    // 2. Checkbox
    const checkbox = createElement('input', {
      type: 'checkbox',
      className: 'custom-check',
      checked: task.done,
      'aria-label': `Mark "${task.title}" as complete`,
      onchange: e => updateTask(task.id, { done: e.target.checked })
    });

    // 3. Task Content Block
    const titleSpan = createElement('span', {
      className: 'task-title',
      textContent: task.title
    });

    const contentDiv = createElement('div', { className: 'task-content' },
      createElement('div', { className: 'task-title-line' }, titleSpan)
    );

    // Optional description notes
    if (task.description) {
      const notesDiv = createElement('div', {
        className: 'task-notes',
        textContent: task.description
      });
      contentDiv.append(notesDiv);
    }

    // Metadata Badges (Category, Priority, Due Date)
    const metaRow = createElement('div', { className: 'task-meta-row' });

    // Category badge
    const catBadge = createElement('span', { className: 'badge-tag' },
      createElement('span', { className: 'dot' }),
      task.category
    );
    metaRow.append(catBadge);

    // Priority badge
    const prioBadge = createElement('span', {
      className: `badge-prio ${task.priority}`
    },
      createSvgIcon('flag', 12),
      task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
    );
    metaRow.append(prioBadge);

    // Due Date badge with smart relative indicators
    if (task.due) {
      const diff = Math.round((new Date(task.due) - new Date(todayISO())) / 864e5);
      let label = formatDate(task.due);
      let cls = 'badge-due';

      if (!task.done && diff < 0) {
        cls += ' overdue';
        label = `Overdue (${label})`;
      } else if (!task.done && diff === 0) {
        cls += ' today';
        label = 'Today';
      } else if (!task.done && diff === 1) {
        cls += ' tomorrow';
        label = 'Tomorrow';
      }

      const dueBadge = createElement('span', { className: cls },
        createSvgIcon('clock', 12),
        label
      );
      metaRow.append(dueBadge);
    }
    contentDiv.append(metaRow);

    // 4. Action Buttons
    const actionsDiv = createElement('div', { className: 'task-actions' });

    const editBtn = createElement('button', {
      className: 'btn-action-icon',
      title: 'Edit task',
      'aria-label': `Edit ${task.title}`,
      onclick: () => {
        editingTaskId = task.id;
        render();
      }
    }, createSvgIcon('edit', 14));

    const delBtn = createElement('button', {
      className: 'btn-action-icon delete',
      title: 'Delete task',
      'aria-label': `Delete ${task.title}`,
      onclick: () => deleteTask(task.id, li)
    }, createSvgIcon('trash', 14));

    actionsDiv.append(editBtn, delBtn);
    li.append(grip, checkbox, contentDiv, actionsDiv);

    // Setup drag and drop
    if (sortBy === 'order') {
      setupDragAndDrop(li, task.id);
    }

    return li;
  }

  function createEditTaskNode(task) {
    const li = createElement('li', {
      className: 'task-item',
      dataset: { cat: task.category, prio: task.priority }
    });

    const editBox = createElement('div', { className: 'task-edit-box' });

    const titleInput = createElement('input', {
      type: 'text',
      className: 'field-input edit-input-title',
      value: task.title,
      maxLength: 140,
      'aria-label': 'Edit task title'
    });

    const descInput = createElement('textarea', {
      className: 'field-input notes-textarea',
      rows: 2,
      placeholder: 'Notes / description...',
      value: task.description || ''
    });

    const gridRow = createElement('div', { className: 'edit-grid-row' });

    // Category select
    const catSelect = createElement('select', { 'aria-label': 'Select category' });
    CATEGORIES.forEach(c => {
      catSelect.append(createElement('option', { value: c, selected: c === task.category, textContent: c }));
    });

    // Priority select
    const prioSelect = createElement('select', { 'aria-label': 'Select priority' });
    PRIORITIES.forEach(p => {
      prioSelect.append(createElement('option', { value: p.id, selected: p.id === task.priority, textContent: p.label + ' Priority' }));
    });

    // Due date
    const dueInput = createElement('input', {
      type: 'date',
      value: task.due || '',
      'aria-label': 'Select due date'
    });

    gridRow.append(catSelect, prioSelect, dueInput);

    // Save and Cancel buttons
    const actionsRow = createElement('div', { className: 'edit-actions-row' });
    const saveBtn = createElement('button', {
      className: 'btn btn-primary',
      textContent: 'Save Changes',
      onclick: saveEdit
    });
    const cancelBtn = createElement('button', {
      className: 'btn btn-secondary',
      textContent: 'Cancel',
      onclick: () => {
        editingTaskId = null;
        render();
      }
    });

    function saveEdit() {
      const v = titleInput.value.trim();
      if (!v) {
        titleInput.focus();
        return;
      }
      editingTaskId = null;
      updateTask(task.id, {
        title: v,
        description: descInput.value.trim(),
        category: catSelect.value,
        priority: prioSelect.value,
        due: dueInput.value
      });
    }

    titleInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveEdit();
      if (e.key === 'Escape') {
        editingTaskId = null;
        render();
      }
    });

    actionsRow.append(saveBtn, cancelBtn);
    editBox.append(titleInput, descInput, gridRow, actionsRow);
    li.append(editBox);

    setTimeout(() => titleInput.focus(), 20);
    return li;
  }

  // ---------- Drag and Drop Reordering ----------
  function setupDragAndDrop(domNode, taskId) {
    domNode.addEventListener('dragstart', e => {
      draggedTaskId = taskId;
      domNode.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', taskId);
    });

    domNode.addEventListener('dragend', () => {
      draggedTaskId = null;
      domNode.classList.remove('dragging');
      document.querySelectorAll('.drag-over').forEach(n => n.classList.remove('drag-over'));
    });

    domNode.addEventListener('dragover', e => {
      e.preventDefault();
      domNode.classList.add('drag-over');
    });

    domNode.addEventListener('dragleave', () => {
      domNode.classList.remove('drag-over');
    });

    domNode.addEventListener('drop', e => {
      e.preventDefault();
      domNode.classList.remove('drag-over');
      if (!draggedTaskId || draggedTaskId === taskId) return;

      const fromIndex = tasks.findIndex(t => t.id === draggedTaskId);
      const toIndex = tasks.findIndex(t => t.id === taskId);
      if (fromIndex < 0 || toIndex < 0) return;

      const [item] = tasks.splice(fromIndex, 1);
      tasks.splice(toIndex, 0, item);
      saveTasks();
      render();
    });
  }

  // ---------- Dashboard & Progress Updates ----------
  function updateDashboardMetrics() {
    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    const active = total - done;
    const visibleCount = getFilteredAndSortedTasks().length;

    const countEl = $('count');
    if (countEl) {
      countEl.textContent = `Showing ${visibleCount} of ${total} tasks (${active} active)`;
    }
  }

  function updateTabCounts() {
    const today = todayISO();
    const countAll = $('tabCountAll');
    if (countAll) countAll.textContent = tasks.length;

    const countToday = $('tabCountToday');
    if (countToday) countToday.textContent = tasks.filter(t => t.due === today).length;

    const countActive = $('tabCountActive');
    if (countActive) countActive.textContent = tasks.filter(t => !t.done).length;

    const countHigh = $('tabCountHigh');
    if (countHigh) countHigh.textContent = tasks.filter(t => t.priority === 'high' && !t.done).length;

    const countCompleted = $('tabCountCompleted');
    if (countCompleted) countCompleted.textContent = tasks.filter(t => t.done).length;
  }

  // ---------- Inline SVG Icon Factory ----------
  function createSvgIcon(name, size = 16) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    if (name === 'check-circle') {
      svg.innerHTML = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>';
    } else if (name === 'flag') {
      svg.setAttribute('fill', 'currentColor');
      svg.innerHTML = '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>';
    } else if (name === 'clock') {
      svg.innerHTML = '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>';
    } else if (name === 'edit') {
      svg.innerHTML = '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>';
    } else if (name === 'trash') {
      svg.innerHTML = '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>';
    }
    return svg;
  }

  // ---------- Toast System ----------
  function toast(message, actionLabel, actionCallback) {
    const zone = $('toasts');
    if (!zone) return;

    const toastEl = createElement('div', { className: 'toast' },
      createElement('span', { textContent: message })
    );

    let timer = null;
    const dismiss = () => {
      clearTimeout(timer);
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateY(12px)';
      setTimeout(() => toastEl.remove(), 250);
    };

    if (actionLabel && actionCallback) {
      const btn = createElement('button', {
        className: 'toast-btn',
        textContent: actionLabel,
        onclick: () => {
          actionCallback();
          dismiss();
        }
      });
      toastEl.append(btn);
    }

    zone.append(toastEl);
    timer = setTimeout(dismiss, 4000);
  }

  // ---------- Theme Switcher ----------
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    const theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(theme);

    const themeBtn = $('themeBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }

  // ---------- Event Listeners Setup ----------
  function initEventListeners() {
    // Add task form
    $('addForm').addEventListener('submit', e => {
      e.preventDefault();
      const title = $('titleInput').value.trim();
      if (!title) return;

      const desc = $('descInput').value.trim();
      const category = document.querySelector('input[name="cat"]:checked')?.value || 'Work';
      const priority = document.querySelector('input[name="priority"]:checked')?.value || 'medium';
      const due = $('dueInput').value;

      createTask({ title, description: desc, category, priority, due });

      $('titleInput').value = '';
      $('descInput').value = '';
      $('dueInput').value = '';
      $('notesWrapper').hidden = true;
      $('titleInput').focus();
    });

    // Notes toggle button
    const toggleNotes = $('toggleNotesBtn');
    if (toggleNotes) {
      toggleNotes.addEventListener('click', () => {
        const wrapper = $('notesWrapper');
        wrapper.hidden = !wrapper.hidden;
        if (!wrapper.hidden) $('descInput').focus();
      });
    }

    // Quick date buttons
    document.querySelectorAll('.btn-quick-date').forEach(btn => {
      btn.addEventListener('click', () => {
        const days = parseInt(btn.dataset.days, 10);
        $('dueInput').value = getRelativeDateISO(days);
      });
    });

    // View tabs filter
    const statusFilter = $('statusFilter');
    if (statusFilter) {
      statusFilter.addEventListener('click', e => {
        const tab = e.target.closest('.tab-btn');
        if (!tab) return;

        currentTab = tab.dataset.f;
        document.querySelectorAll('#statusFilter .tab-btn').forEach(btn => {
          const isActive = btn === tab;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-selected', isActive);
        });
        render();
      });
    }

    // Category dropdown filter
    const catFilter = $('catFilter');
    if (catFilter) {
      catFilter.addEventListener('change', e => {
        currentCategory = e.target.value;
        render();
      });
    }

    // Sort selector
    const sortSelect = $('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        sortBy = e.target.value;
        render();
      });
    }

    // Search bar
    const searchInput = $('search');
    const clearBtn = $('searchClearBtn');

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        if (clearBtn) clearBtn.hidden = !searchQuery;
        render();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.hidden = true;
        searchInput.focus();
        render();
      });
    }

    // Clear completed tasks
    const clearDoneBtn = $('clearDone');
    if (clearDoneBtn) {
      clearDoneBtn.addEventListener('click', () => {
        const completed = tasks.filter(t => t.done);
        if (!completed.length) {
          toast('No completed tasks to clear');
          return;
        }

        const backup = [...tasks];
        tasks = tasks.filter(t => !t.done);
        saveTasks();
        render();

        toast(`${completed.length} completed task${completed.length > 1 ? 's' : ''} cleared`, 'Undo', () => {
          tasks = backup;
          saveTasks();
          render();
        });
      });
    }

    // Key shortcut to focus input on typing
    window.addEventListener('keydown', e => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || tag === 'select';
      if (isInput) return;

      if (e.key === 'Escape' && editingTaskId) {
        editingTaskId = null;
        render();
      }
    });
  }

  // ---------- Application Initialization ----------
  function init() {
    initTheme();
    loadTasks();
    initEventListeners();
    render();
  }

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();