// 1. Написать функцию, которая принимает 2 числа и возвращает -1, если первое меньше, чем второе; 1 – если первое больше, чем второе; и 0 – если числа равны.

// let first = prompt('Введите первое число:'),
//     second = prompt('Введите второе число:');

// function FunctionFirst(a, b) {
//     if (a < b) { alert('-1'); return -1; }
//     else if (a > b) { alert('1'); return 1; }
//     else { alert('0'); return 0; }
// }

// FunctionFirst(first, second);



// 2. Написать функцию, которая вычисляет факториал переданного ей числа.
// ФОРМУЛА ФАКТОРИАЛА  n! = 1 * … * (n-2) * (n-1) * n,

// function Factorial(number) {
//     let fact = 1;
//     for (let i = 1; i < +number + 1; i++) { fact *= i; }
//     alert('Факториал числа ' + number + ':  ' + fact);
//     return fact;
// }

// let first = prompt('Введите число:');
// Factorial(first);



// 3. Написать функцию, которая принимает три отдельные цифры и превращает их в одно число. Например: цифры 1, 4, 9 превратятся в число 149.

// function ThreeDigitsToNumber(one, two, three) {
//     let result = one + two + three;
//     alert('Полученное число: ' + result);
//     return result;
// }

// let one = prompt('Введите первую цифру:'),
//     two = prompt('Введите вторую цифру:'),
//     three = prompt('Введите третью цифру:');

// ThreeDigitsToNumber(one, two, three);



// 4. Написать функцию, которая принимает длину и ширину прямоугольника и вычисляет его площадь. Если в функцию передали 1 параметр, то она вычисляет площадь квадрата.

// function Square(length, width) {
//     let sqr = 1,
//         text;
//     if (width == 0) {
//         sqr = length ** 2;
//         text = ' квадрата ';
//     }
//     else {
//         sqr = length * width;
//         text = ' прямоугольника ';
//     }
//     alert('Площадь' + text + ' = ' + sqr);
//     return sqr;
// }

// let first = prompt('Введите длину прямоугольника:'),
//     second = prompt('Введите ширину прямоугольника:');
// Square(first, second);



// 5. Написать функцию, которая проверяет, является ли переданное ей число совершенным. Совершенное число – это число, равное сумме всех своих собственных делителей.

// function Perfect(number) {
//     let sum = 0;
//     for (let i = 1; i < number; i++){
//         if (number % i == 0) { sum += i; }
//     }
//     if (sum == number) {
//         alert('Данное число является совершенным');
//         return true;
//     }
//     else {
//         alert('Данное число НЕ является совершенным');
//         return false;
//     }
// }

// let first = prompt('Введите число:');
// Perfect(first);



// 6. Написать функцию, которая принимает минимальное и максимальное значения для диапазона, и выводит только те числа из диапазона, которые являются совершенными. Используйте написанную ранее функцию, чтобы узнавать, совершенное число или нет.

// function Perfect(number) {
//     let sum = 0;
//     for (let i = 1; i < number; i++){
//         if (number % i == 0) { sum += i; }
//     }
//     if (sum == number) { return true; }
//     else { return false; }
// }

// function ShowPerfect(min, max) {
//     let string = '';
//     for (let i = min; i < +max + 1; i++) {
//         if (Perfect(i)) { string += i + ', '; }
//     }
//     if (string == '') { alert('В данном диапазоне НЕТ совершенных чисел'); }
//     else alert('Совершенные числа из выбранного диапазона: ' + string);
//     return string;
// }

// let first = prompt('Введите минимальное значение диапазона:'),
//     second = prompt('Введите максимальное значение диапазона:');

// ShowPerfect(first, second);



// 7. Написать функцию, которая принимает время (часы, минуты, секунды) и выводит его на экран в формате «чч:мм:сс».Если при вызове функции минуты и/или секунды не были переданы, то выводить их как 00.

// function ShowTime(hours, minutes, seconds) {
//     if (minutes == '') { minutes = '00'; }
//     if (seconds == '') { seconds = '00'; }
//     if (hours > 23) { hours = 23; }
//     if (minutes > 59) { minutes = 59; }
//     if (seconds > 59) { seconds = 59; }
//     alert('«' + hours + ':' + minutes + ':' + seconds + '»');
// }

// let hours = prompt('Введите часы:'),
//     minutes = prompt('Введите минуты:'),
//     seconds = prompt('Введите секунды:');

// ShowTime(hours, minutes, seconds);



// 8. Написать функцию, которая принимает часы, минуты и секунды и возвращает это время в секундах.

// function TimeToSeconds(hours, minutes, seconds) {
//     let result = (+hours * 3600) + (+minutes * 60) + +seconds;
//     alert('Время в секундах : ' + result);
//     return result;
// }

// let hours = prompt('Введите часы:'),
//     minutes = prompt('Введите минуты:'),
//     seconds = prompt('Введите секунды:');

// TimeToSeconds(hours, minutes, seconds);



// 9. Написать функцию, которая принимает количество секунд, переводит их в часы, минуты и секунды и возвращает в виде строки «чч:мм:сс».

function SecondsToTime(seconds) {
    let hours,
        minutes;
    if (Math.floor(seconds / 3600) == 0) { hours = 0 }
    else {
        hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
    }
    if (Math.floor(seconds / 60) == 0) { minutes = 0 }
    else {
        minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
    }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
    
    let string = '«' + hours + ':' + minutes + ':' + seconds + '»';
    alert(string);
    return string;
}

let seconds = prompt('Введите секунды:');
SecondsToTime(seconds);



