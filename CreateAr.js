function createAr(){
/* create transition matrix according to structural form (typeAr)*/
/* maxCov is the number of pictures in eacah plock of the learning phase*/
switch(typeAr){
	case("HexA"):
	    nb = 6;// number of neibours
	    maxCov = maxCovH;
		Ar=createHexNonPer();// non periodic Hexagonal structure
		break;
	case("clA"):
	    nb = 6;// number of neibours
		maxCov = maxCovC;
		Ar = createA2Acluster(np,nc);// community structure
		break;
	case("recA"):
	    nb = 4; // number of neighbours
	    maxCov = maxCovH;
		Ar = createArect();
		break;	
}
if(curMp==2){
		ArMiss = creatMissArGen(Ar,vnmis,vConmis); //vnmis,vConmis should be defined on main script. Still need to write a function for the missing links questions
		DistMiss = calDistAdjMat(ArMiss);
	}
}