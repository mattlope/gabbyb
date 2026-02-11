// ===== BOOKING FORM HANDLER =====
// Sends form data to the dashboard API at dash.gabbybmusic.com
// In development, update API_BASE to your local server

const API_BASE = 'https://dash.gabbybmusic.com';

const form = document.getElementById('bookingForm');
const feedback = document.getElementById('formFeedback');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    feedback.hidden = true;

    // Gather values
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const inquiry_type = document.getElementById('formType').value;
    const message = document.getElementById('formMessage').value.trim();

    // Client-side validation
    if (!name || !email || !inquiry_type || !message) {
      showFeedback('Please fill out all fields.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Disable submit
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    try {
      const res = await fetch(API_BASE + '/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, inquiry_type, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      showFeedback('Your inquiry has been sent! We\'ll get back to you soon.', 'success');
      form.reset();
    } catch (err) {
      showFeedback(err.message || 'Failed to send. Please try emailing booking@gabbybmusic.com directly.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Submit Inquiry <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }
  });
}

function showFeedback(msg, type) {
  feedback.textContent = msg;
  feedback.className = 'form-feedback form-feedback-' + type;
  feedback.hidden = false;
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
