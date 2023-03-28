const digits = document.querySelectorAll('.digit');
const result = document.querySelector('.result');
const operating = document.querySelector('.operating');
const clear = document.querySelector('#clear');
const equalBtn = document.querySelector('#equal');
const clearEntryBtn = document.querySelector('#clearEntry');
const comma = document.querySelector('.comma');

let inputUsers = "";
let displayValue = ""

digits.forEach(digit => digit.addEventListener('click' , showInputUser))
clear.addEventListener('click' , handleClearDigitBtn);
equalBtn.addEventListener('click', showInputResult);

function handleClearDigitBtn(e){
    inputUsers = "";
    displayValue = "";
    result.textContent = "";
    str = "";
    count = 0;
    operating.textContent = '0';
    comma.addEventListener('click', showInputUser)

}
let lock = false;
function showInputUser(e){
    verifyMathOperatorBug(e)
    if(lock) return;
    e.target.classList.contains('mathOperator') ? displayValue += ` ${e.target.textContent} ` : displayValue += e.target.textContent;
    verifyCommaBug(e)
    inputUsers += e.target.getAttribute('value');
    operating.innerHTML = displayValue;
}

let str= "";
let count = "";
function verifyCommaBug (e){
  if(e.target.classList.contains('digitNumber') || e.target.classList.contains('comma')) {
      str += e.target.textContent;
      count = "";
      for (let i = 0 ; i < str.length ; i++) {
        if (str.charAt(i) === "."){
            count++;
            console.log("count" , count);
            if(count >= 1) {
              comma.removeEventListener('click', showInputUser)
            }
        } 
      }
  } else {
      str = "";
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
        console.log("no authorization")
    }
  } 
  else {
    lock = false ;
  }
}
function showInputResult(e){
  let str = displayValue.replace(/\s/g, "");
  let lastStr = str.charAt(str.length - 1);
  if(
    lastStr.toLowerCase() === "x" || 
    lastStr.toLowerCase() === "+" || 
    lastStr.toLowerCase() === "/" || 
    lastStr.toLowerCase() === "-"
    ) return
  result.textContent = displayValue;
  let resultat = eval(inputUsers);
  console.log(resultat)
  inputUsers = resultat;
  displayValue = '';
  displayValue += resultat
  operating.textContent = displayValue;
  return resultat
}





