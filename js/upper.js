let distance = 0;
let Timer = 0;

function addDistance(px) {
	distance += px/100;
	document.getElementById('distance').innerHTML = distance.toFixed(0);
}

setInterval(function(){
	Timer ++;
	let fullTimer;
	let hours = 0;
	let minut = 0;
	let second = 0;
	hours = Math.trunc(Timer/60/60).toFixed(0);
	minut = Math.trunc((Timer-(hours*60*60))/60).toFixed(0);
	second = Math.trunc((Timer-(hours*60*60)-(minut*60))).toFixed(0);

	if(hours.length == 1){
		hours = "0"+hours;
	}
	if(minut.length == 1){
		minut = "0"+minut;
	}
	if(second.length == 1){
		second = "0"+second;
	}
	fullTimer = hours + ":" + minut + ":" + second;

	document.getElementById('timer').innerHTML = fullTimer;
},1000);

function hp(){
	document.getElementById('HP').innerHTML = hpHero.toFixed(0) + "HP";
	document.getElementById("colorHP").style.width = hpHero +'%';
	if(hpHero <= 0){
		GameOver();
	}
}

