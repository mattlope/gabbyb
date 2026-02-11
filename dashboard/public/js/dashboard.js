// ===== AUTH CHECK =====
const token = localStorage.getItem('dash_token');
const user = JSON.parse(localStorage.getItem('dash_user') || 'null');

if (!token || !user) {
  window.location.href = '/';
}

// ===== GLOBALS =====
let currentSection = 'overview';
let currentPage = 0;
const PAGE_SIZE = 20;

// ===== HELPERS =====
function api(path, options = {}) {
  return fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  }).then(async (res) => {
    if (res.status === 401) {
      localStorage.removeItem('dash_token');
      localStorage.removeItem('dash_user');
      window.location.href = '/';
      return;
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'Z');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateStr) {
  const d = new Date(dateStr + 'Z');
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
}

function statusLabel(status) {
  const labels = {
    new: 'New',
    contacted: 'Contacted',
    in_progress: 'In Progress',
    closed_won: 'Won',
    closed_lost: 'Lost',
  };
  return labels[status] || status;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== INIT =====
document.getElementById('userName').textContent = user.display_name;
document.getElementById('userRole').textContent = user.role;
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
});

// ===== NAVIGATION =====
document.querySelectorAll('.sidebar-link:not(.disabled)').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const section = link.dataset.section;
    if (!section) return;
    switchSection(section);
  });
});

function switchSection(section) {
  currentSection = section;

  // Update sidebar active state
  document.querySelectorAll('.sidebar-link').forEach((l) => l.classList.remove('active'));
  document.querySelector(`.sidebar-link[data-section="${section}"]`).classList.add('active');

  // Show/hide sections
  document.querySelectorAll('.dash-section').forEach((s) => s.hidden = true);
  document.getElementById(`section-${section}`).hidden = false;

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');

  // Load data
  if (section === 'overview') loadOverview();
  if (section === 'submissions') loadSubmissions();
}

// View All button
document.getElementById('viewAllBtn').addEventListener('click', () => switchSection('submissions'));

// ===== MOBILE SIDEBAR =====
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ===== LOGOUT =====
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('dash_token');
  localStorage.removeItem('dash_user');
  window.location.href = '/';
});

// ===== OVERVIEW =====
async function loadOverview() {
  try {
    const stats = await api('/stats');

    document.getElementById('statTotal').textContent = stats.total;
    document.getElementById('statUnread').textContent = stats.unread;
    document.getElementById('statWeek').textContent = stats.this_week;
    document.getElementById('statMonth').textContent = stats.this_month;

    // Update unread badge
    const badge = document.getElementById('unreadBadge');
    if (stats.unread > 0) {
      badge.textContent = stats.unread;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }

    // Recent table
    const tbody = document.getElementById('recentTableBody');
    if (stats.recent.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="table-empty">No submissions yet</td></tr>';
      return;
    }

    tbody.innerHTML = stats.recent.map((s) => `
      <tr class="${s.is_read ? '' : 'unread'}" style="cursor:pointer" onclick="openSubmission(${s.id})">
        <td>${escapeHtml(s.name)}</td>
        <td>${escapeHtml(s.email)}</td>
        <td>${escapeHtml(s.inquiry_type)}</td>
        <td>${formatDate(s.created_at)}</td>
        <td><span class="status-badge new">New</span></td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Failed to load overview:', err);
  }
}

// ===== SUBMISSIONS =====
async function loadSubmissions() {
  const search = document.getElementById('searchInput').value;
  const status = document.getElementById('filterStatus').value;
  const isRead = document.getElementById('filterRead').value;

  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status) params.set('status', status);
  if (isRead !== '') params.set('is_read', isRead);
  params.set('limit', PAGE_SIZE);
  params.set('offset', currentPage * PAGE_SIZE);

  try {
    const data = await api(`/submissions?${params}`);

    // Update unread badge
    const badge = document.getElementById('unreadBadge');
    if (data.unread > 0) {
      badge.textContent = data.unread;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }

    const tbody = document.getElementById('submissionsTableBody');
    if (data.submissions.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="table-empty">No submissions found</td></tr>';
    } else {
      tbody.innerHTML = data.submissions.map((s) => `
        <tr class="${s.is_read ? '' : 'unread'}">
          <td>${s.is_read ? '' : '<span class="unread-dot"></span>'}</td>
          <td>${escapeHtml(s.name)}</td>
          <td>${escapeHtml(s.email)}</td>
          <td>${escapeHtml(s.inquiry_type)}</td>
          <td>${escapeHtml(s.message.slice(0, 60))}${s.message.length > 60 ? '...' : ''}</td>
          <td>${formatDate(s.created_at)}</td>
          <td><span class="status-badge ${s.status}">${statusLabel(s.status)}</span></td>
          <td>
            <button class="btn-action" onclick="openSubmission(${s.id})">View</button>
            <button class="btn-action delete" onclick="deleteSubmission(${s.id})">Del</button>
          </td>
        </tr>
      `).join('');
    }

    // Pagination
    const totalPages = Math.ceil(data.total / PAGE_SIZE);
    document.getElementById('pageInfo').textContent = `Page ${currentPage + 1} of ${totalPages || 1}`;
    document.getElementById('prevPage').disabled = currentPage === 0;
    document.getElementById('nextPage').disabled = currentPage >= totalPages - 1;
  } catch (err) {
    console.error('Failed to load submissions:', err);
  }
}

// Search & filters
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => { currentPage = 0; loadSubmissions(); }, 300);
});

document.getElementById('filterStatus').addEventListener('change', () => { currentPage = 0; loadSubmissions(); });
document.getElementById('filterRead').addEventListener('change', () => { currentPage = 0; loadSubmissions(); });

// Pagination
document.getElementById('prevPage').addEventListener('click', () => { currentPage--; loadSubmissions(); });
document.getElementById('nextPage').addEventListener('click', () => { currentPage++; loadSubmissions(); });

// ===== SUBMISSION DETAIL MODAL =====
async function openSubmission(id) {
  try {
    const s = await api(`/submissions/${id}`);

    // Mark as read
    if (!s.is_read) {
      await api(`/submissions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_read: true }),
      });
    }

    const body = document.getElementById('modalBody');
    body.innerHTML = `
      <div class="modal-field">
        <label>Name</label>
        <p>${escapeHtml(s.name)}</p>
      </div>
      <div class="modal-field">
        <label>Email</label>
        <p><a href="mailto:${escapeHtml(s.email)}">${escapeHtml(s.email)}</a></p>
      </div>
      <div class="modal-field">
        <label>Inquiry Type</label>
        <p>${escapeHtml(s.inquiry_type)}</p>
      </div>
      <div class="modal-field">
        <label>Message</label>
        <p class="message-text">${escapeHtml(s.message)}</p>
      </div>
      <div class="modal-field">
        <label>Submitted</label>
        <p>${formatDateTime(s.created_at)}</p>
      </div>
      <div class="modal-field">
        <label>Status</label>
        <p><span class="status-badge ${s.status}">${statusLabel(s.status)}</span></p>
      </div>
    `;

    const footer = document.getElementById('modalFooter');
    footer.innerHTML = `
      <select id="modalStatusSelect" onchange="updateSubmissionStatus(${s.id}, this.value)">
        <option value="new" ${s.status === 'new' ? 'selected' : ''}>New</option>
        <option value="contacted" ${s.status === 'contacted' ? 'selected' : ''}>Contacted</option>
        <option value="in_progress" ${s.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
        <option value="closed_won" ${s.status === 'closed_won' ? 'selected' : ''}>Won</option>
        <option value="closed_lost" ${s.status === 'closed_lost' ? 'selected' : ''}>Lost</option>
      </select>
      <button class="btn-action delete" onclick="deleteSubmission(${s.id}); closeModal();">Delete</button>
    `;

    document.getElementById('modalOverlay').hidden = false;
  } catch (err) {
    console.error('Failed to open submission:', err);
  }
}

async function updateSubmissionStatus(id, status) {
  try {
    await api(`/submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    // Refresh current view
    if (currentSection === 'overview') loadOverview();
    if (currentSection === 'submissions') loadSubmissions();
  } catch (err) {
    console.error('Failed to update status:', err);
  }
}

async function deleteSubmission(id) {
  if (!confirm('Delete this submission permanently?')) return;
  try {
    await api(`/submissions/${id}`, { method: 'DELETE' });
    closeModal();
    if (currentSection === 'overview') loadOverview();
    if (currentSection === 'submissions') loadSubmissions();
  } catch (err) {
    console.error('Failed to delete submission:', err);
  }
}

function closeModal() {
  document.getElementById('modalOverlay').hidden = true;
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// ===== INITIAL LOAD =====
loadOverview();
