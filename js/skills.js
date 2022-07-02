let idSkill;
let damage;
let cooldow;
let level;
let massSkill = [];

var skills = $.ajax({
    type: 'POST',
    url: 'json/skills.json',
    async: false, // выполнение кода только после ответа от Ajax-запроса
   	success:function (data) {
   		let divS;
   		let div;
   		for (var i=0;i<data.skills.length; i++ ) {
   			div = document.createElement("div");
   			div.className = 'footSkill';
   			div.id = i;
   			document.getElementById("panel").append(div);

   			console.log(data.skills[i]);
   			divS = document.createElement("div");
   			divS.className = 'skillHero';
   			divS.style.background = 'url("' + data.skills[i].img + '")';
   			divS.style.width = '70px';
   			divS.style.height = '70px';
   			idSkill = i;
   			document.getElementById(i).append(divS);
   			document.getElementById(i).onclick = function(){
   				useSkill($(this).attr("id"));
   			}
   			massSkill[i]= 0;
   			for (var b=0;b<data.skills[i].level.length; b++){
   				// console.log(data.skills[i].level[b]);
   			}
   		}
	}	
});

function useSkill(id){

	$.ajax({
	    type: 'POST',
	    url: 'json/skills.json',
	    async: false, // выполнение кода только после ответа от Ajax-запроса
	   	success:function (data) {
	   		damage = data.skills[id].level[0].damage;
	   		console.log("Вы нанести " + damage + " урона врагу");
	   		massSkill[id] = data.skills[id].level[0].cooldown;
	   	}
   	});

}

// setInterval(function(){
// 	console.log("");
// },1000);