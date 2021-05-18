/*navigation task functions*/


function startNavigTask(dS){ // formerly called startTask
  setTimeout(function(){flagT=1}, 500);
  inLlast = -1;
  inRlast = -1;
  document.getElementById("conBot").disabled=true;
  ndS=dS;
  y = y0;
  x = 0;
  nthis = 0;
  clearCanvas(document.getElementById("myCanvas"),300,450);
  ncoinT=0;
  flagC=0;
  flagSs=0;
  flagSp=2;//signal that it is not pile part - important for the respose collecting function
  flagIsM=-1;//signal that it is not IsM part
  flagT = 1;
  flagTr=1;//can get an answer
  nRunsNavig = nRunsNavig+1;
  document.getElementsByClassName("isMiddle")[0].style.display="none";
  document.getElementsByClassName("pileDiv")[0].style.display="none";
  document.getElementById("skip").style.display="inline";
  document.getElementById("tarPid").style.display="inline";
  document.getElementById("cPic").style.display="inline";
  document.getElementById("currPt").style.display="inline";
  document.getElementById("LbotT").style.display="inline";
  document.getElementById("RbotT").style.display="inline";
  document.getElementsByClassName("navig")[0].style.display="inline";
  document.getElementById("dispPc").style.display="none";
  document.getElementsByClassName("endTask")[0].style.display="none";
  document.getElementById("endExpReachT").style.display="none";
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
  inP = Math.floor(Math.random() * (G.nNodes));//current picture index
  tar1 = findTargGen(dS,inP,G.distMat);//target picture index
  nSt = G.distMat[tar1][inP];


  if (exp.curRun==1){
    document.getElementById("startPic").innerHTML="Your current card:<br>number steps to target is: <b>"+dS;
  }else{
    document.getElementById("startPic").innerHTML="Your current card:<br>";
  }

  /*taret picture*/
  document.getElementById("tarPt").src = exp.pathToImgDir + exp.imgFileNamesArr[tar1];
  document.getElementById("tarPt").style.display="inline";

  /*current picture*/
  document.getElementById("currPt").src=exp.pathToImgDir + exp.imgFileNamesArr[inP];

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
  document.getElementById("chPic1").src = exp.pathToImgDir + exp.imgFileNamesArr[in1L];
  document.getElementById("chPic1").style.display="inline";

  document.getElementById("chPic2").src = exp.pathToImgDir + exp.imgFileNamesArr[in1R];
  document.getElementById("chPic2").style.display="inline";

  document.getElementById("picT").style.display="inline";

  timeLast = new Date();
}

function conExpT(cpic){// check subject choices
  flagTr=1;
  nthis= nthis+1;// number of current trial steps
  var Tchoice,nGood,nGoodInD,corTask;
  document.getElementsByClassName("endTask")[0].style.display="none";
  var  thisTime=new Date();
  flagSs=1;
  inPlast = inP;
  var RTt = calResponseTime(thisTime,timeLast);
  if (cpic==1){//LEFT HAS BEEN CHOSEN
    inP = in1L;
    document.getElementById("currPt").src=exp.pathToImgDir + exp.imgFileNamesArr[inP];
    Tchoice = 1;
  }else{
    if(cpic==2){
      inP = in1R;
      document.getElementById("currPt").src=exp.pathToImgDir + exp.imgFileNamesArr[inP];
      Tchoice = 2;
    }else{
      Tchoice = 0;
    }
  }
  /*checking how many good choices exists*/
  nStL = G.distMat[tar1][in1L];// number of steps from 1 choice
  nStR = G.distMat[tar1][in1R];// number of steps from the second choice

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
  nSt = G.distMat[tar1][inP];
  /*change things that are displayed on the screen*/
  document.getElementById("skip").style.display="none";
  document.getElementById("dispPc").style.display="inline";
  document.getElementById("dispPc").style.backgroundColor="red";

  /*checking reaching to target or too many trials*/
  if ((inP==tar1)||nthis>=navigObj.maxSteps){
    flagSs=2;
    save2navigTable(Tchoice,nGood,nGoodInD,corTask,RTt);// save to sql table
    document.getElementsByClassName("endTask")[0].style.display="inline";
    document.getElementById("cPic").style.display="none";
    document.getElementById("tarPid").style.display="none";
    document.getElementById("chPic2").style.display="none";
    document.getElementById("chPic1").style.display="none";
    document.getElementById("tarPt").style.display="none";
    document.getElementById("currPt").style.display="none";
    if(nthis<navigObj.maxSteps){// end trial if number of steps exceeded max Task number of steps
      document.getElementById("endExpReachT").innerHTML = "<b> target has been reached,<br> number of step= "+c.toString()+"<br>";
    }else{
      document.getElementById("endExpReachT").innerHTML = "<b> too many steps";
    }
    document.getElementById("endExpReachT").style.display="inline";
    document.getElementById("dispPc").style.display="none";
    document.getElementById("skip").style.display="none";
    document.getElementById("conBot").disabled=false;
    totalStep = totalStep +c;
    return;
  }

  inLlast = in1L;
  inRlast = in1R;
  [in1L,in1R]=detNextPicExAnoR(inP,ran1,Ar,inRlast,inLlast);//find next indexes for options

  /* taking/adding coins (should appear just in the first block - otherwise they learn good and bed choices (- like a non-first order relation)*/
  // Alon & Shirley: need to write something here for changing the score, in the meantime I commented out what was before
  if((nSt<LastnSt)||(nSt==LastnSt&&nStR>LastnSt&&nStL>LastnSt)||(nStR>LastnSt&&nStL>LastnSt&&cpic==0)){//CHECKING IF IT WAS A GOOD CHOICE, staying at the same distance is a good choice if it is the only avialable choice
    // ncoin = ncoin+1;
    // ncoinT = ncoinT+1;
    // corTask = 1;
    // if (nthis<80){
    //   if (flagC==0){
    //     plotCircle(document.getElementById("myCanvas"),y,"blue",x);
    //   }else{
    //     replotCircle(document.getElementById("myCanvas"),y,x);
    //   }
    //   y = y-dy;
    // }

  }else{
  //   if (ncoinT>0){
  //     y = y+dy;
  //     ncoinT = ncoinT-1;
  //   }
  //   ncoin = ncoin-1;
  //   clearCircle(document.getElementById("myCanvas"),y,x);
  //   ncolCrc = ncolCrc-1;
  //   corTask = 0;
  // }

  // Alon & Shirley: need to write something here for displaying the score when we want it to be displayed. in the meantime it's commented out.
  if (exp.curRun==1){
    // document.getElementById("ncoinP").style.display="inline";
    document.getElementById("myCanvas").style.display="inline"
    // document.getElementById("ncoinP").innerHTML=ncoin+" coins";
  }else{
    // document.getElementById("ncoinP").style.display="none";
    document.getElementById("myCanvas").style.display="none";
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

  document.getElementById("chPic2").style.display="none";
  document.getElementById("chPic1").style.display="none";
  document.getElementById("chPic2").src = exp.pathToImgDir + exp.imgFileNamesArr[in1R];
  document.getElementById("chPic1").src = exp.pathToImgDir + exp.imgFileNamesArr[in1L];
  if (exp.curRun==1){
    document.getElementById("startPic").innerHTML="Your current card:<br>number steps to target is: <b>"+nSt;
  }else{
    document.getElementById("startPic").innerHTML="Your current card:<br>";
  }
  flagTr=1;

  timeLast = new Date();

}
function dispPic(){
  document.getElementById("chPic2").style.display="inline";
  document.getElementById("chPic1").style.display="inline";
  document.getElementById("dispPc").style.display="none";
  document.getElementById("skip").style.display="inline";
}
function contT(docon){
  if(docon==1){

    document.getElementById("dispPc").style.display="none";
    document.getElementById("skip").style.display="none";

    if (ndS<maxdS){
      startNavigTask(ndS+1);
    }else{
      document.getElementsByClassName("navig")[0].style.display="none";
      document.getElementById("conBot").disabled=false;
      startWhichIsCloser(0);
    }
  }
}

function endAllTrials_navig(endB){// end navigation task function
  if(endB==1){
    var j;
    var avlose = totalStep/nRunsNavig;
    document.getElementsByClassName("navig")[0].style.display="none";
    document.getElementsByClassName("navig")[0].remove;
  }
}
