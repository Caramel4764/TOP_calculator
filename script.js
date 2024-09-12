const result = document.querySelector("#result");
const btns = Array.from(document.querySelectorAll('.btn'));
const equalBtn = btns.filter((btn)=>btn.innerHTML=='=');
const operatorList = ['+', '-', "*", "/"]
const backBtn = document.querySelector('#back')
const clearBtn = document.querySelector('#clear')
const normalBtn = btns.filter((btn)=>btn.innerHTML!='='&&btn.innerHTML!='Back'&&btn.innerHTML!='Clear');
const allBtnObject = btns.map((btn)=>{
  return {
    element: btn,
    isClicked: false,
  }
})
/*allBtnObject.push({
  element: equalBtn[0],
  isClicked:false,
})*/
const normalBtnObject = normalBtn.map((btn)=>{
  return {
    element: btn,
    isClicked: false,
  }
})

let hasCalculated = false;
let total = 0;
let hasTotalResetted = false;
let splitEquation = null;
let operatorIndex = []
let firstNum = [0];
let secondNum = [];
let isFirstCalculation = true;
function calculate() {
  splitEquation = Array.from(result.textContent)
  splitEquation.forEach((char, index)=>{
    if (operatorList.includes(char)) {
      operatorIndex.push(index);
    }
  })
  if (operatorIndex.length > 0) {
    splitEquation.forEach((char, index)=>{
      if (operatorIndex.includes(index)) {
        if (isFirstCalculation == true) {
          isFirstCalculation = false;
          for (let i = operatorIndex[0]+1; i<splitEquation.length ;i++) {
            secondNum.push(splitEquation[i])
          }
        }
        if (secondNum.length > 0) {
          let final;
          if (splitEquation[operatorIndex[0]] == '+') {
            final = parseFloat(firstNum.join(''))+parseFloat(secondNum.join(''))
          } else if (splitEquation[operatorIndex[0]] == '-') {
            final = parseFloat(firstNum.join(''))-parseFloat(secondNum.join(''))
          } else if (splitEquation[operatorIndex[0]] == '*') {
            final = parseFloat(firstNum.join(''))*parseFloat(secondNum.join(''))
          } else if (splitEquation[operatorIndex[0]] == '/') {
            final = parseFloat(firstNum.join(''))/parseFloat(secondNum.join(''))
          }
          //console.log(`${firstNum.join('')} ${splitEquation[operatorIndex[0]]} ${secondNum.join('')} = ${final}`)
          if (final%1 === 0) {
          } else {
            final = Math.round(final*100)/100;
          }
          result.textContent = final;
          firstNum = Array.from((final).toString());
          secondNum = [];
          operatorIndex = [];
        }
      } else {
        if (isFirstCalculation) {
          firstNum.push(char);
        } else {
          if (secondNum.length == 0) {
            for (let i = operatorIndex[0]+1; i<splitEquation.length ;i++) {
              secondNum.push(splitEquation[i])
            }
          }
        }
      }
    })
  }
}

normalBtnObject.forEach((btn)=>{
  btnObject = btn;
  btn = btn.element;
  btn.addEventListener('click', ()=>{
    if (btn.classList.contains('operator')) {
      calculate();
    }
    if (hasCalculated) {
      hasCalculated = false;
      result.textContent = '';
    }
    result.textContent+=btn.innerHTML;
    splitEquation = Array.from(result.textContent)
  });
})

allBtnObject.forEach((btn)=>{
  btnObject = btn;
  btn = btn.element;
  btn.addEventListener('click', ()=>{
    if (btnObject.isClicked!==true) {
      ogColor = btn.style.backgroundColor;
      btnObject.isClicked = true;
    }
    if (parseInt(btn.innerHTML)>=0 || parseInt(btn.innerHTML)<0) {
      btn.style.backgroundColor="#adc0e5";
    } else if (btn.innerHTML=='.' || operatorList.includes(btn.innerHTML)) {
      btn.style.backgroundColor="#5c87b5";
    } else {
      btn.style.backgroundColor="#0e2e42";
    }
    setTimeout(()=>{
      btn.style.backgroundColor=ogColor;
      btnObject.isClicked = false;
    }, 100)
  })
})

equalBtn[0].addEventListener('click', function() {
  calculate();
})

clearBtn.addEventListener('click', ()=>{
  hasCalculated = false;
  total = 0;
  hasTotalResetted = false;
  splitEquation = null;
  operatorIndex = []
  firstNum = [0];
  secondNum = [];
  isFirstCalculation = true;
  result.innerHTML='';
})

backBtn.addEventListener('click', ()=>{
  let resultText = Array.from(result.textContent);
  resultText.pop();
  result.textContent = resultText.join('');
})
