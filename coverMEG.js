
function coverTask(fc){// learning phase
    if(fc==30){
	   nTrialc=nTrialc+1;// number of trials in this block
	   fc=10;
    }
   
     /* which map:*/
    if (nTrialc>0){
	   curMpLast = curMpV[nTrialc-2];
    }else{
	   curMpLast = -1;
    }
    curMp = curMpV[nTrialc-1];
  
    createCoverStaff();// create transition matrixes and define pictures set directory
   
    ncoinSc = ncoin;
    y = y0;
    imCold.src = [];
    clearCanvas(crE,300,450);
    ncoinT=0;
    flagC=0;
    flagT=0;
    flagIsM=-1;//signal that it is not IsM part. it is important for the function that collect subject respones
    flagCov=1;
    flagSs=2;
    flagSp=2
    flagQ = -1;
   
    saveStartTime(ncoin,FullName);
 
	/* Print instructions*/
    inst.innerHTML="Try to remember the associations between the pictures that appears one after the other.<br> A picture can be associated to more than one/two pictures. <br> Say 'in your head' a sentence that connects the 2 pictures, it will help you to remember the associations. <br> Press enter to see the next card.";//<b>Is this picture tilt? </br>you get an extra point for any correct answer</br>";
    /* manage dispaly*/
    TheCanvas.style.display="inline"
	QFclass[0].style.display="none";
	feedbackQ.style.display="none";
    isMc[0].style.display="none";
    allQ[0].style.display="none";
    allTask[0].style.display="none";
    if(fc!=3){
       gInst[0].style.display="none";
    }
    sPcB.style.display="none";

	iniRun();//initilzation of random generator
    /*array of all presentation*/
    covRpArr = [];
    allCOVER.style.display="inline";
  
    /* response object*/
    var resCover={choice:[],rTime:[]};
    resCArr.push(resCover);
 
    /*create a 1D array of pictures (start with regular grid):*/
    var a=1;
    var ran1,cn,isin;
    corR=0;
    if (thisTC==-1){
	  c=0;
    }
    else{
	    c = thisTC;
    }
    var j1,j2,np0;
 
 
	if(nTrialc>(maxT)){
		isNmap.style.color="blue";
	    isNmap.innerHTML="new pictures set <br> experiment ended - thanks!";
	}

	isNmap.style.color="green";
	isNmap.innerHTML="Same pictures set, same game - new trial";
	isFround=0;
 
   if(curMp!=curMpLast&&curMpLast!=-1){
	   isFround=1;
			
	  isNmap.style.color="red";
	  isNmap.innerHTML="new pictures set <br> take few minutes to rest";
	  
	  switch(nTrialc){// display new/same picture sets message
			case 9:
		  	  isNmap.style.color="Blue";
			  isNmap.innerHTML="new pictures set <br> End Day 1";
			  break;
			case 17:
		  	  isNmap.style.color="Blue";
			  isNmap.innerHTML="new pictures set <br> End Day 2";
			  break;
			case 25:
		  	  isNmap.style.color="Blue";
			  isNmap.innerHTML="new pictures set <br> End Day 3";
			  break;
			case 33:
		  	  isNmap.style.color="Blue";
			  isNmap.innerHTML="new pictures set <br> End Day 3";
			  break;
			default:
				isNmap.style.color="red";
				isNmap.innerHTML="new pictures set <br> take few minutes to rest";		  
	  }
  }else{
	  isNmap.style.color="green";
	  isNmap.innerHTML="Same pictures set, same game - new trial";
  }
  if(nTrialc==1){
	  isFround=1;
  }

  if(curMp>maxMap||curMp<0){
	  alert(" there is a problem with the map index- stop experiment!");
  }

  in1P = Math.floor(Math.random() * (np-1));//first picture index
  myPic=allMap[curMp];// pictures array
  imC.src = FileName+"pic"+ myPic[in1P].toString() + ".jpg";// first picture
  covRpArr.push(in1P);
  ran1 = Math.random();
  timeLast = new Date();
}

function conExp(cpic){// check subject response time
	document.getElementById("endThanksT").innerHTML = "";
   var tlap=1500;
   var myPic=allMap[curMp];
   var thisTime = new Date();
   var cor;
   c = c+1;
   if(cpic==flip){
	   cor=1;
   }
	   else{ 
	   cor=0;
	   }
   /*save responses to an Array*/
   var RT = calResponseTime(thisTime,timeLast);// rsponse time
   var ans = saveDataDBnotU(FullName,nTrialc,in1P,cor,RT,c,"coverTable");// save data into table in sql
   
   if(cpic==flip){
      corR = corR+1;
	  ncoin = ncoin+1;
	  ncoinT = ncoinT+1;
	  y = y-dy;
   }else{
	   if (corR>1){
		if (ncoinT>0){
			   y = y+dy;
			   ncoinT = ncoinT-1;
		   }
	   
	   ncoin = ncoin-1;
	   }
   }
   
   ncoinPv.style.display="inline";
   ncoinPv.innerHTML=ncoin+" coins";
   if(y<=0){
	   ncolCrc = ncolCrc+1;
	   x = x+dx;
	   y = y0;
   }
   if(y>y0&&ncolCrc>1){
	   ncolCrc = ncolCrc-1;
	   x = x-dx;
	   y = 0;
   }
   imCold.src = FileName+"pic"+ myPic[in1P].toString() + ".jpg";// old picture
   ran1 = Math.random();
   in1P=detNextPicGenA(ran1,Ar,in1P);// next picture index

   covRpArr.push(in1P);
      
   imC.src = FileName+"pic"+ myPic[in1P].toString() + ".jpg";// next picture
   ran1 = Math.random();
   timeLast = new Date();
   if(c>maxCov){// stop learning phase after maxCov observations
	   thisTC=-1;
	   endAllTrials(0);
   }  
}


/* end cover task part*/
function endAllTrials(endB){

  corR=0;
  allCOVER.style.display="none";
   whichPile(1);

}

