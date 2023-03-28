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

let strDisplay= "";
let count = "";
function verifyCommaBug (e){
  if(e.target.classList.contains('digitNumber') || e.target.classList.contains('comma')) {
      strDisplay += e.target.textContent;
      count = "";
      for (let i = 0 ; i < strDisplay.length ; i++) {
        if (strDisplay.charAt(i) === "."){
            count++;
            // console.log("count" , count);
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
        console.log("no authorizated")
    }
  } else {
    lock = false ;
  }
}
function showInputResult(e){
  let str = displayValue.replace(/\s/g, "");
  let lastStr = str.charAt(str.length - 1);
  let beforeLastStr = str.charAt(str.length - 2);
  let equalStr = beforeLastStr + lastStr
  console.log("equal "+ equalStr)
  // if lastItem displayValue is mathOperator we return before calculating
  if(
    lastStr.toLowerCase() === "x" || 
    lastStr.toLowerCase() === "+" || 
    lastStr.toLowerCase() === "/" || 
    lastStr.toLowerCase() === "-" 
    ) {
      operating.textContent = "Error";
      console.log(operating.textContent)
      return
    } else if (
        equalStr === ".x" ||
        equalStr === ".+" ||
        equalStr === "./" ||
        equalStr === ".-" ||
        equalStr === "x." ||
        equalStr === "+." ||
        equalStr === "/." ||
        equalStr === "-."
      ) {
        operating.textContent = "Error";
        setTimeout(renitValue , 1000)
        return
      }
      
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





