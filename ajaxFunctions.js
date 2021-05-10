// functions to read and write from sql tables

function getTrialNumFromTable(tableName){// counts the number of repeatitions in the task part that was played before
	var cds,run,cT,trialNum=0;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// myData returns
			var myData = JSON.parse(this.responseText);
			var len = myData.length;
			run = Number(myData[len-1].run);
			cT = run;
			trialNum = 0;
			while (cT==run && (len-trialNum)>1){
				trialNum = trialNum+1;
				cT = Number(myData[len-trialNum-1].run);
			}
		}
	};
	xhttp.open("GET", "getRunAndTrialNumber.php?tableN="+tableName+"&subjectId="+exp.subjectId, false);
	xhttp.send();
	return trialNum;
}


function getRunNumFromTable(tableName){ // check the number of runs already completed for a task.
	var num;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myData = JSON.parse(this.responseText);
			var len = myData.length;
			if (len>0){
				num = Number(myData[len-1].run);
			}else{
				num=0;
			}
		}
	};
	xhttp.open("GET", "getRunAndTrialNumber.php?tableName="+tableName+"&subjectId="+exp.subjectId, false);
	xhttp.send();
	return num;
}


function getScore(tableName){// check the number of points that was earned until now
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myData = JSON.parse(this.responseText);
			var len = myData.length;
			if (len>0){
				score = Number(myData[len-1].score);
			}else{
				score=0;
			}
		}
	};
	xhttp.open("GET", "getScore.php?tableName="+tableName+"&subjectId="+exp.subjectId, false);
	xhttp.send();
	return score;
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
	xhttp.open("GET", "findIscor.php?tableN="+tableName+"&Fname="+name+"&run="+exp.curRun, false);
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
function save2imagesFilesTable(imgFileName,nodeNumber){ // save in sql table
	$.ajax({
		type:'POST',
		url: 'save2imagesFilesTable.php',
		data: {subjectId: exp.subjectId, imgFileName: imgFileName, nodeNumber:nodeNumber},
		async: false,
		dataType:'json'
	});
}

function save2subjectDetailsAndStartTimeTable(){//
	var d1 = new Date();
	var m = d1.getMonth()+1;
	var dd = d1.getDate();//it was getDat()+1 until12/4/17 and was chaged to getDate
	var h = d1.getHours()+1;
	var min = d1.getMinutes()+1;
	var t = h*60+min;
	$.ajax({
		type:'POST',
		url: 'save2subjectDetailsAndStartTimeTable.php',
		data: {subjectId:exp.subjectId,tc:t,dc:dd,mc:m},
		async: false,
		dataType:'json',
		success: function() {
		}
	});

}

function save2learnRandomWalkTable(subjectId, run, map, trial, node, imgFile, rt){// previously -  saveDataDBnotU: save to cover table
	var ans=-1;
	$.ajax({
		type:'POST',
		url: 'save2learnRandomWalkTable.php',
		data: {subjectId: subjectId, run:run, map:map, trial:trial, node:node, imgFile:imgFile, rt:rt},
		async: false,
		dataType:'json',
		success: function(ans) {
		}
	});
	return ans;
}


function save2learnRandomPairTable(subjectId,Tnum,npic1,npic2,rt,c,TableName){
	var ans=-1;
	$.ajax({
		type:'POST',
		url: 'save2learnRandomPairs.php',
		data: {name: subjectId, run: Tnum,map:exp.curMap,picN1:npic1,picN2:npic2,RTv:rt,tableN:TableName},
		async: false,
		dataType:'json',
		success: function(ans) {
		}
	});
	return ans;
}

function save2navigTable(Tchoice,fnGood,fnGoodInD,corTask,RTt){//inMv12,cim1,cim2,prC: save things into task table
	$.ajax({
		type:'POST',
		url: 'save2navigTable.php',//save2navigTable.php',
		data: {name: subjectId, run: exp.curRun,map:exp.curMap,dS:ndS,target:tar1,inP:inP,choice:Tchoice,inPlast:inPlast,in1R:inRlast,in1L:inLlast,isCorrect:corTask,nCor:fnGood,nCorInD:fnGoodInD,curDS:LastnSt,curDSnew:nSt,RT:RTt,totalScore:exp.totalScore},
		async: false,
		dataType:'json',
		success: function(ans) {
		}
	});
}

function save2whichIsCloserTable(cq,iq1,iq2,corQ,RTq){//inMv12,cim1,cim2,prC, save to distance estimation questions table
	$.ajax({
		type:'POST',
		url: 'save2whichIsCloserTable.php',
		data: {name: subjectId, run: exp.curRun,map:exp.curMap,target:tarQ,choice:cq,im1:iq1,im2:iq2,isCorrect:corQ,RT:RTq,totalScore:exp.totalScore},
		async: false,
		dataType:'json',
		success: function(ans) {
		}
	});
}

function save2isMiddleTable(nrep,RTm,corA){
	$.ajax({
		type:'POST',
		url: 'save2isMiddleTable.php',
		data: {name: subjectId, run: exp.curRun,map:exp.curMap,nREP:nrep,pic1:ism1p,pic2:ism,pic3:ism2p,isitM:ys,corR:corA,rt:RTm,totalScore:exp.totalScore},
		async: false,
		dataType:'json',
		success: function(ans) {
		}
	});
}

function save2isInPileTable(corP,RTp){//inMv12,cim1,cim2,prC
	$.ajax({
		type:'POST',
		url: 'save2isInPileTable.php',//'save2pileTable.php',
		data: {name: subjectId, run: exp.curRun,map:exp.curMap,nP:thisT,cPile:corP,isO:isinOther,in11:inPp11,in12:inPp12,in13:inPp13,in21:inPp21,in22:inPp22,in23:inPp23,inQ:inPisP,wP:wP,RT:RTp,totalScore:exp.totalScore},
		async: false,
		dataType:'json',
		success: function(ans) {
		}
	});
}
