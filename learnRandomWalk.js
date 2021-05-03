
function learnRandomWalkTask(){// learning phase

    // Alon: think if this should be changed to get the trial from the table, in case subjects return to the task after disconnecting
    learnWalkObj.trial = 0;

     /* which map:*/ // Alon: change sso that choosing the map will happen in choosePart()
    if (task.curRun>1){
	   curMpLast = task.mapsVec[task.curRun-2];
    }else{
	   curMpLast = -1;
    }
    curMp = task.mapsVec[task.curRun-1];

    defineGraph();// create transition matrixes and define pictures set directory // Alon: move to choosePart

    ncoinSc = ncoin; // change coins to number
    y = y0; // Alon: delete?
    imCold.src = [];
    clearCanvas(crE,300,450);
    ncoinT=0;

	// all the followings are flags that signal the current part // Alon & Shirley: change to a single variable tracking which task is currently played
    flagC=0;
    flagT=0;
    flagIsM=-1;//signal that it is not IsM part. it is important for the function that collect subject respones
    flagCov=1;
    flagSs=2;
    flagSp=2
    flagQ = -1;

	/* Print instructions*/
    inst.innerHTML="Try to remember the associations between the pictures that appears one after the other.<br> A picture can be associated to more than one/two pictures. <br> Say 'in your head' a sentence that connects the 2 pictures, it will help you to remember the associations. <br> Press enter to see the next card.";//<b>Is this picture tilt? </br>you get an extra point for any correct answer</br>";
    /* manage dispaly*/
    TheCanvas.style.display="inline"
	QFclass[0].style.display="none";
	feedbackQ.style.display="none";
    isMc[0].style.display="none";
    allQ[0].style.display="none";
    allTask[0].style.display="none";
    sPcB.style.display="none";

	initRand();//initilzation of random generator
    //covRpArr = [];
    allLearnRandomWalk.style.display="inline";

    /* response object*/ // Alon: can delete? check if used
    var resCover={choice:[],rTime:[]};
    resCArr.push(resCover);

    /*create a 1D array of pictures (start with regular grid):*/
    var a=1;
    var ran1,cn,isin;
    corR=0;
    var j1,j2,np0;

// Alon: change all this so that it'll be one map per day. On day 3 have a map with missing links.

	if(task.curRun>(maxT)){
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

	    switch(task.curRun){// display new/same picture sets message
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
    if(task.curRun==1){
	  isFround=1;  // Alon: can delete?
    }

    if(curMp>maxMap||curMp<0){
	   alert(" there is a problem with the map index- stop experiment!"); // Alon: can delete?
    }

  nodeNumImg1 = Math.floor(Math.random() * (np-1)); //first image index // np is size of map (number of states/nodes)
  imC.src = pathToImgDir + imgFileNamesArr[nodeNumImg1];// first image
  //covRpArr.push(nodeNumImg1);
  ran1 = Math.random();
  timeLast = new Date();
}

function conExp(){// continue experiment: check subject response time // Shirey to fix in response function
	document.getElementById("endThanksT").innerHTML = "";
   var tlap=1500;
   var thisTime = new Date();
   //increase trial. increase before saving so that it will start from 1 (not 0), but still index
   learnWalkObj.trial = learnWalkObj.trial+1;
   /*save responses to an Array*/
   var rt = calResponseTime(thisTime,timeLast);// rsponse time
	var ans = save2learnRandomWalkTable(subjectId,task.curRun, curMp, learnWalkObj.trial,nodeNumImg1,imgFileNamesArr[nodeNumImg1],rt);// save data into table in sql -  I don't have 'cor' as I have deleted it - can clean more

   imCold.src = pathToImgDir + imgFileNamesArr[nodeNumImg1];// old picture
   ran1 = Math.random();
   nodeNumImg1=detNextPicGenA(ran1,Ar,nodeNumImg1);// next picture index

   //covRpArr.push(nodeNumImg1);

   imC.src = pathToImgDir + imgFileNamesArr[nodeNumImg1];// next picture
   ran1 = Math.random();
   timeLast = new Date();
   // end part after learnWalkObj.maxTrial observations
   if(learnWalkObj.trial>learnWalkObj.maxTrial){
	   learnWalkObj.trial=-1;
	   endAllTrials_learnRandomWalk();
   }
}


/* end learnRandomWalk task part*/
function endAllTrials_learnRandomWalk(){

  corR=0;
  allLearnRandomWalk.style.display="none";
   whichPile(1);

}
