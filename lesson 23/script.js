// 1. Подсчитать сумму всех чисел в заданном пользователем диапазоне.

// let a = prompt('Введите первое число:'),
//     z = prompt('Введите второе число:');

// let sum = 0;    
// for (let i = +a; i < +z+1; i++) {
//     sum = sum + i;
// }

// alert('Сумма всех чисел: ' + sum);



// 2. Запросить 2 числа и найти только наибольший общий делитель.

// let a = prompt('Введите первое число:'),
//     b = prompt('Введите второе число:');

// let max = 0;
// if (a > b) { max = a } else max = b;

// let i = 1,
//     del_a = del_b = del_big = 0;
// while (i < +max + 1) {
//     if (a % i == 0) { del_a = i };
//     if (b % i == 0) { del_b = i };
//     if (del_a == del_b) { del_big = del_a };
//     i++;
// }

// alert('Наибольший общий делитель: ' + del_big);



// 3. Запросить у пользователя число и вывести все делители этого числа.

// let a = prompt('Введите число:');

// let del = '';
// for (let i = 1; i < +a + 1; i++) {
//     if (a % i == 0) { del = del + i + ' ' };
// }

// alert('Все делители числа: ' + del);



// 4. Определить количество цифр в введенном числе.

// let a = prompt('Введите число:');

// let n = 1;
// while ((a = Math.floor(a / 10)) > 0) { n++ };

// alert('Количество цифр в числе: '+ n)



// 5. Запросить у пользователя 10 чисел и подсчитать, сколько он ввел положительных, отрицательных и нулей. При этом также посчитать, сколько четных и нечетных. Вывести статистику на экран. Учтите, что достаточно одной переменной (не 10) для ввода чисел пользователем.

// let pos = neg = nol = even = noteven = a = 0;

// for (let i = 1; i < 11; i++) {
//     a = prompt('Введите ' + i + '-ое число:');
//     if (+a > 0) { pos += 1 };
//     if (+a < 0) { neg += 1 };
//     if (+a == 0) { nol += 1 };
//     if (+a % 2 == 0) { even += 1 } else noteven += 1;
// }

// alert('положительных: ' + pos + ', отрицательных: ' + neg + ', нулей: ' + nol + ', четных: ' + even + ', нечетных: ' + noteven);



// 6. Зациклить калькулятор. Запросить у пользователя 2 числа и знак, решить пример, вывести результат и спросить, хочет ли он решить еще один пример. И так до тех пор, пока пользователь не откажется.

// let a = b = zr = res = 0;
// do {
//     a = prompt('Введите первое число:'); if (a === null) { break; }
//     zr = prompt('Введите математический знак:'); if (zr === null) { break; }
//     b = prompt('Введите второе число:'); if (b === null) { break; }
//     switch (zr) {
//         case '+':
//             res = +a + +b;
//             alert('Полученный результат: ' + res);
//             break;
//         case '-':
//             res = +a - +b;
//             alert('Полученный результат: ' + res);
//             break;
//         case '*':
//             res = +a * +b;
//             alert('Полученный результат: ' + res);
//             break;
//         case '/':
//             res = +a / +b;
//             alert('Полученный результат: ' + res);
//             break;
//     }
// } while (confirm('Хотите решить ещё один пример?'));



// 7. Запросить у пользователя число и на сколько цифр его сдвинуть. Сдвинуть цифры числа и вывести результат (если число 123456 сдвинуть на 2 цифры, то получится 345612).

// let number = prompt("Введите число:");
// let p = prompt("На сколько цифр его сдвинуть?");

// alert(number.substring(p) + number.substring(0, p));



// 8. Зациклить вывод дней недели таким образом: «День недели. Хотите увидеть следующий день?» и так до тех пор, пока пользователь нажимает OK.

// let days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
// let i = -1;
// do {
//     if (i < 6) { i++ } else i = 0;
// } while (confirm(days[i] + '. Хотите увидеть следующий день?'));



// 9. Вывести таблицу умножения для всех чисел от 2 до 9. Каждое число необходимо умножить на числа от 1 до 10.

let sum = 0;
let text;
for (let a = 2; a < 10; a++){
    text = '';
    for (let z = 1; z < 11; z++){
        sum = a * z;
        text = text + a + ' * '+ z + ' = ' + sum + '     | ';
    }
    alert(text);
}
