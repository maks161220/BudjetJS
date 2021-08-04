let beginPayment = document.querySelector('#start'),
    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),
    inputExpensesItem = document.querySelectorAll('.expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    inputOptionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;


expensesItemBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

beginPayment.addEventListener('click', function(){
    time = prompt('Введіть дату в форматі YYYY-MM-DD: ', '');
    money = +prompt('Введіть ваш бюджет на місяць: ', '');

    while(isNaN(money) || money == null || money == ''){
        money = +prompt('Введіть ваш бюджет на місяць: ', '');
    }

    appData.budjet = money;
    appData.timeData = time;

    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() +1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesItemBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;
});

expensesItemBtn.addEventListener('click', function(){
    let sum = 0;
    for(let i = 0; i < inputExpensesItem.length; i++){
        let a = inputExpensesItem[i].value,
            b = inputExpensesItem[++i].value;
        
        if((typeof(a)) === 'string' && (typeof(a)) != null && 
        (typeof(b)) != null && a != '' && b != '' && a.length < 50){
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function(){
    for(let i = 0; i < inputOptionalExpensesItem.length; i++){
        let optExp = inputOptionalExpensesItem[i].value;
        appData.optionalExpenses[i] = optExp;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function(){
    if (appData.budjet != undefined){
        appData.moneyPerDay = ((appData.budjet - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if(appData.moneyPerDay <= 100) {
            levelValue.textContent = "Мінімальний рівень достатку";
        } else if(appData.moneyPerDay > 100 && appData.moneyPerDay <= 1000) {
            levelValue.textContent = "Середній рівень достатку";
        } else if(appData.moneyPerDay > 1000) {
            levelValue.textContent = "Високий рівень достатку";
        } else {
            levelValue.textContent = "Введені невірні дані";
        }
    } else {
    dayBudgetValue.textContent = 'Натисніть "Почати розрахунок"!';
    }
});

incomeItem.addEventListener('input', function(){
    let items = incomeItem.value;
    appData.income = items.split(',');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function(){
    if(appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
}); 

let appData = {
    budjet: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};
/* 
for (let key in appData) {
  console.log('Наша програма включає в себе дані: ' + key + ' - ' + appData[key]);
}  */

