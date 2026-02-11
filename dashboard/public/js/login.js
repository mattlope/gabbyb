// Redirect if already logged in
const token = localStorage.getItem('dash_token');
if (token) {
  window.location.href = '/dashboard.html';
}

const form = document.getElementById('loginForm');
const errorEl = document.getElementById('loginError');
const loginBtn = document.getElementById('loginBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.hidden = true;
  loginBtn.disabled = true;
  loginBtn.textContent = 'Signing in...';

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem('dash_token', data.token);
    localStorage.setItem('dash_user', JSON.stringify(data.user));
    window.location.href = '/dashboard.html';
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.hidden = false;
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign In';
  }
});
