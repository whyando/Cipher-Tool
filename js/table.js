function tableupdate1(){
	var table="";
	for(var i=0;i<26;i++){
		table+="<b>"+alphabet.toLowerCase().charAt(i) +"</b> "
		table+=alphabet.charAt(mapPC[i]) + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";

		table+="<b>"+alphabet.charAt(sortedPointer[i]) +"</b> "
		table+=alphabet.toLowerCase().charAt(mapCP[sortedPointer[i]]) + "<br />";
	}
	$("div#table").html(table);
}

function tableupdate2(){
	var table="<b>";
	for(var i=0;i<26;i++)
		table+=alphabet.toLowerCase().charAt(i)+" ";
	table+="</b><br />";
	for(var i=0;i<26;i++)
		table+=alphabet.charAt(mapPC[i])+ " ";
	table+="<br /><br />";

	table+="<b>";
	for(var i=0;i<26;i++)
		table+=alphabet.charAt(sortedPointer[i])+" ";
	table+="</b><br />";
	for(var i=0;i<26;i++)
		table+=alphabet.toLowerCase().charAt(mapCP[sortedPointer[i]])+ " ";
	
	$("div#table").html(table);
}