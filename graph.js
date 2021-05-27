function defineGraph(){// create transition structures and define pictures set
	switch(exp.curMap){//structure
		case(0):
			exp.pathToImgDir = "/MEG/images/set1reg/"; // pictures directory
			G.nCol = 6;
			G.nRow = 6;
			G.nNodes=G.nCol*G.nRow; // previously called np
		break;
		case(1):
			G.nCol = 5;
			G.nRow = 5;
			G.nNodes=G.nCol*G.nRow;
			exp.pathToImgDir = "/MEG/images/set2reg/"; // pictures directory
		break;
		case(2):
			G.nCol = 4;
			G.nRow = 4;
			G.nNodes=G.nCol*G.nRow;
			exp.pathToImgDir = "/MEG/images/set3reg/"; // pictures directory
			/* missing links staff*/
			G.nodesWithMissLink = [1,5,7,11,9,10]; // missing links nodes. Previously called vnmis.
			G.whichLinkIsMiss = [[5],[1],[11],[7],[10],[9]]; // the other nodes on the missing links/edges - corresponds to G.nodesWithMIssLink
		break;
	}
	createAr();// create the transition matrix in 'typeAr' structural form
	G.distMat = calDistAdjMat(G.transMat);// calculate distance matrix
}


function calDistAdjMat(transMat){
	var iNode,jNode,iNghbr,iNodeNghbrs,nNghbrs,flagNghbr;
	var nNodes = transMat.length;
	var D=[[]];
	var A = [[]];
	var An = [[]];
	var numZ = 0;
	/*Initilizing D*/
	for (iNode=0;iNode<nNodes;iNode++){//initialization - just neighbours
		var nodeNghbrs = transMat[iNode]; // vector of neighbours of node iNode
			nNghbrs =nodeNghbrs.length;
		D[iNode].push( new Array(nNodes));
		A[iNode].push( new Array(nNodes));
		An[iNode].push( new Array(nNodes));
		for (jNode=0;jNode<nNodes;jNode++){
			flagNghbr = 0;
			for (iNghbr=0;iNghbr<nNghbrs;iNghbr++){
				// check if jNode is a neighbour of iNode
				if nodeNghbrs[iNghbr]==jNode){
					flagNghbr=1;
					D[iNode][jNode]=1;
					A[iNode][jNode]=1;
					An[iNode][jNode]=1;
					break;
				}
			}
			if (flagNghbr==0){
				D[iNode][jNode]=0;
				A[iNode][jNode]=0;
				An[iNode][jNode]=0;
				numZ = numZ+1;
			}
		}
		// add placeholder for next node
		if(iNode<nNodes-1){
			D.push([]);
			A.push([]);
			An.push([]);
		}
	}

	// to calculate D, we will now calculate A^n for increasing n.
	// An[i,j]==1 means that D[]i,j]==n

	var n=2; // increased steps (this is the n of A^n)
	while (numZ>nNodes){
		numZ = nNodes;
		// calculate A^n
		An = multiplyMatrices(An,A);
		// add entries to D according to An
		for (iNode=0;iNode<nNodes;iNode++){
			for (jNode=0;jNode<nNodes;jNode++){
				if(iNode!=jNode){
					if(D[iNode][jNode]==0){
						if(An[iNode][jNode]!=0){
							D[iNode][jNode]=n;
						}else{
							numZ = numZ+1;
						}
					}
				}
			}
		}
		n = n+1;
	}
	return D;
}


function createAr(){
	/* create transition matrix according to structural form (typeAr)*/
	/* maxCov is the number of pictures in eacah plock of the learning phase*/
	switch(G.arrayType){
		case("HexA"):
			G.nNghbrs = 6;// number of neibours
			G.transMat=createHexNonPer();// non periodic Hexagonal structure
		break;
		case("clA"):
			G.nNghbrs = 6;// number of neibours
			G.transMat=createA2Acluster(G.nNodes,nc);// community structure
		break;
		case("recA"):
			G.nNghbrs = 4; // number of neighbours
			G.transMat=createTransMatRect();
		break;
	}
	if(exp.curMap==2){
		G.transMatMiss = deleteMissLinks(G.transMat,G.nodesWithMissLink,G.whichLinkIsMiss); // Still need to write a function for the missing links questions (whichIsCloser)
		G.distMatMiss = calDistAdjMat(G.transMatMiss);
	}
}


function createTransMatRect() { // previously called createArect
	var transMat=[[]];
	var crNd // crNd current Node, indeces start at 0.
	for (crNd=0;crNd<G.nNodes;crNd++) { // "crNd" runs over all nodes
		var crNd1 = crNd+1; // crNd1 used to be called a1. it's the current node, starts indeces at 1 instead 0.
		var crNdCol1 = rem(crNd1,G.nCol); // current node's column num, indeces start at 1.
		if((crNdCol1>1) && (crNd1>G.nCol) && (crNd1<=G.nNodes-G.nCol)) { //not on any edge
			transMat[crNd].push( new Array(4));
			transMat[crNd][0] = crNd-1;
			transMat[crNd][1] = crNd+1;
			transMat[crNd][2] = crNd+G.nCol;
			transMat[crNd][3] = crNd-G.nCol;
		} else if (crNd1<=G.nCol) { //first row
			if (crNdCol1>1) { // not first or last column
				transMat[crNd].push( new Array(3));
				transMat[crNd][0] = crNd-1;
				transMat[crNd][1] = crNd+1;
				transMat[crNd][2] = crNd+G.nCol;
			} else { // either first or last column
				switch(crNdCol1){
					case 0: // last column
					transMat[crNd].push( new Array(2));
					transMat[crNd][0]=crNd-1;
					transMat[crNd][1]=crNd+G.nCol;
					break;
					case 1: // first column
					transMat[crNd].push( new Array(2));
					transMat[crNd][0]=crNd+1;
					transMat[crNd][1]=crNd+G.nCol;
					break;
				}
			}
		} else if (crNd1>G.nNodes-G.nCol) { //last row
			if(crNdCol1>1){ // not first/last column
				transMat[crNd].push( new Array(3));
				transMat[crNd][0] = crNd-1;
				transMat[crNd][1] = crNd+1;
				transMat[crNd][2] = crNd-G.nCol;
			} else { // either first or last column
				switch (crNdCol1) {
					case 0: // last column
					transMat[crNd].push( new Array(2));
					transMat[crNd][0]=crNd-1;
					transMat[crNd][1]=crNd-G.nCol;
					break;
					case 1: // first coli,m
					transMat[crNd].push( new Array(2));
					transMat[crNd][0]=crNd+1;
					transMat[crNd][1]=crNd-G.nCol;
					break;
				}
			}
		} else { // first or last columns, not first/last rows
			switch (crNdCol1) {
				case 0: // last column
				transMat[crNd].push( new Array(3));
				transMat[crNd][0]=crNd-1;
				transMat[crNd][1]=crNd-G.nCol;
				transMat[crNd][2]=crNd+G.nCol;
				break;
				case 1: // first column
				transMat[crNd].push( new Array(3));
				transMat[crNd][0]=crNd+1;
				transMat[crNd][1]=crNd-G.nCol;
				transMat[crNd][2]=crNd+G.nCol;
				break;
			}
		}
	}

	if (crNd<G.nNodes-1) { // add placeholder for next node.
		transMat.push([]);
	}
	return transMat
}

/*define borer color*/
function defBorderA(im,tar,G.nCol,G.nNodes){
	var crNd1 = tar+1;
	var crNdCol1 = rem(crNd1,G.nCol);

	if((crNdCol1>1)&&(crNd1>G.nCol)&&(crNd1<=G.nNodes-G.nCol)){//not on the edge
		im.style.borderColor="Gray";
	}else{
		if(crNd1<=G.nCol){//first raw
			if(crNdCol1>1){
				im.style.borderColor="Red";
			}else{
				switch(crNdCol1){
					case 0://left up corner
					im.style.borderColor="Purple";
					break;
					case 1://right up corner
					im.style.borderColor="orange";
					break;
				}
			}
		}else{
			if(crNd1>G.nNodes-G.nCol){//last raw
				if(crNdCol1>1){
					im.style.borderColor="Green";
				}else{
					switch(crNdCol1){
						case 0:
						im.style.borderColor="Cyan";
						break;
						case 1://low right
						im.style.borderColor="GreenYellow";
						break;
					}
				}
			}else{
				switch(crNdCol1){
					case 0://left
					im.style.borderColor="Blue";
					break;
					case 1://right
					im.style.borderColor="Yellow";
					break;
				}
			}
		}
	}
}



function deleteMissLinks(transMat,nodesWithMissLink,whichLinkIsMiss){// general function to introduce missing link
  // vmis: the nodes that have missink links
  // vCmiss: the nodes that are connected to the nodes in vmis which their link should be deleted
  var s=0,b,iNode,iMissNode,k,flag,flag2;
	var nNghbrs, nNghbrsOrigAr; // number of neighbours of a node, after/before deleteing missing links
  var transMatMiss=[[]];
  for(iNode=0;iNode<G.nNodes;iNode++){ // go over nodes/states
    flag =0;
    for(iMissNode=s;iMissNode<nodesWithMissLink.length;iMissNode++){
      if(iNode==nodesWithMissLink[iMissNode]){
        flag = 1;
        s = iMissNode;
        break;
      }
    }
    nNghbrsOrigAr = transMat[iNode].length;// number of neighbours in the original array
    if (flag==0){// no missing link - copy neighbours
      nNghbrs = nNghbrsOrigAr;
      transMatMiss[iNode].push( new Array(nNghbrs));
      for (j=0;j<nNghbrs;j++){
        transMatMiss[iNode][j] = transMat[iNode][j];
      }
    }else{// there are missing links
      nNghbrs = nNghbrsOrigAr-whichLinkIsMiss[c].length;
      transMatMiss[iNode].push( new Array(nNghbrs));
      b=0;
      for (j=0;j<nNghbrsOrigAr;j++){
        flag2 = 0;
        for(k=0;k<whichLinkIsMiss[iMissNode].length;k++){// check if node Arp[a][j] is a miising neighbour, if it is make flag2 equal 1
          if (transMat[iNode][j]==whichLinkIsMiss[c][k]){
            flag2 = 1;
          }
        }
        if (flag2==0){// add the links that remain
          transMatMiss[iNode][b] = transMat[iNode][j];
          b = b+1;
        }
      }

    }
    if(iNode<G.nNodes-1){
      transMatMiss.push([]);
    }
  }
  return transMatMiss;
}
