
let canvas = document.querySelector('canvas'); //находим канвас
canvas.width = document.body.clientWidth; //присваеваем ширину экрана
canvas.height = document.body.clientHeight; //присваеваем высоту экрана
let sizeBackCan = 0;
let backgroundCan = 'url("img/zemlay.png") 0px 100%/cover';
let bag = document.getElementById('fon');
bag.style.background = backgroundCan;
// canvas.style.backgroundSize = backSize;
let ctx = canvas.getContext('2d'); //Объявляем переменную для рисования 2d объектов

let img = new Image(); //создаем новый спрайт
img.src = 'img/sprite/hero.png'; //Присваеваем путь к спрайту
img.onload = function() { //Если рисунок загрузился выполняем функцию
	window.requestAnimationFrame(gameLoop); //идем к функции
};

const scale = 3; //размер
const width = 16; //ширина рисунка одного
const height = 18;//высота рисунка одного
const scaledWidth = scale * width; //Ширина нашего рисунка умноженная на размер
const scaledHeight = scale * height; //высота нашего рисунка умноженная на размер

let attackHero = 5;
let distanceAttackHero = 100;

let hasAttack = false;

let maxX = 0;

function drawFrame(frameX, frameY, canvasX, canvasY) { //Функция для отрисовки изображения на канвасе
  ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
  // (Картинка, Картинка.С.Какой.Ширины, Картинка.С.Какой.Высоты, Картинка.Сколько.Брать.Писелей.По.Ширина, Картинка.Сколько.Брать.Пикселей.Высота, X,Y,Пропорции.Ширина, Пропорции.Высота)
}

const cycleLoop = [0, 1, 0, 2]; //массив движений, в каком порядке выполнять
let currentLoopIndex = 0; //переменная, какой сейчас рисунок активный
let frameCount = 0;//счетчик количества кадров
let currentDirection = 0; //Какой ряд
let keyPresses = {}; //Нажатые кнопки за все время

const MOVEMENT_SPEED = 5;//Скорость персонажа
let hpHero = 100;


let positionX = 0; //Спавн позиция по X
let positionY = canvas.height -200; //Спавн позиция по Y

window.addEventListener('keydown', keyDownListener); //Если вы нажали на кнопку
function keyDownListener(event) {
    keyPresses[event.code] = true; //Добавляем в массив что кнопка нажата
}
window.addEventListener('keyup', keyUpListener); //Если отпустили кнопку
function keyUpListener(event) {
    keyPresses[event.code] = false; //Ставим кнопку неактивной
}

let jump = false; //прыгает персанаж
let attack = false; //Атакует

const maxJamp = 25; //Высота прыжка

const FRAME_LIMIT = 12; //количество кадров, зависит от анимации
function gameLoop() { //Главная функция
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Каждый кадр очищаем канвас
	let hasMoved = false; //Движение делаем неактивным

	if (keyPresses.KeyD) { //Если нажата клавиша D
		moveCharacter(MOVEMENT_SPEED, 0, 3); //Отправляем на анимацию (ПоложениеY,ПоложениеX,СтрокаSpriteAnimation)
		hasMoved = true; //Делаем что наш персанаж двигается
		
	} else if (keyPresses.KeyA) { //Если нажата клавиша A
		moveCharacter(-MOVEMENT_SPEED, 0, 2); //Отправляем на анимацию (ПоложениеY,ПоложениеX,СтрокаSpriteAnimation)
		hasMoved = true;						//Делаем что наш персанаж двигается
	}
	if(keyPresses.Space) { //если нажат пробел
		moveCharacter(0, maxJamp); //Запускаем анимацию прыжка
		hasMoved = true;	
	}


	if(keyPresses.Enter) { //Если нажат ENTER 
		if(currentDirection == 2){
			currentDirection = 5;
		}else if(currentDirection == 3){
			currentDirection = 4;
		}
		moveCharacter(0,0,currentDirection); //Запускем
		hasMoved = true;  //анимация
		
	}else{
		if(currentDirection == 4 ){
			currentDirection = 3;
		}else if(currentDirection == 5){
			currentDirection = 2;
		}
	}

	if(keyPresses.Digit1 && massSkill[0] == 0){
		useSkill(0);
	}else if(keyPresses.Digit2 && massSkill[1] == 0){
		useSkill(1);
	}else if(keyPresses.Digit3 && massSkill[2] == 0){
		useSkill(2);
	}else if(keyPresses.Digit4 && massSkill[3] == 0){
		useSkill(3);
	}



	if (hasMoved) { //Если есть движение
    	frameCount++; //Прибавляем фпс
    	if (frameCount >= FRAME_LIMIT) { //Если у нас уже привысело лимита
    		frameCount = 0; //Обнуляем
    		currentLoopIndex++; //прибавляем следующую анимацию
    		if (currentLoopIndex >= cycleLoop.length) { //Если у нас закончились анимации
        		currentLoopIndex = 0; //Обновляем и начинаем заного
      		}
    	}
  	}else if(gameover){
  		frameCount++; //Прибавляем фпс
  		currentDirection = 6;
    	if (frameCount >= FRAME_LIMIT) { //Если у нас уже привысело лимита
    		frameCount = 0; //Обнуляем
    		currentLoopIndex++; //прибавляем следующую анимацию
    		if (currentLoopIndex >= cycleLoop.length) { //Если у нас закончились анимации
        		currentLoopIndex = cycleLoop.length-1; //Обновляем и начинаем заного
      		}
    	}
  	}else{//если у нас нет движения(нет нажатых кнопок)
  		currentLoopIndex = 0; 
  	}
  	drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);//Отправляем нашу анимацию
  	window.requestAnimationFrame(gameLoop); //запускаем заного
}


function moveCharacter(deltaX, deltaY, direction) {


	if(fight == false){
		if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width/2) {
			positionX += deltaX;
			if(deltaX > 0 && maxX < positionX){
				addDistance(deltaX);
				maxX = positionX;
			}
			
		}else{
	  	maxX = positionX;
	  		if(positionX > 5 && positionX + scaledWidth < canvas.width/2 ){
	  			addDistance(deltaX);
		  		sizeBackCan -= deltaX;
				backgroundCan = 'url("img/zemlay.png") '+sizeBackCan+'px 100% / cover';
				bag.style.background = backgroundCan;
			}else if ( positionX + scaledWidth > canvas.width/2 ){
				// moveCharacter(5,0,direction);
				if(deltaX>0){
					positionX -= deltaX;
					sizeBackCan -= deltaX;
					backgroundCan = 'url("img/zemlay.png") '+sizeBackCan+'px 100% / cover';
					bag.style.background = backgroundCan;
				}
			}
		}
	}else{
		if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width) {
			positionX += deltaX;
		}
	}
	if(direction == 4 && (widthEnemy - positionX >= 0 && widthEnemy - positionX <= distanceAttackHero)){
		hpEnemy -= attackHero/100;
		HPEnemy();
	}else if (direction == 5 && (widthEnemy - positionX < 0  && widthEnemy - positionX >= -distanceAttackHero)){
		hpEnemy -= attackHero/100;
		HPEnemy();
	}

	if (deltaY > 0  && jump == false) {	
		
		jump = true;
		positionY -= deltaY;
		setTimeout(function(){
			positionY += deltaY;
		},300);	
		setTimeout(function(){
			jump = false;
		},500);
	}


	if(direction != undefined){
		currentDirection = direction;
	}
}



