let IdEnemy =0;
let imageEnemy;
let speedEnemy;
let attackEnemy;
let distanceAttackEnemy;
let dieEnemy = false;
let spawnEnemy = false
let hpEnemy;
//
let widthEnemy = 0;
let heightEnemy = canvas.height-200;
let fight = false;
//
const FRAME_LIMIT_enemy = 12;
let frameCountEnemy = 0;
let enemyAnim = 0;
let cycleLoopEnemy = [0, 1, 0, 2];
let positionEnemy = 0;



function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}



let polozenie = widthEnemy;
function startSpawnEnemy(){
	// let i =randomInteger(1000,10000);
	if(spawnEnemy == false){
		// setTimeout(startSpawnEnemy,i);
		spawnEnemy = true;
		dieEnemy = false;
		fight = false;
		positionEnemy = 0;
		enemyAnim = 0;
		widthEnemy = randomInteger(positionX + 1000 + (-sizeBackCan), positionX + 2000 + (-sizeBackCan));
		polozenie = widthEnemy;

		var ajax = $.ajax({
    		type: 'POST',
    		url: 'json/enemy.json',
    		async: false, // выполнение кода только после ответа от Ajax-запроса
   			success:function (data) {
    			imageEnemy = data.enemy[IdEnemy].img;
    			speedEnemy = data.enemy[IdEnemy].speed;
    			attackEnemy = data.enemy[IdEnemy].attack;
    			hpEnemy = data.enemy[IdEnemy].hp;
    			distanceAttackEnemy =  data.enemy[IdEnemy].distanceAttack;
    		}	
		});
		window.requestAnimationFrame(EnemySpawn);

	}
}
startSpawnEnemy();






let enemy = new Image(); //создаем новый спрайт
enemy.src = imageEnemy; //Присваеваем путь к спрайту
enemy.onload = function() { //Если рисунок загрузился выполняем функцию
	window.requestAnimationFrame(EnemySpawn); //идем к функции
};



function drawFrameEnemy(frameX, frameY, canvasX, canvasY) { //Функция для отрисовки изображения на канвасе
  ctx.drawImage(enemy, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
  // (Картинка, Картинка.С.Какой.Ширины, Картинка.С.Какой.Высоты, Картинка.Сколько.Брать.Писелей.По.Ширина, Картинка.Сколько.Брать.Пикселей.Высота, X,Y,Пропорции.Ширина, Пропорции.Высота)
}



function EnemySpawn(){
	if (dieEnemy == false){
		if (fight == false && gameover == false){
			if(sizeBackCan == 0){
				widthEnemy = polozenie;
			}else{
				widthEnemy = polozenie+sizeBackCan;
			}
		}
		if((widthEnemy- positionX <= 150 || fight == true) && gameover == false){
			fight = true;
			if(positionX >= widthEnemy){
				moveEnemy(speedEnemy, 3);
			}else{
				moveEnemy(-speedEnemy, 2);
			}
		}
	}


	if (fight) { //Если есть движение
		frameCountEnemy++;
		if (frameCountEnemy >= FRAME_LIMIT_enemy){
			frameCountEnemy = 0;
			enemyAnim ++;
			if (enemyAnim >= cycleLoopEnemy.length){
				enemyAnim = 0;
			}
		}
	}else if(gameover){
		frameCountEnemy++;
		if (frameCountEnemy >= FRAME_LIMIT_enemy){
			frameCountEnemy = 0;
			enemyAnim ++;
			if (enemyAnim >= cycleLoopEnemy.length){
				enemyAnim = 0;
				positionEnemy = 6;
			}
		}
	}else if(dieEnemy){
		fight = false;
		positionEnemy = 7;
		frameCountEnemy++;
		if (frameCountEnemy >= FRAME_LIMIT_enemy){
			frameCountEnemy = 0;
			enemyAnim ++;
			if (enemyAnim >= cycleLoopEnemy.length){
				enemyAnim = cycleLoopEnemy.length-1;

			}
			spawnEnemy = false;
		}
	}
	if(spawnEnemy == true){
   		drawFrameEnemy(cycleLoopEnemy[enemyAnim], positionEnemy ,widthEnemy , heightEnemy);//Отправляем нашу анимацию
   		window.requestAnimationFrame(EnemySpawn); //запускаем заного
	}else{
		startSpawnEnemy();
	}
	
}

function moveEnemy(deltaX, direction){
	
	if((widthEnemy -positionX >= -distanceAttackEnemy && widthEnemy -positionX <= 0)){
		positionEnemy = 4;
		hpHero -= attackEnemy/100;
		hp();
	}else if(widthEnemy - positionX > 0 && widthEnemy - positionX <= distanceAttackEnemy){
		positionEnemy = 5;
		hpHero -= attackEnemy/100;
		hp();
	}else{
		positionEnemy = direction;
		widthEnemy += deltaX;
	}
}


function HPEnemy(){
	if(hpEnemy <= 0){
		fight = false;
		dieEnemy = true;
	}
	console.log(hpEnemy);
}