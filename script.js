class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear();
    }


    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined
      }
      
      clear1() {
        this.currentOperand = '0'
        this.previousOperand = '';
        this.operation = undefined
      }
    

    appendNumber(number){

        if(this.currentOperand==="0"){
            this.currentOperand=number.toString();
            return;
        }
        if(number==="."&& this.currentOperand.includes("."))return;
        this.currentOperand=this.currentOperand.toString()+number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand===''&& this.operation
        !==undefined && this.operation !=='-' && operation !=='-'){
          
            this.operation=operation;
            return;
        }
        if(this.currentOperand===''&& operation ==='-'){
           
            this.currentOperand=operation.toString();

            return;
        }
        if(this.currentOperand==='-'){
            this.currentOperand=""
            this.operation=operation;
            return;
        }
    
        if(this.previousOperand !== ''){  
            this.compute();
        }
     
        this.operation=operation;
        this.previousOperand=this.currentOperand
        this.currentOperand="";
    }

    compute(){
        let computation
        const prev= parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(current))return;
        switch(this.operation){
            case "+":
                computation=prev+current;
                break;
            case "*":
                computation=prev*current;
                break;    
            case "-":
                computation=prev-current;
                break;
            case "/":
                computation=prev/current;
                break;
            default:
                return
        }
        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand='';
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOperand;
        this.previousOperandTextElement.innerText=this.previousOperand;
    }

}


const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelectorAll('[data-equals]')
const clearButtons=document.querySelector('[data-all-clear]');
const previousOperandTextElement=document.querySelector('[data-previous-operand]');
const currentOperandTextElement=document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button=>{
        button.addEventListener('click',()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})


operationButtons.forEach(button=>{
    button.addEventListener('click',()=> {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
})
})

equalsButton.forEach(button=>{
    button.addEventListener('click',()=> { 
    calculator.compute() 
    calculator.updateDisplay()
  })
})

clearButtons.addEventListener('click', button => {
    calculator.clear1()
    calculator.updateDisplay()
})