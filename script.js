const result = document.querySelector("#result");
const btns = Array.from(document.querySelectorAll('.btn'))
const normalBtn = btns.filter((btn)=>btn.innerHTML!='=')
const equalBtn = btns.filter((btn)=>btn.innerHTML=='=')
const operatorList = ['+', '-', "*", "/"]
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
    if (index==equationIndexs.length-1) {
      switch(splitEquation[operatorIndex]) {
        case '+':
          total = numberList[index]+numberList[index+1];
      }
    }
  })
  equationIndexs = [];
  hasCalculated = true;
  //console.log(`%c ${total}`, 'color:cyan')
  result.textContent = total;
}

normalBtn.forEach((btn)=>{
  btn.addEventListener('click', ()=>{
    if (hasCalculated) {
      hasCalculated = false;
      result.textContent = '';
    }
    result.textContent+=btn.innerHTML;
  });
})

equalBtn[0].addEventListener('click', calculate)