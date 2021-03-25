function whichPile(nn){// piles task
// here the target cannot appear in any pile
	var conSP=1;
	flagCov = 0;
	EcSp.style.display="none"
	inPisP = -1;
	/*flags for the key function*/
	flagIsM=-1;
	flagSs=2;
	flagSp = 10;
	flagTr=1;//can get an answer
	
	/* manage display*/
	PileDiv[0].style.display="block";
	EcSp.style.dispaly="none";
	isCsP.style.display= "none";
	isMc[0].style.display="none";
	imCsP11.style.display="none";
	imCsP12.style.display="none";
	imCsP13.style.display="none";
	imCsP14.style.display="none";
	imCsP21.style.display="none";
	imCsP22.style.display="none";
	imCsP23.style.display="none";
	imCsP24.style.display="none";
	if(nn==1){
	  y = y0;
	  x = 0;
	  ncoinT = 0;
	  clearCanvas(crE,300,450);
	  flagC=0;
	  nTrialSp = nTrialSp+1;
	  thisT=0;
	  
    }
	thisT = thisT+1;// count trials

   var myPic=allMap[curMp];// current picture array
  
   /* choose sequences (piles) pictures*/
  	inPp11 = Math.floor(Math.random() * (np)); 
	inPp21 = Math.floor(Math.random() * (np)); 
	while(inPp11==inPp21){
		inPp21 = Math.floor(Math.random() * (np)); 
	}
	var Ar1;
	if (nTrialc<9){
		Ar1 = Ar;
	}else{
		Ar1 = ArMiss;
	}
	inPp12=detNextPicGenA(Math.random(),Ar1,inPp11);
	inPp22=detNextPicGenA(Math.random(),Ar1,inPp21);
   	inPp13=detNextPicGenAnoP2(Math.random(),inPp12,inPp11,Ar1);
	inPp23=detNextPicGenAnoP2(Math.random(),inPp22,inPp21,Ar1);
	
   imCsP11.src = FileName+"pic"+ myPic[inPp11].toString() + ".jpg";//the first picture 1 pile
   imCsP21.src = FileName+"pic"+ myPic[inPp21].toString() + ".jpg";//the first picture 2 pile
   
   imCsP12.src = FileName+"pic"+ myPic[inPp12].toString() + ".jpg";//the 2 picture 1 pile
   imCsP22.src = FileName+"pic"+ myPic[inPp22].toString() + ".jpg";//the 2 picture 2 pile
   
   while (inPp23==inPp13){
	   var A23L;
	   var A13L;
	   	A23L = Ar1[inPp23].length;
		A13L = Ar1[inPp13].length;
	   if (A23L >2){
		   inPp23=detNextPicGenAnoP2(Math.random(),inPp22,inPp21,Ar1);

	   }else{
		    if (A13L>2){
				inPp13=detNextPicGenAnoP2(Math.random(),inPp12,inPp11,Ar1);
			
			}else{
				thisT=thisT-1;
				whichPile(thisT);
				conSP=0;
			}
	   }
	 }
   
   if (conSP==1){
    imCsP13.src = FileName+"pic"+ myPic[inPp13].toString() + ".jpg";//the 3 picture 1 pile
    imCsP23.src = FileName+"pic"+ myPic[inPp23].toString() + ".jpg";//the 3 picture 2 pile
    var all1pile = [inPp11,inPp12,inPp13];
	var all2pile = [inPp21,inPp22,inPp23];
    imCsP14.src = "whitePic.jpg";
    imCsP24.src = "whitePic.jpg";
   
    var ran1 = Math.random();
	
	if(ran1<0.5){// find the question picture - should make sure the other pile has no missing link with it.
		inPisP=detNextPicGenAnoP1P2P3inBoth(Math.random(),Ar1,all1pile,all2pile,DistM);
	    wP = 1;
    }else{
		inPisP=detNextPicGenAnoP1P2P3inBoth(Math.random(),Ar1,all2pile,all1pile,DistM);
		wP = 2;
	   
    }
   
    if (inPisP==-1){
	   thisT=thisT-1;
	   whichPile(0);
    }else{
		
      wCsP12.src=FileName+"pic"+ myPic[inPisP].toString() + ".jpg";//the q pic
     
   /*need to check wether the picture is not a neighbour of both of them or if exists in one of the piles*/
      if(wP==1){// I am not sure whether I sould put Ar or ArMiss here...
		  if(inPisP==inPp21||inPisP==inPp22||inPisP==inPp23){
			  isinOther=1;
			  isN=-1;
		  }else{
			  isinOther=0;
			  isN = isAneighbor(inPisP,inPp23,Ar);//1 is a neighbor, 0 if NOT
		  }
      }else{
		  if(inPisP==inPp11||inPisP==inPp12||inPisP==inPp13){
			  isinOther = 1;
			  isN=-1;
		  }else{
			  isinOther=0;
			  isN = isAneighbor(inPisP,inPp13,Ar);
		  }
      }
      if (isN==1&&inPisP!=inPp22&&inPisP!=inPp12){
        wP=3;
      }
	  /* display cards in piles*/
      setTimeout(function(){ imCsP11.style.display="inline"; }, 500);
      setTimeout(function(){ imCsP12.style.display="inline";}, 1200);
      setTimeout(function(){ imCsP13.style.display="inline"; }, 1900);
      setTimeout(function(){ imCsP14.style.display="inline";}, 2800);
      setTimeout(function(){ imCsP21.style.display="inline"; }, 3500);
      setTimeout(function(){ imCsP22.style.display="inline";}, 4200);
      setTimeout(function(){ imCsP23.style.display="inline"; }, 4900);
      setTimeout(function(){ imCsP24.style.display="inline";}, 5900);
      setTimeout(function(){flagSp = 1;flag12MV=-1;}, 6500);//added flag12MV=-1 just to make sure, from some reason it got stack on2
	  if (thisT>minTr){
		setTimeout(function(){if(isNestDis==0){nxSp.disabled=false;}},6505);
		
	  }
     thisLast=new Date();
    }
   }
}

function whichPileAns(ansP){// check particpants answer
	var myPic=allMap[curMp]; 	
	var corP;
	var  thisTime=new Date(); 
	var RTp=calResponseTime(thisTime,thisLast);
	 EcSp.style.dispaly="inline";
	if(ansP==wP){
		ncoinT = ncoinT+1;
		ncoin = ncoin+1;
		isCsP.style.color= "blue";
		isCsP.innerHTML = "Correct!";
		corP = 1;
		if (flagC==0){
	      plotCircle(crE,y,"blue",x);
	    }else{
		  replotCircle(crE,y,x);
	    }
	    y = y-dy;
		
	}else{
		if (ncoinT>0){
			   y = y+dy;
			   ncoinT = ncoinT-1;
		   }
	   
	   ncoin = ncoin-1;
	   isCsP.style.color= "red";
	   isCsP.innerHTML = "NOT Correct!";
	   clearCircle(crE,y,x);
	   ncolCrc = ncolCrc-1;
	   corP = 0;
	}
   ncoinPv.style.display="inline";
   ncoinPv.innerHTML=ncoin+" coins";
	if(y<=0){
	   x = x+dx;
	   y = y0;
   }
   if(y>y0&&ncolCrc>1){   
	   x = x-dx;
	   y = 0;
   }
   isCsP.style.display= "inline";
   if (wP==1){// put the picture in the correct pile
			imCsP14.src = FileName+"pic"+ myPic[inPisP].toString() + ".jpg";//the 4 picture 1 pile
			imCsP24.src = "whitePic.jpg";//the 4 picture 1 pile
   }else{
	   if(wP==2){
			imCsP14.src = "whitePic.jpg";//the 4 picture 1 pile
			imCsP24.src = FileName+"pic"+ myPic[inPisP].toString() + ".jpg";//the 4 picture 2 pile
	   }else{
			imCsP14.src = FileName+"pic"+ myPic[inPisP].toString() + ".jpg";//the 4 picture both pile
			imCsP24.src = FileName+"pic"+ myPic[inPisP].toString() + ".jpg";//the 4 picture both pile
	   }
   }
   EcSp.style.display="inline"
   saveDataDBnotUpileAll(corP,RTp);// save data into the piles table in sql
   flagSp = 0;
   if (thisT>=maxPile){// if the number of trials exceeded the maximum per block move to next part
	   writeRresSp();
   }
}

function writeRresSp(){// move to is it in the middle part
  flagSp=2;
  isItMiddle(1);
}

function detNextPicGenAnoP2P3(ran1,Ar1,in1,p2,notP){//fixed for corrected Ar
	/*This function should give the forth picture/node in Hamiltonian path - it is not good for graphs that have traingles*/
   var nbI = Ar1[in1].length;
   var j,nbInew=[];
   for(j=0;j<nbI;j++){
	   if(Ar1[in1][j]!=p2&&Ar1[in1][j]!=notP){
		   nbInew.push(Ar1[in1][j]);
	   }
   }
   var nbInL = nbInew.length;
   var nin = Math.floor((nbInL)*ran1);
   if(nin==nbInL){//for the very rare case that ran1==1, 2D array: the second dimention starts from 1...
    nin=nbInL-1;
   }
   var nxp;
   if (nbInew.length>0){
       nxp=nbInew[nin];
   }else{
	   nxp=-1;
   }
   return nxp;
}
function detNextPicGenAnoP2P3hex(ran1,Ar1,allPile,notP){//fixed for corrected Ar
/*This function finds the next forth picture in Hamiltonian path - good for all structures*/
   var in3 = allPile[2];
   var in2 = allPile[1];
   var in1 = allPile[0];
   var nbI = Ar1[in3].length;
   var j,nbInew=[];
   for(j=0;j<nbI;j++){
	   if(Ar1[in3][j]!=in2&&Ar1[in3][j]!=in1&&Ar1[in3][j]!=notP){
		   nbInew.push(Ar1[in3][j]);
	   }
   }
   var nbInL = nbInew.length;
   var nin = Math.floor((nbInL)*ran1);
   if(nin==nbInL){//for the very rare case that ran1==1, 2D array: the second dimention starts from 1...
    nin=nbInL-1;
   }
   var nxp;
   if (nbInew.length>0){
       nxp=nbInew[nin];
   }else{
	   nxp=-1;
   }
   return nxp;
}

function detNextPicGenAnoP1P2P3inBoth(ran1,Ar1,allPile1,allPile2,DistFull){//fixed for corrected Ar
/*This function finds the next forth picture in Hamiltonian path - good for all structures*/
   var in23 = allPile2[2];
   var in22 = allPile2[1];
   var in21 = allPile2[0];
   var in13 = allPile1[2];
   var in12 = allPile1[1];
   var in11 = allPile1[0];
   var nbI = Ar1[in13].length;
   var j,nbInew=[];
   for(j=0;j<nbI;j++){
	   if(Ar1[in13][j]!=in12&&Ar1[in13][j]!=in11&&Ar1[in13][j]!=in21&&Ar1[in13][j]!=in22&&Ar1[in13][j]!=in23&&DistFull[Ar1[in13][j]][in23]>1){// the last inequality makes sure that the pictures is not connected to the other pile with a missing link
		   nbInew.push(Ar1[in13][j]);
	   }
   }
   var nbInL = nbInew.length;
   var nin = Math.floor((nbInL)*ran1);
   if(nin==nbInL){//for the very rare case that ran1==1, 2D array: the second dimention starts from 1...
    nin=nbInL-1;
   }
   var nxp;
   if (nbInew.length>0){
       nxp=nbInew[nin];
   }else{
	   nxp=-1;
   }
   return nxp;
}

function saveDataDBnotUpileAll(corP,RTp){//inMv12,cim1,cim2,prC
      $.ajax({
      type:'POST',
      url: 'save2pileAsUriAll.php',//'save2pileTable.php', 
      data: {name: FullName, Trial: nTrialc,map:curMp,nP:thisT,cPile:corP,isO:isinOther,in11:inPp11,in12:inPp12,in13:inPp13,in21:inPp21,in22:inPp22,in23:inPp23,inQ:inPisP,wP:wP,RT:RTp,ncoin:ncoin},
	  async: false,
	  dataType:'json',
	  success: function(ans) {   
      }   
   });
}