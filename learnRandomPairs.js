
function learnRandomPairsTask(trial){

  clearCanvas(document.getElementById("myCanvas"),300,450); // in utilities.js
  document.onkeydown = checkKey_learnPairs; // Alon: moved this from "clearCanvas". not sure why there's no () at the end, but left it as it was.

  flagSs=2;
  flagSp=2

  lrnPrsObj.trial = trial;

  // Stop display of previous part
  document.getElementsByClassName("whichIsCloser")[0].style.display="none";
  document.getElementsByClassName("whichIsCloser_feedback")[0].style.display="none";
  document.getElementById("Qfeedback").style.display="none";

  /* Print instructions*/
  document.getElementById("instructionsP").innerHTML="Try to remember the associations between the pair of pictures. successive pairs are not related. It will help you during the next parts of the game.<br> Press enter to see the next card.";//<b>Is this picture tilt? </br>you get an extra point for any correct answer</br>";

  // make sure that displays of other part s ar eoff. DELETE?
  document.getElementsByClassName("isMiddle")[0].style.display="none";
  document.getElementsByClassName("navig")[0].style.display="none";
  document.getElementById("dispPc").style.display="none";
  document.getElementById("conCP").style.display="none";
  document.getElementsByClassName("navig")[0].style.display="none";

  /*array of all presentation*/
  allLearnRandomPair.style.display="inline";

  /*create a 1D array of pictures (start with regular grid):*/
  var a=1;
  var ran1,cn,isin;
  corR=0;
  var j1,j2,np0;

  if(exp.curRun>(exp.maxRun)){
    document.getElementById("newMP").style.color="blue";
    document.getElementById("newMP").innerHTML="new pictures set <br> experiment ended - thanks!";
  }

  document.getElementById("newMP").style.color="green";
  document.getElementById("newMP").innerHTML="Same pictures set, same game - new trial";

  if(exp.curMap!=exp.lastMap&&exp.lastMap!=-1){
    document.getElementById("newMP").style.color="red";
    document.getElementById("newMP").innerHTML="new pictures set <br> take few minutes to rest";
  }else{
    document.getElementById("newMP").style.color="green";
    document.getElementById("newMP").innerHTML="Same pictures set, same game - new trial";
  }

  if(exp.curMap>exp.maxMap||exp.curMap<0){
    alert(" there is a problem with the map index- stop experiment!");
  }

  ran1 = Math.random();
  timeLast = new Date();
  conExpPair(0);
}
function checkKey_learnPairs(e) {
  // only proceed if subject pressed enter.
  if (e.keyCode == '13') {//enter
    conExpPair();
  }
}


function conExpPair(){
  document.getElementById("endThanksT").innerHTML = "";
  document.getElementById("PicPC1").style.display="none"
  document.getElementById("PicPC2").style.display="none"
  document.getElementById("conCP").style.display="none"
  var buttonPressTime = new Date();
  var cor;
  lrnPrsObj.trial =lrnPrsObj.trial+1;

  /*save responses to an Array*/
  var RT = calResponseTime(buttonPressTime,timeLast);

  in1P = Math.floor(Math.random() * (np-1));
  ran1 = Math.random();
  if (exp.curRun<9){
    in2P=detNextPicGenA(ran1,Ar,in1P);// no missing links
  }else{
    in2P=detNextPicGenA(ran1,ArMiss,in1P);// with missing links
  }
  /* the 2 pictures*/
  document.getElementById("PicPC1").src = exp.pathToImgDir + exp.imgFileNamesArr[in1P];
  document.getElementById("PicPC2").src = exp.pathToImgDir + exp.imgFileNamesArr[in2P];

  if (lrnPrsObj.trial>0){
    document.getElementById("conCP").style.display="inline";
    setTimeout(function(){ document.getElementById("conCP").style.display="none";},500);
    setTimeout(function(){document.getElementById("PicPC1").style.display="inline"; document.getElementById("PicPC2").style.display="inline";},500);
    document.getElementById("newMP").style.display="none";
  } else{
    document.getElementById("PicPC1").style.display="inline";
    document.getElementById("PicPC2").style.display="inline";
  }

  ran1 = Math.random();
  timeLast = new Date();
  if(lrnPrsObj.trial>maxCovP){
    lrnPrsObj.trial=-1;
    endAllTrials_learnRandomPairs(0);
  }

  save2learnRandomPairTable(exp.subjectId,exp.curRun,in1P,in2P,RT,lrnPrsObj.trial,"learnRandomPairsTable");
}


/* end learnRandomPairs task part*/
function endAllTrials_learnRandomPairs(endB){

  corR=0;
  lrnPrsObj.trial = 0;
  allLearnRandomPair.style.display="none";
  whichPile(1);

}
