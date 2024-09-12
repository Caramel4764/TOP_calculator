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
console.table(normalBtnObject)
let hasCalculated = false;
function calculate() {
  let total = 0;
  let splitEquation = Array.from(result.textContent)
  let equationIndexs = [];
  let numberList = []
  let currNum = [];

  splitEquation.forEach((btn, index)=>{
    let isOperator = false;
    operatorList.forEach((operator)=>{
      if (operator == btn) {
        isOperator = true;
        numberList.push(parseInt(currNum.join('')))
        equationIndexs.push(index);
        currNum = [];
      }
    })
    if (!isOperator) {
      currNum.push(btn);
    }
  })
  currNum = [];
  for (let i = equationIndexs.at(-1)+1; i<=splitEquation.length-1; i++) {
    currNum.push(splitEquation[i]);
    if (i == splitEquation.length-1) {
      numberList.push(parseInt(currNum.join('')))
      currNum = [];
      console.table(numberList)
    }
  }

  equationIndexs.forEach((operatorIndex, index)=>{
    if (index==0) {
      total = numberList[0];
    }
    switch(splitEquation[operatorIndex]) {
      case '+':
        total = total+numberList[index+1];
        break;
      case '-':
        total = total-numberList[index+1];
        break;
      case '*':
        total = total*numberList[index+1];
        break;
      case '/':
        total = total/numberList[index+1];
        break;
    }
  })
  equationIndexs = [];
  hasCalculated = true;
  result.textContent = total;
}

normalBtnObject.forEach((btn)=>{
  btnObject = btn;
  btn = btn.element;
  btn.addEventListener('click', ()=>{
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
  });
})

equalBtn[0].addEventListener('click', function() {
  let ogColor = equalBtn[0].style.backgroundColor;
    equalBtn[0].style.backgroundColor="#0c2f44";
    setTimeout(()=>{
      equalBtn[0].style.backgroundColor=ogColor;
    }, 100)
  calculate()
})