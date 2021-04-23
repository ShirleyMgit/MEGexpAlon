/*task functions*/
// the missing links questions are for recangular only - need to be checked for other structures!!!
function startWhichIsCloser(nQ){//distance estimation, formerly called startQustions
   setTimeout(function(){flagT=1}, 500);
   qcor.style.display="none";
   qcon.style.display="none";
   bc.disabled=true;
   //y = y0;
   //x = 0;
   if(nQ==0){
	   numCorrect = 0;
   }
   numQ = nQ+1;
   corAs = 0;
   clearCanvas(crE,300,450);
   ncoinT=0;
   flagC=0;
   flagSs=-1;
   flagSp=2;//signal that it is not pile part - importent for subject response function
   flagIsM=-1;//signal that it is not IsM part
   flagT = 0;
   flagTr = -1;
   flagQ = 0;
   isMc[0].style.display="none";
   PileDiv[0].style.display="none";
   skT.style.display="none";
   allTask[0].style.display="none";
   sPcB.style.display="none";
   Et[0].style.display="none";
   endErT.style.display="none";
   allQ[0].style.display="inline";
   //c=1;

  /*print instructions:"*/
  document.getElementById("instructionsQ").innerHTML="<b><br> The Target Card appears below, choose the card which requires less steps to reach the target card.";
  document.getElementById("targetPicQ").innerHTML="your target card is:<br> ";

   /*initilzation of the random generator:*/
  var d = new Date();
  var mn = d.getMinutes();
  var nr;
  mn = Math.floor(mn/2);
  for (nr=0;nr<mn;nr++){
      Math.random();
  }
  evT = calRem(nTrialc,2);
  /*stimulus blocks*/
  var j1,j2,wCl,flagTs,dis2;
  imq2=-1;
  corAs = 0;

  if(nTrialc<9){// no missing links
  	tarQ = Math.floor(Math.random() * (np));// target index
	ran1 = Math.random();
	if (ran1<0.333){// find the indexes of the pictures to choose from
		imq1 = findTargGen(2,tarQ,DistM);
		imq2 = findTargGen(4,tarQ,DistM);
	}else{
		if(ran1<0.6667){
			imq1 = findTargGen(2,tarQ,DistM);
			imq2 = findTargGen(3,tarQ,DistM);
		}else{
			imq1 = findTargGen(3,tarQ,DistM);
			imq2 = findTargGen(4,tarQ,DistM);
		}
	}

	 var nS1 = DistM[tarQ][imq1];
	 var nS2 = DistM[tarQ][imq2];

    if (nS1<nS2){
	    corAs=1;
    }else{
	    if (nS1==nS2){
		   corAs = 0;
	    }else{
		  corAs = 2;
	    }
    }
    }else{// missing links for recangular only - need to be checked for other structures!!!
	var ranD = Math.random();
	var imv;
	corAs = 1;// the missing link connection is defined to be image 1 - I then switch them 50% of the time
	lenMS = vnmis.length;
	ind = Math.floor(Math.random() * (lenMS));// index for choosing target
	tarQ = vnmis[ind];// the target index
	lenMS2 = vConmis[ind].length;
	ind2 = Math.floor(Math.random() * (lenMS2));// index for choosing the unconnected node (3 away on the missing link graph but 1 away on the complete graph);
	if(ranD<0.75){//change 1->3
		imq1 = vConmis[ind][ind2];
		imq2 = findTargGenWithMis(3,tarQ,DistM);//find an image with distance 3 both on the omplete and missing link graphs
	}else{//change 2->4
		imq0 = vConmis[ind][ind2];
		nnbN = ArMiss[imq0].length
		ind3 = Math.floor(Math.random() * (nnbN));
		imq1 = ArMiss[imq0][ind3];// this should be 2 away from the target.
		imq2 = findTargGenWithMis(4,tarQ,DistM);//find an image with distance 4 both on the omplete and missing link graphs
	}
  }
 /* change between the pictures*/
 /*I don't need to calculate the distance here as I have chosen what is the correct answer*/
  var imv = imq1;
  var ranQ = Math.random();
  if (ranQ <0.5){
	  imq1 = imq2;
	  imq2 = imv;
	  if (corAs==1){
		corAs = 2;
	  }else{
		  if(corAs==2){
			carAs=1;
		  }
	  }
  }
  /*the picture*/
  /*the target picture*/
   imelQ.src = FileName+"pic"+ myPic[tarQ].toString() + ".jpg";
   imelQ.style.display="inline";
   /* the other pictures*/
   q1.src = FileName+"pic"+ myPic[imq1].toString() + ".jpg";
   q1.style.display="inline";
   q2.src = FileName+"pic"+ myPic[imq2].toString() + ".jpg";
   q2.style.display="inline";

  timeLast = new Date();
}

function conExpQ(cq){// check subject response

	var  thisTime=new Date();
	var RTq = calResponseTime(thisTime,timeLast);
	flagQ = 1;
	qcor.style.display="none";
	/*  correct / non-correct*/
	if(corAs==cq||corAs==0){
		numCorrect = numCorrect+1;
		corQ = 1;
	}else{
	    corQ = 0;
	}
	ncoinPv.style.display="none";
	TheCanvas.style.display="none"
	ncoinPv.innerHTML=ncoin+" coins";

    save2whichIsCloserTable(cq,imq1,imq2,corQ,RTq);// save data in sql table

    qcon.style.display="inline";
    var tlap = Math.floor((Math.random() * 1000) + 750);
    setTimeout(myTimeout, tlap,3);

}

function conQ(){// next question or next block
	qcon.style.display="none";
	qcor.style.display="none";
	q1.style.display="none";
    q2.style.display="none";

   timeLast = new Date();
   if (numQ<qend){
		startWhichIsCloser(numQ);
   }else{
	    if(nTrialc<maxT){
		    nTrialc = nTrialc+1;
			numQ = 0;
			flagQ = 2;// so there wont be any response to subject pressing any key (enter/1/2)
			allQ[0].style.display="none";
			QFclass[0].style.display="inline";
			feedbackQ.style.display="inline";
			precntCor = Math.ceil(100*numCorrect/qend);
			feedbackQ.innerHTML = "Thank you, you have done: %" + precntCor + "correct";
		  }else{
			  document.getElementById("endThanksT").innerHTML = "Thank you,Experiment Finished";
			  allQ[0].style.display="none";
		  }

   }
}
