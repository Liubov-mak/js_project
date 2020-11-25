'use strict';

/* let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}; */

let money = 500; 
let income = /* 'фриланс' */ 800;
let addExpenses = prompt('Перечислите возможные расходы через запятую?');
console.log(addExpenses.toLowerCase().split(','));
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 8758;
/* console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);  *///!!!!!!!!!!!!!!!!!!!!!!!!!!
let period = 6;
/* console.log('Период равен ' + period + ' месяцев'); */
let budgetDay;
budgetDay = money / 30;

//
let start = function() {
    money = +prompt('Ваш месячный доход?');

    while (isNaN(parseFloat(money))) {
        money = +prompt('Ваш месячный доход?');
    }
};

start();

//
const showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1;
let expenses2;
let amount1;
let amount2;

if (amount1 === null) {
    amount1 = 0;
}
if (amount2 === null) {
    amount2 = 0;
}

/* let budgetMonth;
budgetMonth = budgetDay * 30 + amount1 + amount2;
console.log(budgetMonth);

let missionTarget = mission / budgetMonth;
missionTarget = parseFloat(Math.ceil(missionTarget));
console.log(missionTarget);

budgetDay = budgetMonth / 30;
budgetDay = parseFloat(Math.floor(budgetDay));
console.log(budgetDay); */

/* let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (budgetDay > 0 && budgetDay < 600) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return('Что то пошло не так');
    }
};
console.log(getStatusIncome()); */

//lesson 03-02
/* let namePerson = 'Максим';
let userName = (namePerson === 'Артем') ? 'Директор' : 
    (namePerson === 'Максим') ? 'Преподаватель' :
    'студент';
    console.log(userName); */

//lesson 04-01 - 05-видео

let getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            expenses1 = prompt('Введите обязательную статью расходов?', 'Коммуналка');
        } else if (i === 1) {
            expenses2 = prompt('Введите обязательную статью расходов?', 'Школа');
        }

        sum += +prompt('Во сколько это обойдется?');
    }
    console.log(sum);
    return sum;
    /* return amount1 + amount2; */
};

let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmount);


//
let getAccumulatedMonth = function() {
    return income - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

//
let getTargetMonth = function() {
    return mission / accumulatedMonth;
};
console.log('Цель достигну за: ' + Math.ceil(getTargetMonth()) + ' месяцев');

//
budgetDay = accumulatedMonth / 30;
console.log(Math.ceil(budgetDay));

//lesson04-02

/* const myFunc = function(a, callback) {
    if (typeof a === 'string') {
        callback(a);
    } else {
        console.log('Это не строка!');
    }
};
myFunc('  ghbистфиырcncbmndbksdbfakjbfakjbfakjbfkawjkwjudkawubfhkbfhk', function(a) {    
    let b = a.trim().slice(0, 30);
    a = b + '...';
    console.log(a);        
}); */

//lesson05-01  - нифига не получился!
