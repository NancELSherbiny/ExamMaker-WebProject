document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const questionContainer = document.getElementById("question-container");
  
    let cards = [];
    let currentCard = 0;
  
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const clearBtn = document.getElementById("clear-btn");
  
    fetch('JSON/exams.json')
      .then(response => response.json())
      .then(data => {
        const exam = data.exams.find(exam => exam.title === subject);
        if (exam) {
          renderQuestions(exam.questions);
        } else {
          console.error("Subject not found");
        }
      });
  
    function renderQuestions(questions) {
      questionContainer.innerHTML = "";
  
      questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("question");
        div.style.display = "none";
  
        const p = document.createElement("p");
        p.textContent = q.question;
        div.appendChild(p);
  
        q.choices.forEach(choice => {
          const label = document.createElement("label");
          label.innerHTML = `
            <input type="radio" name="q${index}" value="${choice}">
            ${choice}
          `;
          div.appendChild(label);
        });
  
        questionContainer.appendChild(div);
      });
  
      cards = document.querySelectorAll(".question");
      showCard(currentCard);
    }
  
    function showCard(index) {
      cards.forEach((card, i) => {
        card.style.display = i === index ? "block" : "none";
      });
  
      prevBtn.style.display = index > 0 ? "inline-block" : "none";
      nextBtn.style.display = index < cards.length - 1 ? "inline-block" : "none";
    
      const progressText = document.getElementById("question-progress");
      if (progressText) {
            progressText.textContent = `Question ${index + 1} of ${cards.length}`;
  }
    }
  
    nextBtn.onclick = () => {
      if (currentCard < cards.length - 1) {
        currentCard++;
        showCard(currentCard);
      }
    };
  
    prevBtn.onclick = () => {
      if (currentCard > 0) {
        currentCard--;
        showCard(currentCard);
      }
    };
  
    clearBtn.onclick = () => {
      const currentQuestion = cards[currentCard];
      const selectedOptions = currentQuestion.querySelectorAll('input[type="radio"]');
      selectedOptions.forEach(radio => radio.checked = false);
    };
  });
  