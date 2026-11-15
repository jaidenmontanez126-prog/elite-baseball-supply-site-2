document.addEventListener('DOMContentLoaded', () => {
 const toggle = document.querySelector('.menu-toggle');
 const nav = document.querySelector('.main-nav');
 if (!toggle || !nav) return;
 function setOpen(open) { nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); }
 toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
 document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); } });
 document.addEventListener('click', e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false); });
 nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
 matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
});
