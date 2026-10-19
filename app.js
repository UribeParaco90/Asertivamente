/* ---------- Utilidades ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
$('#year').textContent = new Date().getFullYear();

/* Menú móvil */
$('#burger').addEventListener('click', () => $('#menu').classList.toggle('open'));
$$('#menu a').forEach(a => a.addEventListener('click', () => $('#menu').classList.remove('open')));

/* ---------- Tips ---------- */
const tips = [
  {c:'escucha', t:'Escucha para entender', d:'Escucha sin preparar tu respuesta mientras el otro habla. Tu objetivo es comprender, no ganar.'},
  {c:'escucha', t:'Parafrasea', d:'Repite con tus palabras lo que entendiste: “Si te entiendo bien, te sientes…”. Evita malentendidos.'},
  {c:'escucha', t:'Respeta los silencios', d:'Una pausa no es un vacío que llenar. Muchas veces la persona está ordenando lo que quiere decir.'},
  {c:'expresion', t:'Usa mensajes “yo”', d:'Habla desde lo que tú sientes y necesitas (“Me siento…”) en lugar de acusar (“Tú siempre…”).'},
  {c:'expresion', t:'Sé específico', d:'Evita “siempre” y “nunca”. Describe el hecho concreto: qué pasó, cuándo y cómo te afectó.'},
  {c:'expresion', t:'Aprende a decir “no”', d:'Un “no” claro y amable protege tu tiempo. No necesitas justificarte con una larga explicación.'},
  {c:'expresion', t:'Pide, no supongas', d:'Nadie adivina lo que necesitas. Formula peticiones concretas y posibles de cumplir.'},
  {c:'emociones', t:'Respira antes de responder', d:'Si estás alterado, haz una pausa de 10 segundos. Responder con calma cambia el tono de toda la charla.'},
  {c:'emociones', t:'Nombra lo que sientes', d:'“Estoy frustrado” comunica más y mejor que un portazo. Ponerle nombre a la emoción la regula.'},
  {c:'emociones', t:'Separa persona y problema', d:'Critica la conducta, no a la persona. “Esto no salió bien” no es lo mismo que “Eres un desastre”.'},
  {c:'digital', t:'Cuida el tono escrito', d:'Sin voz ni gestos, un mensaje seco puede sonar a enojo. Relee antes de enviar.'},
  {c:'digital', t:'Lo delicado, en persona', d:'Los conflictos profundos se resuelven mejor en una llamada o cara a cara que por chat.'}
];
const catNames = {escucha:'Escucha', expresion:'Expresión', emociones:'Emociones', digital:'Digital'};
$('#tipsGrid').innerHTML = tips.map((x, i) => `
  <article class="tip" data-c="${x.c}">
    <div class="num">${String(i + 1).padStart(2, '0')}</div>
    <h3>${x.t}</h3><p>${x.d}</p>
    <span class="cat">${catNames[x.c]}</span>
  </article>`).join('');
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  $$('.chip', $('#filters')).forEach(c => c.classList.toggle('active', c === b));
  $$('.tip').forEach(t => t.classList.toggle('hide', b.dataset.f !== 'todos' && t.dataset.c !== b.dataset.f));
});

/* ---------- Técnicas (acordeón) ---------- */
const techs = [
  {n:'Disco rayado', d:'Repetir con calma tu mensaje central, sin enojarte ni dar nuevas excusas, cuando el otro insiste en que cedas.', e:'“Entiendo que quieras que vaya, pero no puedo esta noche.” (repetir las veces necesarias)'},
  {n:'Banco de niebla', d:'Reconocer lo que pueda haber de cierto en una crítica sin entrar en discusión ni ponerte a la defensiva.', e:'“Puede que tengas razón, a veces llego tarde. Lo tendré en cuenta.”'},
  {n:'Técnica del sándwich', d:'Dar una crítica entre dos comentarios positivos y sinceros, para que se escuche sin herir.', e:'“Tu presentación estuvo muy clara. Las diapositivas tenían demasiado texto. Tu seguridad al hablar fue excelente.”'},
  {n:'Mensajes “yo”', d:'Estructura: cuando [hecho concreto], me siento [emoción], porque [razón]. Me gustaría [petición].', e:'“Cuando me interrumpes, me siento ignorado. Me gustaría terminar mi idea antes de que opines.”'},
  {n:'Aserción negativa', d:'Aceptar tranquilamente un error propio sin humillarte ni justificarte en exceso.', e:'“Me equivoqué con la fecha. Lo corrijo hoy mismo.”'}
];
$('#acc').innerHTML = techs.map((x, i) => `
  <div class="acc-item">
    <button class="acc-btn" aria-expanded="false" aria-controls="p${i}">${i + 1}. ${x.n}</button>
    <div class="acc-panel" id="p${i}"><div><p>${x.d}</p><p class="example"><strong>Ejemplo:</strong> ${x.e}</p></div></div>
  </div>`).join('');
$('#acc').addEventListener('click', e => {
  const btn = e.target.closest('.acc-btn'); if (!btn) return;
  const item = btn.parentElement, panel = $('.acc-panel', item);
  const open = item.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  panel.style.maxHeight = open ? panel.scrollHeight + 'px' : 0;
});

/* ---------- Test de asertividad ---------- */
// Cada opción suma: 0 = pasivo, 1 = agresivo, 2 = asertivo
const quiz = [
  {q:'Un compañero te pide un favor que no puedes hacer. ¿Qué haces?', o:[['Digo que sí aunque me complique la vida.',0],['Respondo molesto: “¡Siempre me pides cosas!”',1],['Le digo amablemente que no puedo y propongo otra opción.',2]]},
  {q:'En un restaurante te traen un plato distinto al que pediste.', o:[['Me lo como y no digo nada.',0],['Llamo al mesero y le reclamo con mala cara.',1],['Le explico con calma que pedí otro plato y pido que lo cambien.',2]]},
  {q:'Alguien te interrumpe constantemente en una reunión.', o:[['Me callo y dejo de participar.',0],['Lo interrumpo yo también, más fuerte.',1],['Digo: “Permíteme terminar mi idea y luego te escucho”.',2]]},
  {q:'Un amigo te hizo una broma que te dolió.', o:[['Me río, pero me lo guardo por dentro.',0],['Le respondo con otra broma más hiriente.',1],['Le cuento en privado cómo me sentí.',2]]},
  {q:'Recibes una crítica sobre tu trabajo.', o:[['Me siento fatal y le doy la razón en todo.',0],['Me defiendo atacando los errores del otro.',1],['Escucho, pregunto detalles y tomo lo que me sirve.',2]]},
  {q:'Necesitas pedir un aumento o un permiso importante.', o:[['Prefiero no pedirlo y esperar que se den cuenta.',0],['Lo exijo diciendo que me lo merezco más que nadie.',1],['Preparo mis argumentos y lo pido de forma clara y respetuosa.',2]]}
];
let qi = 0, score = {0:0, 1:0, 2:0};
const qz = $('#quiz');
function renderQ() {
  if (qi >= quiz.length) return renderResult();
  const cur = quiz[qi];
  qz.innerHTML = `
    <div class="progress"><i style="width:${(qi / quiz.length) * 100}%"></i></div>
    <span class="q-count">Pregunta ${qi + 1} de ${quiz.length}</span>
    <h3>${cur.q}</h3>
    ${cur.o.map(([t, v]) => `<button class="opt" data-v="${v}">${t}</button>`).join('')}`;
}
function renderResult() {
  const max = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  const pct = Math.round((score[2] / quiz.length) * 100);
  const msgs = {
    0:['Tiendes a la comunicación pasiva','Priorizas la armonía, pero a veces a costa de tus propias necesidades. Practica los mensajes “yo” y el decir “no” con amabilidad.'],
    1:['Tiendes a la comunicación agresiva','Eres directo y firme, pero puedes herir sin querer. Prueba a respirar antes de responder y a escuchar más antes de opinar.'],
    2:['¡Tu comunicación es asertiva!','Sabes expresarte con claridad y respeto. Sigue afinando con las técnicas y comparte tu experiencia en el foro.']
  };
  qz.innerHTML = `
    <div class="progress"><i style="width:100%"></i></div>
    <div class="result">
      <span class="q-count">Tu resultado</span>
      <div class="score">${pct}%</div>
      <h3>${msgs[max][0]}</h3>
      <p>${msgs[max][1]} (Respuestas asertivas: ${score[2]} de ${quiz.length}.)</p>
      <button class="btn btn-dark" id="retry">Repetir el test</button>
      <a href="#tecnicas" class="btn btn-primary" style="margin-left:8px">Ver técnicas</a>
    </div>`;
}
qz.addEventListener('click', e => {
  const opt = e.target.closest('.opt');
  if (opt) { score[opt.dataset.v]++; qi++; renderQ(); }
  if (e.target.id === 'retry') { qi = 0; score = {0:0, 1:0, 2:0}; renderQ(); }
});
renderQ();

/* ---------- Foro (localStorage) ---------- */
const KEY = 'asertivamente_posts_v1';
const colors = ['#2a8c8a', '#e8735a', '#c97d12', '#1b5e5f', '#8a6fb0'];
const seed = [
  {id:1, name:'Camila', cat:'Trabajo', title:'Mi jefe me pide trabajo extra cada viernes', text:'No sé cómo decirle que no sin que piense que soy poco comprometida. ¿Algún consejo?', likes:7, liked:false, replies:[{n:'Andrés', t:'Prueba el “disco rayado”: “Hoy no me es posible, puedo revisarlo el lunes a primera hora”.'}]},
  {id:2, name:'Julián', cat:'Familia', title:'Discusiones por el celular en la mesa', text:'En casa siempre terminamos peleando por esto. Quiero plantearlo sin que se convierta en pelea.', likes:4, liked:false, replies:[]},
  {id:3, name:'Valeria', cat:'Amistad', title:'Una amiga cancela siempre a último momento', text:'Me siento ignorada pero no quiero perder la amistad. ¿Cómo se lo digo?', likes:11, liked:false, replies:[{n:'Sofía', t:'Un mensaje “yo” ayuda mucho: “Cuando cancelas a última hora me siento poco prioritaria. ¿Podemos avisarnos antes?”'}]}
];
let posts;
try { posts = JSON.parse(localStorage.getItem(KEY)) || seed; } catch { posts = seed; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(posts)); } catch {} };

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}
function renderPosts() {
  const box = $('#posts'); box.innerHTML = '';
  posts.forEach(p => {
    const card = el('article', 'post');
    const head = el('div', 'post-head');
    const av = el('div', 'avatar', p.name.charAt(0).toUpperCase());
    av.style.background = colors[p.name.length % colors.length];
    const who = el('div'); who.append(el('strong', '', p.name), el('small', '', p.cat));
    head.append(av, who);
    card.append(head, el('h3', '', p.title), el('p', '', p.text));

    if (p.replies.length) {
      const rs = el('div', 'replies');
      p.replies.forEach(r => { const d = el('div', 'reply'); d.append(el('b', '', r.n + ': '), document.createTextNode(r.t)); rs.append(d); });
      card.append(rs);
    }
    const foot = el('div', 'post-foot');
    const like = el('button', 'like' + (p.liked ? ' liked' : ''), 'Me gusta · ' + p.likes);
    like.setAttribute('aria-label', 'Me gusta');
    like.onclick = () => { p.liked = !p.liked; p.likes += p.liked ? 1 : -1; save(); renderPosts(); };
    const rb = el('button', 'reply-btn', 'Responder (' + p.replies.length + ')');
    foot.append(like, rb);

    const rf = el('form', 'reply-form');
    const nm = el('input'); nm.placeholder = 'Tu nombre'; nm.maxLength = 30; nm.style.maxWidth = '120px'; nm.required = true;
    const tx = el('input'); tx.placeholder = 'Escribe una respuesta amable…'; tx.maxLength = 300; tx.required = true;
    const sb = el('button', 'btn btn-dark', 'Enviar'); sb.type = 'submit'; sb.style.padding = '10px 18px';
    nm.style.marginBottom = tx.style.marginBottom = '0';
    rf.append(nm, tx, sb);
    rb.onclick = () => { rf.classList.toggle('show'); if (rf.classList.contains('show')) nm.focus(); };
    rf.onsubmit = e => { e.preventDefault(); p.replies.push({n: nm.value.trim(), t: tx.value.trim()}); save(); renderPosts(); };
    card.append(foot, rf);
    box.append(card);
  });
}
$('#postForm').addEventListener('submit', e => {
  e.preventDefault();
  posts.unshift({
    id: Date.now(), name: $('#pName').value.trim(), cat: $('#pCat').value,
    title: $('#pTitle').value.trim(), text: $('#pText').value.trim(), likes: 0, liked: false, replies: []
  });
  save(); renderPosts(); e.target.reset();
});
renderPosts();

/* ---------- Boletín ---------- */
$('#newsForm').addEventListener('submit', e => {
  e.preventDefault();
  $('#newsMsg').textContent = '¡Gracias! (Demo: aún no hay servidor conectado, no se envió ningún dato.)';
  e.target.reset();
});
