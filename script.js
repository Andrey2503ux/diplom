<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мини-игра</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #222;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            overflow: hidden;
        }
        
        #game-area {
            text-align: center;
            width: 400px;
            height: 400px;
            border: 2px dashed #555;
            position: relative;
            background-color: #333;
            border-radius: 20px;
        }
        
        #score-text {
            position: absolute;
            top: 20px;
            width: 100%;
            font-size: 24px;
            font-weight: bold;
            pointer-events: none;
        }

        #click-btn {
            position: absolute;
            padding: 15px 30px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            transition: transform 0.1s;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        
        #click-btn:active {
            transform: translate(-50%, -50%) scale(0.9);
        }

        #prize {
            display: none;
            text-align: center;
            background-color: #444;
            padding: 20px;
            border-radius: 20px;
            animation: popIn 0.5s ease-out;
            max-width: 500px;
        }

        #prize img {
            max-width: 100%;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(255,215,0,0.8);
            margin-top: 10px;
        }

        h2 {
            margin-top: 0;
        }

        @keyframes popIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    </style>
</head>
<body>

    <div id="game-area">
        <p id="score-text">Счёт: 0 / 10</p>
        <button id="click-btn">Жми!</button>
    </div>

    <div id="prize">
        <h2>Ура! Ты победил! 🎉</h2>
        <p>Вот твоя награда:</p>
        <!-- ССЫЛКА УЖЕ ВСТАВЛЕНА -->
        <img src="https://drive.google.com/thumbnail?id=1nQAWnM5SLzorfVJRdyThF7QRfQPJXlGH&sz=w1000" alt="Твоя награда">
    </div>

    <script>
        let score = 0;
        const target = 10; // Можно поменять количество кликов
        const btn = document.getElementById('click-btn');
        const gameArea = document.getElementById('game-area');
        const scoreText = document.getElementById('score-text');
        const prize = document.getElementById('prize');

        btn.addEventListener('click', () => {
            score++;
            scoreText.textContent = `Счёт: ${score} / ${target}`;

            // Победа!
            if (score >= target) {
                gameArea.style.display = 'none';
                prize.style.display = 'block';
            } else {
                moveButton(); // Кнопка убегает
            }
        });

        function moveButton() {
            const areaWidth = gameArea.clientWidth;
            const areaHeight = gameArea.clientHeight;
            const btnWidth = btn.clientWidth;
            const btnHeight = btn.clientHeight;

            // Случайная позиция внутри игрового поля
            const maxX = areaWidth - btnWidth;
            const maxY = areaHeight - btnHeight;

            // Ставим кнопку в случайное место
            btn.style.left = Math.random() * maxX + 'px';
            btn.style.top = Math.random() * maxY + 'px';
        }
    </script>

</body>
</html>
