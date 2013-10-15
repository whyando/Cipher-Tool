var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var englishPercent=[8.167,1.492,2.782,4.253,12.702,2.228,2.015,6.094,6.966,0.153,0.772,4.025,2.406,6.749,7.507,1.929,0.095,5.987,6.327,9.056,2.758,0.978,2.360,0.150,1.974,0.074];
var sortedEnglishPercent=new Array(26);
var sortedEnglishPointer=new Array(26);

var rawinput;
var formattedinput;

var freq = new Array(26);
var freqPercent = new Array(26);

var sortedFreqPercent = new Array(26);

var locked = new Array(26);

$(document).ready(function(){
	sortedEnglishPercent = englishPercent.slice(0);
    sortedEnglishPercent.sort(function(a,b){return b - a});

	for(var i=0;i<26;i++)
		sortedEnglishPointer[i]=i;
	sortedEnglishPointer.sort(function(a,b){return englishPercent[b] - englishPercent[a]})

	graphupdate();

	//$("#rawinput").keyup(function(){
	$("button#start").click(function(){

		for(var i=0;i<26;i++)
			locked[i]=0;
		$("textarea#working").highlightTextarea('disable');

		//format and copy across to working ciphertext
		rawinput = $("#rawinput").val().toUpperCase();

		workingtext=rawinput;
		accessFrequencies();
		initMaps();
		updateWorkingText();

		tableupdate2();
		graphupdate();

	});

	$("button#prev").click(function(){
		cycle(false);
	});
	$("button#next").click(function(){
		cycle(true);
	});
	$("button#auto").click(function(){
		//set most common letter to e etc
		//for(var i=0;i<26;i++){
		//	console.log(alphabet.charAt(sortedEnglishPointer[i]));
		//}

		for(var i=0;i<26;i++){
			mapCP[sortedPointer[i]]=sortedEnglishPointer[i];
			mapPC[sortedEnglishPointer[i]]=sortedPointer[i];
		}

		updateWorkingText();

		accessFrequencies();
		graphupdate();
		tableupdate2();

	});

	$("textarea#working").keydown(function(e){
		var key = e.keyCode-65;
		if(key>=0 && key<26){
			e.preventDefault();
			var start = $("textarea#working")[0].selectionStart;
			var letter = $("textarea#working")[0].value.charAt(start);
			//console.log(key);
			//console.log(letter);
			if(alphabet.indexOf(letter)!=-1){
				change(alphabet.indexOf(letter),key);
			}
			$("textarea#working")[0].selectionStart=start+1;
			$("textarea#working")[0].selectionEnd=start+1;
		}
		else if(e.keyCode==32){
			e.preventDefault();
			$("textarea#working")[0].selectionStart++;
		}
	});
});

var mapPC = new Array(26);
var mapCP = new Array(26);
var sortedPointer = new Array(26);//points to most common ciphertext letter
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


	updateWorkingText();
	accessFrequencies();//of working text
	tableupdate2();
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

		if(workingtext.length%6==5 && !$("#punc-checkbox").prop('checked'))
			workingtext+=" ";
	}

	$("textarea#working").val(workingtext);
	//$("textarea#working").html(workingtext);

	var highlight=new Array();
	for(i=0;i<26;i++){
		if(locked[i]==1){
			highlight[highlight.length]=alphabet.charAt(i);
		}
	}
	$("textarea#working").highlightTextarea({
		words: [],
		caseSensitive: false,
		color: "#99f"
		//resizable: true
	});
	$("textarea#working").highlightTextarea('setWords', highlight);
	$("textarea#working").highlightTextarea('enable');
}

function change(from, to){
	if(from==to){
		console.log("locking " + from);
		locked[from]=1;
		updateWorkingText();
		tableupdate2();
		return;
	}
	console.log("changing " + from + " to " + to);

	//if "from" only is locked, proceed and remove lock
	//if "to" is locked, do nothing

	if(locked[to])
		return;

	//orginal cipher letter
	cipherletter1=mapPC[from];
	cipherletter2=mapPC[to];

	mapCP[cipherletter1]=to;
	mapPC[to]=cipherletter1;

	mapCP[cipherletter2]=from;
	mapPC[from]=cipherletter2;

	locked[from]=false;

	tableupdate2();
	updateWorkingText();
	accessFrequencies();
	graphupdate();
}