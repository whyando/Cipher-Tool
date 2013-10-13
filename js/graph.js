function graphupdate(){
	var canvas=document.getElementById("graphcanvas");
	if(!canvas.getContext){return;}
	var ctx=canvas.getContext("2d");
	ctx.strokeStyle = "rgb(0, 0, 0)";
	ctx.clearRect(0,0,650,800)
	ctx.strokeRect(0,0,650,800)
 
	//1
	ctx.beginPath();
	ctx.moveTo(75,50);
	ctx.lineTo(75,325);
	ctx.lineTo(595,325)
	ctx.stroke();

	var highest = sortedEnglishPercent[0];
	for(var i=0;i<26;i++){
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		var letter = alphabet.charAt(i);
		ctx.fillText(letter, 81+i*20, 338);
	}

	ctx.strokeStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	var height;
	for(var i=0;i<26;i++){
		height = englishPercent[i]*250/highest;
		ctx.lineTo(84+i*20,325-height);
	}
	ctx.stroke();

	ctx.strokeStyle = "rgb(255, 0, 0)";
	ctx.beginPath();
	for(var i=0;i<26;i++){
		height = freqPercent[i]*250/highest;
		ctx.lineTo(84+i*20,325-height);
	}
	ctx.stroke();

	var extra=350;
	//2
	ctx.strokeStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	ctx.moveTo(75,50+extra);
	ctx.lineTo(75,325+extra);
	ctx.lineTo(595,325+extra)
	ctx.stroke();

	var highest = sortedEnglishPercent[0];
	for(var i=0;i<26;i++){
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		//var letter = alphabet.charAt(i);
		ctx.fillText(i+1, 81+i*20, 338+extra);
	}

	ctx.strokeStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	var height;
	for(var i=0;i<26;i++){
		height = sortedEnglishPercent[i]*250/highest;
		ctx.lineTo(84+i*20,325-height+extra);
	}
	ctx.stroke();

	ctx.strokeStyle = "rgb(255, 0, 0)";
	ctx.beginPath();
	for(var i=0;i<26;i++){
		height = sortedFreqPercent[i]*250/highest;
		ctx.lineTo(84+i*20,325-height+extra);
	}
	ctx.stroke();
}