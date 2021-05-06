function defineGraph(){// create transition structures and define pictures set
	switch(exp.curMap){//structure
		case(0):
			exp.pathToImgDir = "/MEG/images/set1reg/"; // pictures directory
			/*graph size*/
			graph.nCol = 6;
			graph.nRow = 6;
			np=graph.nCol*graph.nRow;
		break;
		case(1):
			/*graph size*/
			graph.nCol = 5;
			graph.nRow = 5;
			np=graph.nCol*graph.nRow;
			exp.pathToImgDir = "/MEG/images/set2reg/"; // pictures directory
		break;
		case(2):
			/*graph size*/
			graph.nCol = 4;
			graph.nRow = 4;
			np=graph.nCol*graph.nRow;
			exp.pathToImgDir = "/MEG/images/set3reg/"; // pictures directory
			/* missing links staff*/
			vnmis = [1,5,7,11,9,10]; // mising links nodes
			vConmis = [[5],[1],[11],[7],[10],[9]];
		break;
	}
	createAr();// create the transition matrix in 'typeAr' structural form
	DistM = calDistAdjMat(Ar);// calculate distance matrix
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


function createAr(){
	/* create transition matrix according to structural form (typeAr)*/
	/* maxCov is the number of pictures in eacah plock of the learning phase*/
	switch(graph.arrayType){
		case("HexA"):
			nb = 6;// number of neibours
			Ar=createHexNonPer();// non periodic Hexagonal structure
		break;
		case("clA"):
			nb = 6;// number of neibours
			Ar = createA2Acluster(np,nc);// community structure
		break;
		case("recA"):
			nb = 4; // number of neighbours
			Ar = createArect();
		break;
	}
	if(exp.curMap==2){
		ArMiss = creatMissArGen(Ar,vnmis,vConmis); //vnmis,vConmis should be defined on main script. Still need to write a function for the missing links questions
		DistMiss = calDistAdjMat(ArMiss);
	}
}
