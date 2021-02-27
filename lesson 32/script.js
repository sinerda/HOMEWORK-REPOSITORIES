function getJson() {
    let input = document.querySelector('.input');
    // проверяем input на наличие текста
    if (input.value == '') {
        alert('Пожалуйста введите название фильма для поиска!');
        input.focus();
    } else {
        let select = document.querySelector('.type-search');
        let type = select.options[select.selectedIndex].text;
        
        // формируем url исходя из введённых данных
        let url = `http://www.omdbapi.com/?apikey=bf6160be&r=json&s=${input.value}&type=${type}`;

        fetch(url)
        .then(function (response) {
            return response.json()
        })
            .then(function (json) {
            let pages = document.querySelector('.pages');
            // очищаем список фильмов оставшийся от предыдущего поиска
            let list = document.querySelector('.list');
            list.innerHTML = '';

            // при получении от сервера "not found" выводим сообщение об ошибке
            if (json.Response == 'False') {
                let item = document.createElement('p');
                item.classList.add('not-found');
                item.innerText = `К сожалению, по запросу "${input.value}" ничего не найдено. :(\n\n    Попробуйте ввести другой запрос либо выберите другую категорию поиска (movie, series, episode)`;
                list.append(item);

                pages.style.visibility = 'hidden';
            } else {
                // выводим СПИСОК фильмов через json С ПОМОЩЬЮ <H3>
                let movies = json.Search;
                for (let i = 0; i < movies.length; i++) {
                    // создаём "обёртку" <DIV>
                    let wrap = document.createElement('div');
                    wrap.classList.add('wrap-h3');

                    // создаём <H3>
                    let h3 = document.createElement('h3');
                    h3.innerHTML = `${(i + 1)}. ${movies[i].Title}, ${movies[i].Year}`;
                    // добавляем к каждой строке фильма его ID в сервисе OMDB API
                    // он понадобится для дальнейшей реализации отображения деталей по каждому фильму
                    // h3.dataset.id = movies[i].imdbID;

                    // создаём <BUTTON> DETAILS
                    let button = document.createElement('button');
                    button.classList.add('btn-details');
                    button.innerText = 'Details';
                    button.dataset.id = movies[i].imdbID;

                    // цепляем событие к кнопкам DETAILS
                    button.addEventListener('click', function (e) {
                        if (e.target.nodeName == "BUTTON") {
                            let film_id = e.target.dataset.id;
                            getDetails(film_id);
                        }
                    })

                    // добавляем все элементы в HTML
                    wrap.append(h3);
                    wrap.append(button);
                    list.append(wrap);
                }

                
                // Если результатов поиска МЕНЬШЕ 10
                if (json.totalResults < 10) {
                    pages.style.visibility = 'hidden';
                }

                // 
                // Если результатов поиска больше 10-ти
                // ДОБАВЛЯЕМ КНОПКИ для переключения страниц
                if (json.totalResults > 10) {
                    pages.style.visibility = 'visible';
                    
                    // Количество страниц
                    let quan_of_pages = Math.ceil(json.totalResults / 10);
                    // Общее число результатов поиска
                    let quan_of_results = json.totalResults;

                    // очищаем список кнопок от предыдущего поиска
                    pages.innerHTML = '';

                    
                    // ЕСЛИ страниц МЕНЬШЕ чем 15
                    // if (quan_of_pages < 15) {
                        for (let i = 1; i < quan_of_pages + 1; i++) {
                            let button = document.createElement('button');

                            // присваиваем кнопке название и DATASET.ID, по которому находим каждую кнопку
                            button.dataset.id = button.innerHTML = i;
                            button.classList.add('page-num');
                                                    
                            // добавляем класс для "активной" кнопки
                            if (i == 1) { button.classList.add('one'); }
                            pages.append(button);
                        
                            // цепляем событие к кнопкам
                            button.addEventListener('click', function (e) {
                            if (e.target.nodeName == "BUTTON") {
                                id = e.target.dataset.id;
                                getPages(id, quan_of_pages, quan_of_results);
                                }
                            })
                        }
                    // }
                    /*if (quan_of_pages > 15) {
                        for (let i = 1; i < 16; i++) {
                            let button = document.createElement('button');

                            // присваиваем кнопке название и DATASET.ID, по которому находим каждую кнопку
                            button.dataset.id = button.innerHTML = i;
                            button.classList.add('page-num');
                                                    
                            // добавляем класс для "активной" кнопки
                            if (i == 1) { button.classList.add('one'); }
                            pages.append(button);

                            // определяем значения текущего диапазона кнопок для дальнейшей
                            // реализации "прокрутки" блоков страниц (когда страниц больше 20-ти)
                            if (i == 1) { diap_first = i; }
                            if (i == 15) { diap_second = i; }
                        
                            // цепляем событие к кнопкам
                            button.addEventListener('click', function (e) {
                            if (e.target.nodeName == "BUTTON") {
                                id = e.target.dataset.id;
                                getPages(id, quan_of_pages, quan_of_results, diap_first, diap_second);
                                }
                            })
                        }
                    } */
                }
            }
        })
    }
}

// 
// 
// КНОПКИ 
// СО 
// СТРАНИЦАМИ
// 
// id - текущая страница
// quan_of_pages - всего страниц
// quan_of_results - всего результатов поиска
// diap_first, diap_second - текущий диапазон страниц на экране
// 
function getPages(id, quan_of_pages, quan_of_results) {
    let input = document.querySelector('.input'),
        select = document.querySelector('.type-search'),
        type = select.options[select.selectedIndex].text,
        url = `http://www.omdbapi.com/?apikey=bf6160be&r=json&s=${input.value}&type=${type}&page=${id}`;
    
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            // 
            // 
            let main = document.querySelector('.main');
            let list_wrap = main.querySelectorAll('.wrap-h3');
            let list_h3 = main.querySelectorAll('.wrap-h3 h3');
            let list_button = main.querySelectorAll('.btn-details');

            // // очищаем список фильмов оставшийся от предыдущего поиска
            // let list = document.querySelector('.list');
            // list.innerHTML = '';

            // 
            // Формирование списка фильмов на последней странице.
            // Так как количество фильмов здесь может быть меньше 10-ти, то
            // делаем ненужные элементы невидимыми.
            if (id == quan_of_pages) {
                let num = id * 10 - quan_of_results;

                for (let i = 9; num > 0; i--) {
                    list_wrap[i].style.visibility = 'hidden';
                    list_h3[i].style.visibility = 'hidden';
                    num--;
                }
            }

            // 
            // МЕНЯЕМ СПИСОК ФИЛЬМОВ при изменении номера страницы
            let movies = json.Search;
            for (let i = 0; i < movies.length; i++) {
                list_h3[i].innerHTML = '';
                list_h3[i].innerHTML = `${((id - 1) * 10 + i + 1)}. ${movies[i].Title}, ${movies[i].Year}`;

                // меняем id в <h3> и <button> 
                // list_h3[i].dataset.id = movies[i].imdbID;
                list_button[i].dataset.id = movies[i].imdbID;

                // кладём каждый фильм в обёртку wrap
                list_wrap[i].prepend(list_h3[i]);

                // делаем видимыми пункты, которые могли быть ранее скрытыми на последней странице
                list_wrap[i].style.visibility = 'visible';
                list_h3[i].style.visibility = 'visible';
            }

            // 
            // 
            // 
            // СТРАНИЦЫ
            // меняем активную кнопку
            let list_buttons = document.querySelectorAll('.page-num');

            // if (quan_of_pages < 15) {
                if (list_buttons[0].classList.contains('one')) {
                        list_buttons[0].classList.remove('one');
                    }

                for (let i = 0; i < list_buttons.length; i++) {
                    if (list_buttons[i].classList.contains('active')) {
                        list_buttons[i].classList.remove('active');
                    }
                }

                for (let i = 0; i < list_buttons.length; i++) {
                    if (+id - 1 == 0) {
                        list_buttons[i].classList.add('one');
                        break;
                    } else if (i == +id - 1) {
                        list_buttons[i].classList.add('active');
                        break;
                    }
                }
            // }

            /*if (diap_first != 0) {
                // 
                // определяем сколько ещё страниц остаётся в списке после тек. диапазона
                let remaining = quan_of_pages - diap_second;
                // определяем расстояние от нажатой кнопка до конца диапазона
                let to_the_last = diap_second - id;

                // 
                // если нажатая кнопка далеко от конца диапазона, тогда стандартным методом
                // меняем активную кнопку на другую 
                if (to_the_last >= 3) {
                    if (list_buttons[0].classList.contains('one')) {
                        list_buttons[0].classList.remove('one');
                    }

                    for (let i = 0; i < list_buttons.length; i++) {
                        if (list_buttons[i].classList.contains('active')) {
                            list_buttons[i].classList.remove('active');
                        }
                    }

                    for (let i = 0; i < list_buttons.length; i++) {
                        if (+id - 1 == 0) {
                            list_buttons[i].classList.add('one');
                            break;
                        } else if (i == +id - 1) {
                            list_buttons[i].classList.add('active');
                            break;
                        }
                    }
                }

                // 
                // если нажатая кнопка близко к концу диапазона, тогда меняем значения всех кнопок, 
                // т.е. меняем диапазон
                if (to_the_last < 3 && to_the_last > 0) {
                    // 
                    // 
                    diap_first = id - 1;
                    diap_second = diap_first + 15;

                    // убираем активную кнопку
                    for (let i = 0; i < list_buttons.length; i++) {
                        if (list_buttons[i].classList.contains('active')) {
                            list_buttons[i].classList.remove('active');
                        }
                    }

                    for (let i = 0; i < list_buttons.length; i++) {
                        // присваиваем кнопке название и DATASET.ID, по которому находим каждую кнопку
                        list_buttons[i].dataset.id = list_buttons[i].innerHTML = i + diap_first;
                                                
                        // добавляем класс для "активной" кнопки
                        if (i == id - diap_first) { list_buttons[i].classList.add('active'); }

                        // // удаляем предыдущий обработчик событий
                        // list_buttons[i].removeEventListener("click", function (e) {
                        // if (e.target.nodeName == "BUTTON") {
                        //     id = e.target.dataset.id;
                        //     getPages(id, quan_of_pages, quan_of_results, diap_first, diap_second);
                        //     }
                        // })
                    
                        // // цепляем событие к кнопкам
                        // list_buttons[i].addEventListener('click', function (e) {
                        // if (e.target.nodeName == "BUTTON") {
                        //     id = e.target.dataset.id;
                        //     getPages(id, quan_of_pages, quan_of_results, diap_first, diap_second);
                        //     }
                        // })
                    }
                }

            }*/















            // let number_pages = Math.ceil(json.totalResults / 10);
            // let button = document.querySelectorAll('.page-num');
            // let min = +id - 2,
            //     max = +id + 3,
            //     a = +id;

            // // для ситуации В КОНЦЕ СПИСКА
            // if (number_pages - a < 3) {
            //     // num - количество "лишних" кнопок
            //     let num = (a + 3) - number_pages;
            //         // start = number_pages - 5;
            //     for (let i = 0; i < 5 - num; i++) {
            //         let item = button[i];
            //         item.dataset.id = item.innerHtml = min;
            //         min++;
                
            //         if (item.classList.contains('active')) {
            //             item.classList.remove('active');
            //         }
            //     }
            //     button[a - 1].classList.add('active');
            //     // Отключаем "лишние" кнопки
            //     for (let i = 5; num === 0; i--) {
            //         button[i].style.display = 'none';
            //         num--;
            //     }
            // }
        
            // // для ситуации В НАЧАЛЕ СПИСКА
            // if (a < 3) {
            //     for (let i = 1; i < 5; i++) {
            //         let item = button[i - 1];
            //         item.dataset.id = item.innerHTML = i;
            //         if (item.classList.contains('active')) {
            //             item.classList.remove('active');
            //         }
            //         if (item.classList.contains('one')) {
            //             item.classList.remove('one');
            //         }
            //     }
            //     button[a - 1].classList.add('active');
            //     if (a == 1) {
            //         button[a - 1].classList.add('one');
            //     }
            //     console.log(button[a - 1].className);
            // // для ситуации В СЕРЕДИНЕ
            // } else {
            //     for (let i = 0; i < 5; i++) {
            //         let item = button[i];
            //         item.dataset.id = item.innerHTML = min;
            //         min++;
            //         if (item.classList.contains('active')) {
            //             item.classList.remove('active');
            //         }
            //         if (item.classList.contains('one')) {
            //             item.classList.remove('one');
            //         }
            //         if (i == 2) {
            //             button[2].classList.add('active');
            //         }
            //     }
            // } 
        })
}


// function btnForward() {
//     let list_buttons = document.querySelectorAll('.page-num');

//     for (let i = 0; i < list_buttons.length; i++) {
//         // присваиваем кнопке название и DATASET.ID, по которому находим каждую кнопку
//         list_buttons[i].dataset.id = list_buttons[i].innerHTML = i + diap_first;
//     }
// }



// 
// 
// КНОПКА 
// DETAILS
// 
// Получение детальной информации по конкретному фильму 
function getDetails(id) {
    let url = `http://www.omdbapi.com/?apikey=bf6160be&r=json&i=${id}`;

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            // 
            
            let modal = document.querySelector('.modal');
            let div = document.querySelector('.modal .list-info');
            let title = div.querySelector('.info__title'); 
                        

            // загружаем постер
            let img = modal.querySelector('.poster img');
            if (json.Poster != 'N/A') {
                img.src = `${json.Poster}`;
            // либо показываем картинку об отсутствии постера
            } else img.src = "pic-not-found.png";

            // кадрируем картинки не стандартных размеров,
            // чтобы они вписывались в дизайн
            img.onload = function() {
                let width = img.width;
                if (width > 250) {
                    let figure = modal.querySelector('.poster');
                    figure.style.overflow = 'hidden';
                    img.style.margin = '0 -30%';
                }
                // показываем модальное окно только когда картинка загрузилась,
                // чтобы не было "моргания" при загрузке
                modal.style.visibility = 'visible';
            };
            
            // загружаем название фильма и год в заголовок модалки
            title.innerHTML = `${json.Title}, ${json.Year}`;
            div.prepend(title);    

            // очищаем информацию о фильмах от предыдущего поиска
            let list_of_text = div.querySelectorAll('.text');
            for (let i = 0; i < 15; i++) {
                list_of_text[i].innerHTML = '';
            }

            // загружаем основную информацию по фильму, исключая 
            // ненужную в данный момент
            let i = +0;                 
            for (let key in json) {
                if (key == "Title" || key == "Year" || key == "Poster" ||
                    key == "Ratings" || key == "Metascore" || key == "imdbRating" ||
                    key == "imdbVotes" || key == "imdbID" || key == "Website" ||
                    key == "Response") continue;
                list_of_text[i].innerHTML = `<span>${key}</span>: ${json[key]}`;
                i++;
            }

            // очищаем информацию о рейтингах от предыдущего поиска
            let rat_div = document.querySelector('.modal .rating');
            let list_of_rating = rat_div.querySelectorAll('.text');
            for (let i = 0; i < 5; i++) {
                list_of_rating[i].innerHTML = '';
            }

            // 
            // загружаем информацию по рейтингам:
            let list_of_ratings = rat_div.querySelectorAll('.text');
            // сначала грузим из отдельного массива Ratings ...
            let rat = json.Ratings;
            for (let i = 0; i < 3; i++) {
                list_of_ratings[i].innerHTML = `<span>${rat[i].Source}</span>: ${rat[i].Value}`;
            }
            // ... затем оставшиеся рейтинги из общего json-а
            let t = +3;
            for (let key in json) {
                if (key == "Metascore" || key == "imdbRating") {
                    list_of_ratings[3].innerHTML = `<span>${key}</span>: ${json[key]}`;
                    t++;
                }
            }
    })
}

// 
// ЗАКРЫТЬ МОДАЛЬНОЕ ОКНО
function Close() {
    let modal = document.querySelector('.modal');
    modal.style.visibility = 'hidden';

    // убираем постер от предыдущего поиска для более плавной загрузки 
    // картинки в следующем поиске
    let poster = modal.querySelector('.poster img');
    poster.src = '';
    
    // сбрасываем стили для картинок не стандартных размеров
    poster.style.margin = '';
    let figure = modal.querySelector('.poster');
    figure.style.overflow = 'none';
}


// 
// ОБРАБОТЧИКИ НАЖАТИЯ КЛАВИШ
document.addEventListener('keydown', function showTextArea(event) {
    if (event.code == 'Enter') {
        event.preventDefault();
        getJson();
    }
})

document.addEventListener('keydown', function showTextArea(event) {
    if (event.code == 'Escape') {
        event.preventDefault();
        Close();
    }
})