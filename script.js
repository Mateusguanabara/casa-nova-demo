// Versão demonstrativa: sem conexão ou gravações no Firebase.
const root = document.documentElement;
const vars = { fundo: '--bg', papel: '--paper', principal: '--primary', destaque: '--accent', texto: '--text' };
Object.entries(CONFIG.cores).forEach(([chave, valor]) => root.style.setProperty(vars[chave], valor));

document.getElementById('tituloEvento').textContent = CONFIG.evento.titulo;
['nome1', 'assinatura1'].forEach(id => document.getElementById(id).textContent = CONFIG.casal.nome1);
['nome2', 'assinatura2'].forEach(id => document.getElementById(id).textContent = CONFIG.casal.nome2);
document.getElementById('dataExibicao').textContent = CONFIG.evento.dataExibicao;
document.getElementById('horario').textContent = CONFIG.evento.horario;
document.getElementById('endereco').textContent = CONFIG.evento.endereco;
document.getElementById('rotaBtn').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.evento.endereco)}`;

// Contagem fictícia de 30 dias para o portfólio.
// Cada visitante tem sua própria contagem, preservada ao recarregar a página.
// Data do temporizador definida no config.js
const target = new Date(CONFIG.evento.dataISO).getTime();

document.getElementById('countdownMessage').textContent = 'Contagem ilustrativa para demonstração';
function updateCountdown() {
  const distance = target - Date.now();
  if (distance <= 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => document.getElementById(id).textContent = '00');
    document.getElementById('countdownMessage').textContent = 'Contagem demonstrativa concluída!';
    return;
  }
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000)
  };
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, '0');
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const list = document.getElementById('giftList');
const search = document.getElementById('giftSearch');
const count = document.getElementById('giftCount');
const status = document.getElementById('firebaseStatus');
status.textContent = 'Projeto demonstrativo — reservas encerradas';
status.className = 'firebase-status online';
function renderGifts(filter = '') {
  const normalized = filter.trim().toLocaleLowerCase('pt-BR');
  const visible = CONFIG.presentes.filter(name => name.toLocaleLowerCase('pt-BR').includes(normalized));
  list.replaceChildren();
  visible.forEach(name => {
    const item = document.createElement('div');
    item.className = 'gift-item';
    const title = document.createElement('span');
    title.className = 'gift-name';
    title.textContent = name;
    const state = document.createElement('span');
    state.className = 'gift-status';
    state.textContent = 'Demonstração';
    item.append(title, state);
    list.appendChild(item);
  });
  count.textContent = `${CONFIG.presentes.length} presentes no catálogo demonstrativo`;
}
renderGifts();
search.addEventListener('input', event => renderGifts(event.target.value));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
