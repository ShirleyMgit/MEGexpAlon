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
	// This is what find4thNodeOfPile does.
	// B. the target is connected to one of the piles by a missing link.

	// here the target cannot appear in any pile
	pileObj.targetNode = -1;

	/* manage display*/
	document.getElementById("pilesTab").style.display="block";
	document.getElementById("enter2continueMsg_pile").style.dispaly="none";
	document.getElementById("isCorrectMsg_pile").style.display= "none";

	// display empty piles
	document.getElementById("pile1Img1").src="/MEG/images/whitePic.jpg";
	document.getElementById("pile1Img2").src="/MEG/images/whitePic.jpg";
	document.getElementById("pile1Img3").src="/MEG/images/whitePic.jpg";
	document.getElementById("pile1Img4").src="/MEG/images/whitePic.jpg";
	document.getElementById("pile2Img1").src="/MEG/images/whitePic.jpg";
	document.getElementById("pile2Img2").src="/MEG/images/whitePic.jpg";
	document.getElementById("pile2Img3").src="/MEG/images/whitePic.jpg";
	document.getElementById("pile2Img4").src="/MEG/images/whitePic.jpg";
	document.getElementById("pile1Img1").style.display="inline";
	document.getElementById("pile1Img2").style.display="inline";
	document.getElementById("pile1Img3").style.display="inline";
	document.getElementById("pile1Img4").style.display="inline";
	document.getElementById("pile2Img1").style.display="inline";
	document.getElementById("pile2Img2").style.display="inline";
	document.getElementById("pile2Img3").style.display="inline";
	document.getElementById("pile2Img4").style.display="inline";

	pileObj.trial = pileObj.trial+1;// count trials

	// set the (local) transition matrix to work with from the global G obj - either the full or missing links matrix.
	var transMat;
	if (exp.curRun<9){
		transMat = G.transMat;
	}else{
		transMat = G.transMatMiss;
	}

	/* build piles (sequences of nodes)*/

	// Randomely sample the first node of each pile
	pileObj.pile1Img1 = Math.floor(Math.random() * (G.nNodes));
	pileObj.pile2Img1 = Math.floor(Math.random() * (G.nNodes));
	// ensure first nodes of both piles are not the same
	while(pileObj.pile1Img1==pileObj.pile2Img1){
		pileObj.pile2Img1 = Math.floor(Math.random() * (G.nNodes));
	}

	pileObj.pile1Img2=findRandNghbr(transMat,pileObj.pile1Img1);
	pileObj.pile2Img2=findRandNghbr(transMat,pileObj.pile2Img1);
	pileObj.pile1Img3=findRandNghbrExcept(transMat,pileObj.pile1Img2,pileObj.pile1Img1);
	pileObj.pile2Img3=findRandNghbrExcept(transMat,pileObj.pile2Img2,pileObj.pile2Img1);


	// Alon: CHECK THIS WHILE LOOP WORKS CORRECTLY!
	//  this while loop is for checking that the last image in the two piles is
	// not the same. If it is, sample another image from the neighbours of (one of the piles's) second
	// image. if there isn't another neighbour of the second image in both piles, start over to sample new piles.
	while (pileObj.pile2Img3==pileObj.pile1Img3){
		if (transMat[pileObj.pile2Img2].length>1){
			pileObj.pile2Img3=findRandNghbrExcept(transMat,pileObj.pile2Img2,pileObj.pile2Img1);
		}else{
			if (transMat[pileObj.pile1Img2].length>1){
				pileObj.pile1Img3=findRandNghbrExcept(transMat,pileObj.pile1Img2,pileObj.pile1Img1);

			}else{
				pileObj.trial=pileObj.trial-1;
				whichPile();
			}
		}
	}

	var pile1all = [pileObj.pile1Img1,pileObj.pile1Img2,pileObj.pile1Img3];
	var pile2all = [pileObj.pile2Img1,pileObj.pile2Img2,pileObj.pile2Img3];

	// Randomly choose if the correct answer will be pile1 or pile2, and then find a suitable target node for the that pile.
	// a suitable target is a neighbour of the third image of the the pile which is
	// 1. not in any of the piles; 2. not connected on the full graph to the other pile
	if(Math.random()<0.5){
		pileObj.targetNode=find4thNodeOfPile(transMat,pile1all,pile2all,G.distMat);
		pileObj.correctPile = 1;
	}else{
		pileObj.targetNode=find4thNodeOfPile(transMat,pile2all,pile1all,G.distMat);
		pileObj.correctPile = 2;

	}

	//  if didn't manage to find suitable target node, run again to find new piles and target
	if (pileObj.targetNode==-1){
		pileObj.trial=pileObj.trial-1;
		whichPile();
	}else{
		// display target image
		document.getElementById("pileTarget").src=exp.pathToImgDir + exp.imgFileNamesArr[pileObj.targetNode];

		/* display images in piles*/


		//the 3 picture 1 pile
		//the 3 picture 2 pile




		setTimeout(function(){ document.getElementById("pile1Img1").style.display="inline";
		document.getElementById("pile1Img1").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile1Img1];},500);
		setTimeout(function(){ document.getElementById("pile1Img2").style.display="inline";
		document.getElementById("pile1Img2").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile1Img2];}, 1200);
		setTimeout(function(){ document.getElementById("pile1Img3").style.display="inline";
		document.getElementById("pile1Img3").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile1Img3];},
	 	1900);
		setTimeout(function(){ document.getElementById("pile1Img4").style.display="inline";
		document.getElementById("pile1Img4").src = "/MEG/images/questionMark.jpeg"},
		2800);
		setTimeout(function(){ document.getElementById("pile2Img1").style.display="inline";
		document.getElementById("pile2Img1").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile2Img1];},
		3500);
		setTimeout(function(){ document.getElementById("pile2Img2").style.display="inline";
		document.getElementById("pile2Img2").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile2Img2];},
		4200);
		setTimeout(function(){ document.getElementById("pile2Img3").style.display="inline";
		document.getElementById("pile2Img3").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.pile2Img3];},
	 	4900);
		setTimeout(function(){ document.getElementById("pile2Img4").style.display="inline";
		document.getElementById("pile2Img4").src = "/MEG/images/questionMark.jpeg"},
		5900);

		thisLast=new Date();
	}
}

function whichPileAns(ansP){// check particpants answer
	var corP;
	var  trialime=new Date();
	var RTp=calResponseTime(trialime,thisLast);
	document.getElementById("enter2continueMsg_pile").style.dispaly="inline";
	if(ansP==pileObj.correctPile){
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
	if (pileObj.correctPile==1){// put the picture in the correct pile
		document.getElementById("pile1Img4").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.targetNode];//the 4 picture 1 pile
		document.getElementById("pile2Img4").src = "/MEG/images/whitePic.jpg";;//the 4 picture 1 pile
	}else{
		if(pileObj.correctPile==2){
			document.getElementById("pile1Img4").src = "/MEG/images/whitePic.jpg";//the 4 picture 1 pile
			document.getElementById("pile2Img4").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.targetNode];//the 4 picture 2 pile
		}else{
			document.getElementById("pile1Img4").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.targetNode];//the 4 picture both pile
			document.getElementById("pile2Img4").src = exp.pathToImgDir + exp.imgFileNamesArr[pileObj.targetNode];//the 4 picture both pile
		}
	}
	document.getElementById("enter2continueMsg_pile").style.display="inline"
	save2pileTable(corP,RTp);// save data into the piles table in sql
	flagSp = 0;
	if (pileObj.trial>=pileObj.maxTrial){// if the number of trials exceeded the maximum per block move to next part
		writeRresSp();
	}
}

function writeRresSp(){// move to is it in the middle part
	flagSp=2;
	isItMiddle(1);
}
