// 1. Создать объект, описывающий автомобиль (производитель, модель, год выпуска, средняя скорость), и следующие функции для работы с этим объектом:
// Функция для вывода на экран информации об автомобиле;
// Функция для подсчета необходимого времени для преодоления переданного расстояния со средней скоростью. Учтите, что через каждые 4 часа дороги водителю необходимо делать перерыв на 1 час.

let auto = {
    manufacturer: 'BMW',
    model: 'E92',
    year: 2004,
    "average speed": 140,

    ShowInfo: function() {
        alert(
            'Производитель: ' + this.manufacturer + '\n' +
            'Модель: ' + this.model + '\n' +
            'Год выпуска: ' + this.year + '\n' +
            'Средняя скорость: ' + this["average speed"] + ' км/ч');
    },

    Timing: function(distance) {
        let hours = (distance / this["average speed"]).toFixed(2);
        let minutes = 0;
        if (!(Number.isInteger(+hours))) {
            let ostatok = 0;
            if (hours < 1) { ostatok = hours; }
            else ostatok = hours % Math.floor(hours);
            let minuti = ostatok * 60;
            minutes = Math.round(minuti);
        }
        hours = Math.floor(hours);

        let text = '';
        if ((hours > 4) || ((hours == 4) && (minutes > 0))) {
            let rest = Math.floor(hours / 4);
            hours += rest;
            text = ' с учетом отдыха';
        }

        alert('Время в пути' + text + ' составит: ' + hours + ' ч. ' + minutes + ' мин.');
    }
}

// // auto.ShowInfo(auto);   

// let a = prompt('Введите расстояние в км:');
// auto.Timing(a);



// 2. Создать объект, хранящий в себе отдельно числитель и знаменатель дроби, и следующие функции для работы с этим объектом: 
// Функция сложения 2-х объектов-дробей;
// Функция вычитания 2-х объектов-дробей;
// Функция умножения 2-х объектов-дробей;
// Функция деления 2-х объектов-дробей;
// Функция сокращения объекта-дроби.


function Fraction(numer, denom) {
    this.numer = Number(numer);     // numer - numerator, числитель
    this.denom = Number(denom);     // denom - denomirator, знаменатель
}

// ФУНКЦИЯ СЛОЖЕНИЯ
function addition(frac1, frac2) {
    let result_frac = new Fraction();

    // у дробей С ОДИНАКОВЫМИ ЗНАМЕНАТЕЛЯМИ складываются числители - это и есть сумма дробей
    if (frac1.denom == frac2.denom) { 
        result_frac.numer = frac1.numer + frac2.numer;
        result_frac.denom = frac1.denom;
    }
    else {
        /* алгоритм ДЛЯ РАЗНЫХ ЗНАМЕНАТЕЛЕЙ
        вначале ищем "наименьшее общее кратное" знаменателей (НОК или NOK) для обеих дробей */
        let arr_1 = [],
            arr_2 = [];
        let NOK = 1;
        for (let i = 1; i < 11; i++) {        // "таблица умножения" для первого знаменателя
            arr_1[i - 1] = frac1.denom * i;
        }
        for (let i = 1; i < 11; i++) {      // "таблица умножения" для второго знаменателя
            arr_2[i - 1] = frac2.denom * i;
            for (let y = 0; y < 10; y++) {   // сравнимаем и ищем наименьшее совпадение
                if (arr_2[i - 1] == arr_1[y]) {
                    NOK = arr_2[i - 1];
                    i = 10;
                    break;                    
                }
            }
        }
        /* теперь разделим НОК на знаменатель каждой дроби и получим "дополнительный множитель"
        (множитель - multiplier, MLPR) для каждой дроби
        */
        let MLPR1 = NOK / frac1.denom;
        let MLPR2 = NOK / frac2.denom;
        /* теперь нужно умножить числитель и знаменатель каждой дроби на их MLPR, таким образом 
        у них будет общий знаменатель, а значит можно прибавлять их числители */
        result_frac.numer = (frac1.numer * MLPR1) + (frac2.numer * MLPR2);
        result_frac.denom = frac1.denom * MLPR1;
    }
    alert(frac1.numer + '/' + frac1.denom + '  +  ' + frac2.numer + '/' + frac2.denom +
        ' = ' + result_frac.numer + '/' + result_frac.denom);
}



// ФУНКЦИЯ ВЫЧИТАНИЯ 
function subtraction(frac1, frac2) {
    let result_frac = new Fraction();

    // у дробей С ОДИНАКОВЫМИ ЗНАМЕНАТЕЛЯМИ вычитаются числители - это и есть разница дробей
    if (frac1.denom == frac2.denom) { 
        result_frac.numer = frac1.numer - frac2.numer;
        result_frac.denom = frac1.denom;
    }
    else {
        /* алгоритм ДЛЯ РАЗНЫХ ЗНАМЕНАТЕЛЕЙ
        вначале ищем "наименьшее общее кратное" знаменателей (НОК или NOK) для обеих дробей */
        let arr_1 = [],
            arr_2 = [];
        let NOK = 1;
        for (let i = 1; i < 11; i++) {        // "таблица умножения" для первого знаменателя
            arr_1[i - 1] = frac1.denom * i;
        }
        for (let i = 1; i < 11; i++) {      // "таблица умножения" для второго знаменателя
            arr_2[i - 1] = frac2.denom * i;
            for (let y = 0; y < 10; y++) {   // сравнимаем и ищем наименьшее совпадение
                if (arr_2[i - 1] == arr_1[y]) {
                    NOK = arr_2[i - 1];
                    i = 10;
                    break;                    
                }
            }
        }
        /* теперь разделим НОК на знаменатель каждой дроби и получим "дополнительный множитель"
        (множитель - multiplier, MLPR) для каждой дроби
        */
        let MLPR1 = NOK / frac1.denom;
        let MLPR2 = NOK / frac2.denom;
        /* теперь нужно умножить числитель и знаменатель каждой дроби на их MLPR, таким образом 
        у них будет общий знаменатель, а значит можно вычесть их числители */
        result_frac.numer = (frac1.numer * MLPR1) - (frac2.numer * MLPR2);
        result_frac.denom = frac1.denom * MLPR1;
    }
    alert(frac1.numer + '/' + frac1.denom + '  -  ' + frac2.numer + '/' + frac2.denom +
        ' = ' + result_frac.numer + '/' + result_frac.denom);
}



// ФУНКЦИЯ УМНОЖЕНИЯ 
function multiplication(frac1, frac2) {
    let result_frac = new Fraction();

    result_frac.numer = frac1.numer * frac2.numer;
    result_frac.denom = frac1.denom * frac2.denom;

    alert(frac1.numer + '/' + frac1.denom + '  *  ' + frac2.numer + '/' + frac2.denom +
        ' = ' + result_frac.numer + '/' + result_frac.denom);
}



// ФУНКЦИЯ ДЕЛЕНИЯ
function degree(frac1, frac2) {
    let result_frac = new Fraction();

    result_frac.numer = frac1.numer * frac2.denom;
    result_frac.denom = frac1.denom * frac2.numer;

    alert(frac1.numer + '/' + frac1.denom + '  /  ' + frac2.numer + '/' + frac2.denom +
        ' = ' + result_frac.numer + '/' + result_frac.denom);
}



// ФУНКЦИЯ СОКРАЩЕНИЯ объекта-дроби
function reduction(frac) {
    let result_frac = new Fraction();

    // Сначала находим НОД - наибольшой общий делитель числителя и знаменателя
    let a = frac.numer,
        b = frac.denom,
        NOD = 1;
    while ((a != 0) && (b != 0)) {
        if (a > b) { a = a % b; }
        else b = b % a;
    }
    NOD = a + b;

    // Теперь делим числитель и знаменатель на НОД - получаем сокращённый вариант дроби
    result_frac.numer = frac.numer / NOD;
    result_frac.denom = frac.denom / NOD;

    // Выделяем целую часть дроби, если таковая имеется
    let even = '';
    if (result_frac.numer / result_frac.denom > 1) {
        even = Math.floor(result_frac.numer / result_frac.denom);
        result_frac.numer = result_frac.numer % result_frac.denom;
    }
    
    // проверка на возможность превращения дроби в число
    if (result_frac.numer % result_frac.denom == 0) { 
        alert('Результат сокращения дроби ' + frac.numer + '/' + frac.denom + '  :  ' + even);
    }
    else  alert('Результат сокращения дроби ' + frac.numer + '/' + frac.denom +
        '  :  ' + even + '+' + result_frac.numer + '/' + result_frac.denom);
}


// alert('Сейчас вам предложат ввести поочерёдно две дроби. \nСначала числитель, затем знаменатель.\nТак для каждой дроби.');
// let /*fr1n = prompt('ПЕРВАЯ ДРОБЬ \nВведите числитель'),
//     fr1d = prompt('ПЕРВАЯ ДРОБЬ \nВведите знаменатель'),*/
//     fr2n = prompt('ВТОРАЯ ДРОБЬ \nВведите числитель'),
//     fr2d = prompt('ВТОРАЯ ДРОБЬ \nВведите знаменатель');

// let //fr1 = new Fraction(fr1n, fr1d),
//     fr2 = new Fraction(fr2n, fr2d);

// addition(fr1, fr2);
// subtraction(fr1, fr2);
// multiplication(fr1, fr2);
// degree(fr1, fr2);

// reduction(fr2);



// 3. Создать объект, описывающий время (часы, минуты, секунды), и следующие функции для работы с этим объектом: 
// Функция вывода времени на экран;
// Функция изменения времени на переданное количество секунд;
// Функция изменения времени на переданное количество минут;
// Функция изменения времени на переданное количество часов. 
// Учтите, что в последних 3-х функциях, при изменении одной части времени, может измениться и другая. Например, если ко времени «20:30:45» добавить 30 секунд, то должно получиться «20:31:15», а не «20:30:75».

function Time(hours, minutes, seconds) {
    this.hours = Number(hours);
    this.minutes = Number(minutes);
    this.seconds = Number(seconds);
}


// Функция вывода времени на экран;
function show_time(time) {
    if (time.minutes == 0) { time.minutes = '00'; }
    if (time.seconds == 0) { time.seconds = '00'; }
    if (time.hours > 23) { time.hours = 23; }
    if (time.minutes > 59) { time.minutes = 59; }
    if (time.seconds > 59) { time.seconds = 59; }
    alert('«' + time.hours + ':' + time.minutes + ':' + time.seconds + '»');
}



// Функция изменения времени на переданное количество СЕКУНД
function change_seconds(time, sec) {
    let clone_time = {}; // сохраняем изначальное время
    for (let key in time) { clone_time[key] = time[key]; }

    let d = 0,
        h = 0,
        m = 0;
    sec = +sec;
    time.seconds += sec;
    if (time.seconds >= 60) {    // проверяем корректность секунд
        m += Math.floor(time.seconds / 60);
        time.seconds -= m * 60;
        time.minutes += m;
    }
    if (time.minutes >= 60) {    // проверяем корректность минут
        h += Math.floor(time.minutes / 60);
        time.minutes -= h * 60;
        time.hours += h;
    }
    if (time.hours >= 24) {    // проверяем корректность часов
        d += Math.floor(time.hours / 24);
        time.hours -= d * 24;
        d += d;
    }
    if (time.minutes < 10) { time.minutes = '0' + time.minutes; }
    if (time.seconds < 10) { time.seconds = '0' + time.seconds; }
    if (d > 0) {
        alert('Изначальное время: «' + clone_time.hours + ':' + clone_time.minutes + ':' + clone_time.seconds +
        '»\n' + 'Изменённое время с учётом добавленных ' + sec + ' секунд: \n«' + d + ' дней и ' + time.hours +
        ':' + time.minutes + ':' + time.seconds + '»');
    }
    else alert('Изначальное время: «' + clone_time.hours + ':' + clone_time.minutes + ':' + clone_time.seconds +
        '»\n' + 'Изменённое время с учётом добавленных ' + sec + ' секунд: «' + time.hours +
        ':' + time.minutes + ':' + time.seconds + '»');
}



// Функция изменения времени на переданное количество МИНУТ
function change_minutes(time, min) {
    let clone_time = {}; // сохраняем изначальное время
    for (let key in time) { clone_time[key] = time[key]; }

    let w = 0,
        d = 0,
        h = 0;
    min = +min;
    time.minutes += min;
    if (time.minutes >= 60) {    // проверяем корректность минут
        h += Math.floor(time.minutes / 60);
        time.minutes -= h * 60;
        time.hours += h;
    }
    if (time.hours >= 24) {    // проверяем корректность часов
        d += Math.floor(time.hours / 24);
        time.hours -= d * 24;
    }
    if (d >= 7) {    // проверяем корректность дней
        w += Math.floor(d / 7);
        d -= w * 7;
    }
    if (time.minutes < 10) { time.minutes = '0' + time.minutes; }
    if (time.seconds < 10) { time.seconds = '0' + time.seconds; }
    if (w > 0) {    // если много недель
        alert('Изначальное время: «' + clone_time.hours + ':' + clone_time.minutes + ':' + clone_time.seconds +
            '»\n' + 'Изменённое время с учётом добавленных ' + min + ' минут: \n«' + w + ' недель, ' +
            d + ' дней и ' + time.hours + ':' + time.minutes + ':' + time.seconds + '»');
    } 
    else if (d > 0) {   // если много дней
        alert('Изначальное время: «' + clone_time.hours + ':' + clone_time.minutes + ':' + clone_time.seconds +
        '»\n' + 'Изменённое время с учётом добавленных ' + min + ' минут: \n«' + d + ' дней и ' + time.hours +
        ':' + time.minutes + ':' + time.seconds + '»');
    }       
    else alert('Изначальное время: «' + clone_time.hours + ':' + clone_time.minutes + ':' + clone_time.seconds +
        '»\n' + 'Изменённое время с учётом добавленных ' + min + ' минут: «' + time.hours +
        ':' + time.minutes + ':' + time.seconds + '»');
}



// Функция изменения времени на переданное количество ЧАСОВ
function change_hours(time, hours) {
    let clone_time = {}; // сохраняем изначальное время
    for (let key in time) { clone_time[key] = time[key]; }

    let m = 0,
        w = 0,
        d = 0;
    hours = +hours;
    time.hours += hours;
    if (time.hours >= 24) {    // проверяем корректность часов
        d += Math.floor(time.hours / 24);
        time.hours -= d * 24;
    }
    if (d >= 7) {    // проверяем корректность дней
        w += Math.floor(d / 7);
        d -= w * 7;
    }
    if (w >= 4) {    // проверяем корректность недель
        m += Math.floor(w / 4);
        w -= m * 4;
    }

    if (m > 0) {    // если много месяцев
        alert('Изначальное время: «' + clone_time.hours + ':' + clone_time.minutes + ':' + clone_time.seconds +
            '»\n' + 'Изменённое время с учётом добавленных ' + hours + ' часов: \n«' + m + ' месяцев, ' 
            + w + ' недель, ' + d + ' дней и ' + time.hours + ':' + time.minutes + ':' + time.seconds + '»');
    }     
    else if (w > 0) {    // если много недель
        alert('Изначальное время: «' + clone_time.hours + ':' + clone_time.minutes + ':' + clone_time.seconds +
            '»\n' + 'Изменённое время с учётом добавленных ' + hours + ' часов: \n«' + w + ' недель, ' +
            d + ' дней и ' + time.hours + ':' + time.minutes + ':' + time.seconds + '»');
    } 
    else if (d > 0) {   // если много дней
        alert('Изначальное время: «' + clone_time.hours + ':' + clone_time.minutes + ':' + clone_time.seconds +
        '»\n' + 'Изменённое время с учётом добавленных ' + hours + ' часов: \n«' + d + ' дней и ' + time.hours +
        ':' + time.minutes + ':' + time.seconds + '»');
    }
    else alert('Изначальное время: «' + clone_time.hours + ':' + clone_time.minutes + ':' + clone_time.seconds +
        '»\n' + 'Изменённое время с учётом добавленных ' + hours + ' часов: «' + time.hours +
        ':' + time.minutes + ':' + time.seconds + '»');
}




// alert('Пожалуйста введите поочерёдно показатели времени: часы, минуты и секунды. ' +
//     '\nВ случае неправильного ввода программа исправит данные автоматически');

// let h = prompt('Введите часы:'),
//     m = prompt('Введите минуты:'),
//     s = prompt('Введите секунды:');

let time = new Time(21, 12, 46);

// let sec = prompt('Введите секунды для изменения времени:');
// let min = prompt('Введите минуты для изменения времени:');
let hours = prompt('Введите часы для изменения времени:');

// showtime(time);
// change_seconds(time, sec);
// change_minutes(time, min);
change_hours(time, hours);