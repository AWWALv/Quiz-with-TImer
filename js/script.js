 //selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");



// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}
// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}
// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    queCounter(1)
    startTimer(15)
    startTimerLine(0)

}

let queCount = 0;
let queNumb = 1;
let counter;
let timeValue = 15;
let widthValue = 0
let userScore = 0

const next_btn = quiz_box.querySelector(".next_btn")
const restartQuiz = result_box.querySelector(".buttons .restart")
const quitQuiz = result_box.querySelector(".buttons .quit")

// if restartQuiz button clicked
restartQuiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    queCount = 0;
    queNumb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(queCount); //calling showQestions function
    queCounter(queNumb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}


quitQuiz.addEventListener('click',function(){
    window.location.reload();
})
//if next btn is clicked
next_btn.addEventListener('click',function(){
   if(queCount < questions.length){
       queCount++;
       queNumb++;
       showQuestions(queCount);
       queCounter(queNumb)
       clearInterval(counter)
       startTimer(timeValue)
       clearInterval(counterLine)
       startTimerLine(widthValue)
       next_btn.style.display="none";

   }else{
       showResultBox()
   }
})



function showQuestions(index){
    const queText = document.querySelector(".que-text")
    const optionList = document.querySelector(".option_list")
    let queTag = ' <span> '+questions[index].numb + "." + questions[index].question + '</span> '
    let optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    queText.innerHTML = queTag; //adding new span tag inside que_tag
    
    optionList.innerHTML = optionTag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times "></i></div>'





//if user clicked on option
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine)
    let userAns = answer.textContent; //getting user selected option
    let correctAns = questions[queCount].answer; //getting correct answer from array
    let allOptions = option_list.children.length;
  
    
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon)
    }else{
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend", crossIcon)

        //if answer is incorrect then automarically select the correct one
        for(let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent === correctAns){
                option_list.children[i].setAttribute("class", "option correct")
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }
        }

         
    }

    //once useer selected , disable all options

    for(let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add('disabled')
    }

    next_btn.style.display="block"; 
}


function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult");//show result
    const scoreText = result_box.querySelector(".score_text")
    if(userScore > 3){
        let scoreTag = '<span> and Congrats!,You got  <p>'+ userScore +'</p> out of <p>' + questions.length + '</></span>'
        scoreText.innerHTML = scoreTag
    }
    else if(userScore > 1){
        let scoreTag = '<span> and nice,You got <p>'+ userScore +'</p> out of <p>' + questions.length + '</></span>'
        scoreText.innerHTML = scoreTag
    }
    else{
        let scoreTag = '<span> and sorry,You got only <p>'+ userScore +'</p> out of <p>' + questions.length + '</></span>'
        scoreText.innerHTML = scoreTag
    }

};


function queCounter(index){
    const bottom_ques_counter= quiz_box.querySelector(".total-que");
    let totalQuesCountTag = ' <span><p>'+ index + '</p> of <p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag
}


function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if (time < 9 ){
          let addZero = timeCount.textContent;
          timeCount.textContent = "0" + addZero;
        }
        if (time < 0){
            clearInterval(counter)
            timeCount.textContent = "00"
            
        }
    }

}

function startTimerLine(time){
    counterLine = setInterval(timer,29);
    function timer(){
        time += 1
        time_line.style.width = time + "px";

        if (time > 549){
            clearInterval(counterLine)
            
        }
    }

}
