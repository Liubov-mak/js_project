'use strict';

let money = 550;
console.log(typeof money);

let income = /* 'фриланс' */ 800;
console.log(typeof income);

let addExpenses = 'Интернет, Такси, Коммуналка';
console.log(addExpenses.length);

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(' ');
console.log(addExpenses);


let deposit = true;
console.log(typeof deposit);

let mission = 8758;
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`); //!!!!!!!!!!!!!!!!!!!!!!!!!!

let period = 6;
console.log('Период равен ' + period + ' месяцев');

let budgetDay;
budgetDay = money / 30;
console.log(budgetDay);

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

//lesson03

/* money = prompt('Ваш месячный доход?');
console.log(money);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses);

deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit); */

let expenses1;
let expenses2;
let amount1;
let amount2;

expenses1 = confirm('Введите обязательную статью расходов?');
console.log(expenses1);
amount1 = +prompt('Во сколько это обойдется?');
console.log(amount1);
expenses2 = confirm('Введите обязательную статью расходов?');
console.log(expenses2);
amount2 = +prompt('Во сколько это обойдется?');
console.log(amount2);

if (amount1 === null) {
    amount1 = 0;
}
if (amount2 === null) {
    amount2 = 0;
}

/* let budgetMonth;
budgetMonth = budgetDay * 30 + amount1 + amount2;
console.log(budgetMonth); */

/* let missionTarget = mission / budgetMonth;
missionTarget = parseFloat(Math.ceil(missionTarget));
console.log(missionTarget); */

/* budgetDay = budgetMonth / 30;
budgetDay = parseFloat(Math.floor(budgetDay));
console.log(budgetDay);  */

let getStatusIncome = function() {
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
console.log(getStatusIncome());
/* getStatusIncome(); */

//lesson 03-02
let namePerson = 'Максим';
let userName = (namePerson === 'Артем') ? 'Директор' : 
    (namePerson === 'Максим') ? 'Преподаватель' :
    'студент';
    console.log(userName);

//lesson 04-01

let getExpensesMonth = function() {
    return amount1 + amount2 + money;
};
console.log(getExpensesMonth());



let getAccumulatedMonth = function() {
    return income - getExpensesMonth();
};
let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

let getTargetMonth = function() {
    return mission / accumulatedMonth;
};
console.log(getTargetMonth());

budgetDay = accumulatedMonth / 30;
console.log(budgetDay);



