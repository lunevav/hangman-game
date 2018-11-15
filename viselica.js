const viselica = [
    {
        question: 'Благодаря втачным клиньям эта юбка подчеркивает линию бедра, а название фасона отсылает к французскому слову стопка — та, что для вина. Скажите, что за юбка?',
        answer: 'ГОДЕ'
    },
    {
        question: 'Гусарские парадные брюки изготовлялись из кожи лося и надевались на тело мокрыми: иначе не получалось. В XX веке лосины — они же легинсы — вернулись в моду, причем в женскую, причем сразу на показе Chanel. Кто был этот смелый модельер?',
        answer: 'ЛАГЕРФЕЛЬД'
    },
    {
        question: 'Главный химик компании Du Pont в 1935 году синтезировал материал, перевернувший мир моды. Чулки из него берегли как драгоценность: появились даже мастерские по поднятию петель. В Америке этот материал назывался нейлон, а в России?',
        answer: 'КАПРОН'
    },
    {
        question: 'Этот предмет одежды в Киеве называли «гольф», в Тбилиси «ролингстон», а в Ленинграде «бадлон». Его носили Джон Леннон, Эрнест Хемингуэй, Элвис Пресли, Твигги, Андрей Миронов и Стив Джобс. Что это такое?',
        answer: 'ВОДОЛАЗКА'
    },
    {
        question: 'Обод с минутной шкалой вокруг циферблата был придуман для пилотов-штурмовиков и водолазов: им фиксировалась нулевая отметка боевого вылета или погружения. Сейчас такой обод можно увидеть на спортивных часах. Как он называется?',
        answer: 'БЕЗЕЛЬ'
    },
    {
        question: 'Солнце, слепившее глаза Джону Маккриди, помешало установить новый рекорд воздухоплавания. Другие американские летчики тоже жаловались на блики. В 1937 году специально для пилотов были созданы очки каплевидной формы марки Ray Ban. Назовите модель?',
        answer: 'АВИАТОРЫ'
    },
    {
        question: 'Колье, плотно охватывающие шею, чрезвычайно популярны у женщин, хотя название этого украшения переводится просто как «душитель». Как же оно звучит?',
        answer: 'ЧОКЕР'
    },
    {
        question: 'Ангорскую шерсть раньше поставляли только одноименные козы. Теперь аналогичный по длине и нежности ворс состригают и у другого животного, тоже ангорского. Кто это?',
        answer: 'КРОЛИК'
    },
    {
        question: 'Мелкие подвески на браслетах известны со времен Древнего Египта, но теперь это уже не амулеты, а знаки отличия, которые отражают увлечения и характер. Подскажем, что название происходит от слова «шарм» — угадаете?',
        answer: 'ЧАРМ'
    },
    {
        question: 'Популярная ныне древнеримская одежда, которая слишком коротка, чтобы считаться платьем, но слишком длинна, чтобы называться блузкой. Что это?',
        answer: 'ТУНИКА'
    },    
];

const question = document.getElementById('question');
const answer = document.getElementById('answer');
const drawing = document.getElementById('drawing');
const buttons = document.getElementsByTagName('button');

let index;
let wrongAnswersLeft = 7;

function startGame(){
    //ОБНУЛЯЕМ ВИСИЛИЦУ
    drawing.src = "img/0.png";
    wrongAnswersLeft = 7;
    
    //АКТИВИРУЕМ КНОПКИ
    for (let i=1; i < buttons.length; i++){
        buttons[i].disabled = false;
    }

    //УДАЛЯЕМ БУКВЫ С ПРОШЛОГО РАУНДА
    while (answer.firstChild) {
        answer.removeChild(answer.firstChild);
    }

    //ВЫБИРАЕМ РАНДОМНЫЙ ВОПРОС И ВЫВОДИМ НА ЭКРАН
    index = Math.floor(Math.random() * viselica.length);
    question.innerHTML = viselica[index].question;
    
    //РИСУЕМ ЗАГОТОВКИ ПОД ОТВЕТ
    let letters = [];
    for (let i=0; i< viselica[index].answer.length; i++){
        letters[i] = document.createElement('div');
        letters[i].id = `div${i}`;
        letters[i].className = "m-1 border border-primary display-4 text-center";
        letters[i].style.maxWidth = '55px';
        letters[i].style.minWidth = '55px';
        letters[i].style.minHeight = '67px';
        letters[i].style.maxHeight = '67px';
        answer.appendChild(letters[i]);
    }

}


function clickButton(e){
    e.disabled = true;

    //ЕСЛИ БУКВА ЕСТЬ - РИСУЕМ БУКВУ
    for (let i = 0; i < viselica[index].answer.length; i++){
        if (viselica[index].answer[i] === e.value) {
            const p = document.getElementById(`div${i}`);
            p.innerHTML = e.value;
        } 
    }

    //ЕСЛИ БУКВЫ НЕТ - РИСУЕМ ВИСИЛИЦУ
    if(viselica[index].answer.indexOf(e.value) === -1) {
        wrongAnswersLeft--;
        drawViselica(wrongAnswersLeft);
    }

    //ПРОВЕРЯЕМ, НЕ ПРОИГРАЛИ ЛИ МЫ УЖЕ
    if (wrongAnswersLeft === 0){
        alert(`ПОТРАЧЕНО! Правильный ответ - ${viselica[index].answer}`);
        for (let i=1; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }

    //ПРОВЕРЯМ, НЕ ПОБЕДИЛИ ЛИ МЫ УЖЕ
    let numberOfCorrectChars = 0; 
    for (let i=0; i < viselica[index].answer.length; i++){
        if (document.getElementById(`div${i}`).innerHTML.length > 0) {
            numberOfCorrectChars++;
        }
    }
    if (numberOfCorrectChars === viselica[index].answer.length){
        alert("ПОБЕДА");
        for (let i=1; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }
    
}


function drawViselica(wrongAnswersLeft){
    console.log(wrongAnswersLeft);
    switch (wrongAnswersLeft) {
        case 7: drawing.src = "img/0.png"; break;
        case 6: drawing.src = "img/1.png"; break;
        case 5: drawing.src = "img/2.png"; break;
        case 4: drawing.src = "img/3.png"; break;
        case 3: drawing.src = "img/4.png"; break;
        case 2: drawing.src = "img/5.png"; break;
        case 1: drawing.src = "img/6.png"; break;
        case 0: drawing.src = "img/7.png"; break;
        default: drawing.src = ""; break;
    }

}