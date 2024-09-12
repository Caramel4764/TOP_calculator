const result = document.querySelector("#result");
const btns = Array.from(document.querySelectorAll('.btn'));
const equalBtn = btns.filter((btn)=>btn.innerHTML=='=');
const operatorList = ['+', '-', "*", "/"]
const normalBtn = btns.filter((btn)=>btn.innerHTML!='=');
const normalBtnObject = normalBtn.map((btn)=>{
  return {
    element: btn,
    isClicked: false,
  }
})
//console.table(normalBtnObject)
//console.table(splitEquation)

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
        //if (secondNum.length == 0) {
        if (isFirstCalculation == true) {
          isFirstCalculation = false;
          for (let i = operatorIndex[0]+1; i<splitEquation.length ;i++) {
            secondNum.push(splitEquation[i])
          }
        }
        if (secondNum.length > 0) {
          console.log(`${firstNum.join('')} + ${secondNum.join('')} = ${parseInt(firstNum.join(''))+parseInt(secondNum.join(''))}`)
          result.textContent = parseInt(firstNum.join(''))+parseInt(secondNum.join(''));
          firstNum = Array.from((parseInt(firstNum.join(''))+parseInt(secondNum.join(''))).toString());
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
    if (btnObject.isClicked!==true) {
      ogColor = btn.style.backgroundColor;
    }
    if (parseInt(btn.innerHTML)>=0 || parseInt(btn.innerHTML)<0) {
      btn.style.backgroundColor="#adc0e5";
    } else {
      btn.style.backgroundColor="#5c87b5";
    }
    setTimeout(()=>{
      btn.style.backgroundColor=ogColor;
    }, 100)
    if (hasCalculated) {
      hasCalculated = false;
      result.textContent = '';
    }
    result.textContent+=btn.innerHTML;
    splitEquation = Array.from(result.textContent)
  });
})

equalBtn[0].addEventListener('click', function() {
  //if (splitEquation==null || parseInt(splitEquation.at(-1))>=0||parseInt(splitEquation.at(-1))<0) {
    let ogColor = equalBtn[0].style.backgroundColor;
    equalBtn[0].style.backgroundColor="#0c2f44";
    setTimeout(()=>{
      equalBtn[0].style.backgroundColor=ogColor;
    }, 100)
    calculate();
  //}
})