
function learnRandomWalkTask(trial){// learning phase

  // Alon: think if this should be changed to get the trial from the table, in case subjects return to the task after disconnecting
  lrnWlkObj.trial = trial;

  document.getElementById("chPicCold").src = [];
  clearCanvas(document.getElementById("myCanvas"),300,450); // this is in utilities.js
  document.onkeydown = checkKey_learnWalk; // Alon: moved this from "clearCanvas". not sure why there's no () at the end, but left it as it was.

  // all the followings are flags that signal the current part // Alon & Shirley: change to a single variable tracking which task is currently played
  flagC=0;
  flagT=0;
  flagIsM=-1;//signal that it is not IsM part. it is important for the function that collect subject respones
  flagCov=1;
  flagSs=2;
  flagSp=2
  flagQ = -1;

  /* Print instructions*/
  document.getElementById("instructions").innerHTML="Try to remember the associations between the pictures that appears one after the other.<br> A picture can be associated to more than one/two pictures. <br> Say 'in your head' a sentence that connects the 2 pictures, it will help you to remember the associations. <br> Press enter to see the next card.";//<b>Is this picture tilt? </br>you get an extra point for any correct answer</br>";

  /* manage dispaly*/
  document.getElementById("myCanvas").style.display="inline"
  document.getElementsByClassName("whichIsCloser_feedback")[0].style.display="none";
  document.getElementById("Qfeedback").style.display="none";
  document.getElementsByClassName("isMiddle")[0].style.display="none";
  document.getElementsByClassName("whichIsCloser")[0].style.display="none";
  document.getElementsByClassName("navig")[0].style.display="none";
  document.getElementById("dispPc").style.display="none";
  document.getElementById("learnRandomWalk").style.display="inline";

  // Alon: change all this so that it'll be one map per day. On day 3 have a map with missing links.

  // innerHTML code
  if(exp.curRun>(exp.maxRun)){
    document.getElementById("newM").style.color="blue";
    document.getElementById("newM").innerHTML="new pictures set <br> experiment ended - thanks!";
  }

  document.getElementById("newM").style.color="green";
  document.getElementById("newM").innerHTML="Same pictures set, same game - new trial";

  //if(exp.curMap!=exp.lastMap&&exp.lastMap!=-1){
  if(exp.curMap!=exp.lastMap){

    document.getElementById("newM").style.color="red";
    document.getElementById("newM").innerHTML="new pictures set <br> take few minutes to rest";

    switch(exp.curRun){// display new/same picture sets message
      case 9:
      document.getElementById("newM").style.color="Blue";
      document.getElementById("newM").innerHTML="new pictures set <br> End Day 1";
      break;
      case 17:
      document.getElementById("newM").style.color="Blue";
      document.getElementById("newM").innerHTML="new pictures set <br> End Day 2";
      break;
      case 25:
      document.getElementById("newM").style.color="Blue";
      document.getElementById("newM").innerHTML="new pictures set <br> End Day 3";
      break;
      case 33:
      document.getElementById("newM").style.color="Blue";
      document.getElementById("newM").innerHTML="new pictures set <br> End Day 3";
      break;
      default:
      document.getElementById("newM").style.color="red";
      document.getElementById("newM").innerHTML="new pictures set <br> take few minutes to rest";
    }
  }else{
    document.getElementById("newM").style.color="green";
    document.getElementById("newM").innerHTML="Same pictures set, same game - new trial";
  }

  lrnWlkObj.nodeNumImgOld = []
  lrnWlkObj.nodeNumImgNew = Math.floor(Math.random() * (G.nNodes-1)); //first image index // G.nNodes is size of map (number of states/nodes)
  document.getElementById("chPicC1").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnWlkObj.nodeNumImgNew];// first image
  document.getElementById("chPicCold").src = exp.pathToImgDir + '../whitePic.jpg' // first image

  lrnWlkObj.imgPresentTime = new Date();
}

function checkKey_learnWalk(e) {
  // only proceed if subject pressed enter.
  if (e.keyCode == '13'){//enter
    conExp_learnWalk();
  }
}

function conExp_learnWalk(){// continue experiment: check subject response time // Shirey to fix in response function
  var buttonPressTime = new Date();
  //increase trial. increase before saving so that it will start from 1 (not 0), but still index
  lrnWlkObj.trial = lrnWlkObj.trial+1;
  var rt = calResponseTime(buttonPressTime,lrnWlkObj.imgPresentTime);// response time
  // save to sql table
  save2learnRandomWalkTable(exp.subjectId,exp.curRun, exp.curMap, lrnWlkObj.trial,lrnWlkObj.nodeNumImgOld,lrnWlkObj.nodeNumImgNew,exp.imgFileNamesArr[lrnWlkObj.nodeNumImg1],rt);// save data into table in sql -  I don't have 'cor' as I have deleted it - can clean more
  lrnWlkObj.nodeNumImgOld = lrnWlkObj.nodeNumImgNew;
  lrnWlkObj.nodeNumImgNew=detNextPicGenA(G.transMat,lrnWlkObj.nodeNumImgNew);// next picture index
  document.getElementById("chPicCold").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnWlkObj.nodeNumImgOld];// old picture
  document.getElementById("chPicC1").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnWlkObj.nodeNumImgNew];// next picture
  lrnWlkObj.imgPresentTime = new Date();
  // end part after lrnWlkObj.maxTrial observations
  if(lrnWlkObj.trial>lrnWlkObj.maxTrial){
    lrnWlkObj.trial=-1;
    endAllTrials_learnRandomWalk();
  }
}

/* end learnRandomWalk task part*/
function endAllTrials_learnRandomWalk(){
  corR=0;
  document.getElementById("learnRandomWalk").style.display="none";
  whichPile(1);
}
