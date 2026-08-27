<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Шаурма-троллейбус: с ссылкой на фото</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #1f140e;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Press Start 2P', monospace;
      padding: 16px;
    }

    .game-container {
      background: #fdf0d5;
      border: 8px solid #4a2f1b;
      border-radius: 24px;
      padding: 30px 20px;
      max-width: 640px;
      width: 100%;
      box-shadow: 0 0 0 4px #b68b6e, 0 12px 28px rgba(0,0,0,0.8), inset 0 0 20px rgba(74,47,27,0.2);
      image-rendering: pixelated;
    }

    .scene { display: flex; flex-direction: column; align-items: center; text-align: center; }

    .scene-icon { font-size: 96px; line-height: 1.2; filter: drop-shadow(4px 4px 0 #4a2f1b); margin-bottom: 8px; }

    .scene-text {
      background: #e9d6b0;
      border: 4px solid #4a2f1b;
      border-radius: 16px;
      padding: 24px 20px;
      font-size: 16px;
      line-height: 1.8;
      color: #2d1e14;
      text-shadow: 2px 2px 0 #d4a373;
      min-height: 140px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 12px 0 18px;
      box-shadow: inset 0 0 12px rgba(74,47,27,0.2);
    }

    .photo-link {
      display: inline-block;
      margin: 10px 0 16px;
      padding: 12px 20px;
      background: #4a2f1b;
      color: #fdf0d5;
      font-family: 'Press Start 2P', monospace;
      font-size: 14px;
      text-decoration: none;
      border-radius: 30px;
      border-bottom: 4px solid #2d1e14;
      box-shadow: 0 3px 0 #2d1e14;
      transition: all 0.08s ease;
    }

    .photo-link:hover {
      background: #5c3a22;
      transform: scale(1.04);
    }

    .photo-link:active {
      border-bottom-width: 2px;
      transform: translateY(2px);
      box-shadow: 0 0 0 #2d1e14;
    }

    .choices {
      display: flex;
      flex-direction: column;
      gap: 14px;
      width: 100%;
      max-width: 360px;
      margin: 6px 0 10px;
    }

    .btn {
      background: #4a2f1b;
      border: none;
      border-bottom: 6px solid #2d1e14;
      color: #fdf0d5;
      font-family: 'Press Start 2P', monospace;
      font-size: 16px;
      padding: 16px 20px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.08s ease;
      width: 100%;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 0 #2d1e14;
    }
    .btn:hover { background: #5c3a22; transform: scale(1.02); }
    .btn:active { border-bottom-width: 2px; transform: translateY(4px); box-shadow: 0 0 0 #2d1e14; }

    .retro-divider { margin: 22px 0 12px; width: 100%; border-top: 4px dashed #4a2f1b; opacity: 0.5; }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #4a2f1b;
      letter-spacing: 0.1em;
      opacity: 0.8;
      width: 100%;
      flex-wrap: wrap;
      gap: 8px;
    }

    .music-btn {
      background: #4a2f1b;
      border: none;
      border-bottom: 4px solid #2d1e14;
      color: #fdf0d5;
      font-family: 'Press Start 2P', monospace;
      font-size: 12px;
      padding: 8px 14px;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.08s ease;
      box-shadow: 0 3px 0 #2d1e14;
    }
    .music-btn:hover { background: #5c3a22; transform: scale(1.04); }
    .music-btn:active { border-bottom-width: 2px; transform: translateY(2px); box-shadow: 0 0 0 #2d1e14; }
    .music-btn.on { background: #2d7a3a; border-bottom-color: #1b4d24; }

    @media (max-width: 500px) {
      .game-container { padding: 20px 12px; }
      .scene-text { font-size: 14px; padding: 16px; }
      .btn { font-size: 13px; padding: 14px 16px; }
      .scene-icon { font-size: 72px; }
      .footer { flex-direction: column; align-items: center; gap: 10px; }
      .photo-link { font-size: 12px; padding: 10px 16px; }
    }
  </style>
</head>
<body>

<div class="game-container" id="gameContainer"></div>

<script>
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
      // ССЫЛКА НА ФОТО (откроется в новой вкладке)
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

    // Если есть ссылка — добавляем кликабельный блок
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

    // Обработчики для кнопок выбора
    document.querySelectorAll('.choices .btn').forEach(btn => {
      btn.addEventListener('click', function() {
        playSound('click');
        const nextId = this.dataset.next;
        renderScene(nextId);
      });
    });

    // Музыкальная кнопка
    const musicBtn = document.getElementById('musicToggleBtn');
    if (musicBtn) {
      musicBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMusic(); });
      updateMusicButton();
    }

    // Специальные звуки для сцен
    if (sceneId === 'wrong_bus' || sceneId === 'cheat_fail') {
      setTimeout(() => playSound('fail'), 120);
    } else if (sceneId === 'correct_bus' || sceneId === 'pay_success') {
      setTimeout(() => playSound('success'), 120);
    } else if (sceneId === 'sauce_win') {
      setTimeout(() => playSound('win'), 120);
    }
  }

  // Запуск
  renderScene('start');
</script>

</body>
</html>
