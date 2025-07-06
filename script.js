const form = document.getElementById('ticket-form'),
      viewBtn = document.getElementById('view-history-btn'),
      historySec = document.getElementById('ticket-history'),
      tbody = document.getElementById('history-table-body');

document.addEventListener('DOMContentLoaded', () => {
  gsap.from('.hero', { opacity:0, y:-50, duration:1, ease:'bounce.out' });
  gsap.from('.doodle-icons img', { opacity:0, y:20, stagger:0.1, duration:0.6 });
  [viewBtn, form.querySelector('button')].forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { scale:1.05, duration:0.2 }));
    el.addEventListener('mouseleave', () => gsap.to(el, { scale:1, duration:0.2 }));
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim(),
        seat = form.seat.value.trim(),
        date = form.date.value,
        from = form.from.value.trim(),
        to = form.to.value.trim();
  if (!name||!seat||!date||!from||!to) return alert('Please complete all fields');

  const id = 'T' + (1000 + Math.floor(Math.random() * 9000)),
        row = tbody.insertRow();
  row.innerHTML = `
    <td>${id}</td><td>${name}</td><td>${seat}</td>
    <td>${date}</td><td>${from}</td><td>${to}</td>
    <td><button class="delete-btn" data-id="${id}">Delete</button></td>`;
  gsap.from(row, { opacity:0, x:50, duration:0.5, ease:'back.out(1.7)' });
  form.reset();
});

viewBtn.addEventListener('click', () => {
  const show = historySec.classList.toggle('hidden');
  if (!show) gsap.from(historySec, { opacity:0, scale:0.8, duration:0.6, ease:'elastic.out(1,0.5)' });
});

tbody.addEventListener('click', e => {
  if (e.target.matches('.delete-btn')) {
    const row = e.target.closest('tr');
    gsap.to(row, { x:-100, opacity:0, duration:0.4, ease:'power1.in', onComplete: () => row.remove() });
  }
});
