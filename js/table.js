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
		table+= "<span class='" + (locked[i] ?"locked" :"unlocked") + "'>" + alphabet.toLowerCase().charAt(i)+"</span> ";
	table+="</b><br />";
	for(var i=0;i<26;i++)
		table+= "<span class='" + (locked[i] ?"locked" :"unlocked") + "'>" + alphabet.charAt(mapPC[i])+"</span> ";
	table+="<br /><br />";

	table+="<b>";
	for(var i=0;i<26;i++)
		table+= "<span class='" + (locked[mapCP[sortedPointer[i]]] ?"locked" :"unlocked") + (freq[mapCP[sortedPointer[i]]]==0 ? " strikethrough" : "") + "'>" + alphabet.charAt(sortedPointer[i])+"</span> ";
	table+="</b><br />";
	for(var i=0;i<26;i++)
		table+= "<span class='" + (locked[mapCP[sortedPointer[i]]] ?"locked" :"unlocked") + "'>" + alphabet.toLowerCase().charAt(mapCP[sortedPointer[i]])+"</span> ";

	$("div#table").html(table);
}