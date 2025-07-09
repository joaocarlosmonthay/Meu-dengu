document.addEventListener('DOMContentLoaded', () => {
    // Referência aos botões que iniciam os jogos
    const startGameButtons = document.querySelectorAll('.start-game-button');

    // Adiciona event listener a todos os botões de iniciar/novo jogo
    startGameButtons.forEach(button => {
        button.addEventListener('click', () => {
            const gameType = button.dataset.game; // Pega o tipo de jogo do data-game
            if (gameType === 'quiz') {
                initQuizGame();
            } else if (gameType === 'word-guess') {
                initWordGuessGame();
            } else if (gameType === 'truth-dare') {
                initTruthDareGame();
            }
        });
    });

    // --- Quiz: O Quanto Você Me Conhece? ---
    const quizGameContainer = document.getElementById('quiz-game');
    const quizQuestions = [
        {
            question: "Qual é o meu filme favorito para assistir com você?",
            options: ["A. Comédia Romântica", "B. Ação", "C. Desenho Animado", "D. Terror"],
            answer: "A. Comédia Romântica"
        },
        {
            question: "Qual é o meu prato favorito que você cozinha (ou comeria comigo)?",
            options: ["A. Macarrão", "B. Pizza", "C. Brigadeiro", "D. Feijoada"],
            answer: "C. Brigadeiro"
        },
        {
            question: "Se eu pudesse ter um superpoder, qual seria?",
            options: ["A. Voar", "B. Ler mentes", "C. Teletransporte", "D. Ser invisível"],
            answer: "C. Teletransporte"
        },
        {
            question: "Qual é a cor que mais me lembra você?",
            options: ["A. Azul Céu", "B. Rosa Chiclete", "C. Amarelo Sol", "D. Roxo Lavanda"],
            answer: "A. Azul Céu"
        },
        {
            question: "Qual é o nosso lugar favorito para ir juntinhos?",
            options: ["A. Cinema", "B. Bobs", "C. Sorveteria", "D. Qualquer lugar com você"],
            answer: "D. Qualquer lugar com você"
        }
    ];
    let currentQuestionIndex = 0;
    let score = 0;

    function initQuizGame() {
        quizGameContainer.innerHTML = '';
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const q = quizQuestions[currentQuestionIndex];
            quizGameContainer.innerHTML = `
                <div class="quiz-question">${currentQuestionIndex + 1}. ${q.question}</div>
                <div class="quiz-options">
                    ${q.options.map(option => `<button data-option="${option}">${option}</button>`).join('')}
                </div>
            `;
            quizGameContainer.querySelectorAll('.quiz-options button').forEach(button => {
                button.addEventListener('click', checkAnswer);
            });
        } else {
            quizGameContainer.innerHTML = `
                <h3>Quiz Feituuuuuu! 🎉</h3>
                <p>Você acertou ${score} de ${quizQuestions.length} perguntinhaaas!</p>
                <p>${score === quizQuestions.length ? 'Uau! Você me conhece demais! 🤍' : 'Você foi incrível! Vamuus jogarr dinovuuu? 🤍'}</p>
            `;
            // Não recria o botão "Jogar Novamente" aqui, ele já existe no HTML
        }
    }

    function checkAnswer(event) {
         const selectedOption = event.target.dataset.option;
        const correctAnswer = quizQuestions[currentQuestionIndex].answer;
        const buttons = quizGameContainer.querySelectorAll('.quiz-options button');

        buttons.forEach(button => {
            button.disabled = true; // Desabilita todos os botões após a escolha
            if (button.dataset.option === correctAnswer) {
                button.classList.add('correct');
            } else if (button.dataset.option === selectedOption) {
                button.classList.add('incorrect');
            }
        });

        if (selectedOption === correctAnswer) {
            score++;
        }

        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 1500);
    }

    // --- Jogo: Qual a Palavra do Nosso Amor? ---
    const wordGuessContainer = document.getElementById('word-guess-game');
    const wordDisplay = document.getElementById('word-display');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const guessMessage = document.getElementById('guess-message');
    const attemptsLeftSpan = document.getElementById('attempts-left');

    const secretWords = ["AMOR", "CARINHO", "SAUDADE", "SONHO", "ABRAÇO", "FORÇA DE VONTADE", "ALMA", "BEIJO", "FELICIDADE"];
    let selectedWord = '';
    let guessedLetters = [];
    let attempts = 6;

    function initWordGuessGame() {
        selectedWord = secretWords[Math.floor(Math.random() * secretWords.length)].toUpperCase();
        guessedLetters = [];
        attempts = 6;
        guessInput.value = '';
        guessMessage.textContent = '';
        updateWordDisplay();
        updateAttemptsDisplay();
        guessButton.disabled = false;
        guessInput.disabled = false;
        guessInput.focus();
    }

    function updateWordDisplay() {
        wordDisplay.innerHTML = selectedWord
            .split('')
            .map(letter => (guessedLetters.includes(letter) ? letter : ' _ '))
            .join('');
        checkWinCondition();
    }

    function updateAttemptsDisplay() {
        attemptsLeftSpan.textContent = attempts;
    }

    function handleGuess() {
        const guess = guessInput.value.toUpperCase();
        guessInput.value = '';

        if (guess.length !== 1 || !/[A-Z]/.test(guess)) {
            guessMessage.textContent = "Puufaavaoo, digitaa outra letrinhaaa ";
            return;
        }

        if (guessedLetters.includes(guess)) {
            guessMessage.textContent = `Você já tentou essa letrinhaa "${guess}"!`;
            return;
        }

        guessedLetters.push(guess);

        if (selectedWord.includes(guess)) {
            guessMessage.textContent = `EBBBBAAAAA A letrinhaa "${guess}" está na palavraaa! 🤍`;
        } else {
            attempts--;
            guessMessage.textContent = `NOOOOOT A letrinhaa "${guess}" não está na palavra. 😔`;
        }
        updateWordDisplay();
        updateAttemptsDisplay();
        checkLoseCondition();
    }

    function checkWinCondition() {
        if (!wordDisplay.textContent.includes('_')) {
            guessMessage.textContent = `Parabeeeennnnsss! Você descobriu a palavra: "${selectedWord}" momooooo! 🎉`;
            guessButton.disabled = true;
            guessInput.disabled = true;
        }
    }

    function checkLoseCondition() {
        if (attempts <= 0) {
            guessMessage.textContent = `noooooooo😭! Suas tentativas acabaraam. A palavrinhaaa era: "${selectedWord}". 😭😭`;
            guessButton.disabled = true;
            guessInput.disabled = true;
        }
    }

    guessButton.addEventListener('click', handleGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGuess();
        }
    });


    // --- Jogo: Verdade ou Desafio Fofo? ---
    const truthDareContainer = document.getElementById('truth-dare-game');
    const tdPrompt = document.getElementById('td-prompt');
    const truthButton = document.getElementById('truth-button');
    const dareButton = document.getElementById('dare-button');

    const truths = [
        "Qual a sua memória favorita de nós dois até hoje?",
        "Qual a coisa mais fofa que você já pensou sobre mim?",
        "Se pudéssemos estar juntos agora, o que faríamos de mais romântico?",
        "Qual o seu maior sonho para o nosso futuro juntos?",
        "O que você mais ama na nossa relação à distância?",
        "Qual música te faz pensar mais em mim?",
        "Se pudesse me dar um conselho sobre qualquer coisa, qual seria?",
        "O que você mais sente falta de fazer comigo pessoalmente?",
        "Qual é o seu apelido fofo favorito para mim?",
        "Qual foi a última vez que sorriu só de pensar em mim?",
        "Se pudéssemos ter um superpoder juntos, qual seria e por quê?",
        "Qual o lugar no mundo que você mais sonha em visitar comigo?"
    ];

    const dares = [
        "Me envie 5 emojis que descrevem como você se sente agora.",
        "Grave um áudio cantando um trecho da nossa música favorita para mim.",
        "Escreva uma mini declaração de amor com 30 segundos para me enviar.",
        "Mande uma foto do seu sorriso mais lindo AGORA.",
        "Me conte uma piada para me fazer rir (pode ser ruim!).",
        "Grave um vídeo mandando um beijo para a câmera.",
        "Me descreva em 3 palavras sem usar 'lindo(a)' ou 'perfeito(a)'.",
        "Mande um áudio imitando o seu animal favorito.",
        "Escreva um haicai (3 linhas: 5-7-5 sílabas) sobre o nosso amor.",
        "Grave um vídeo dizendo 'Eu te amo' em uma língua diferente.",
        "Me mande uma foto do céu/vista de onde você está agora.",
        "Faça um desenho rápido e fofo de nós dois (pode ser boneco de palito!)."
    ];

    function initTruthDareGame() {
        tdPrompt.textContent = "Escolha: Verdade ou Desafio Fofo?";
        truthButton.style.display = 'inline-block';
        dareButton.style.display = 'inline-block';
        truthButton.disabled = false; // Habilita os botões
        dareButton.disabled = false;
    }

    function getRandomTruth() {
        return truths[Math.floor(Math.random() * truths.length)];
    }

    function getRandomDare() {
        return dares[Math.floor(Math.random() * dares.length)];
    }

    truthButton.addEventListener('click', () => {
        tdPrompt.textContent = `Verdade: ${getRandomTruth()}`;
        truthButton.disabled = true; // Desabilita após a escolha
        dareButton.disabled = true;
    });

    dareButton.addEventListener('click', () => {
        tdPrompt.textContent = `Desafio Fofo: ${getRandomDare()}`;
        truthButton.disabled = true; // Desabilita após a escolha
        dareButton.disabled = true;
    });


    // --- Roda do Amor à Distância! ---
    const spinWheelCanvas = document.getElementById('wheelCanvas');
    const spinButton = document.getElementById('spin-button');
    const wheelResult = document.getElementById('wheel-result');
    const ctx = spinWheelCanvas.getContext('2d');

    const distanceActivities = [
        "Chamada de vídeo longa e especial 📞🤍",
        "Noite de filmeeeeesss 🎬🍿",
        "Jogar um joguinhuuu onlineee🎮",
        "Trocar cartinhaas de amor 💌",
        "Planejar nosso próximo encontro dos sonhos ✈️",
        "Cantar um karaokê  🎤🎶",
        "Desafio de 'quem cozinha o quê' e mostrar o resultado 🧑‍🍳",
        "Contar 3 coisas que amamos um no outro 🤍",
        "Fazer uma playlist 'para quando a saudade vim forti' 🎧",
        "Fazer um tour  pela sua casaaa 🏠",
        "Ler um livro ou história juntinhuuus 📖",
        "Mandar uma foto do seu look do dia mais estilosooo 👗👔",
        "Escrever uma carta de amor agora e ler um para o outro 🤍",
        "Falaaar o que você mais gosta no meu cheiro 🤍👃"
    ];

    const arc = Math.PI / (distanceActivities.length / 2);
    let startAngle = 0;
    const colors = [
        "#ffccbc", "#ffecb3", "#dcedc8", "#bbdefb", "#f8bbd0", "#cfd8dc",
        "#ffe0b2", "#c8e6c9", "#a7d9f7", "#e1bee7", "#f0f4c3", "#b2dfdb",
        "#ff99cc", "#c3e6cb", "#aed581", "#81c784", "#e6ee9c", "#fff59d"
    ];

    function drawWheel() {
        ctx.clearRect(0, 0, spinWheelCanvas.width, spinWheelCanvas.height);
        for (let i = 0; i < distanceActivities.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = colors[i % colors.length];
            ctx.beginPath();
            ctx.arc(200, 200, 200, angle, angle + arc, false);
            ctx.lineTo(200, 200);
            ctx.fill();

            // Desenha as bordas dos segmentos
            ctx.strokeStyle = '#fff'; // Cor da borda
            ctx.lineWidth = 2; // Largura da borda
            ctx.beginPath();
            ctx.arc(200, 200, 200, angle, angle + arc, false);
            ctx.lineTo(200, 200);
            ctx.closePath();
            ctx.stroke();

            ctx.save();
            ctx.translate(200 + Math.cos(angle + arc / 2) * 150, 200 + Math.sin(angle + arc / 2) * 150);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            ctx.textAlign = "center";
            ctx.fillStyle = "#333"; // Cor do texto dos itens da roda
            ctx.font = "14px 'Quicksand', sans-serif";
            ctx.fillText(distanceActivities[i], 0, 0);
            ctx.restore();
        }

        // Desenha o pino indicador
        ctx.fillStyle = "#e91e63"; // Cor do pino
        ctx.beginPath();
        ctx.moveTo(200 - 15, 0); // Ajuste a posição para o topo da roda
        ctx.lineTo(200 + 15, 0);
        ctx.lineTo(200, 30);
        ctx.closePath();
        ctx.fill();
    }

    let spinTimeout = null;
    let spinAngleStart = 10;
    let spinTime = 0;
    let spinTimeTotal = 0;

    function rotateWheel() {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawWheel();
        spinTimeout = setTimeout(rotateWheel, 30);
    }

    function stopRotateWheel() {
        clearTimeout(spinTimeout);
        // Calcula o índice do item sorteado com base no ângulo final
        const degrees = (startAngle * 180 / Math.PI) % 360;
        const arcd = arc * 180 / Math.PI;
        // Invertemos a lógica para corresponder ao pino no topo (0 graus)
        let index = Math.floor((360 - (degrees + 270) % 360) / arcd) % distanceActivities.length;
        if (index < 0) index += distanceActivities.length; // Garante índice positivo
        wheelResult.textContent = `Que fofo! Vamos: ${distanceActivities[index]}!`;
        spinButton.disabled = false;
    }

    function easeOut(t, b, c, d) {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

    spinButton.addEventListener('click', () => {
        spinButton.disabled = true;
        wheelResult.textContent = 'RodaRoda...';
        spinTime = 0;
        spinTimeTotal = Math.random() * 3000 + 4000; // Tempo de giro entre 4 a 7 segundos
        spinAngleStart = Math.random() * 10 + 10; // Velocidade inicial do giro
        rotateWheel();
    });

    // Inicializa o jogo da roda assim que a página carrega, para que ela apareça desenhada.
    drawWheel();
    // Você pode chamar as funções init de outros jogos aqui se quiser que eles já apareçam iniciados.
    // Ex: initQuizGame();
    // Ex: initWordGuessGame();
    // Ex: initTruthDareGame();
});