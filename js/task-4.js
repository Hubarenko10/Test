const form = document.querySelector("form"); 
const submitBtn = form.querySelector('button[type="submit"]'); 
const resultDiv = document.querySelector("#result"); 
let currentQuestion = 0; 

fetch("../task-4.json")
  .then((response) => response.json())
  .then((data) => {
    const questions = data.questions; 
    const answersContainer = form.querySelector(".answers"); 
    const totalQuestions = questions.length; 
    
    const generateQuestion = (questionNumber) => {
      const currentQuestionObj = questions[questionNumber];
      form.querySelector(".question").textContent = currentQuestionObj.question; 
      answersContainer.innerHTML = ""; 
      
      currentQuestionObj.answers.forEach((answer) => {
        const answerBtn = document.createElement("button"); 
        answerBtn.textContent = answer.text; 
        answerBtn.addEventListener("click", () => {
 
          if (answer.nextQuestion !== null) {
            
            currentQuestion = getQuestionIndex(answer.nextQuestion); 
            generateQuestion(currentQuestion); 
          } else {
            
            form.style.display = "none"; 
            resultDiv.style.display = "block"; 
            submitBtn.style.display = "none"; 
            const resultText = document.createElement("p"); 
            resultText.textContent = "Thank you for completing the survey!"; 
            resultDiv.appendChild(resultText); 
          }
        });
        answersContainer.appendChild(answerBtn); 
      });
    };

    
    const getQuestionIndex = (questionId) => {
      for (let i = 0; i < totalQuestions; i++) {
        if (questions[i].id === questionId) {
          return i;
        }
      }
    };

    generateQuestion(currentQuestion); // 
  })
  .catch((error) => console.error(error));
   
