/*navigation task functions*/


function startNavigTask(dS){ // formerly called startTask
   setTimeout(function(){flagT=1}, 500);
   inLlast = -1;
   inRlast = -1;
   bc.disabled=true;
   ndS=dS;
   y = y0;
   x = 0;
   nthis = 0;
   clearCanvas(crE,300,450);
   ncoinT=0;
   flagC=0;
   flagSs=0;
   flagSp=2;//signal that it is not pile part - important for the respose collecting function
   flagIsM=-1;//signal that it is not IsM part
   flagT = 1;
   flagTr=1;//can get an answer
   nTrialt = nTrialt+1;
   isMc[0].style.display="none";
   PileDiv[0].style.display="none";
   skT.style.display="inline";
   trp.style.display="inline";
   cPC.style.display="inline";
   imCu.style.display="inline";
   LBt.style.display="inline";
   RBt.style.display="inline";
   allTask[0].style.display="inline";
   sPcB.style.display="none";
   Et[0].style.display="none";
   endErT.style.display="none";
   c=1;

  /*print instructions:*/
  document.getElementById("instructionsT").innerHTML="<b>Try getting the target card with fewest steps - <br>In each step you can get one step closer, stay with the same number of steps or one step further from your target, depends on you choice.<br>The cards that you can choose from are associated with the current card<br>The cards you can choose from change following the card you pick (by pressing <b>u(up)/d(down)/Enter<b>).";
  document.getElementById("targetPic").innerHTML="your target card is:<br> ";

   /*initilzation of the random generator:*/
  var d = new Date();
  var mn = d.getMinutes();
  var nr;
  mn = Math.floor(mn/2);
  for (nr=0;nr<mn;nr++){
      Math.random();
  }

  /*stimulus blocks*/
  var j1,j2;
  inP = Math.floor(Math.random() * (np));//current picture index
  tar1 = findTargGen(dS,inP,DistM);//target picture index
  nSt = DistM[tar1][inP];


  if (curMp!=curMpLast){
	isFround = 1;
  }else{
	  isFround = 0;
  }
  if (nTrialc==1){
     sPC.innerHTML="Your current card:<br>number steps to target is: <b>"+dS;
	 }else{
	 sPC.innerHTML="Your current card:<br>";
	 }

  /*taret picture*/
  imelt.src = FileName+"pic"+ myPic[tar1].toString() + ".jpg";
  imelt.style.display="inline";

  /*current picture*/
  imCu.src=FileName+"pic"+ myPic[inP].toString() + ".jpg";

  /* indexes cards/pictures to choose from*/
  do{
	ran1 = Math.random();
	in1L=detNextPicGenA(ran1,Ar,inP);
  }
  while(in1L==tar1)

  do{
	ran1 = Math.random();
	in1R=detNextPicGenA(ran1,Ar,inP);
  }
  while((in1L==in1R)||(in1R==tar1))

  inLlast = in1L;
  inRlast = in1R;
  /* pictures to choose from*/
  imel1.src = FileName+"pic"+ myPic[in1L].toString() + ".jpg";
  imel1.style.display="inline";

  imel.src = FileName+"pic"+ myPic[in1R].toString() + ".jpg";
  imel.style.display="inline";

  PICclass.style.display="inline";

  timeLast = new Date();
}

function conExpT(cpic){// check subject choices
	flagTr=1;
	nthis= nthis+1;// number of current trial steps
	var Tchoice,nGood,nGoodInD,corTask;
  Et[0].style.display="none";
  var  thisTime=new Date();
  flagSs=1;
  inPlast = inP;
  var RTt = calResponseTime(thisTime,timeLast);
  if (cpic==1){//LEFT HAS BEEN CHOSEN
        inP = in1L;
		imCu.src=FileName+"pic"+ myPic[inP].toString() + ".jpg";
		Tchoice = 1;
  }else{
     if(cpic==2){
        inP = in1R;
		imCu.src=FileName+"pic"+ myPic[inP].toString() + ".jpg";
		Tchoice = 2;
		}else{
		  Tchoice = 0;
		}
  }
  /*checking how many good choices exists*/
 	nStL = DistM[tar1][in1L];// number of steps from 1 choice
	nStR = DistM[tar1][in1R];// number of steps from the second choice

  LastnSt = nSt;
  if((nStR>LastnSt&&nStL>LastnSt)||(nStR<LastnSt&&nStL>=LastnSt)||(nStR>=LastnSt&&nStL<LastnSt)){
	  nGood=1;
  }else{
	  if(nStR==LastnSt&&nStL==LastnSt){
		  nGood=3;
	  }else{
		  nGood=2;
	  }
  }

	ran1 = Math.random();
	nSt = DistM[tar1][inP];
   /*change things that are displayed on the screen*/
    skT.style.display="none";
    sPcB.style.display="inline";
    sPcB.style.backgroundColor="red";

    /*checking reaching to target or too many trials*/
  if ((inP==tar1)||nthis>=maxTask){
	flagSs=2;
	save2navigTable(Tchoice,nGood,nGoodInD,corTask,RTt);// save to sql table
    Et[0].style.display="inline";
	cPC.style.display="none";
	trp.style.display="none";
	imel.style.display="none";
    imel1.style.display="none";
	imelt.style.display="none";
	imCu.style.display="none";
     if(nthis<maxTask){// end trial if number of steps exceeded max Task number of steps
         endErT.innerHTML = "<b> target has been reached,<br> number of step= "+c.toString()+"<br>";
	 }else{
		endErT.innerHTML = "<b> too many steps";
	 }
	endErT.style.display="inline";
	sPcB.style.display="none";
    skT.style.display="none";
    bc.disabled=false;
    //be.disabled=false;
    totalStep = totalStep +c;
    return;
  }

   inLlast = in1L;
   inRlast = in1R;
	[in1L,in1R]=detNextPicExAnoR(inP,ran1,Ar,inRlast,inLlast);//find next indexes for options

  /* taking/adding coins (should appear just in the first block - otherwise they learn good and bed choices (- like a non-first order relation)*/
   if((nSt<LastnSt)||(nSt==LastnSt&&nStR>LastnSt&&nStL>LastnSt)||(nStR>LastnSt&&nStL>LastnSt&&cpic==0)){//CHECKING IF IT WAS A GOOD CHOICE, staying at the same distance is a good choice if it is the only avialable choice
		ncoin = ncoin+1;
		ncoinT = ncoinT+1;
		corTask = 1;
		if (nthis<80){
		if (flagC==0){
	      plotCircle(crE,y,"blue",x);
	    }else{
		  replotCircle(crE,y,x);
	    }
	    y = y-dy;
		}

	}else{
		if (ncoinT>0){
			   y = y+dy;
			   ncoinT = ncoinT-1;
		   }
		   ncoin = ncoin-1;
	   clearCircle(crE,y,x);
	   ncolCrc = ncolCrc-1;
	   corTask = 0;
	}
	   if (nTrialc==1){
		ncoinPv.style.display="inline";
		TheCanvas.style.display="inline"
		ncoinPv.innerHTML=ncoin+" coins";
	   }else{
		  ncoinPv.style.display="none";
		  TheCanvas.style.display="none";
	   }
	if(y<=0){
	   x = x+dx;
	   y = y0;
   }
   if(y>y0&&ncolCrc>1){
	   x = x-dx;
	   y = 0;
   }
   save2navigTable(Tchoice,nGood,-2,corTask,RTt);// save choces etc into the sql table
  c = c+1;

  var tlap = Math.floor((Math.random() * 1000) + 750);
  setTimeout(myTimeout, tlap,3);

   imel.style.display="none";
   imel1.style.display="none";
   imel.src = FileName+"pic"+ myPic[in1R].toString() + ".jpg";
   imel1.src = FileName+"pic"+ myPic[in1L].toString() + ".jpg";
    if (nTrialc==1){
     sPC.innerHTML="Your current card:<br>number steps to target is: <b>"+nSt;
	}else{
	 sPC.innerHTML="Your current card:<br>";
	}
   flagTr=1;

  timeLast = new Date();

}
function dispPic(){
	imel.style.display="inline";
	imel1.style.display="inline";
	sPcB.style.display="none";
	skT.style.display="inline";
}
function contT(docon){
  if(docon==1){

  sPcB.style.display="none";
  skT.style.display="none";

	   if (ndS<maxdS){
       startNavigTask(ndS+1);
	  }else{
		   allTask[0].style.display="none";
		   bc.disabled=false;
       startWhichIsCloser(0);
	  }
 }
}

function endAllTrials_navig(endB){// end navigation task function
 if(endB==1){
	 var j;
  var avlose = totalStep/nTrialt;
  allTask[0].style.display="none";
  allTask[0].remove;
 }
}
