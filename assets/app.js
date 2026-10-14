'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
});
nav?.addEventListener('click', event => {
  if (event.target.closest('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus();
  }
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = button.dataset.filter !== 'All' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  document.querySelector('#filter-status').textContent = `${count} project${count === 1 ? '' : 's'} shown`;
}));
// Deliberately no synthetic uptime or unverified "online" indicators.
document.querySelector('#check-health')?.addEventListener('click', async event => {
  const button = event.currentTarget;
  button.disabled = true;
  const title = document.querySelector('#health-title');
  const detail = document.querySelector('#health-detail');
  title.setAttribute('role', 'status');
  title.textContent = 'Checking monitoring…';
  try {
    const response = await fetch('/api/health', {cache:'no-store', signal:AbortSignal.timeout(7000)});
    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Unavailable');
    const data = await response.json();
    const time = Date.parse(data.checkedAt);
    if (!Number.isFinite(time) || Math.abs(Date.now()-time) > 120000 || !['ok','degraded'].includes(data.status)) throw new Error('Unverified data');
    title.textContent = data.status === 'ok' ? 'Health endpoint reports healthy' : 'Health endpoint reports degraded';
    detail.textContent = `Reported at ${new Date(time).toLocaleString()}. This response verifies only the health endpoint; it does not establish VM, database, VPN health, or uptime.`;
  } catch {
    title.textContent = 'Monitoring unavailable';
    detail.textContent = `No fresh, verified health response was available at ${new Date().toLocaleTimeString()}. Server, database, and VPN status remain unknown.`;
  } finally { button.disabled = false; }
});
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const status = document.querySelector('#form-status');
  if (!name || message.length < 10) {status.textContent='Please enter your name and a message of at least 10 characters.';return;}
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
  window.location.href = `mailto:adelekeajayi001@gmail.com?subject=${subject}&body=${body}`;
  status.textContent = 'Email draft requested. Send it from your email app to complete delivery. If no app opens, use the email address shown here. This website has not sent your message.';
});
