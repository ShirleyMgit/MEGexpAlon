

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
	 xhttp.open("GET", "rowNumNewWB.php?tableN="+tableName+"&Fname="+name, false);
     xhttp.send();
     return num;
}


function isReachT(name){
	 var rch=-1;
	 var xhttp;
	 xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
	     rch = JSON.parse(this.responseText);
        }
     };
	 xhttp.open("GET", "reachTnewWB.php?tableN='TaskTable'&Fname="+name, false);
     xhttp.send();

    return rch;
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
	 xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
	     var myData = JSON.parse(this.responseText);
         var len = myData.length;
		 if (len>0){
            cds = Number(myData[len-1].dS);
		 }else{
            cds=0;
		 }
        }
     };
	 xhttp.open("GET", "find_dSnewWB.php?tableN='TaskTable'&Fname="+name, false);
     xhttp.send();

	return cds;
}

/*save variable into sql table*/
function saveDataDB(fname,num,ArName,TableName){ // for intialising the maps only
      $.ajax({
      type:'POST',
      url: 'save2tableNumINSERT_UPDATE_UNIQUEnewWB_MEG.php',
      data: {Fname: fname, Num: num,Nar:ArName,tableN:TableName},
	  async: false,
	  dataType:'json'
   });
}
function saveDataDBnew(fname,num,ArName,TableName){
      var xhttp;
	 xhttp = new XMLHttpRequest();
	 xhttp.open("GET", "save2tableNumINSERT_UPDATE_UNIQUEnewWB2.php?t"+ Math.random(), false);
     xhttp.send();
}


function saveDataDBnotU(fname,Tnum,npic,ch,rt,c,TableName){
	var ans=-1;
      $.ajax({
      type:'POST',
      url: 'save2CoverTableNewWB.php',
      data: {name: fname, Trial: Tnum,map:curMp,picN:npic,choice:ch,RTv:rt,tableN:TableName,picT:c},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
   return ans;
}

function saveStartTime(coins,name){
	var d1 = new Date();
	var m = d1.getMonth()+1;
	var dd = d1.getDate();//it was getDat()+1 until12/4/17 and was chaged to getDate
	var h = d1.getHours()+1;
	var min = d1.getMinutes()+1;
	var t = h*60+min;
	$.ajax({
      type:'POST',
      url: 'saveTimeC.php',
      data: {Fname:name,Trial: nTrialc,tc:t,dc:dd,mc:m,con:coins},
	  async: false,
	  dataType:'json',
	  success: function() {
      }
   });

}

/*function saveDataDBnotUtaskInD(Tchoice,fnGood,fnGoodInD,corTask,RTt){//inMv12,cim1,cim2,prC
      $.ajax({
      type:'POST',
      url: 'save2taskAsUriInD.php',//save2taskTable.php',
      data: {name: FullName, Trial: nTrialc,map:curMp,dS:ndS,target:tar1,inP:inP,choice:Tchoice,inPlast:inPlast,in1R:inRlast,in1L:inLlast,isCorrect:corTask,nCor:fnGood,nCorInD:fnGoodInD,curDS:LastnSt,RT:RTt},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}*/
function saveDataDBnotUtaskInDb(Tchoice,fnGood,fnGoodInD,corTask,RTt){//inMv12,cim1,cim2,prC
      $.ajax({
      type:'POST',
      url: 'save2taskAsUriInDbNewWB.php',//save2taskTable.php',
      data: {name: FullName, Trial: nTrialc,map:curMp,dS:ndS,target:tar1,inP:inP,choice:Tchoice,inPlast:inPlast,in1R:inRlast,in1L:inLlast,isCorrect:corTask,nCor:fnGood,nCorInD:fnGoodInD,curDS:LastnSt,curDSnew:nSt,RT:RTt,ncoin:ncoin},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}

function saveDataDBques(cq,iq1,iq2,corQ,RTq){//inMv12,cim1,cim2,prC
      $.ajax({
      type:'POST',
      url: 'save2questionNewWB.php',//save2taskTable.php',
      data: {name: FullName, Trial: nTrialc,map:curMp,target:tarQ,choice:cq,im1:iq1,im2:iq2,isCorrect:corQ,RT:RTq,ncoin:ncoin},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}

function saveDataDBnotUisMc(nrep,RTm,corA){
      $.ajax({
      type:'POST',
      url: 'save2isMiddleNewWB.php',//'save2isMTable.php',
      data: {name: FullName, Trial: nTrialc,map:curMp,nREP:nrep,pic1:ism1p,pic2:ism,pic3:ism2p,isitM:ys,corR:corA,rt:RTm,ncoin:ncoin},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}

function saveDataDBnotUpileAll(corP,RTp){//inMv12,cim1,cim2,prC
      $.ajax({
      type:'POST',
      url: 'save2pileAsUriAllNewWB.php',//'save2pileTable.php',
      data: {name: FullName, Trial: nTrialc,map:curMp,nP:thisT,cPile:corP,isO:isinOther,in11:inPp11,in12:inPp12,in13:inPp13,in21:inPp21,in22:inPp22,in23:inPp23,inQ:inPisP,wP:wP,RT:RTp,ncoin:ncoin},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}
/*function saveDataDBnotUtask(Tchoice,fnGood,corTask,RTt){//inMv12,cim1,cim2,prC
      $.ajax({
      type:'POST',
      url: 'save2taskAsUri.php',//save2taskTable.php',
      data: {name: FullName, Trial: nTrialc,map:curMp,dS:ndS,target:tar1,inP:inP,choice:Tchoice,isCorrect:corTask,nCor:fnGood,curDS:LastnSt,RT:RTt},
	  async: false,
	  dataType:'json',
	  success: function(ans) {
      }
   });
}*/

/*Save array to .txt File:*/
/*function saveData(thefile, Arr){
   var filedata;//,n;
   filedata=Arr+"\n";
      $.ajax({
      type:'post',
      cache: false,
      url: 'save2File.php', // this is the path to the PHP script
      data: {filename: thefile, filedata: filedata}
   });
}

/*save text line to .txt file*/
/*function saveDataPay(thefile, corR){
      $.ajax({
      type:'post',
      cache: false,
      url: 'save2File.php', // this is the path to the PHP script
      data: {filename: thefile, filedata: corR}
   });
}*/
