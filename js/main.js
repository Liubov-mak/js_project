'use strict';

/* const money = 1;
alert(money);

const income = 'Привет, мир!';
console.log(income);

const addExpenses = document.querySelector('.addExpenses');
const deposit = document.querySelector('.deposit');
const mission = document.querySelector('.mission');
const period = document.querySelector('.period'); */

let money = 550;
console.log(typeof money);

let income = 'фриланс';
console.log(typeof income);

let addExpenses = 'Интернет, Такси, Коммуналка';
console.log(addExpenses.length);

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(' ');
console.log(addExpenses);


let deposit = true;
console.log(typeof deposit);

let mission = 8758;
console.log('Цель заработать ' + (mission) + ' рублей/долларов/гривен/юани');

let period = 6;
console.log('Период равен ' + period + ' месяцев');

let budgetDay;
budgetDay = money / 30;
console.log(budgetDay);

//lesson03

money = prompt('Ваш месячный доход?');
console.log(money);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses);

deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);

let expenses1;
let expenses2;
let amount1;
let amount2;

if (expenses1 === true) {
    amount1 = amount1;    
} else {
    amount1 = 0;
}



expenses1 = confirm('Введите обязательную статью расходов?');
console.log(expenses1);
amount1 = prompt('Во сколько это обойдется?');
console.log(amount1);
expenses2 = confirm('Введите обязательную статью расходов?');
console.log(expenses2);
amount2 = prompt('Во сколько это обойдется?');
console.log(amount2);

let budgetMonth;
budgetMonth = budgetDay * 30 + parseFloat(amount1) + parseFloat(amount2);
console.log(budgetMonth);

mission = mission / budgetMonth;
mission = parseFloat(Math.ceil(mission));
console.log(mission);

budgetDay = budgetMonth / 30;
budgetDay = parseFloat(Math.floor(budgetDay));
console.log(budgetDay); 

budgetDay = 800;

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (600 < budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (0 < budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}