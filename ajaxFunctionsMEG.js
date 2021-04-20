// functions to read and write from sql tables

function inThisT(tableName,name){// counts the number of repeatitions in the task part that was played before
	 var cds,T,cT,countT=0;
	 var xhttp;
	 xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
	     var myData = JSON.parse(this.responseText);
         var len = myData.length;
		 T = Number(myData[len-1].Trial);
		 cT = T;
		 countT = 0;
		 while (cT==T&&(len-countT)>1){
			countT = countT+1;
            cT = Number(myData[len-countT-1].Trial);
		 }
        }
     };
	 xhttp.open("GET", "rowNumNewWB.php?tableN="+tableName+"&Fname="+name, false);
     xhttp.send();
     return countT;
}


function TrialNum(tableName,name){// check the last trial number (or, in a different name, block number) that was played until know, in the task part that is saves in the table 'TableName'
	 var num;
	 var xhttp;
	 xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
	     var myData = JSON.parse(this.responseText);
         var len = myData.length;
		 if (len>0){
            num = Number(myData[len-1].Trial);
		 }else{
            num=0;
		 }
        }
     };
	 xhttp.open("GET", "rowNumNewWB.php?tableN="+tableName+"&Fname="+name, true);
     xhttp.send();
     return num;
}


function numCoin(tableName,name){// check the number of coins that was earned until now
	 var num;
	 var xhttp;
	 xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
	     var myData = JSON.parse(this.responseText);
         var len = myData.length;
		 if (len>0){
            ncoin = Number(myData[len-1].ncoin);
		 }else{
            ncoin=0;
		 }
        }
     };
	 xhttp.open("GET", "numCoinFnewWB.php?tableN="+tableName+"&Fname="+name, false);
     xhttp.send();
     return ncoin;
}

function calCorQ(tableName,name){// sum over the number of correct answers as save in the column 'isCorr'
	var sumCor=0;
	var j;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    var myData = JSON.parse(this.responseText);
        var len = myData.length;
		if (len>0){
			for(j=0;j<len;j++){
				sumCor+=Number(myData[j].isCorr);
			}
		}
       }
    };
	xhttp.open("GET", "findIscor.php?tableN="+tableName+"&Fname="+name+"&Trial="+nTrialc, false);
    xhttp.send();
    return sumCor;
}


function TaskdS(name){// check what was the initial distance between initial picture and target in the last time participant played the navigation task
	var cds;
    var xhttp;
	var tableName = "navigTable";
	 xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
	     var myData = JSON.parse(this.responseText);
         var len = myData.length;
		 if (len>0){
            cds = Number(myData[len-1]);
		 }else{
            cds=0;
		 }
        }
     };
	 xhttp.open("GET", "find_dSnewWB.php?tableN="+tableName+"&Fname="+name, false);
     xhttp.send();

	return cds;
}

/*save variable into sql table*/
function save2db_imagesFilesTable(subjectId,filenameNumber,nodeNumber,tableName){ // save in sql table
      $.ajax({
      type:'POST',
      url: 'save2db_imagesFilesTable.php',
      data: {subjectId: subjectId, filenameNumber: filenameNumber, nodeNumber:nodeNumber, tableName:tableName},
	  async: true,
	  dataType:'json'
   });
}


function saveDataDBnotU(subjectId,Tnum,npic,ch,rt,c,TableName){// save to cover table
	var ans=-1;
      $.ajax({
      type:'POST',
      url: 'save2learnRandomWalkNewWB.php',
      data: {name: subjectId, Trial: Tnum,map:curMp,picN:npic,choice:ch,RTv:rt,tableN:TableName,picT:c},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
   return ans;
}

function save2db_subjectDetailsAndStartTimeTable(subjectId){//
	var d1 = new Date();
	var m = d1.getMonth()+1;
	var dd = d1.getDate();//it was getDat()+1 until12/4/17 and was chaged to getDate
	var h = d1.getHours()+1;
	var min = d1.getMinutes()+1;
	var t = h*60+min;
	$.ajax({
      type:'POST',
      url: 'save2subjectDetailsAndStartTimeTable.php',
      data: {subjectId:subjectId,tc:t,dc:dd,mc:m},
	  async: true,
	  dataType:'json',
	  success: function() {
      }
   });

}

function saveDataDBnotUtaskInDb(Tchoice,fnGood,fnGoodInD,corTask,RTt){//inMv12,cim1,cim2,prC: save things into task table
      $.ajax({
      type:'POST',
      url: 'save2navigTableNewWB.php',//save2navigTable.php',
      data: {name: subjectId, Trial: nTrialc,map:curMp,dS:ndS,target:tar1,inP:inP,choice:Tchoice,inPlast:inPlast,in1R:inRlast,in1L:inLlast,isCorrect:corTask,nCor:fnGood,nCorInD:fnGoodInD,curDS:LastnSt,curDSnew:nSt,RT:RTt,ncoin:ncoin},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}

function saveDataDBques(cq,iq1,iq2,corQ,RTq){//inMv12,cim1,cim2,prC, save to distance estimation questions table
      $.ajax({
      type:'POST',
      url: 'save2whichIsCloserNewWB.php',
      data: {name: subjectId, Trial: nTrialc,map:curMp,target:tarQ,choice:cq,im1:iq1,im2:iq2,isCorrect:corQ,RT:RTq,ncoin:ncoin},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}

function saveDataDBnotUisMc(nrep,RTm,corA){
      $.ajax({
      type:'POST',
      url: 'save2isMiddleNewWB.php',
      data: {name: subjectId, Trial: nTrialc,map:curMp,nREP:nrep,pic1:ism1p,pic2:ism,pic3:ism2p,isitM:ys,corR:corA,rt:RTm,ncoin:ncoin},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}

function saveDataDBnotUpileAll(corP,RTp){//inMv12,cim1,cim2,prC
      $.ajax({
      type:'POST',
      url: 'save2pileAllNewWB.php',//'save2pileTable.php',
      data: {name: subjectId, Trial: nTrialc,map:curMp,nP:thisT,cPile:corP,isO:isinOther,in11:inPp11,in12:inPp12,in13:inPp13,in21:inPp21,in22:inPp22,in23:inPp23,inQ:inPisP,wP:wP,RT:RTp,ncoin:ncoin},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}


function saveDataDBnotUpair(subjectId,Tnum,npic1,npic2,rt,c,TableName){
	var ans=-1;
      $.ajax({
      type:'POST',
      url: 'save2learnRandomPairs.php',
      data: {name: subjectId, Trial: Tnum,map:curMp,picN1:npic1,picN2:npic2,RTv:rt,tableN:TableName},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
   return ans;
}
