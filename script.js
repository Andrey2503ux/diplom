              // ------------------- ФОНОВАЯ МУЗЫКА -------------------
let bgAudioCtx = null;
let bgInterval = null;
let isMusicOn = false;
const NOTES = [261.63, 329.63, 392.00, 523.25];

function playNote(frequency, duration = 0.12, volume = 0.08) {
  if (!bgAudioCtx) return;
  try {
    const osc = bgAudioCtx.createOscillator();
    const gain = bgAudioCtx.createGain();
    osc.connect(gain);
    gain.connect(bgAudioCtx.destination);
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    osc.start();
    osc.stop(bgAudioCtx.currentTime + duration);
  } catch (e) {}
}

function startBackgroundMusic() {
  if (isMusicOn) return;
  if (!bgAudioCtx) {
    bgAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (bgAudioCtx.state === 'suspended') bgAudioCtx.resume();
  isMusicOn = true;
  let noteIndex = 0;
  bgInterval = setInterval(() => {
    if (!isMusicOn) return;
    const freq = NOTES[noteIndex % NOTES.length];
    playNote(freq, 0.15, 0.08);
    noteIndex++;
  }, 400);
}

function stopBackgroundMusic() {
  if (bgInterval) { clearInterval(bgInterval); bgInterval = null; }
  isMusicOn = false;
}

function toggleMusic() {
  isMusicOn ? stopBackgroundMusic() : startBackgroundMusic();
  updateMusicButton();
}

function updateMusicButton() {
  const btn = document.getElementById('musicToggleBtn');
  if (btn) {
    btn.textContent = isMusicOn ? '🔊 Музыка Вкл' : '🔇 Музыка Выкл';
    btn.classList.toggle('on', isMusicOn);
  }
}

// ------------------- ЗВУКИ ЭФФЕКТОВ -------------------
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    let freq = 800, dur = 0.05, vol = 0.3;
    switch (type) {
      case 'click': freq = 1000; dur = 0.04; vol = 0.15; break;
      case 'success': freq = 660; dur = 0.12; vol = 0.2; break;
      case 'fail': freq = 200; dur = 0.4; vol = 0.25; break;
      case 'win': playWinSound(); return;
      default: freq = 800; dur = 0.05; vol = 0.2;
    }
    osc.frequency.value = freq;
    gain.gain.value = vol;
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch (e) {}
}

function playWinSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    osc1.connect(g1); g1.connect(ctx.destination);
    osc1.frequency.value = 523; g1.gain.value = 0.2;
    osc1.start(); osc1.stop(ctx.currentTime + 0.1);
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      osc2.connect(g2); g2.connect(ctx.destination);
      osc2.frequency.value = 659; g2.gain.value = 0.2;
      osc2.start(); osc2.stop(ctx.currentTime + 0.1);
    }, 100);
  } catch (e) {}
}

// ------------------- СЦЕНЫ -------------------
const scenes = {
  start: {
    icon: '🚏',
    text: 'Ты стоишь на остановке. Солнце клонится к закату. Тебе нужно попасть на «Мангалыч» за шаурмой. Какой троллейбус выберешь?',
    choices: [
      { text: 'Троллейбус №2 (идёт до Мангалыча)', next: 'correct_bus' },
      { text: 'Троллейбус №5 (идёт в промзону)', next: 'wrong_bus' }
    ]
  },
  wrong_bus: {
    icon: '😰',
    text: 'Ты сел в №5. Он увозит тебя в промзону, где нет ни шаурмы, ни души. Придётся возвращаться пешком... но уже поздно. Шаурма осталась мечтой.',
    choices: [ { text: 'Попробовать снова', next: 'start' } ]
  },
  correct_bus: {
    icon: '🚌',
    text: 'Ты заходишь в троллейбус №2. Салон дребезжит, пахнет бензином. Кондуктор строго смотрит на тебя.',
    choices: [
      { text: 'Купить билет (честно)', next: 'pay_success' },
      { text: 'Попытаться проехать зайцем', next: 'cheat_fail' }
    ]
  },
  cheat_fail: {
    icon: '👮',
    text: 'Контроллеры заметили тебя без билета. Штраф — 500 рублей, высадка из троллейбуса. Шаурма снова уплывает. Невезуха.',
    choices: [ { text: 'Начать заново', next: 'start' } ]
  },
  pay_success: {
    icon: '🎫',
    text: 'Ты честно купил билет. Троллейбус плавно трогается. Ты сидишь у окна и смотришь на прохожих — до «Мангалыча» осталось несколько остановок.',
    choices: [ { text: 'Ехать дальше', next: 'arrive' } ]
  },
  arrive: {
    icon: '📍',
    text: 'Троллейбус останавливается. Ты выходишь на остановке «Мангалыч». Ларёк с шаурмой светит оранжевым светом. Какой соус возьмёшь?',
    choices: [
      { text: 'Чесночный (классика)', next: 'sauce_win' },
      { text: 'Острый (для смелых)', next: 'sauce_win' }
    ]
  },
  sauce_win: {
    icon: '🥙',
    text: 'Ты берёшь свою шаурму — сочную, горячую, с правильным соусом. Откусываешь — и понимаешь: этот путь стоил усилий. Победа!',
    link: 'https://drive.google.com/file/d/1nQAWnM5SLzorfVJRdyThF7QRfQPJXlGH/view?usp=drivesdk',
    choices: [ { text: 'Съесть и повторить', next: 'start' } ]
  }
};

// ------------------- ОТРИСОВКА -------------------
function renderScene(sceneId) {
  const scene = scenes[sceneId];
  if (!scene) return;

  const container = document.getElementById('gameContainer');

  let choicesHtml = '';
  scene.choices.forEach((choice) => {
    choicesHtml += `<button class="btn" data-next="${choice.next}">${choice.text}</button>`;
  });

  let linkHtml = '';
  if (scene.link) {
    linkHtml = `<a href="${scene.link}" target="_blank" class="photo-link">📸 Посмотреть фото</a>`;
  }

  container.innerHTML = `
    <div class="scene">
      <div class="scene-icon">${scene.icon}</div>
      <div class="scene-text">${scene.text}</div>
      ${linkHtml}
      <div class="choices">${choicesHtml}</div>
      <div class="retro-divider"></div>
      <div class="footer">
        <span>✦ ретро-троллейбус ✦</span>
        <button class="music-btn" id="musicToggleBtn">🔇 Музыка Выкл</button>
      </div>
    </div>
  `;

  document.querySelectorAll('.choices .btn').forEach(btn => {
    btn.addEventListener('click', function() {
      playSound('click');
      const nextId = this.dataset.next;
      renderScene(nextId);
    });
  });

  const musicBtn = document.getElementById('musicToggleBtn');
  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMusic(); });
    updateMusicButton();
  }

  if (sceneId === 'wrong_bus' || sceneId === 'cheat_fail') {
    setTimeout(() => playSound('fail'), 120);
  } else if (sceneId === 'correct_bus' || sceneId === 'pay_success') {
    setTimeout(() => playSound('success'), 120);
  } else if (sceneId === 'sauce_win') {
    setTimeout(() => playSound('win'), 120);
  }
}

// Запуск
renderScene('start')
