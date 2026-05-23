// БАЗА ЗАДАНИЙ (текст + правильные ответы + тип проверки)
const questionsData = [
    { id: 5,  text: "❖ Задание 5: Стиральная машина с фронтальной загрузкой, вместимостью ≥6 кг. Из таблицы выберите наиболее дешёвый вариант с подключением и доставкой. (Ответ: число рублей)", correct: 29300, type: "number" },
    { id: 6,  text: "❖ Задание 6: Вычислите: 4,6 · 3,4 – 0,34", correct: 15.3, type: "number" },
    { id: 8,  text: "❖ Задание 8: Найдите значение выражения 1/16 · x⁶ · y⁴ при x=2, y=5", correct: 2500, type: "number" },
    { id: 9,  text: "❖ Задание 9: Решите уравнение 4x - 4 = 16 + 2x", correct: 10, type: "number" },
    { id: 10, text: "❖ Задание 10: На тарелке 12 пирожков: 5 с мясом, 4 с капустой, 3 с вишней. Вероятность, что выбранный пирожок с вишней?", correct: 0.25, type: "number" },
    { id: 12, text: "❖ Задание 12: Стоимость поездки C = 150 + 11·(t-5), t=15 минут. Найдите C (руб.)", correct: 260, type: "number" },
    { id: 13, text: "❖ Задание 13: Решите систему неравенств: { 5x+13 ≤ 0, x+5 ≥ 1 }. Выберите интервал.", correct: "A", type: "choice_system", options: ["A) [-4 ; -2,6]", "B) (-∞ ; -2,6]", "C) (-4 ; -2,6)", "D) [-4 ; +∞)"] },
    { id: 14, text: "❖ Задание 14: Масса изотопа уменьшается вдвое каждые 7 минут. Начальная масса 640 мг. Через 42 минуты?", correct: 10, type: "number" },
    { id: 15, text: "❖ Задание 15: Два угла треугольника равны 54° и 58°. Найдите третий угол.", correct: 68, type: "number" },
    { id: 16, text: "❖ Задание 16: Четырёхугольник ABCD описан около окружности, AB=7, BC=10, CD=14. Найдите AD.", correct: 11, type: "number" },
    { id: 17, text: "❖ Задание 17: В прямоугольнике ABCD диагонали пересекаются в O, BO=7, AB=6. Найдите AC.", correct: 14, type: "number" },
    { id: 19, text: "❖ Задание 19: Укажите номера верных утверждений: 1) Если соответственные углы равны 37°, то прямые параллельны. 2) Через любые три точки проходит не более одной прямой. 3) Сумма вертикальных углов =180°", correct: [1,2], type: "checkbox" },
    { id: 20, text: "❖ Задание 20: Решите неравенство x ≤ 9/x (выберите верный промежуток).", correct: "A", type: "choice_ineq", options: ["A) (-∞ ; -3] ∪ (0 ; 3]", "B) [-3; 0) ∪ [3;∞)", "C) (-∞; -3) ∪ (0;3)", "D) [-3;3]"] },
    { id: 21, text: "❖ Задание 21: Автомобилисты: первый постоянная скорость v. Второй первую половину 30 км/ч, вторую на 9 км/ч больше v. Найти скорость первого (км/ч).", correct: 36, type: "number" },
    { id: 22, text: "❖ Задание 22: Функция y = |x²+4x-5|. Какое наибольшее число общих точек с прямой, параллельной оси абсцисс?", correct: 4, type: "number" },
    { id: 23, text: "❖ Задание 23: Основания трапеции 9 и 15. Найдите отрезок, соединяющий середины диагоналей.", correct: 3, type: "number" }
];

let userAnswers = {};

function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    questionsData.forEach(q => {
        const card = document.createElement('div');
        card.className = 'quiz-card';
        card.setAttribute('data-qid', q.id);
        
        const header = document.createElement('div');
        header.className = 'card-header';
        header.innerHTML = `<i class="fas fa-puzzle-piece"></i><h3>Задание №${q.id}</h3>`;
        
        const textDiv = document.createElement('div');
        textDiv.className = 'question-text';
        // Подсказка удалена — только текст вопроса
        textDiv.innerHTML = `<p>${q.text}</p>`;
        
        const inputArea = document.createElement('div');
        inputArea.className = 'input-area';
        
        let inputHtml = '';
        if (q.type === 'number') {
            inputHtml = `<input type="number" step="any" id="input_${q.id}" placeholder="Введите число" class="answer-input" data-id="${q.id}">`;
        } 
        else if (q.type === 'choice_system' || q.type === 'choice_ineq') {
            inputHtml = `<select id="input_${q.id}" class="answer-select" data-id="${q.id}">
                            <option value="">-- Выберите вариант --</option>`;
            q.options.forEach((opt, idx) => {
                const val = String.fromCharCode(65+idx);
                inputHtml += `<option value="${val}">${opt}</option>`;
            });
            inputHtml += `</select>`;
        }
        else if (q.type === 'checkbox') {
            inputHtml = `<div class="options-group checkbox-group" data-id="${q.id}">
                            <label><input type="checkbox" value="1" class="chk_${q.id}"> Утверждение 1</label>
                            <label><input type="checkbox" value="2" class="chk_${q.id}"> Утверждение 2</label>
                            <label><input type="checkbox" value="3" class="chk_${q.id}"> Утверждение 3</label>
                        </div>`;
        }
        
        inputArea.innerHTML = inputHtml;
        card.appendChild(header);
        card.appendChild(textDiv);
        card.appendChild(inputArea);
        
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'result-badge';
        feedbackDiv.id = `fb_${q.id}`;
        card.appendChild(feedbackDiv);
        container.appendChild(card);
    });
    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll('.answer-input').forEach(inp => {
        inp.addEventListener('change', (e) => {
            const id = parseInt(inp.dataset.id);
            let val = inp.value.trim();
            if (val === '') userAnswers[id] = undefined;
            else userAnswers[id] = parseFloat(val);
        });
        const id = parseInt(inp.dataset.id);
        if (userAnswers[id] !== undefined) inp.value = userAnswers[id];
    });
    document.querySelectorAll('.answer-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const id = parseInt(sel.dataset.id);
            userAnswers[id] = sel.value;
        });
        const id = parseInt(sel.dataset.id);
        if (userAnswers[id]) sel.value = userAnswers[id];
    });
    questionsData.forEach(q => {
        if (q.type === 'checkbox') {
            const checkboxes = document.querySelectorAll(`.chk_${q.id}`);
            checkboxes.forEach(cb => {
                cb.addEventListener('change', () => {
                    const selected = Array.from(checkboxes).filter(ch => ch.checked).map(ch => parseInt(ch.value));
                    userAnswers[q.id] = selected.sort((a,b)=>a-b);
                });
            });
            if (userAnswers[q.id] && Array.isArray(userAnswers[q.id])) {
                checkboxes.forEach(cb => {
                    const val = parseInt(cb.value);
                    if (userAnswers[q.id].includes(val)) cb.checked = true;
                });
            }
        }
    });
}

function checkAnswers() {
    let totalCorrect = 0;
    questionsData.forEach(q => {
        let isCorrect = false;
        let userVal = userAnswers[q.id];
        const feedbackSpan = document.getElementById(`fb_${q.id}`);
        
        if (q.type === 'number') {
            if (userVal !== undefined && !isNaN(userVal)) {
                isCorrect = Math.abs(userVal - q.correct) < 0.001;
            }
        } 
        else if (q.type === 'choice_system' || q.type === 'choice_ineq') {
            if (userVal === q.correct) isCorrect = true;
        }
        else if (q.type === 'checkbox') {
            if (Array.isArray(userVal) && userVal.length === q.correct.length &&
                userVal.every((v,idx) => v === q.correct[idx])) {
                isCorrect = true;
            }
        }
        
        if (isCorrect) {
            totalCorrect++;
            if(feedbackSpan) feedbackSpan.innerHTML = '<span class="correct-feedback"><i class="fas fa-check-circle"></i> Верно!</span>';
        } else {
            let correctDisplay = '';
            if (q.type === 'number') correctDisplay = q.correct;
            else if (q.type === 'choice_system' || q.type === 'choice_ineq') correctDisplay = `${q.correct}) ${q.options[q.correct.charCodeAt(0)-65]}`;
            else if (q.type === 'checkbox') correctDisplay = q.correct.join(', ');
            if(feedbackSpan) feedbackSpan.innerHTML = `<span class="wrong-feedback"><i class="fas fa-times-circle"></i> Ошибка. Правильный ответ: ${correctDisplay}</span>`;
        }
    });
    
    const scorePanel = document.getElementById('scorePanel');
    scorePanel.style.display = 'flex';
    document.getElementById('scoreValue').innerText = `${totalCorrect} / ${questionsData.length}`;
    
    let percent = (totalCorrect / questionsData.length) * 100;
    let grade = 2;
    if (percent >= 85) grade = 5;
    else if (percent >= 65) grade = 4;
    else if (percent >= 45) grade = 3;
    
    let gradeText = grade === 5 ? 'Отлично (5) ✨' : grade === 4 ? 'Хорошо (4) 📘' : grade === 3 ? 'Удовлетворительно (3) 📝' : 'Неудовлетворительно (2) 📖';
    document.getElementById('gradeMessage').innerHTML = `<i class="fas fa-star"></i> ${gradeText}`;
    
    const perfectDiv = document.getElementById('perfectBonus');
    if (totalCorrect === questionsData.length) {
        perfectDiv.innerHTML = '<span style="background:gold; padding:0.4rem 1rem; border-radius:2rem;">🏆 АБСОЛЮТНЫЙ РЕЗУЛЬТАТ! 🎉</span>';
        triggerConfetti();
    } else {
        perfectDiv.innerHTML = '';
    }
    scorePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function triggerConfetti() {
    if (window.confetti) {
        window.confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, startVelocity: 20 });
    } else {
        for(let i=0;i<80;i++) {
            const conf = document.createElement('div');
            conf.style.position='fixed';
            conf.style.width='10px'; conf.style.height='10px';
            conf.style.background=`hsl(${Math.random()*360}, 80%, 60%)`;
            conf.style.left=Math.random()*100+'%';
            conf.style.top='-10px';
            conf.style.borderRadius='50%';
            conf.style.pointerEvents='none';
            conf.style.zIndex='10000';
            document.body.appendChild(conf);
            conf.animate([{transform:'translateY(0) rotate(0deg)', opacity:1},{transform:`translateY(${window.innerHeight+50}px) rotate(720deg)`, opacity:0}],{duration:1500, easing:'cubic-bezier(0.2,0.9,0.4,1)'});
            setTimeout(()=>conf.remove(),1500);
        }
    }
}

function resetAnswers() {
    userAnswers = {};
    document.querySelectorAll('.answer-input').forEach(inp => { inp.value = ''; });
    document.querySelectorAll('.answer-select').forEach(sel => { sel.value = ''; });
    questionsData.forEach(q => {
        if (q.type === 'checkbox') {
            document.querySelectorAll(`.chk_${q.id}`).forEach(cb => cb.checked = false);
        }
        const fb = document.getElementById(`fb_${q.id}`);
        if (fb) fb.innerHTML = '';
    });
    document.getElementById('scorePanel').style.display = 'none';
    document.getElementById('perfectBonus').innerHTML = '';
}

window.onload = () => {
    renderQuestions();
    if (!window.confetti) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1';
        script.onload = () => { window.confetti = canvasConfetti; };
        document.head.appendChild(script);
    }
    document.getElementById('checkBtn').addEventListener('click', checkAnswers);
    document.getElementById('resetBtn').addEventListener('click', resetAnswers);
};
// Генерация плана квартиры (сетка 5x5)
function generatePlan() {
    const grid = document.getElementById('planGrid');
    if (!grid) return;
    // Координаты комнат (условные, на основе описания из PDF)
    // 0,0 – верхний левый угол. Коридор: (0,1)-(1,3), санузел (0,0)-(1,1)
    // кладовая (4,0)-(4,1), спальня (3,0)-(4,2), гостиная (2,2)-(4,4), кухня (1,2)-(2,4)
    // лоджии: от спальни (3,5??) – упростим: добавим отдельные клетки справа
    // Так как сетка 5x5, лоджии вынесем за пределы? Сделаем проще: выделим зоны.
    const rooms = {
        'коридор': [[0,1],[0,2],[0,3],[1,1],[1,3]],
        'санузел': [[0,0],[1,0]],
        'кладовая': [[4,0],[4,1]],
        'спальня': [[3,0],[3,1],[4,2]],
        'гостиная': [[2,2],[2,3],[2,4],[3,2],[3,3],[3,4],[4,3],[4,4]],
        'кухня': [[1,2],[1,4],[2,2],[2,4]],
        'лоджия1': [[5,0],[5,1]], // условно добавим колонку справа
        'лоджия2': [[5,2],[5,3]]
    };
    // строим сетку 6x5 (6 столбцов)
    grid.style.gridTemplateColumns = 'repeat(6, 60px)';
    grid.style.gridTemplateRows = 'repeat(5, 60px)';
    for(let i=0; i<5; i++) {
        for(let j=0; j<6; j++) {
            const cell = document.createElement('div');
            cell.className = 'plan-cell';
            let roomName = '';
            for(let [name, coords] of Object.entries(rooms)) {
                if(coords.some(c => c[0]===j && c[1]===i)) {
                    roomName = name;
                    break;
                }
            }
            if(roomName === 'коридор') cell.style.background = '#b8e1ff';
            else if(roomName === 'санузел') cell.style.background = '#ffb3ba';
            else if(roomName === 'кладовая') cell.style.background = '#c5e0b4';
            else if(roomName === 'спальня') cell.style.background = '#ffd966';
            else if(roomName === 'гостиная') cell.style.background = '#b5a1e5';
            else if(roomName === 'кухня') cell.style.background = '#f7b977';
            else if(roomName.startsWith('лоджия')) cell.style.background = '#a9d08e';
            else cell.style.background = '#e9e9e9';
            cell.textContent = roomName.substring(0,3);
            grid.appendChild(cell);
        }
    }
}

// Данные заданий (расширенные)
const questionsData = [
    { id: 1, text: "Задание 1. По плану определите цифры объектов: коридор, кладовая, спальня, гостиная. Введите последовательность из 4 цифр (например, 1234)", correct: "2314", type: "string" }, // условные цифры
    { id: 2, text: "Задание 2. Санузел имеет размер 3×2 клетки (сторона клетки 0,4 м). Плитка 40×40 см, в упаковке 12 шт. Сколько упаковок нужно для пола санузла?", correct: 2, type: "number" },
    { id: 3, text: "Задание 3. Найдите площадь санузла (в м²). (Размеры санузла 3×2 клетки = 1,2×0,8 м)", correct: 0.96, type: "number" },
    { id: 4, text: "Задание 4. Площадь кухни (клетки 3×2 = 1,2×0,8 м, фактически 4 клетки? Уточним: по плану кухня = 2×2 клетки? Возьмём 2×2 клетки = 0,8×0,8=0,64 м², кладовая 1×1 клетка = 0,16 м². На сколько процентов площадь кухни больше кладовой? (округлите до целых)", correct: 300, type: "number" },
    { id: 5, text: "Задание 5. Стиральная машина с фронтальной загрузкой, вместимостью ≥6 кг. Наиболее дешёвый вариант с подключением и доставкой (цена в рублях).", correct: 29300, type: "number" },
    { id: 6,  text: "Задание 6. Вычислите: 4,6 · 3,4 – 0,34", correct: 15.3, type: "number" },
    { id: 8,  text: "Задание 8. Найдите значение выражения 1/16 · x⁶ · y⁴ при x=2, y=5", correct: 2500, type: "number" },
    { id: 9,  text: "Задание 9. Решите уравнение 4x - 4 = 16 + 2x", correct: 10, type: "number" },
    { id: 10, text: "Задание 10. Вероятность пирожка с вишней (3 из 12)", correct: 0.25, type: "number" },
    { id: 11, text: "Задание 11. Установите соответствие между функциями и графиками (A, Б, В). Графики нарисованы ниже. Введите ответ в виде трёх цифр (например, 132).", correct: "312", type: "string", graph: true },
    { id: 12, text: "Задание 12. Стоимость поездки C = 150 + 11·(t-5), t=15", correct: 260, type: "number" },
    { id: 13, text: "Задание 13. Решите систему неравенств. Выберите вариант A, B, C, D", correct: "A", type: "choice_system", options: ["A) [-4;-2,6]", "B) (-∞;-2,6]", "C) (-4;-2,6)", "D) [-4;+∞)"] },
    { id: 14, text: "Задание 14. Радиоактивный изотоп: масса 640 мг, период 7 мин. Через 42 мин?", correct: 10, type: "number" },
    { id: 15, text: "Задание 15. Третий угол треугольника: 54° и 58°", correct: 68, type: "number" },
    { id: 16, text: "Задание 16. Четырёхугольник описан около окружности: AB=7, BC=10, CD=14. AD=?", correct: 11, type: "number" },
    { id: 17, text: "Задание 17. Прямоугольник: BO=7, AB=6. AC=?", correct: 14, type: "number" },
    { id: 19, text: "Задание 19. Верные утверждения (выберите номера через пробел или запятую)", correct: "1,2", type: "checkbox", options: ["1", "2", "3"] },
    { id: 20, text: "Задание 20. Решите неравенство x ≤ 9/x. Выберите вариант.", correct: "A", type: "choice_ineq", options: ["A) (-∞ ; -3] ∪ (0 ; 3]", "B) [-3;0)∪[3;∞)", "C) (-∞;-3)∪(0;3)", "D) [-3;3]"] },
    { id: 21, text: "Задание 21. Скорость первого автомобилиста (км/ч)", correct: 36, type: "number" },
    { id: 22, text: "Задание 22. График y=|x²+4x-5|. Наибольшее число общих точек с прямой, параллельной оси абсцисс.", correct: 4, type: "number" },
    { id: 23, text: "Задание 23. Отрезок, соединяющий середины диагоналей трапеции (основания 9 и 15).", correct: 3, type: "number" }
];

let userAnswers = {};

function renderGraphs() {
    const graphContainer = document.querySelector(`.quiz-card[data-qid="11"] .input-area`);
    if(!graphContainer) return;
    const graphDiv = document.createElement('div');
    graphDiv.className = 'graph-group';
    // Три графика: парабола, прямая, гипербола
    const funcs = [
        { f: (x) => -x*x - x + 5, name: 'y = -x² - x + 5', color: 'red' },
        { f: (x) => -0.75*x - 1, name: 'y = -3/4 x - 1', color: 'blue' },
        { f: (x) => -12/x, name: 'y = -12/x', color: 'green' }
    ];
    funcs.forEach((func, idx) => {
        const canvas = document.createElement('canvas');
        canvas.width = 250;
        canvas.height = 250;
        canvas.className = 'graph-canvas';
        const ctx = canvas.getContext('2d');
        drawGraph(ctx, func.f, func.color, func.name);
        const item = document.createElement('div');
        item.className = 'graph-item';
        item.appendChild(canvas);
        graphDiv.appendChild(item);
    });
    graphContainer.appendChild(graphDiv);
}

function drawGraph(ctx, fn, color, name) {
    const w = ctx.canvas.width, h = ctx.canvas.height;
    ctx.clearRect(0,0,w,h);
    ctx.beginPath();
    ctx.strokeStyle = '#ccc';
    for(let i=0; i<=w; i+=25) { ctx.moveTo(i,0); ctx.lineTo(i,h); ctx.moveTo(0,i); ctx.lineTo(w,i); }
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(w/2,0); ctx.lineTo(w/2,h); ctx.moveTo(0,h/2); ctx.lineTo(w,h/2);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    let first = true;
    for(let px=0; px<=w; px++) {
        let x = (px - w/2) / 20;
        let y = fn(x);
        let py = h/2 - y*20;
        if(py>=0 && py<=h) {
            if(first) { ctx.moveTo(px, py); first=false; }
            else ctx.lineTo(px, py);
        } else { first=true; ctx.beginPath(); }
    }
    ctx.stroke();
}

// Рендер всех вопросов (адаптирован)
function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    questionsData.forEach(q => {
        const card = document.createElement('div');
        card.className = 'quiz-card';
        card.setAttribute('data-qid', q.id);
        const header = document.createElement('div');
        header.className = 'card-header';
        header.innerHTML = `<i class="fas fa-puzzle-piece"></i><h3>Задание №${q.id}</h3>`;
        const textDiv = document.createElement('div');
        textDiv.className = 'question-text';
        textDiv.innerHTML = `<p>${q.text}</p>`;
        const inputArea = document.createElement('div');
        inputArea.className = 'input-area';
        let inputHtml = '';
        if (q.type === 'number') {
            inputHtml = `<input type="number" step="any" id="input_${q.id}" placeholder="Введите число" class="answer-input" data-id="${q.id}">`;
        } else if (q.type === 'choice_system' || q.type === 'choice_ineq') {
            inputHtml = `<select id="input_${q.id}" class="answer-select" data-id="${q.id}"><option value="">--Выберите--</option>${q.options.map(opt=>`<option value="${opt[0]}">${opt}</option>`).join('')}</select>`;
        } else if (q.type === 'checkbox') {
            inputHtml = `<div><label><input type="checkbox" value="1" class="chk_${q.id}"> Утверждение 1</label><br><label><input type="checkbox" value="2" class="chk_${q.id}"> Утверждение 2</label><br><label><input type="checkbox" value="3" class="chk_${q.id}"> Утверждение 3</label></div>`;
        } else if (q.type === 'string') {
            inputHtml = `<input type="text" id="input_${q.id}" placeholder="Введите ответ" class="answer-input" data-id="${q.id}">`;
        }
        inputArea.innerHTML = inputHtml;
        card.appendChild(header); card.appendChild(textDiv); card.appendChild(inputArea);
        const feedbackDiv = document.createElement('div'); feedbackDiv.className = 'result-badge'; feedbackDiv.id = `fb_${q.id}`;
        card.appendChild(feedbackDiv);
        container.appendChild(card);
        if (q.graph) renderGraphs();
    });
    attachEventListeners();
}

function attachEventListeners() { /* как ранее, с сохранением в userAnswers */ 
    document.querySelectorAll('.answer-input, .answer-select').forEach(el => {
        el.addEventListener('change', () => {
            const id = parseInt(el.dataset.id);
            if (el.type === 'checkbox') return;
            userAnswers[id] = el.value;
        });
    });
    questionsData.forEach(q => {
        if (q.type === 'checkbox') {
            const cbs = document.querySelectorAll(`.chk_${q.id}`);
            cbs.forEach(cb => cb.addEventListener('change', () => {
                const selected = Array.from(cbs).filter(c=>c.checked).map(c=>c.value);
                userAnswers[q.id] = selected.join(',');
            }));
        }
    });
}

function checkAnswers() {
    let total = 0;
    questionsData.forEach(q => {
        let user = userAnswers[q.id];
        let correct = q.correct;
        let ok = false;
        if (q.type === 'number') ok = Math.abs(parseFloat(user) - correct) < 0.001;
        else if (q.type === 'checkbox') ok = (user === correct);
        else if (q.type === 'string') ok = (user === correct);
        else if (q.type === 'choice_system' || q.type === 'choice_ineq') ok = (user === correct);
        if (ok) total++;
        const fb = document.getElementById(`fb_${q.id}`);
        if(fb) fb.innerHTML = ok ? '<span class="correct-feedback">✓ Верно</span>' : `<span class="wrong-feedback">✗ Ошибка (ответ: ${correct})</span>`;
    });
    document.getElementById('scorePanel').style.display = 'flex';
    document.getElementById('scoreValue').innerText = `${total} / ${questionsData.length}`;
    let percent = total/questionsData.length*100;
    let grade = percent>=85?5: percent>=65?4: percent>=45?3:2;
    document.getElementById('gradeMessage').innerHTML = `Оценка: ${grade} ${grade===5?'✨':grade===4?'📘':'📝'}`;
    if(total===questionsData.length) triggerConfetti();
}

function resetAnswers() { location.reload(); } // проще сбросить перезагрузкой

window.onload = () => {
    generatePlan();
    renderQuestions();
    document.getElementById('checkBtn').onclick = checkAnswers;
    document.getElementById('resetBtn').onclick = resetAnswers;
    if (!window.confetti) { const s = document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/canvas-confetti@1'; s.onload=()=>window.confetti=canvasConfetti; document.head.appendChild(s); }
};
