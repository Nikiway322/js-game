
let gameover = false;
function GameOver(){
	keyPresses="";
	gameover = true;
	fight = false;
	let div = document.createElement("div");
	div.className = 'GameOver';
	div.id = "GameOver";

	div.innerHTML = '<div class="nameGG" id="nameGG"><p id="gg">GAME OVER</p></div>';
	document.body.prepend(div);
	let sizeFont = 50;
	let i = 1;
	setInterval(function(){
		if(i<=sizeFont){
			document.getElementById('gg').style.fontSize = i+'px';
			document.getElementById("GameOver").style.background = 'rgba(0,0,0,'+i/60+')';
			i++;
		}
	},50);

	setTimeout(function(){
		let divKey = document.createElement("p");
		document.getElementById('nameGG').append("press any key",divKey);
		document.body.addEventListener("keydown", restart);
	},2500);

}

function restart(){
	document.location.reload();
}
