const digits = document.querySelectorAll('.digit');
const result = document.querySelector('.result');
const operating = document.querySelector('.operating');
const clear = document.querySelector('#clear');
const equalBtn = document.querySelector('#equal');
const clearEntryBtn = document.querySelector('#clearEntry');
let digitList = [];
let inputUsers = " "

digits.forEach(digit => digit.addEventListener('click' , showInputUser))
clear.addEventListener('click' , handleClearDigitBtn);

function handleClearDigitBtn(e){
    inputUsers = ' '
    operating.textContent = '0';
    newValues = [];
    result.textContent = '';
}
function showInputUser(e){
    let values = e.target.getAttribute('value');
    inputUsers += values;
    operating.textContent = inputUsers
}

equalBtn.addEventListener('click', showResult);

let newValues = []

function showResult(e){
    console.log(inputUsers)
    let values  = inputUsers.split(' ').slice(1)
    values.forEach(item => {
        if(item ==='x') item = '*' ;
        newValues.push(item)
    });

  // Évaluer l'expression
  const resultat = newValues.reduce(reduireExpression, '');
  
  console.log(resultat); // Résultat de l'expression: 33
  result.textContent = ""
  result.textContent = inputUsers;
  newValues = [];
  newValues.push(resultat.toString());
  inputUsers = resultat;
  operating.textContent = resultat;
  console.log(newValues);
}


function reduireExpression (acc, element, index, tableau) {
  // Ajouter l'élément actuel à l'accumulateur
  acc += element;

  // Si nous sommes au dernier élément, évaluer l'expression
  if (index === tableau.length - 1) {
    return eval(acc);
  }

  // Si l'élément actuel est un opérateur, continuer à ajouter les éléments suivants à l'accumulateur
  if (element === '+' || element === '-' || element === '*' || element === '/') {
    return acc;
  }

  // Sinon, ajouter un espace à l'accumulateur pour séparer les éléments
  acc += ' ';
  
  // Passer l'accumulateur modifié à l'itération suivante
  return acc;
}

clearEntryBtn.addEventListener('click', clearNumber)

let lock = false;
function clearNumber (e){
  if (operating.textContent = '' || operating.textContent === '0') {
    lock = true;
  } else {
    lock = false;
  }
  if(lock) return;
  operating.textContent = operating.textContent.slice(0,-1);
  newValues = [];
  inputUsers = ' ';
  inputUsers += operating.textContent;
  console.log(inputUsers)

}

operating.addEventListener('input', (e)=>{
  if (operating.textContent = '') {
    result.textContent = '';
    operating.textContent = '0'
  }
})






