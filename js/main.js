var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var englishPercent=[8.167,1.492,2.782,4.253,12.702,2.228,2.015,6.094,6.966,0.153,0.772,4.025,2.406,6.749,7.507,1.929,0.095,5.987,6.327,9.056,2.758,0.978,2.360,0.150,1.974,0.074];
var sortedEnglishPercent=new Array(26);

var rawinput;
var formattedinput;

var freq = new Array(26);
var freqPercent = new Array(26);

var sortedFreqPercent = new Array(26);

$(document).ready(function(){
	sortedEnglishPercent = englishPercent.slice(0);
    sortedEnglishPercent.sort(function(a,b){return b - a});

	graphupdate();

	//$("#rawinput").keyup(function(){
	$("button#start").click(function(){
		//format and copy across to working ciphertext
		rawinput = $("#rawinput").val();

		workingtext = rawinput.toUpperCase();
		if(!$("#punc-checkbox").prop('checked'))
			workingtext = workingtext.replace(/[^A-Za-z]/g,'');

		$("textarea#working").val(workingtext);

		accessFrequencies();
		graphupdate();//based on freq

		initMaps();
		tableupdate2();//based on maps
		//
		//calculate most likely

	});

	$("button#prev").click(function(){
		cycle(false);
	});
	$("button#next").click(function(){
		cycle(true);
	});

});

var mapPC = new Array(26);
var mapCP = new Array(26);
var sortedPointer = new Array(26);
function initMaps(){
	for(var i=0;i<26;i++){
		mapPC[i]=i;
		mapCP[i]=i;
		sortedPointer[i]=i;
	}
	sortedPointer.sort(function(a,b){return freq[b] - freq[a]});
}

//calculates freq,freqPercent,sortedFreqPercent
function accessFrequencies(){
	fullyformattedinput = workingtext.toUpperCase().replace(/[^A-Za-z]/g,'');
	//formattedinput = rawinput.toUpperCase();

	for(var i=0;i<26;i++)
		freq[i]=0;
	for(var i=0;i<fullyformattedinput.length;i++)
		freq[alphabet.indexOf(fullyformattedinput.charAt(i))]++;
	for(var i=0;i<26;i++)
		freqPercent[i]=freq[i]/fullyformattedinput.length*100;

	sortedFreqPercent = freqPercent.slice(0);
	sortedFreqPercent.sort(function(a,b){return b - a});
}

function cycle(next){
	var mapPC_clone = mapPC.splice(0);
	for(var i=0;i<26;i++){
		mapCP[i] = (mapCP[i] + (next ? 1:25))%26;

		mapPC[i] = mapPC_clone[(i+(next ? 25:1))%26];
	}
	tableupdate2();

	updateWorkingText();
	accessFrequencies();//of working text

	graphupdate();//from freq

}

function updateWorkingText(){
	/*workingtext = rawinput.toUpperCase();
	if(!$("#punc-checkbox").prop('checked'))
		workingtext = workingtext.replace(/[^A-Za-z]/g,'');*/

	workingtext="";
	for(var i=0;i<rawinput.length;i++){
		var index = alphabet.indexOf(rawinput[i]);
		if(index==-1){
			if($("#punc-checkbox").prop('checked'))
				workingtext+=rawinput[i];
		}
		else{
			workingtext+=alphabet.charAt(mapCP[index]);
		}
	}

	$("textarea#working").val(workingtext);
}