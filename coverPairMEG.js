
function coverPairTask(fc){
   
   /* Load The Picture Array:*/
    if (nTrialc>0){
	  curMpLast = curMpV[nTrialc-2];
    }else{
	  curMpLast = -1;
    }
    curMp = curMpV[nTrialc-1];
	
    createCoverStaff();// create transition matrixes and define pictures set directory
   
    y = y0;
    clearCanvas(crE,300,450);
    ncoinT=0;
    flagC=0;
    flagT=0;
    flagIsM=-1;//signal that it is not IsM part
    flagCovP=1;
	flagCov=0;
    flagSs=2;
    flagSp=2
    flagQ = -1;
    thisTCp = fc;
   
    saveStartTime(ncoin,FullName);
    allQ[0].style.display="none";
    QFclass[0].style.display="none";
    feedbackQ.style.display="none";
  
	/* Print instructions*/
    instP.innerHTML="Try to remember the associations between the pair of pictures. successive pairs are not related. It will help you during the next parts of the game.<br> Press enter to see the next card.";//<b>Is this picture tilt? </br>you get an extra point for any correct answer</br>";
 
    isMc[0].style.display="none";
    allTask[0].style.display="none";
    sPcB.style.display="none";
    contCP.style.display="none";
	iniRun();//initilzation of random generator
    /*array of all presentation*/
    covRpArr = [];
    allTask[0].style.display="none";
    allCOVERpair.style.display="inline";

  /* response object*/
   var resCover={choice:[],rTime:[]};
   resCArr.push(resCover);
 
  /*create a 1D array of pictures (start with regular grid):*/
   var a=1;
   var ran1,cn,isin;
   corR=0;
   var j1,j2,np0;
 
	if(nTrialc>(maxT)){
		isNmapP.style.color="blue";
		isNmapP.innerHTML="new pictures set <br> experiment ended - thanks!";
	}

	isNmapP.style.color="green";
	isNmapP.innerHTML="Same pictures set, same game - new trial";
	isFround=0;
 
    if(curMp!=curMpLast&&curMpLast!=-1){
	   isFround=1;
	   isNmapP.style.color="red";
	   isNmapP.innerHTML="new pictures set <br> take few minutes to rest";
    }else{
	   isNmapP.style.color="green";
	   isNmapP.innerHTML="Same pictures set, same game - new trial";
    }
    if(nTrialc==1){
	   isFround=1;
    }

    if(curMp>maxMap||curMp<0){
	   alert(" there is a problem with the map index- stop experiment!");
    }
  
    ran1 = Math.random();
    timeLast = new Date();
    conExpPair(0);
}

function conExpPair(cpic){
	document.getElementById("endThanksT").innerHTML = "";
	imC1.style.display="none"
	imC2.style.display="none"
	contCP.style.display="none"
    var tlap=1500;
    var thisTime = new Date();
    var cor;
    thisTCp =thisTCp+1;

   /*save responses to an Array*/
    var RT = calResponseTime(thisTime,timeLast);
  
    in1P = Math.floor(Math.random() * (np-1));
    ran1 = Math.random();
    if (nTrialc<9){
	   in2P=detNextPicGenA(ran1,Ar,in1P);// no missing links
    }else{
	   in2P=detNextPicGenA(ran1,ArMiss,in1P);// with missing links
    }
	/* the 2 pictures*/
    imC1.src = FileName+"pic"+ myPic[in1P].toString() + ".jpg";
    imC2.src = FileName+"pic"+ myPic[in2P].toString() + ".jpg";
   
   	if (thisTCp>0){
		 contCP.style.display="inline";
		 setTimeout(function(){ contCP.style.display="none";},500);
		 setTimeout(function(){imC1.style.display="inline"; imC2.style.display="inline";},500);
		 isNmapP.style.display="none";
	} else{
		imC1.style.display="inline"; 
		imC2.style.display="inline";
	} 
   covRpArr.push(in1P);
      
   ran1 = Math.random();
   timeLast = new Date();
   if(thisTCp>maxCovP){
	   thisTCp=-1;
	   endAllTrialsPair(0);
   }  
   
   saveDataDBnotUpair(FullName,nTrialc,in1P,in2P,RT,thisTCp,"coverPairTable");
}


/* end cover task part*/
function endAllTrialsPair(endB){

  corR=0;
  thisTCp = 0;
  allCOVERpair.style.display="none";
   whichPile(1);

}

function saveDataDBnotUpair(fname,Tnum,npic1,npic2,rt,c,TableName){
	var ans=-1;
      $.ajax({
      type:'POST',
      url: 'save2CoverPairTable.php', 
      data: {name: fname, Trial: Tnum,map:curMp,picN1:npic1,picN2:npic2,RTv:rt,tableN:TableName},
	  async: false,
	  dataType:'json',
	  success: function(ans) {   
      }   
   });
   return ans;
}

/* function TrialNum(TableName,name){
	var num;
      $.ajax({
      type:'POST',
      url: 'rowNum.php', 
      data: {tableN:TableName,Fname:name},
	  async: false,
	  dataType:'json',
	  success: function(data,iss) { 
         len = data.length;
		 if (len>0){
            num = Number(data[len-1].Trial);	
		 }else{
            num=0;
		 }			
      }   
   });
   return num;
} */

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