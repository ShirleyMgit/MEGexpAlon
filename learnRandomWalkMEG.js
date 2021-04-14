
function learnRandomWalkTask(fc){// learning phase
/*     if(fc==30){
	   nTrialc=nTrialc+1;// number of trials in this block
	   fc=10;
    } */

     /* which map:*/
    if (nTrialc>1){
	   curMpLast = curMpV[nTrialc-2];
    }else{
	   curMpLast = -1;
    }
    curMp = curMpV[nTrialc-1];

    defineGraph();// create transition matrixes and define pictures set directory

    ncoinSc = ncoin;
    y = y0;
    imCold.src = [];
    clearCanvas(crE,300,450);
    ncoinT=0;
	// all the followings are flags that signal the current part 
    flagC=0;
    flagT=0;
    flagIsM=-1;//signal that it is not IsM part. it is important for the function that collect subject respones
    flagCov=1;
    flagSs=2;
    flagSp=2
    flagQ = -1;

    saveStartTime(ncoin,fullName);

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
    //covRpArr = [];
    allLearnRandomWalk.style.display="inline";

    /* response object*/
    var resCover={choice:[],rTime:[]};
    resCArr.push(resCover);

    /*create a 1D array of pictures (start with regular grid):*/
    var a=1;
    var ran1,cn,isin;
    corR=0;
    if (thisTC==-1){// count current repeats in learning
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

   //if(curMp!=curMpLast&&curMpLast!=-1){
	if(curMp!=curMpLast){
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
  imC.src = FileName+"pic"+ myPic[in1P].toString() + ".jpg";// first picture
  //covRpArr.push(in1P);
  ran1 = Math.random();
  timeLast = new Date();
}

function conExp(cpic){// check subject response time
	document.getElementById("endThanksT").innerHTML = "";
   var tlap=1500;
   var thisTime = new Date();
   c = c+1;// counting the number of pictures that was displayed until now
   /*save responses to an Array*/
   var RT = calResponseTime(thisTime,timeLast);// rsponse time
   //var ans = saveDataDBnotU(fullName,nTrialc,in1P,cor,RT,c,"learnRandomWalkTable_MEG");// save data into table in sql
	var ans = saveDataDBnotU(fullName,nTrialc,in1P,0,RT,c,"learnRandomWalkTable_MEG");// save data into table in sql -  I don't have 'cor' as I have deleted it - can clean more

   imCold.src = FileName+"pic"+ myPic[in1P].toString() + ".jpg";// old picture
   ran1 = Math.random();
   in1P=detNextPicGenA(ran1,Ar,in1P);// next picture index

   //covRpArr.push(in1P);

   imC.src = FileName+"pic"+ myPic[in1P].toString() + ".jpg";// next picture
   ran1 = Math.random();
   timeLast = new Date();
   if(c>maxCov){// stop learning phase after maxCov observations
	   thisTC=-1;
	   endAllTrials(0);
   }
}


/* end learnRandomWalk task part*/
function endAllTrials_learnRandomWalk(endB){

  corR=0;
  allLearnRandomWalk.style.display="none";
   whichPile(1);

}
