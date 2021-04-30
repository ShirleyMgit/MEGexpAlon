/* other functions*/
// for each new cluster a function that calculates the distace should be added

function clear1dArr(Arr){// clear array
	var len = Arr.length;
	var jn;
	for (jn=0;jn<len;jn++){
		Arr.pop();
	}
	return Arr;
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

function sumArray(Ar){
	var j;
	var sumA = 0;
	var len = Ar.length;
	for(j=0;j<len;j++){
		sumA+=Ar[j];
	}
	return sumA;
}

function rem(N,di){
	var m,r;
	m = Math.floor(N/di);
	r = N-m*di;
	return r;
}

/*calculate response time*/
function calResponseTime(thisTimef,lastTime){
   var dmin=thisTimef.getMinutes()-lastTime.getMinutes();
   var dSec=thisTimef.getSeconds()-lastTime.getSeconds();
   var dHr=Math.abs(thisTimef.getHours()-lastTime.getHours());
   var dms=thisTimef.getMilliseconds()-lastTime.getMilliseconds();
   var Rsec;
   if (dmin<0){
   dmin = dmin+60;
   dHr = dHr-1;
   }
   if (dSec<0){
   dSec = dSec+60;
   dmin = dmin-1;
   }
   if (dms<0){
   dms = dms+1000;
   dSec = dSec-1;
   }
   dms = dms/1000;
   Rsec = dHr*3600+dmin*60+dSec+dms;
   return Rsec;
}
function myTimeout(a){
}


function initRand(){
  /*initilzation of the random generator:*/
  var d = new Date();
  var mn = d.getMinutes();
  var nr;
  mn = Math.floor(mn/2);
  for (nr==0;nr++;nr<mn){
       Math.random();
  }
}

/*plot,delete,replot a circle (the coins)*/
function plotCircle(crE,y,colr,x){
    var ctx = crE.getContext("2d");
	ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.arc(220-x, y, sz, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = colr;
    ctx.fill();
}
function replotCircle(crE,y,x){
    var ctx = crE.getContext("2d");
    ctx.globalCompositeOperation = 'source-over';
	ctx.beginPath();
	ctx.arc(220-x, y, sz, 0, 2 * Math.PI);
	ctx.fill();
    flagC=0;
}
function clearCircle(crE,y,x){
    var ctx = crE.getContext("2d");
    ctx.globalCompositeOperation = 'destination-out';
	ctx.beginPath();
	//ctx.arc(220-x, y, 15, 0, 2 * Math.PI);
	ctx.arc(220-x, y, sz, 0, 2 * Math.PI);
	ctx.fill();
    flagC=1;
}
function clearCanvas(crE0,x,y){
	var ctx = crE0.getContext("2d");
    ctx.globalCompositeOperation = 'destination-out';
	ctx.beginPath();
	ctx.clearRect(0, 0, x, y);
	ctx.fill();
}
document.onkeydown = checkKeyT; // Alon: look how Mona does this

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

	if(flagCov==1&&flagIsM==-1&&flagSs==2&&flagSp==2){//for the cover - learning phase
		if (e.keyCode == '89'){//y
			isitDan=1;
			conExp(1);
		}
		if (e.keyCode == '78'){//n
			isitDan=0;
			conExp(0);
		}
		if (e.keyCode == '13'){//enter
			isitDan=0;
			conExp(0);
		}
	}
	if(flagCovP==1&&flagCov==0&&flagIsM==-1&&flagSs==2&&flagSp==2){//for the learning from pair phase
		if (e.keyCode == '13'){//enter
			isitDan=0;
			conExpPair(0);
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

function detNextPicGenAnoP2(ran1,in1,p2,Ar1){//fixed for corrected Ar

	/*returns a neibor of in1 which is not p2*/
   var nbI = Ar1[in1].length;
   var j,nbInew=[];
   for(j=0;j<nbI;j++){
	   if(Ar1[in1][j]!=p2){
		   nbInew.push(Ar1[in1][j]);
	   }
   }
   var nin = Math.floor((nbI-1)*ran1);
   if(ran1==1){//for the very rare case that ran1==1, 2D array: the second dimention starts from 1...
    nin=nbI-2;
   }
   var nxp=nbInew[nin];
   return nxp;
}

function isAneighbor(in1,in2,Ar1){//fixed for corrected Ar
	/*is in1 in2 neighbors? return 0 - not a neighbor or 1 - is a neibor*/
   var nbI = Ar1[in1].length;//number of neighbourse of that node
   var j,isN;
   isN = 0;
   for(j=0;j<nbI;j++){
	   if(Ar1[in1][j]==in2){
		   isN=1;
		   break;
	   }
   }
   return isN;
}

function detNextPicGenAnoP2Gen(ran1,in1,in0){//fixed for corrected Ar
    /*This function select a neiboughr of in1 which is not a neighbor of in0.*/
	var nbI = Ar[in1].length;
	var nbI0 = Ar[in0].length;
	var flagN=0;
	var j,j2,nbInew=[];
    for(j=0;j<nbI;j++){
		flagN=0;
		for(j2=0;j2<nbI0;j2++){
			if(Ar[in1][j]==Ar[in0][j2]){
				flagN=1;
			}
		}
	    if(Ar[in1][j]!=in0&&flagN==0){
		    nbInew.push(Ar[in1][j]);
	    }
      }
      var lenN = nbInew.length;
	  var nin = Math.floor(lenN*ran1);
	  if (ran1==1){
		  nin = nin-1;
	  }
   return nbInew[nin];
}

function detNextPicExA2(in0,ran1,Ar1){//fixes for corrected Ar
//This function chose 2 different neighbours of in0, Ar is the array of neighbours indexes, ran1 is a random number between 0-1
  var nbI = Ar1[in0];//the neighbourse of that node
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

function detNextPicExAnoR(in0,ran1,Ar1,inR,inL){//fixes for corrected Ar
//This function chose 2 different neighbours of in0, Ar is the array of neighbours indexes, ran1 is a random number between 0-1
  var nbI = Ar1[in0];//the neighbourse of that node
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

function detNextPicGenAnoP1P2P3inBoth(ran1,Ar1,allPile1,allPile2,DistFull){//fixed for corrected Ar
/*This function finds the next forth picture in Hamiltonian path - good for all structures*/
   var in23 = allPile2[2];
   var in22 = allPile2[1];
   var in21 = allPile2[0];
   var in13 = allPile1[2];
   var in12 = allPile1[1];
   var in11 = allPile1[0];
   var nbI = Ar1[in13].length;
   var j,nbInew=[];
   for(j=0;j<nbI;j++){
	   if(Ar1[in13][j]!=in12&&Ar1[in13][j]!=in11&&Ar1[in13][j]!=in21&&Ar1[in13][j]!=in22&&Ar1[in13][j]!=in23&&DistFull[Ar1[in13][j]][in23]>1){// the last inequality makes sure that the pictures is not connected to the other pile with a missing link
		   nbInew.push(Ar1[in13][j]);
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
function detNextPicGenA(ran1,Ar1,in1){//fixed for corrected Ar
   var nbI = Ar1[in1].length;
   var nin = Math.floor(nbI*ran1);
   if(nin==nbI){//for the very rare case that ran1==1, 2D array: the second dimention startsdetNextPicGenA from 1...
    nin=nbI-1;
   }
   var nxp=Ar1[in1][nin];
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

function calDistAdjMat(Ar1){
	var i,j,m,lenB,flagNb,numZ;
	var np1 = Ar1.length;
	var D=[[]];
	var A = [[]];
	var An = [[]];
	numZ = 0;
	/*Initilizing D*/
	for (i=0;i<np1;i++){//initialization - just neighbours
		var nB = Ar1[i];
		lenB = nB.length;
		D[i].push( new Array(np1));
		A[i].push( new Array(np1));
		An[i].push( new Array(np1));
	    for (j=0;j<np1;j++){
			flagNb = 0;
			for (m=0;m<lenB;m++){
				if(nB[m]==j){
					flagNb=1;
					D[i][j]=1;
					A[i][j]=1;
					An[i][j]=1;
					break;
				}
			}
			if (flagNb==0){
				D[i][j]=0;
				A[i][j]=0;
				An[i][j]=0;
				numZ = numZ+1;
			}
	    }
		if(i<np1-1){
			D.push([]);
			A.push([]);
			An.push([]);
		}
	}
	var n=2;
	while (numZ>np1){
		numZ = np1;
		An = multiplyMatrices(An,A);
		for (i=0;i<np1;i++){
			for (j=0;j<np1;j++){
				if(i!=j){
					if(D[i][j]==0){
						if(An[i][j]!=0){
							D[i][j]=n;
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
function findTargGen(dS,inP,DistM0){
	var Dinp = DistM0[inP];
	var DdS =[];
	var j,lenS=0;
	for(j=0;j<np;j++){
		if(Dinp[j]==dS){
			DdS.push(j);
			lenS = lenS+1;
		}
	}
	var ran1 = Math.random();
	var tind = Math.floor(lenS*ran1);
	if(tind==lenS){
		tind=lenS-1;
	}
	var targ = DdS[tind];
	return targ;
}
function findTargGenWithMis(dS,inP,DistM0){
	var Dinp = DistM0[inP];
	var DinpMiss = DistMiss[inP];
	var DdS =[];
	var j,targ,lenS=0;
	for(j=0;j<np;j++){
		if(Dinp[j]==dS&&DinpMiss[j]==dS){
			DdS.push(j);
			lenS = lenS+1;
		}
	}
	var ran1 = Math.random();
	if(lenS>0){
		var tind = Math.floor(lenS*ran1);
		if(tind==lenS){
			tind=lenS-1;
		}
		targ = DdS[tind];
	}else{
		targ = -1;
	}
	return targ;
}
