function createCoverStaff(){// create transition structures and define pictures set
	switch(curMp){//structure
        case(0):
		   FileName = "/~smark/set1reg/"; // pictures directory
		   /*graph size*/
		   nCol = 6;
		   nRow = 6;
	       np=nCol*nRow;
		   break;
		case(1):
		   /*graph size*/
		   nCol = 5;
		   nRow = 5;
		   np=nCol*nRow;
		   FileName = "/~smark/set2reg/"; // pictures directory
		   break;
		case(2):
		   /*graph size*/
		   nCol = 4;
		   nRow = 4;
		   np=nCol*nRow;
		   FileName = "/~smark/set3reg/"; // pictures directory
		   /* missing links staff*/
		   vnmis = [1,5,7,11,9,10]; // mising links nodes
		   vConmis = [[5],[1],[11],[7],[10],[9]]; 
		   break;
	}
	createAr();// create the transition matrix in 'typeAr' structural form
	DistM = calDistAdjMat(Ar);// calculate distance matrix
  }