/* other functions*/
// for each new cluster a function that calculates the distace should be added

function clear1dArr(inputAr){// clear array
	var len = inputAr.length;
	var jn;
	for (jn=0;jn<len;jn++){
		inputAr.pop();
	}
	return inputAr;
}

function maxArr(points){//find maximum of array
	points.sort(function(a, b){return a - b});
	return points[points.length-1];
}

// comment from shirley to Alon: the following 2 function do not seem to be recalled but I thing that they are useful so I have left them here 08/04/21
function minArr(points){//find minimum of array
	points.sort(function(a, b){return a - b});
	return points[0];
}

function sumArray(inputAr){
	var j;
	var sumA = 0;
	var len = inputAr.length;
	for(j=0;j<len;j++){
		sumA+=inputAr[j];
	}
	return sumA;
}

function rem(N,di){
	var m,r;
	m = Math.floor(N/di);
	r = N-m*di;
	return r;
}

function rem(N,di){
	// remainder function: same as what % does.

	var m,r;
	m = Math.floor(N/di);
	r = N-m*di;
	return r;
}

/*calculate response time*/
function calResponseTime(thisTimef,lastTime){
	var dMin=thisTimef.getMinutes()-lastTime.getMinutes();
	var dSec=thisTimef.getSeconds()-lastTime.getSeconds();
	var dHr=Math.abs(thisTimef.getHours()-lastTime.getHours());
	var dMs=thisTimef.getMilliseconds()-lastTime.getMilliseconds();
	var rtInSec;
	if (dMin<0){
		dMin = dMin+60;
		dHr = dHr-1;
	}
	if (dSec<0){
		dSec = dSec+60;
		dMin = dMin-1;
	}
	if (dMs<0){
		dMs = dMs+1000;
		dSec = dSec-1;
	}
	rtInSec = dHr*3600+dMin*60+dSec+dMs/1000;
	return rtInSec;
}
function myTimeout(a){
}

function clearCanvas(myCanvas,x,y){
	var ctx = myCanvas.getContext("2d");
	ctx.globalCompositeOperation = 'destination-out';
	ctx.beginPath();
	ctx.clearRect(0, 0, x, y);
	ctx.fill();
}

function checkKeyT(e) {// subject key choice to functions responses
	if (e.keyCode == '13'&&flagIsM==-1&&flagSp==2&&flagSs==-1&&flagQ==1){//enter
		conQ();
	}
	if (e.keyCode == '49'&&flagIsM==-1&&flagSp==2&&flagSs==-1&&flagQ==0){//1
		conExpQ(1);
	}
	if (e.keyCode == '50'&&flagIsM==-1&&flagSp==2&&flagSs==-1&&flagQ==0){//2
		conExpQ(2);
	}

	if (e.keyCode == '13'&&flagIsM==1&&flagSp==2&&flagSs==-1){//enter
		isItMiddle(0);
	}
	if (e.keyCode == '89'&&flagIsM==0&&flagSp==2&&flagSs==-1&&flagTr==1){//y
		isItMiddleYN(1);
	}
	if (e.keyCode == '78'&&flagIsM==0&&flagSp==2&&flagSs==-1&&flagTr==1){//n
		isItMiddleYN(0);
	}

	if(flagSs==0&&flagIsM==-1&&flagSp==2&&flagT==1&&flagTr==1){// for navigation task

		if (e.keyCode == '13'&&flagSs==0){
			cpic = 0;
			flagTr=0;
			conExpT(cpic);
		}
		if (e.keyCode == '85'&&flagSs==0){//(e.keyCode == '38'&&flagSs==0){//up
			cpic = 1;
			flagTr=0;
			conExpT(cpic);
		}
		if (e.keyCode == '68'&&flagSs==0){//(e.keyCode == '40'&&flagSs==0){//down
			cpic = 2;
			flagTr=0;
			conExpT(cpic);
		}

	}else{
		if (e.keyCode == '13'&&flagIsM==-1&&flagSs==1&&flagSp==2){
			flagSs=0;
			dispPic();
		}
	}

	if(flagSp==0&&e.keyCode=='13'&&flagIsM==-1){// for piles task
		whichPile(0);
	}
	if(flagSp==1&&flagIsM==-1&&flagTr==1){
		if(e.keyCode=='49'){
			whichPileAns(1);
		}
		if(e.keyCode=='50'){
			whichPileAns(2);
		}
		if(e.keyCode=='51'){
			whichPileAns(3);
		}
	}
}

function detNextPicGenAnoP2(ran1,in1,p2,transMat){//fixed for corrected Ar

	/*returns a neibor of in1 which is not p2*/
	var nbI = transMat[in1].length;
	var j,nbInew=[];
	for(j=0;j<nbI;j++){
		if(transMat[in1][j]!=p2){
			nbInew.push(transMat[in1][j]);
		}
	}
	var nin = Math.floor((nbI-1)*ran1);
	if(ran1==1){//for the very rare case that ran1==1, 2D array: the second dimension starts from 1...
		nin=nbI-2;
	}
	var nxp=nbInew[nin];
	return nxp;
}

function isAneighbor(in1,in2,transMat){//fixed for corrected Ar
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

function detNextPicGenAnoP2Gen(ran1,in1,in0){//fixed for corrected Ar
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
	var nin = Math.floor(lenN*ran1);
	if (ran1==1){
		nin = nin-1;
	}
	return nbInew[nin];
}

function detNextPicExA2(in0,ran1,transMat){//fixes for corrected Ar
	//This function chose 2 different neighbours of in0, Ar is the array of neighbours indexes, ran1 is a random number between 0-1
	var nbI = transMat[in0];//the neighbourse of that node
	var nb=[];
	var j,in1;
	var leb=nbI.length;
	var nn1=Math.floor(leb*ran1);
	in1=nbI[nn1];
	for (j=0;j<leb;j++){
		if(nbI[j]!=in1){
			nb.push(nbI[j]);
		}
	}
	var nbl = nb.length;//nb.length-1;// I think that was a mistake
	var nf=Math.floor(nbl*ran1);
	if (ran1==1){
		nf = nf-1;
	}
	var nin = nf;
	var in2=nb[nin];

	return [in1,in2];;
}

function detNextPicExAnoR(in0,ran1,transMat,inR,inL){//fixes for corrected Ar
	//This function chose 2 different neighbours of in0, Ar is the array of neighbours indexes, ran1 is a random number between 0-1
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
	nn1=Math.floor((leb2)*ran1);
	in1=nbnoR[nn1];
	for (j=0;j<leb2;j++){
		if(nbnoR[j]!=in1){
			nb.push(nbnoR[j]);
		}
	}
	var nbl = nb.length;//nb.length-1;// I think that was a mistake
	var nf=Math.floor(nbl*ran1);
	if (ran1==1){
		nf = nf-1;
	}
	var nin = nf;
	var in2=nb[nin];

	return [in1,in2];;
}

function detNextPicGenAnoP1P2P3inBoth(ran1,transMat,allPile1,allPile2,DistFull){//fixed for corrected Ar
	/*This function finds the next forth picture in Hamiltonian path - good for all structures*/
	var in23 = allPile2[2];
	var in22 = allPile2[1];
	var in21 = allPile2[0];
	var in13 = allPile1[2];
	var in12 = allPile1[1];
	var in11 = allPile1[0];
	var nbI = transMat[in13].length;
	var j,nbInew=[];
	for(j=0;j<nbI;j++){
		if(transMat[in13][j]!=in12&&transMat[in13][j]!=in11&&transMat[in13][j]!=in21&&transMat[in13][j]!=in22&&transMat[in13][j]!=in23&&DistFull[transMat[in13][j]][in23]>1){// the last inequality makes sure that the pictures is not connected to the other pile with a missing link
			nbInew.push(transMat[in13][j]);
		}
	}
	var nbInL = nbInew.length;
	var nin = Math.floor((nbInL)*ran1);
	if(nin==nbInL){//for the very rare case that ran1==1, 2D array: the second dimention starts from 1...
		nin=nbInL-1;
	}
	var nxp;
	if (nbInew.length>0){
		nxp=nbInew[nin];
	}else{
		nxp=-1;
	}
	return nxp;
}
function detNextPicGenA(ran1,transMat,node){//fixed for corrected Ar
	var nbI = transMat[node].length;
	var nin = Math.floor(nbI*ran1);
	if(nin==nbI){//for the very rare case that ran1==1, 2D array: the second dimention startsdetNextPicGenA from 1...
		nin=nbI-1;
	}
	var nxp=transMat[node][nin];
	return nxp;
}

function calRem(num,div){// there are 2 functions for calculating reminder - can be cleaned
	m = Math.floor(num/div);
	r = num-m*div;
	return r;
}


function multiplyMatrices(m1, m2) {//Not My Code
	var result = [];
	var i,j,k;
	for (i = 0; i < m1.length; i++) {
		result[i] = [];
		for (j = 0; j < m2[0].length; j++) {
			var sum = 0;
			for (k = 0; k < m1[0].length; k++) {
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = sum;
		}
	}
	return result;
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
	var tind = Math.floor(lenS*Math.random());
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
		var tind = Math.floor(lenS*Math.random());
		if(tind==lenS){
			tind=lenS-1;
		}
		targ = DdS[tind];
	}else{
		targ = -1;
	}
	return targ;
}
