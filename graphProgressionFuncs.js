// pick one neighbour randomely
function detNextPicGenA(transMat,node){ //fixed for corrected Ar
	var nNghbrs = transMat[node].length;
	var randNghbrInd = Math.floor(nNghbrs*Math.random());
	var nxtNode=transMat[node][randNghbrInd];
	return nxtNode;
}

// Return neighbour of in1 whidh is not p2
function detNextPicGenAnoP2(in1,p2,transMat){

	/*returns a neibor of in1 which is not p2*/
	var nbI = transMat[in1].length;
	var j,nbInew=[];
	for(j=0;j<nbI;j++){
		if(transMat[in1][j]!=p2){
			nbInew.push(transMat[in1][j]);
		}
	}
	var nin = Math.floor((nbI-1)*Math.random());
	var nxtNodeInd=nbInew[nin];
	return nxtNodeInd;
}

function isAneighbor(in1,in2,transMat){
	/*is in1 in2 neighbors? return 0 - not a neighbor or 1 - is a neibor*/
	var nbI = transMat[in1].length;//number of neighbourse of that node
	var j,isN;
	isN = 0;
	for(j=0;j<nbI;j++){
		if(transMat[in1][j]==in2){
			isN=1;
			break;
		}
	}
	return isN;
}


function detNextPicGenAnoP2Gen(in1,in0){
	/*This function select a neiboughr of in1 which is not a neighbor of in0.*/
	var nbI = G.transMat[in1].length;
	var nbI0 = G.transMat[in0].length;
	var flagN=0;
	var j,j2,nbInew=[];
	for(j=0;j<nbI;j++){
		flagN=0;
		for(j2=0;j2<nbI0;j2++){
			if(G.transMat[in1][j]==G.transMat[in0][j2]){
				flagN=1;
			}
		}
		if(G.transMat[in1][j]!=in0&&flagN==0){
			nbInew.push(G.transMat[in1][j]);
		}
	}
	var lenN = nbInew.length;
	var nin = Math.floor(lenN*Math.random());
	return nbInew[nin];
}

function detNextPicExA2(in0,transMat){
	//This function chose 2 different neighbours of in0, Ar is the array of neighbours indexes, Math.random() is a random number between 0-1
	var nbI = transMat[in0];//the neighbourse of that node
	var nb=[];
	var j,in1;
	var leb=nbI.length;
	var nn1=Math.floor(leb*Math.random());
	in1=nbI[nn1];
	for (j=0;j<leb;j++){
		if(nbI[j]!=in1){
			nb.push(nbI[j]);
		}
	}
	var nbl = nb.length;//nb.length-1;// I think that was a mistake
	var nf=Math.floor(nbl*Math.random());
	var nin = nf;
	var in2=nb[nin];

	return [in1,in2];;
}

function detNextPicExAnoR(in0,transMat,inR,inL){//fixes for corrected Ar
	//This function chose 2 different neighbours of in0, Ar is the array of neighbours indexes, Math.random() is a random number between 0-1
	var nbI = transMat[in0];//the neighbourse of that node
	var nbnoR=[];
	var nb=[];
	var j,in1;
	var leb=nbI.length;
	for(j=0;j<leb;j++){
		if(leb>3){
			if(nbI[j]!=inR&&nbI[j]!=inL){
				nbnoR.push(nbI[j]);
			}
		}else{
			nbnoR.push(nbI[j]);
		}
	}
	var nn1;
	if(leb>3){
		leb2 = leb-2;
	}else{
		leb2 = leb;
	}
	nn1=Math.floor((leb2)*Math.random());
	in1=nbnoR[nn1];
	for (j=0;j<leb2;j++){
		if(nbnoR[j]!=in1){
			nb.push(nbnoR[j]);
		}
	}
	var nbl = nb.length;//nb.length-1;// I think that was a mistake
	var nf=Math.floor(nbl*Math.random());
	if (Math.random()==1){
		nf = nf-1;
	}
	var nin = nf;
	var in2=nb[nin];

	return [in1,in2];;
}

function detNextPicGenAnoP1P2P3inBoth(transMat,allPile1,allPile2,DistFull){//fixed for corrected Ar
	/*This function finds the next forth picture in Hamiltonian path - good for all structures*/
	var in23 = allPile2[2];
	var in22 = allPile2[1];
	var in21 = allPile2[0];
	var in13 = allPile1[2];
	var in12 = allPile1[1];
	var in11 = allPile1[0];

	// Alon: find all neighbours of in13 that are not in any of the piles.
	// then, also check it is not a neighbour of the other pile on the full graph.. something like this


	var nbI = transMat[in13].length;
	var j,nbInew=[];
	for(j=0;j<nbI;j++){
		if(transMat[in13][j]!=in12&&transMat[in13][j]!=in11&&transMat[in13][j]!=in21&&transMat[in13][j]!=in22&&transMat[in13][j]!=in23&&DistFull[transMat[in13][j]][in23]>1){// the last inequality makes sure that the pictures is not connected to the other pile with a missing link
			nbInew.push(transMat[in13][j]);
		}
	}
	var nbInL = nbInew.length;
	var nin = Math.floor((nbInL)*Math.random());
	var nxp;
	if (nbInew.length>0){
		nxp=nbInew[nin];
	}else{
		nxp=-1;
	}
	return nxp;
}


function findTargGen(dS,inP,distMat){
	var Dinp = distMat[inP];
	var DdS =[];
	var j,lenS=0;
	for(j=0;j<G.nNodes;j++){
		if(Dinp[j]==dS){
			DdS.push(j);
			lenS = lenS+1;
		}
	}
	var tind = Math.floor( lenS * Math.random());
	if(tind==lenS){
		tind=lenS-1;
	}
	var targ = DdS[tind];
	return targ;
}
function findTargGenWithMis(dS,inP,distMat,distMatMiss){
	var Dinp = distMat[inP];
	var DinpMiss = distMatMiss[inP];
	var DdS =[];
	var j,targ,lenS=0;
	for(j=0;j<G.nNodes;j++){
		if(Dinp[j]==dS&&DinpMiss[j]==dS){
			DdS.push(j);
			lenS = lenS+1;
		}
	}
	if(lenS>0){
		var tind = Math.floor( lenS * Math.random());
		if(tind==lenS){
			tind=lenS-1;
		}
		targ = DdS[tind];
	}else{
		targ = -1;
	}
	return targ;
}
