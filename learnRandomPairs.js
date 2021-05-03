
function learnRandomPairsTask(fc){

  /* Load The Picture Array:*/
  if (task.curRun>0){
    curMpLast = task.mapsVec[task.curRun-2];
  }else{
    curMpLast = -1;
  }
  curMp = task.mapsVec[task.curRun-1];

  chooseLearning_walkOrPairs();// create transition matrixes and define pictures set directory

  y = y0;
  clearCanvas(document.getElementById("myCanvas"),300,450);
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

  saveStartTime(ncoin,subjectId);
  document.getElementsByClassName("whichIsCloser")[0].style.display="none";
  document.getElementsByClassName("whichIsCloser_feedback")[0].style.display="none";
  document.getElementById("Qfeedback").style.display="none";

  /* Print instructions*/
  document.getElementById("instructionsP").innerHTML="Try to remember the associations between the pair of pictures. successive pairs are not related. It will help you during the next parts of the game.<br> Press enter to see the next card.";//<b>Is this picture tilt? </br>you get an extra point for any correct answer</br>";

  document.getElementsByClassName("isMiddle")[0].style.display="none";
  document.getElementsByClassName("navig")[0].style.display="none";
  document.getElementById("dispPc").style.display="none";
  document.getElementById("conCP").style.display="none";
  initRand();//initilzation of random generator
  /*array of all presentation*/
  covRpArr = [];
  document.getElementsByClassName("navig")[0].style.display="none";
  allLearnRandomPair.style.display="inline";

  /* response object*/
  var resCover={choice:[],rTime:[]};
  resCArr.push(resCover);

  /*create a 1D array of pictures (start with regular grid):*/
  var a=1;
  var ran1,cn,isin;
  corR=0;
  var j1,j2,np0;

  if(task.curRun>(maxT)){
    document.getElementById("newMP").style.color="blue";
    document.getElementById("newMP").innerHTML="new pictures set <br> experiment ended - thanks!";
  }

  document.getElementById("newMP").style.color="green";
  document.getElementById("newMP").innerHTML="Same pictures set, same game - new trial";
  isFround=0;

  if(curMp!=curMpLast&&curMpLast!=-1){
    isFround=1;
    document.getElementById("newMP").style.color="red";
    document.getElementById("newMP").innerHTML="new pictures set <br> take few minutes to rest";
  }else{
    document.getElementById("newMP").style.color="green";
    document.getElementById("newMP").innerHTML="Same pictures set, same game - new trial";
  }
  if(task.curRun==1){
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
  document.getElementById("PicPC1").style.display="none"
  document.getElementById("PicPC2").style.display="none"
  document.getElementById("conCP").style.display="none"
  var tlap=1500;
  var thisTime = new Date();
  var cor;
  thisTCp =thisTCp+1;

  /*save responses to an Array*/
  var RT = calResponseTime(thisTime,timeLast);

  in1P = Math.floor(Math.random() * (np-1));
  ran1 = Math.random();
  if (task.curRun<9){
    in2P=detNextPicGenA(ran1,Ar,in1P);// no missing links
  }else{
    in2P=detNextPicGenA(ran1,ArMiss,in1P);// with missing links
  }
  /* the 2 pictures*/
  document.getElementById("PicPC1").src = pathToImgDir + imgFileNamesArr[in1P];
  document.getElementById("PicPC2").src = pathToImgDir + imgFileNamesArr[in2P];

  if (thisTCp>0){
    document.getElementById("conCP").style.display="inline";
    setTimeout(function(){ document.getElementById("conCP").style.display="none";},500);
    setTimeout(function(){document.getElementById("PicPC1").style.display="inline"; document.getElementById("PicPC2").style.display="inline";},500);
    document.getElementById("newMP").style.display="none";
  } else{
    document.getElementById("PicPC1").style.display="inline";
    document.getElementById("PicPC2").style.display="inline";
  }
  covRpArr.push(in1P);

  ran1 = Math.random();
  timeLast = new Date();
  if(thisTCp>maxCovP){
    thisTCp=-1;
    endAllTrials_learnRandomPairs(0);
  }

  save2learnRandomPairTable(subjectId,task.curRun,in1P,in2P,RT,thisTCp,"learnRandomPairsTable");
}


/* end learnRandomPairs task part*/
function endAllTrials_learnRandomPairs(endB){

  corR=0;
  thisTCp = 0;
  allLearnRandomPair.style.display="none";
  whichPile(1);

}
