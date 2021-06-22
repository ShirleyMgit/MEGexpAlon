function whichPile(){// piles task

	// *** *** change so that:
	// 1. have an option of "no pile is correct"
	// 2. feedback only at the end of parts
	// 3. the total score should be on the full, not missing graph.
	// 4. add missing links piles questions: target is connected to one of the piles
	// only if assuming missing links. Subject should choose that pile iof they know
	// the full graph, but ishould choose "no-pile" if they don't know,
	// 5. Get rid of "both piles" option

  // Things to think about when choosing the piles and target images:
	// 1. There are two types of questions:
	// A. no missing link questions are involved - need to check that the target is
	// not in one of the piles and that it is not connected to the other pile on the full graph.
	// This is what detNextPicGenAnoP1P2P3inBoth does.
	// B. the target is connected to one of the piles by a missing link.

	// here the target cannot appear in any pile
	document.getElementById("enter2continueMsg_pile").style.display="none"
	inPisP = -1;

	/* manage display*/
	document.getElementById("pileDiv").style.display="block";
	document.getElementById("enter2continueMsg_pile").style.dispaly="none";
	document.getElementById("isCorrectMsg_pile").style.display= "none";
	document.getElementById("pile1Img1").style.display="none";
	document.getElementById("pile1Img2").style.display="none";
	document.getElementById("pile1Img3").style.display="none";
	document.getElementById("pile1Img4").style.display="none";
	document.getElementById("pile2Img1").style.display="none";
	document.getElementById("pile2Img2").style.display="none";
	document.getElementById("pile2Img3").style.display="none";
	document.getElementById("pile2Img4").style.display="none";

	pileObj.trial = pileObj.trial+1;// count trials

	/* choose sequences (piles) pictures*/
	inPp11 = Math.floor(Math.random() * (G.nNodes));
	inPp21 = Math.floor(Math.random() * (G.nNodes));
	while(inPp11==inPp21){
		inPp21 = Math.floor(Math.random() * (G.nNodes));
	}
	// set the (local) transition matrix to work with from the global G obj - either the full or missing links matrix.
	var transMat;
	if (exp.curRun<9){
		transMat = G.transMat;
	}else{
		transMat = G.transMatMiss;
	}
	inPp12=detNextPicGenA(transMat,inPp11);
	inPp22=detNextPicGenA(transMat,inPp21);
	inPp13=detNextPicGenAnoP2(inPp12,inPp11,transMat);
	inPp23=detNextPicGenAnoP2(inPp22,inPp21,transMat);

	document.getElementById("pile1Img1").src = exp.pathToImgDir + exp.imgFileNamesArr[inPp11];//the first picture 1 pile
	document.getElementById("pile2Img1").src = exp.pathToImgDir + exp.imgFileNamesArr[inPp21];//the first picture 2 pile

	document.getElementById("pile1Img2").src = exp.pathToImgDir + exp.imgFileNamesArr[inPp12];//the 2 picture 1 pile
	document.getElementById("pile2Img2").src = exp.pathToImgDir + exp.imgFileNamesArr[inPp22];//the 2 picture 2 pile


	// Alon: CHECK THIS WHILE LOOP WORKS CORRECTLY!
	//  this while loop is for checking that the last image in the two piles is
	// not the same. If it is, sample another image from the neighbours of the second
	// image, if there isn't another neighbour, start over.
	while (inPp23==inPp13){
		var A22L;
		var A12L;
		A22L = transMat[inPp22].length;
		A12L = transMat[inPp12].length;
		if (A22L >1){
			inPp23=detNextPicGenAnoP2(Math.random(),inPp22,inPp21,transMat);

		}else{
			if (A12L>1){
				inPp13=detNextPicGenAnoP2(Math.random(),inPp12,inPp11,transMat);

			}else{
				pileObj.trial=pileObj.trial-1;
				whichPile();
			}
		}
	}

	document.getElementById("pile1Img3").src = exp.pathToImgDir + exp.imgFileNamesArr[inPp13];//the 3 picture 1 pile
	document.getElementById("pile2Img3").src = exp.pathToImgDir + exp.imgFileNamesArr[inPp23];//the 3 picture 2 pile
	var all1pile = [inPp11,inPp12,inPp13];
	var all2pile = [inPp21,inPp22,inPp23];
	document.getElementById("pile1Img4").src = "/MEG/images/whitePic.jpg";
	document.getElementById("pile2Img4").src = "/MEG/images/whitePic.jpg";

	var ran1 = Math.random();

	if(ran1<0.5){// find the question picture - should make sure the other pile has no missing link with it.
		inPisP=detNextPicGenAnoP1P2P3inBoth(transMat,all1pile,all2pile,G.distMat);
		wP = 1; // wp: which pile is the correct answer
	}else{
		inPisP=detNextPicGenAnoP1P2P3inBoth(transMat,all2pile,all1pile,G.distMat);
		wP = 2;

	}

	if (inPisP==-1){ // inPisP returns -1 if it didn't manage to find a neighbour of the third image which is not in any of the piles.
		pileObj.trial=pileObj.trial-1;
		whichPile();
	}else{

		document.getElementById("pileTarget").src=exp.pathToImgDir + exp.imgFileNamesArr[inPisP];


		/* display cards in piles*/
		setTimeout(function(){ document.getElementById("pile1Img1").style.display="inline"; }, 500);
		setTimeout(function(){ document.getElementById("pile1Img2").style.display="inline";}, 1200);
		setTimeout(function(){ document.getElementById("pile1Img3").style.display="inline"; }, 1900);
		setTimeout(function(){ document.getElementById("pile1Img4").style.display="inline";}, 2800);
		setTimeout(function(){ document.getElementById("pile2Img1").style.display="inline"; }, 3500);
		setTimeout(function(){ document.getElementById("pile2Img2").style.display="inline";}, 4200);
		setTimeout(function(){ document.getElementById("pile2Img3").style.display="inline"; }, 4900);
		setTimeout(function(){ document.getElementById("pile2Img4").style.display="inline";}, 5900);
		setTimeout(function(){flagSp = 1;flag12MV=-1;}, 6500);//added flag12MV=-1 just to make sure, from some reason it got stack on2
		if (pileObj.trial>minTr){
			setTimeout(function(){if(isNestDis==0){document.getElementById("nextSp").disabled=false;}},6505);

		}
		thisLast=new Date();
	}
}

function whichPileAns(ansP){// check particpants answer
	var corP;
	var  trialime=new Date();
	var RTp=calResponseTime(trialime,thisLast);
	document.getElementById("enter2continueMsg_pile").style.dispaly="inline";
	if(ansP==wP){
		ncoinT = ncoinT+1;
		ncoin = ncoin+1;
		document.getElementById("isCorrectMsg_pile").style.color= "blue";
		document.getElementById("isCorrectMsg_pile").innerHTML = "Correct!";
		corP = 1;
		if (flagC==0){
			plotCircle(document.getElementById("myCanvas"),y,"blue",x);
		}else{
			replotCircle(document.getElementById("myCanvas"),y,x);
		}
		y = y-dy;

	}else{
		if (ncoinT>0){
			y = y+dy;
			ncoinT = ncoinT-1;
		}

		ncoin = ncoin-1;
		document.getElementById("isCorrectMsg_pile").style.color= "red";
		document.getElementById("isCorrectMsg_pile").innerHTML = "NOT Correct!";
		clearCircle(document.getElementById("myCanvas"),y,x);
		ncolCrc = ncolCrc-1;
		corP = 0;
	}
	document.getElementById("ncoinP").style.display="inline";
	document.getElementById("ncoinP").innerHTML=ncoin+" coins";
	if(y<=0){
		x = x+dx;
		y = y0;
	}
	if(y>y0&&ncolCrc>1){
		x = x-dx;
		y = 0;
	}
	document.getElementById("isCorrectMsg_pile").style.display= "inline";
	if (wP==1){// put the picture in the correct pile
		document.getElementById("pile1Img4").src = exp.pathToImgDir + exp.imgFileNamesArr[inPisP];//the 4 picture 1 pile
		document.getElementById("pile2Img4").src = "/MEG/images/whitePic.jpg";;//the 4 picture 1 pile
	}else{
		if(wP==2){
			document.getElementById("pile1Img4").src = "/MEG/images/whitePic.jpg";//the 4 picture 1 pile
			document.getElementById("pile2Img4").src = exp.pathToImgDir + exp.imgFileNamesArr[inPisP];//the 4 picture 2 pile
		}else{
			document.getElementById("pile1Img4").src = exp.pathToImgDir + exp.imgFileNamesArr[inPisP];//the 4 picture both pile
			document.getElementById("pile2Img4").src = exp.pathToImgDir + exp.imgFileNamesArr[inPisP];//the 4 picture both pile
		}
	}
	document.getElementById("enter2continueMsg_pile").style.display="inline"
	save2pileTable(corP,RTp);// save data into the piles table in sql
	flagSp = 0;
	if (pileObj.trial>=maxPile){// if the number of trials exceeded the maximum per block move to next part
		writeRresSp();
	}
}

function writeRresSp(){// move to is it in the middle part
	flagSp=2;
	isItMiddle(1);
}
