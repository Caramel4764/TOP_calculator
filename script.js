const result = document.querySelector("#result");
const btns = Array.from(document.querySelectorAll('.btn'))
const normalBtn = btns.filter((btn)=>btn.innerHTML!='=')
const equalBtn = btns.filter((btn)=>btn.innerHTML=='=')
const operatorList = ['+', '-', "*", "/"]
function calculate() {
  let total = 0;
  let splitEquation = Array.from(result.textContent)
  let equationIndexs = [];
  let firstNum = [];
  let secondNum = [];
  splitEquation.forEach((btn, index)=>{
    operatorList.forEach((operator)=>{
      if (operator == btn) {
        equationIndexs.push(index);
      }
    })
  })
  splitEquation.forEach((char, splitIndex)=>{
    equationIndexs.forEach((equationIndex, index)=>{
      if (splitIndex == equationIndex) {
        console.log(Array.isArray(firstNum))
        if (Array.isArray(firstNum)) {
          firstNum = firstNum.join('');
        }


        if (splitIndex == equationIndexs.at(-1)) {
          console.log(index)
          for (let i = splitIndex+1; i < splitEquation.length; i++) {
            secondNum.push(splitEquation[i]);
          }
          secondNum = secondNum.join('')
          if (!isNaN(parseInt(secondNum))) {
            total = parseInt(secondNum)+parseInt(firstNum);
          }
          /*console.log(`second: ${secondNum}`)
          console.log(`first: ${firstNum}`)*/
          firstNum = [];
          secondNum = [];

          firstNum = total;

          console.log(`%c ${splitIndex}`, 'color:yellow')
        }
        //console.log(firstNum)
      } else if (splitIndex < equationIndex&&total!=0) {
        firstNum.push(char);
        console.log(`%c ${splitIndex}`, 'color:red')
      } else {
        for (let i = splitIndex+2; i < splitEquation.length; i++) {
          secondNum.push(splitEquation[i]);
        }
        secondNum = secondNum.join('')
        console.log(parseInt(secondNum)==NaN)
        console.log(parseInt(secondNum))
        if (!isNaN(parseInt(secondNum))) {
          firstNum = firstNum.join('')
          if (firstNum == '') {
            firstNum = 0;
          }
          total = parseInt(secondNum)+parseInt(firstNum);
        }
        //firstNum = total;
        secondNum = [];
      }
    })
  })
  equationIndexs = [];
  console.log(`%c ${total}`, 'color:cyan')
  //result.textContent = total;
}

normalBtn.forEach((btn)=>{
  btn.addEventListener('click', ()=>{
    result.textContent+=btn.innerHTML;
  });
})

equalBtn[0].addEventListener('click', calculate)