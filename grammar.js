document.addEventListener('DOMContentLoaded', () => {
    const dom = {
        progress: document.getElementById('progress'),
        sentence: document.getElementById('sentence'),
        choices: document.getElementById('choices'),
        feedback: document.getElementById('feedback'),
        categoryDisplay: document.getElementById('category-display'),
        quizView: document.getElementById('quiz-view'),
        resultsContainer: document.getElementById('results-container'),
        score: document.getElementById('score'),
        reviewSection: document.getElementById('review-section'),
        restartBtn: document.getElementById('restart-btn'),
        retryGrammarBtn: document.getElementById('retry-grammar-btn'),
        endGrammarBtn: document.getElementById('end-grammar-btn'),
        grammarSetup: document.getElementById('grammar-setup'),
        startGrammarBtn: document.getElementById('start-grammar-btn'),
        startQuickTestBtn: document.getElementById('start-quick-test-btn'),
        grammarTimerToggle: document.getElementById('grammar-timer-toggle'),
        grammarTimerContainer: document.getElementById('grammar-timer-container'),
        grammarTimerInput: document.getElementById('grammar-timer-input'),
        grammarTimerDisplay: document.getElementById('grammar-timer-display'),

        // Cognitive Test Elements
        cognitiveSetup: document.getElementById('cognitive-setup'),
        startCognitiveBtn: document.getElementById('start-cognitive-btn'),
        timerInput: document.getElementById('timer-input'),
        questionCountInput: document.getElementById('question-count-input'),
        cognitiveQuizView: document.getElementById('cognitive-quiz-view'),
        cognitiveProgress: document.getElementById('cognitive-progress'),
        timerDisplay: document.getElementById('timer'),
        cognitiveQuestion: document.getElementById('cognitive-question'),
        cognitiveChoices: document.getElementById('cognitive-choices'),
        cognitiveResultsContainer: document.getElementById('cognitive-results-container'),
        cognitiveScore: document.getElementById('cognitive-score'),
        cognitiveReviewSection: document.getElementById('cognitive-review-section'),
        restartCognitiveBtn: document.getElementById('restart-cognitive-btn'),
        retryCognitiveBtn: document.getElementById('retry-cognitive-btn'),
        endCognitiveBtn: document.getElementById('end-cognitive-btn'),

        // Typing Test Elements
        typingSetup: document.getElementById('typing-setup'),
        typingTestType: document.getElementById('typing-test-type'),
        typingTimerInput: document.getElementById('typing-timer-input'),
        continuousTypingContainer: document.getElementById('continuous-typing-container'),
        continuousTypingToggle: document.getElementById('continuous-typing-toggle'),
        showGuideToggle: document.getElementById('show-guide-toggle'),
        showStatsToggle: document.getElementById('show-stats-toggle'),
        startTypingBtn: document.getElementById('start-typing-btn'),
        typingTestView: document.getElementById('typing-test-view'),
        typingStats: document.getElementById('typing-stats'),
        typingTimer: document.getElementById('typing-timer'),
        typingWpm: document.getElementById('typing-wpm'),
        typingAccuracy: document.getElementById('typing-accuracy'),
        typingTextContainer: document.getElementById('typing-text-container'),
        typingInput: document.getElementById('typing-input'),
        typingResultsContainer: document.getElementById('typing-results-container'),
        typingFinalWpm: document.getElementById('typing-final-wpm'),
        typingFinalAccuracy: document.getElementById('typing-final-accuracy'),
        typingActualAccuracy: document.getElementById('typing-actual-accuracy'),
        restartTypingBtn: document.getElementById('restart-typing-btn'),
        retryTypingBtn: document.getElementById('retry-typing-btn'),
        endTypingBtn: document.getElementById('end-typing-btn'),
    };

    let allQuestions = [];
    let selectedQuestions = [];
    let userAnswers = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let grammarTimer;
    let grammarTimeLeft;

    const startGrammarTest = (isQuickTest = false) => {
        let grammarQuestions = [];
        let vocabularyQuestions = [];

        try {
            grammarQuestions = questionsData.questions;
        } catch (error) {
            console.error("Error loading grammar questions data:", error);
        }

        try {
            vocabularyQuestions = vocabularyData.questions;
        } catch (error) {
            console.error("Error loading vocabulary questions data:", error);
        }

        allQuestions = [...grammarQuestions, ...vocabularyQuestions];
        selectedQuestions = [];

        if (isQuickTest) {
            // Quick test settings: 25 mixed questions, but still presented sequentially by category
            const categories = ['verb', 'preposition', 'wrong word', 'vocabulary matching'];
            categories.forEach(category => {
                const categoryQuestions = allQuestions.filter(q => q.category === category);
                selectedQuestions.push(...categoryQuestions.sort(() => 0.5 - Math.random()));
            });
            selectedQuestions = selectedQuestions.slice(0, 25); // Take the first 25 from the shuffled pool
        } else {
            // Custom test settings: Questions are grouped by category
            const categories = [
                { id: 'verb', checked: document.getElementById('category-verb').checked },
                { id: 'preposition', checked: document.getElementById('category-preposition').checked },
                { id: 'wrong word', checked: document.getElementById('category-wrong-word').checked },
                { id: 'vocabulary matching', checked: document.getElementById('category-vocabulary-matching').checked }
            ];

            categories.forEach(category => {
                if (category.checked) {
                    const countInput = document.getElementById(`count-${category.id.replace(/\s/g, '-')}`);
                    const count = countInput ? (parseInt(countInput.value, 10) || 0) : 0;
                    if (count > 0) {
                        const categoryQuestions = allQuestions.filter(q => q.category === category.id);
                        selectedQuestions.push(...categoryQuestions.sort(() => 0.5 - Math.random()).slice(0, count));
                    }
                }
            });
        }

        if (selectedQuestions.length === 0) {
            alert("Please select at least one category and specify a number of questions greater than zero.");
            return;
        }

        // Reset state and start the quiz
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        dom.grammarSetup.style.display = 'none';
        dom.resultsContainer.style.display = 'none';
        dom.quizView.style.display = 'block';

        clearInterval(grammarTimer);
        if (isQuickTest || dom.grammarTimerToggle.checked) { // Quick test has a 5 min timer
            grammarTimeLeft = isQuickTest ? 300 : parseInt(dom.grammarTimerInput.value, 10);
            dom.grammarTimerDisplay.textContent = `Time Left: ${grammarTimeLeft}s`;
            dom.grammarTimerDisplay.style.display = 'block';

            grammarTimer = setInterval(() => {
                grammarTimeLeft--;
                dom.grammarTimerDisplay.textContent = `Time Left: ${grammarTimeLeft}s`;
                if (grammarTimeLeft <= 0) {
                    clearInterval(grammarTimer);
                    showResults();
                }
            }, 1000);
        } else {
            dom.grammarTimerDisplay.style.display = 'none';
        }

        displayQuestion();
    };

    const displayQuestion = () => {
        dom.feedback.textContent = '';
        const question = selectedQuestions[currentQuestionIndex];

        // Update category display
        const category = question.category.charAt(0).toUpperCase() + question.category.slice(1);
        dom.categoryDisplay.textContent = `Category: ${category}`;

        dom.progress.textContent = `Question ${currentQuestionIndex + 1} / ${selectedQuestions.length}`;
        dom.sentence.textContent = question.phrase || question.sentence; // Use phrase for vocab, sentence for grammar

        dom.choices.innerHTML = '';
        question.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.className = 'choice-btn';
            button.addEventListener('click', () => selectAnswer(choice, button, question));
            dom.choices.appendChild(button);
        });
    };

    const selectAnswer = (selectedChoice, button, question) => {
        const isCorrect = selectedChoice === question.correctAnswer;

        userAnswers.push({
            question,
            selectedAnswer: selectedChoice,
            isCorrect
        });

        if (isCorrect) {
            score++;
        }

        // Immediately advance to the next question
        nextQuestion();
    };

    const nextQuestion = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    };

    const showResults = () => {
        dom.quizView.style.display = 'none';
        dom.resultsContainer.style.display = 'block';
        dom.score.textContent = `Your score: ${score} / ${selectedQuestions.length}`;

        dom.reviewSection.innerHTML = '';
        userAnswers.forEach(answer => {
            const item = document.createElement('div');
            item.className = `review-item ${answer.isCorrect ? 'correct-review' : 'incorrect-review'}`;

            const questionText = answer.question.phrase || answer.question.sentence.replace('___', `<strong>${answer.question.correctAnswer}</strong>`);

            let reviewHTML = `<p class="review-sentence">${questionText}</p>`;
            if (!answer.isCorrect) {
                 reviewHTML += `<p>Your answer: ${answer.selectedAnswer} ❌</p>`;
            }
            reviewHTML += `<p>Correct answer: ${answer.question.correctAnswer} ✔</p>`;

            if (!answer.isCorrect && answer.question.explanation) {
                reviewHTML += `<p class="explanation"><em>Explanation:</em> ${answer.question.explanation}</p>`;
            }

            item.innerHTML = reviewHTML;
            dom.reviewSection.appendChild(item);
        });
    };

    const endGrammarQuiz = () => {
        showResults();
    };

    dom.retryGrammarBtn.addEventListener('click', () => startGrammarTest(false)); // This will restart the same custom test
    dom.endGrammarBtn.addEventListener('click', endGrammarQuiz);
    dom.restartBtn.addEventListener('click', () => {
        dom.resultsContainer.style.display = 'none';
        dom.grammarSetup.style.display = 'block';
    });

    // --- COGNITIVE TEST LOGIC ---
    let cognitiveQuestions = [];
    let currentCognitiveQuestionIndex = 0;
    let cognitiveScoreCount = 0;
    let cognitiveUserAnswers = [];
    let timer;
    let timeLeft;

    const formatTime = (seconds) => {
        if (seconds < 0) seconds = 0;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    };

    const startCognitiveQuiz = () => {
        const questionCount = parseInt(dom.questionCountInput.value, 10);
        cognitiveQuestions = [...cognitiveQuestionsData.questions].sort(() => 0.5 - Math.random()).slice(0, questionCount);
        currentCognitiveQuestionIndex = 0;
        cognitiveScoreCount = 0;
        cognitiveUserAnswers = [];
        dom.cognitiveSetup.style.display = 'none';
        dom.cognitiveResultsContainer.style.display = 'none';
        dom.cognitiveQuizView.style.display = 'block';

        timeLeft = parseInt(dom.timerInput.value, 10);
        dom.timerDisplay.textContent = `Time Left: ${formatTime(timeLeft)}`;

        displayCognitiveQuestion();
        timer = setInterval(() => {
            timeLeft--;
            dom.timerDisplay.textContent = `Time Left: ${formatTime(timeLeft)}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showCognitiveResults();
            }
        }, 1000);
    };

    const displayCognitiveQuestion = () => {
        const question = cognitiveQuestions[currentCognitiveQuestionIndex];
        dom.cognitiveProgress.textContent = `Question ${currentCognitiveQuestionIndex + 1} / ${cognitiveQuestions.length}`;
        dom.cognitiveQuestion.textContent = question.question;
        dom.cognitiveChoices.innerHTML = '';
        const shuffledChoices = [...question.choices].sort(() => 0.5 - Math.random());
        shuffledChoices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.className = 'choice-btn';
            button.addEventListener('click', () => selectCognitiveAnswer(choice, button, question));
            dom.cognitiveChoices.appendChild(button);
        });
    };

    const selectCognitiveAnswer = (selectedChoice, button, question) => {
        const isCorrect = selectedChoice === question.correctAnswer;
        if (isCorrect) {
            cognitiveScoreCount++;
        }
        cognitiveUserAnswers.push({
            question,
            selectedAnswer: selectedChoice,
            isCorrect
        });
        nextCognitiveQuestion();
    };

    const nextCognitiveQuestion = () => {
        currentCognitiveQuestionIndex++;
        if (currentCognitiveQuestionIndex < cognitiveQuestions.length) {
            displayCognitiveQuestion();
        } else {
            clearInterval(timer);
            showCognitiveResults();
        }
    };

    const showCognitiveResults = () => {
        dom.cognitiveQuizView.style.display = 'none';
        dom.cognitiveResultsContainer.style.display = 'block';

        let answeredQuestions = cognitiveUserAnswers.length;
        dom.cognitiveScore.textContent = `Your score: ${cognitiveScoreCount} / ${answeredQuestions} (${dom.questionCountInput.value} total questions)`;

        dom.cognitiveReviewSection.innerHTML = '';
        cognitiveQuestions.forEach(question => {
            const userAnswer = cognitiveUserAnswers.find(ans => ans.question.id === question.id);
            const item = document.createElement('div');
            item.className = 'review-item';

            let reviewHTML = `<p class="review-sentence">Question: ${question.question}</p>`;
            if (userAnswer) {
                item.classList.add(userAnswer.isCorrect ? 'correct-review' : 'incorrect-review');
                if (!userAnswer.isCorrect) {
                    reviewHTML += `<p>Your answer: ${userAnswer.selectedAnswer} ❌</p>`;
                }
                reviewHTML += `<p>Correct answer: ${question.correctAnswer} ✔</p>`;
            } else {
                item.classList.add('incorrect-review');
                reviewHTML += `<p>Status: Not Answered</p>`;
                reviewHTML += `<p>Correct answer: ${question.correctAnswer} ✔</p>`;
            }
            item.innerHTML = reviewHTML;
            dom.cognitiveReviewSection.appendChild(item);
        });
    };

    const endCognitiveQuiz = () => {
        clearInterval(timer);
        showCognitiveResults();
    };

    dom.startCognitiveBtn.addEventListener('click', startCognitiveQuiz);
    dom.restartCognitiveBtn.addEventListener('click', () => {
        dom.cognitiveResultsContainer.style.display = 'none';
        dom.cognitiveSetup.style.display = 'block';
    });
    dom.retryCognitiveBtn.addEventListener('click', () => {
        clearInterval(timer);
        startCognitiveQuiz();
    });
    dom.endCognitiveBtn.addEventListener('click', endCognitiveQuiz);


    // --- TYPING TEST LOGIC ---
    let typingTimer;
    let typingTimeLeft;
    let totalCharsTyped = 0;
    let correctCharsTyped = 0;
    let totalErrors = 0;
    let testStartTime;
    let pangramIndex = 0;
    let currentPangrams = [];
    let totalKeystrokes = 0;
    let incorrectKeystrokes = 0;

    dom.typingTestType.addEventListener('change', () => {
        if (dom.typingTestType.value === 'pangrams') {
            dom.continuousTypingContainer.style.display = 'flex';
        } else {
            dom.continuousTypingContainer.style.display = 'none';
        }
    });

    dom.showGuideToggle.addEventListener('change', () => {
        if (!dom.showGuideToggle.checked) {
            // Remove all coloring if the guide is turned off during a test
            dom.typingTextContainer.querySelectorAll('.letter').forEach(l => l.className = 'letter');
        }
        handleTypingInput(true); // Re-evaluate colors based on new setting
    });

    const startTypingTest = () => {
        dom.typingSetup.style.display = 'none';
        dom.typingResultsContainer.style.display = 'none';
        dom.typingTestView.style.display = 'block';
        dom.typingInput.value = '';
        dom.typingInput.focus();

        // Show/hide stats based on the toggle
        dom.typingStats.style.display = dom.showStatsToggle.checked ? 'flex' : 'none';

        const testType = dom.typingTestType.value;

        pangramIndex = 0;
        dom.typingTextContainer.innerHTML = '';

        if (testType === 'harver') {
            loadTypingText(typingTestData.harver);
        } else {
            currentPangrams = [...typingTestData.pangrams].sort(() => 0.5 - Math.random());
            loadTypingText(currentPangrams[pangramIndex]);
        }

        typingTimeLeft = parseInt(dom.typingTimerInput.value, 10);
        dom.typingTimer.textContent = `Time: ${typingTimeLeft}s`;
        totalCharsTyped = 0;
        correctCharsTyped = 0;
        totalErrors = 0;
        totalKeystrokes = 0;
        incorrectKeystrokes = 0;
        testStartTime = new Date();

        typingTimer = setInterval(() => {
            typingTimeLeft--;
            dom.typingTimer.textContent = `Time: ${typingTimeLeft}s`;
            updateTypingStats();
            if (typingTimeLeft <= 0) {
                clearInterval(typingTimer);
                showTypingResults();
            }
        }, 1000);

        dom.typingInput.addEventListener('input', handleTypingInput);
        dom.typingInput.addEventListener('keydown', handleKeystroke);
    };

    const handleKeystroke = (e) => {
        // We only care about character keys and backspace for accuracy
        if (e.key.length > 1 && e.key !== 'Backspace') return;

        totalKeystrokes++;

        const currentFullText = Array.from(dom.typingTextContainer.querySelectorAll('.letter')).map(l => l.textContent).join('').replace(/\s/g, ' ');
        const currentInput = dom.typingInput.value;
        const upcomingChar = currentFullText[currentInput.length];

        if (e.key !== 'Backspace' && e.key !== upcomingChar) {
            incorrectKeystrokes++;
        }
    };

    const loadTypingText = (text) => {
        text.split(' ').forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            word.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.className = 'letter';
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
            });
            if (wordIndex < text.split(' ').length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.className = 'letter';
                spaceSpan.innerHTML = '&nbsp;';
                wordSpan.appendChild(spaceSpan);
            }
            dom.typingTextContainer.appendChild(wordSpan);
        });
    };

    const handleTypingInput = (isToggleOnly = false) => {
        const words = dom.typingTextContainer.querySelectorAll('.word');
        const inputChars = dom.typingInput.value.split('');
        totalCharsTyped = inputChars.length;
        correctCharsTyped = 0;
        totalErrors = 0; // Reset errors on each input to ensure accurate counting
        let charIndex = 0;

        words.forEach((wordSpan, wordIndex) => {
            // Always remove the active class to prevent highlighting
            wordSpan.classList.remove('active');

            const letters = wordSpan.querySelectorAll('.letter');
            letters.forEach((letterSpan, letterIndex) => {
                const char = inputChars[charIndex];
                if (char == null) {
                    letterSpan.className = 'letter';
                } else if (char === letterSpan.textContent || (letterSpan.innerHTML === '&nbsp;' && char === ' ')) {
                    if (dom.showGuideToggle.checked) letterSpan.className = 'letter correct';
                    correctCharsTyped++;
                } else {
                    if (dom.showGuideToggle.checked) letterSpan.className = 'letter incorrect';
                    totalErrors++;
                }
                charIndex++;
            });
        });

        updateTypingStats();

        // Check for completion, but only if it's a real input event
        if (!isToggleOnly) {
            const originalText = Array.from(words).map(word => word.textContent).join('').replace(/\s/g, ' ');
            const typedText = dom.typingInput.value;

            if (typedText === originalText.trim()) {
                if (dom.typingTestType.value === 'pangrams' && dom.continuousTypingToggle.checked) {
                    pangramIndex++;
                    if (pangramIndex < currentPangrams.length) {
                        const spaceSpan = document.createElement('span');
                        spaceSpan.className = 'word';
                        const innerSpace = document.createElement('span');
                        innerSpace.className = 'letter';
                        innerSpace.innerHTML = '&nbsp;';
                        spaceSpan.appendChild(innerSpace);
                        dom.typingTextContainer.appendChild(spaceSpan);
                        loadTypingText(currentPangrams[pangramIndex]);
                    } else {
                        // All pangrams completed
                        endTypingTest();
                    }
                } else {
                    endTypingTest();
                }
            }
        }
    };

    const updateTypingStats = () => {
        const elapsedTime = (new Date() - testStartTime) / 1000 / 60; // in minutes
        // Calculate Gross WPM based on total characters typed, which provides feedback even with errors.
        const wpm = elapsedTime > 0 ? Math.round((totalCharsTyped / 5) / elapsedTime) : 0;
        const accuracy = totalCharsTyped > 0 ? Math.round((correctCharsTyped / totalCharsTyped) * 100) : 100;

        dom.typingWpm.textContent = `WPM: ${wpm}`;
        dom.typingAccuracy.textContent = `Accuracy: ${accuracy}%`;
    };

    const showTypingResults = () => {
        dom.typingTestView.style.display = 'none';
        dom.typingResultsContainer.style.display = 'block';

        const elapsedTime = (new Date() - testStartTime) / 1000 / 60; // in minutes
        const finalWpm = elapsedTime > 0 ? Math.round((correctCharsTyped / 5) / elapsedTime) : 0;
        const finalAccuracy = totalCharsTyped > 0 ? Math.round((correctCharsTyped / totalCharsTyped) * 100) : 100;
        const actualAccuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - incorrectKeystrokes) / totalKeystrokes) * 100) : 100;

        dom.typingFinalWpm.textContent = `WPM: ${finalWpm}`;
        dom.typingFinalAccuracy.textContent = `Accuracy: ${finalAccuracy}%`;
        dom.typingActualAccuracy.style.display = 'block'; // Ensure it's visible
        dom.typingActualAccuracy.textContent = `Actual Accuracy: ${actualAccuracy}%`;
    };

    const endTypingTest = () => {
        clearInterval(typingTimer);
        showTypingResults();
    }

    dom.startTypingBtn.addEventListener('click', startTypingTest);
    dom.restartTypingBtn.addEventListener('click', () => {
        dom.typingResultsContainer.style.display = 'none';
        dom.typingSetup.style.display = 'block';
    });
    dom.retryTypingBtn.addEventListener('click', () => {
        clearInterval(typingTimer);
        startTypingTest();
    });
    dom.endTypingBtn.addEventListener('click', endTypingTest);


    // Initial load
    // startQuiz(); // We no longer start the quiz automatically

    dom.grammarTimerToggle.addEventListener('change', () => {
        dom.grammarTimerContainer.style.display = dom.grammarTimerToggle.checked ? 'flex' : 'none';
    });

    dom.startGrammarBtn.addEventListener('click', () => startGrammarTest(false));

    dom.startQuickTestBtn.addEventListener('click', () => startGrammarTest(true));

    // --- THEME SWITCHER ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggle.checked = false;
        } else {
            body.classList.remove('light-mode');
            themeToggle.checked = true;
        }
    };

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        localStorage.setItem('grammarQuizTheme', newTheme);
        applyTheme(newTheme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('grammarQuizTheme') || 'dark';
    applyTheme(savedTheme);

    // --- TAB NAVIGATION ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all tabs and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked tab and its content
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
});
