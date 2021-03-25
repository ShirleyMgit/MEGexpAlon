function createHexNonPer(){
	//This function create hexagonal Adjacency matrix without periodic boundary conditions with rectangular shape
	// I have a bag - it does not work with 5x5
	 var a,a1,b,rn1a,isEv,rown,coln;
	 var nb0=6;// number of neighbors 
	 var nb;
	 var n0=nRow*nCol;//nCol-how many in each row (number of col), nRow- How many in each col (number of rows)
	 var Ar=[[]];
	 for(a=0;a<n0;a++){
	   b=0;
	   a1 = a+1;
	   rn1a = rem(a1,nCol);
	   if(rn1a>0){
		   coln =rn1a;
	   }else{
		   coln = nCol;
	   }
	   rown = Math.ceil(a1/nCol); 
	   isEv = rem(rown,2);
	   if (coln<nCol&&coln>1&&rown>1&&rown<nRow){
		   nb = nb0;
	   }else{
		   if(coln==1){
			   if(isEv==0){//even
				   if(rown<nRow){
					   nb = 3;
				   }else{
					   nb=2;
				   }
			   }else{
				   if(rown==1||rown==nRow){
					   nb = 3;
				   }else{
						nb = 5;
				   }
			   }
		   }else{
			   if(coln==nCol){
				   if(isEv==0){//even
					   if(rown<nRow){
						   nb = 5;
					   }else{
						   nb = 3;
					   }
				   }else{//odd
						if(rown==1||nRow==rown){
							nb = 2;
						}else{
							nb = 3;
						}
				   }
			   }else{
				   nb = 4;
			   }
		   }
	   }
	   Ar[a].push( new Array(nb));
	   
	   if (coln>1){
	      Ar[a][b] = a-1;//left
		  b = b+1;
	   }
	   if (coln<nCol){
		  Ar[a][b] = a+1;//right
		  b = b+1;
	   }
	   
	   if(rown<nRow){
		  Ar[a][b] = a+nCol;//up
		  b=b+1;
		  if(isEv!=0){
			  if(coln<nCol){//up and right
				  Ar[a][b] = a+nCol+1;
				  b=b+1;
			  }
		  }else{
			  if(coln>1){//up and left
				  Ar[a][b] = a+nCol-1;
				  b=b+1;
			  }
		  }
	   }
	   if(rown>1){
		  Ar[a][b] = a-nCol;//down
		  b=b+1;
		  if(isEv!=0){
			  if(coln<nCol){
				  Ar[a][b] = a-nCol+1;//down and right
				  b=b+1;
			  }
		  }else{
			  if(coln>1){
				  Ar[a][b] = a-nCol-1;//down and left
				  b=b+1;
			  }
		  }
	   }  
		 if(a<n0-1){
		  Ar.push([]);
		 }
	 }
	 return Ar;
   }
   


function rem(N,di){
	var m,r;
	m = Math.floor(N/di);
	r = N-m*di;
	return r;
}

