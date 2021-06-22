
function learnRandomWalkTask(){// learning phase

  document.onkeydown = checkKey_learnWalk; // Alon: moved this from "clearCanvas". not sure why there's no () at the end, but left it as it was.
  document.getElementById("learnRandomWalk").style.display="inline";

/*
  // Alon: change all this so that it'll be one map per day. On day 3 have a map with missing links.

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
*/

  // set up first two images (different from the rest of pairs because the first image is blank)
  lrnWlkObj.nodeNumImgOld = []
  lrnWlkObj.nodeNumImgNew = Math.floor(Math.random() * (G.nNodes-1)); //first image index // G.nNodes is size of map (number of states/nodes)
  document.getElementById("lrnWlk_imgNew").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnWlkObj.nodeNumImgNew];// first image
  document.getElementById("lrnWlk_imgOld").src = exp.pathToImgDir + '../whitePic.jpg' // first "old" image

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
  var rt = calResponseTime(buttonPressTime,lrnWlkObj.imgPresentTime);// response time
  // save to sql table
  save2learnRandomWalkTable(exp.subjectId,exp.curRun, exp.curMap, lrnWlkObj.trial,lrnWlkObj.nodeNumImgOld,lrnWlkObj.nodeNumImgNew,exp.imgFileNamesArr[lrnWlkObj.nodeNumImg1],rt);// save data into table in sql -  I don't have 'cor' as I have deleted it - can clean more
  //increase trial. increase after saving because we initialised at trial 1
  lrnWlkObj.trial = lrnWlkObj.trial+1;
  lrnWlkObj.nodeNumImgOld = lrnWlkObj.nodeNumImgNew;
  lrnWlkObj.nodeNumImgNew=detNextPicGenA(G.transMat,lrnWlkObj.nodeNumImgNew);// next picture index
  document.getElementById("lrnWlk_imgOld").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnWlkObj.nodeNumImgOld];// old picture
  document.getElementById("lrnWlk_imgNew").src = exp.pathToImgDir + exp.imgFileNamesArr[lrnWlkObj.nodeNumImgNew];// next picture
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
  pileObj.trial = 1; // initialise Piles task to trial 1
  whichPile();
}
