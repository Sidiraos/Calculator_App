const digits = document.querySelectorAll('.digit');
const result = document.querySelector('.result');
const operating = document.querySelector('.operating');
const clear = document.querySelector('#clear');
const equalBtn = document.querySelector('#equal');
const clearEntryBtn = document.querySelector('#clearEntry');
const comma = document.querySelector('.comma');
const displayCalc = document.querySelector('.displayCalc');
let inputUsers = "";
let displayValue = ""

digits.forEach(digit => digit.addEventListener('click' , showInputUser))
clear.addEventListener('click' , handleClearDigitBtn);
equalBtn.addEventListener('click', showInputResult);
clearEntryBtn.addEventListener('click', clearEntry);

function handleClearDigitBtn(e){
    renitValue();
    comma.addEventListener('click', showInputUser)

}
function renitValue(){
  inputUsers = "";
  displayValue = "";
  result.textContent = "";
  strDisplay = "";
  count = 0;
  operating.textContent = '0';
}
let lock = false;
function showInputUser(e){
    verifyMathOperatorBug(e)
    if(lock) return;
    e.target.classList.contains('mathOperator') ? displayValue += ` ${e.target.textContent} ` : displayValue += e.target.textContent;
    verifyCommaBug(e)
    console.log("displayValue" , displayValue)
    inputUsers += e.target.getAttribute('value');
    console.log("inputUsers" , inputUsers)
    operating.textContent = displayValue;
}

let strDisplay = "";
let count = "";
function verifyCommaBug (e){
  if(e.target.classList.contains('digitNumber') || e.target.classList.contains('comma')) {
      strDisplay += e.target.textContent;
      count = "";
      for (let i = 0 ; i < strDisplay.length ; i++) {
        if (strDisplay.charAt(i) === "."){
            count++;
            if(count >= 1) {
              comma.removeEventListener('click', showInputUser)
            }
        } 
      }
  } else {
      strDisplay = "";
      count = 0;
      comma.addEventListener('click', showInputUser)
  }
}

function verifyMathOperatorBug(e){
  if (e.target.classList.contains('mathOperator')) {
    let str = displayValue.replace(/\s/g, "");
    let lastStr = str.charAt(str.length - 1);
    if(e.target.textContent.toLowerCase() === lastStr.toLowerCase()){
        lock = true ;
        console.log("no authorizated") ;
        // add style here error message
        displayErrorAnimation(displayCalc);
        e.target.removeEventListener("click" , showInputUser)
        setTimeout(()=>{
          removeErrorAnimation(displayCalc)
          e.target.addEventListener("click" , showInputUser)
        } , 400)

    } else if (lastStr === "x" && e.target.textContent === "/"){
        // console.log("replaced by /")
        lock = false;
        displayValue = displayValue.slice(0, -3)
        inputUsers = inputUsers.slice(0,-3)
    } else if (lastStr === "/" && e.target.textContent === "x") {
        //console.log("replaced by x")
        lock = false;
        displayValue = displayValue.slice(0, -3);
        inputUsers = inputUsers.slice(0,-3);

    } else {lock = false ; removeErrorAnimation(displayCalc)}
  } else {
    lock = false ;
  }
}
function showInputResult(e){
  handleBugBeforeShowResult()
  result.textContent = displayValue;
  let resultat = eval(inputUsers);
  console.log(resultat)
  inputUsers = resultat;
  displayValue = '';
  displayValue += resultat
  operating.textContent = displayValue;
  count = 0;
  strDisplay = " ";
  comma.addEventListener('click' , showInputUser);
  resultat.toString().split("").includes(".") ? comma.removeEventListener('click', showInputUser) : comma.addEventListener('click', showInputUser)

  return resultat
}

function handleBugBeforeShowResult(){
  let str = displayValue.replace(/\s/g, "");
  let lastStr = str.charAt(str.length - 1);
  let beforeLastStr = str.charAt(str.length - 2);
  let equalStr = beforeLastStr + lastStr
  console.log("equal "+ equalStr)
  // handle bug before calculating 
  if(
    lastStr.toLowerCase() === "x" || 
    lastStr.toLowerCase() === "+" || 
    lastStr.toLowerCase() === "/" || 
    lastStr.toLowerCase() === "-" 
    ) {
      operating.textContent = "Error";
      // error animation css
      displayErrorAnimation(displayCalc);
      setTimeout(()=>{removeErrorAnimation(displayCalc)} , 400)
      return
    } else if (
        equalStr === "x." ||
        equalStr === "+." ||
        equalStr === "/." ||
        equalStr === "-."
      ) {
        operating.textContent = "Error";
        setTimeout(renitValue , 1000)
        // error animation css
        displayErrorAnimation(displayCalc);
        setTimeout(()=>{removeErrorAnimation(displayCalc)} , 400)
        return
      }
}

function clearEntry(){
  console.log(inputUsers)
  console.log(displayValue)
  if(inputUsers.length < 2 || displayValue.length < 2){
    console.log('cannot clear entry')
  } else {
    displayValue = displayValue.slice(0 , -1);
    inputUsers = inputUsers.toString().slice(0 , -1);
    operating.textContent = displayValue;
    
  }
}

function displayErrorAnimation(el){
    el.classList.add("error");
}

function removeErrorAnimation(el){
  el.classList.remove("error");
}



