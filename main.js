const quizData = [
  {
    question: '1. Dimanakah Ibukota Indonesia ?',
    options: ['Samarinda', 'Bandung', 'Jakarta', 'Surabaya'],
    answer: 'Jakarta',
  },
  {
    question: '2. Apa bahasa inggrisnya Harimau ? ',
    options: ['Bird', 'Bug', 'Lion', 'Tiger'],
    answer: 'Tiger',
  },
  {
    question: '3. Dimanakah Ibu Kota Jepang ?',
    options: ['Fukushima', 'Kyoto', 'Hiroshima', 'Tokyo'],
    answer: 'Tokyo',
  },
  {
    question: '4. Berapakah hasil dari 5 + 10 x 2 ?',
    options: ['150', '35', '77', '25'],
    answer: '25',
  },
  {
    question: '5. Dimanakah Candi Borobudur Berada ?',
    options: [
      'Yogyakarta, Jawa Tengah',
      'Bandung, Jawa Barat',
      'Surabaya, Jawa Timur',
      'Ibukota Jakarta',
    ],
    answer: 'Yogyakarta, Jawa Tengah',
  },
  {
    question: '6. Apa mata uangnya Indonesia ? ',
    options: ['Yen', 'Euro', 'Dollar', 'Rupiah'],
    answer: 'Rupiah',
  },
  {
    question: '7. Siapakah Presiden pertama Indonesia ?',
    options: [
      'Soekarno',
      'Prabowo',
      'Susilo Bambang Yudhoyono',
      'Hatta',
    ],
    answer: 'Soekarno',
  },
  {
    question: '8. Berapakah hasil dari 3 - 10 + 5 ?',
    options: ['-10', '25', '15', '-2'],
    answer: '-2',
  },
  {
    question: '9. Apa bahasa inggrisnya Keju ? ',
    options: [
      'Cheese',
      'Apple',
      'Orange',
      'Milk',
    ],
    answer: 'Cheese',
  },
  {
    question: '10. Apa bahasa inggrisnya warna merah ? ',
    options: ['Black', 'Blue', 'Yellow', 'Red'],
    answer: 'Red',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
