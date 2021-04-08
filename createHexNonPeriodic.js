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
   

function creatMissArHexPair(Ar){// create hexagonal array with missing links probably periodic need to be checked
vnmis=[1,2,8,9,13,14,19,20,26,27,31,32];//[2,3,8,9,13,14,20,21,26,27,32,33];
lnmis  = vnmis.length;
vConmis = [[2,32],[1],[9,13],[8],[8,14],[13,19],[14,20],[19],[27,31],[26],[26,32],[31,1]];//[[3,33],[2],[9,13],[8],[8,14],[13,20],[14,21],[20],[27,32],[26],[33,26],[2,32]];
tran24 = [[1,27],[31,27],[0,32],[31,33],[19,9],[13,9],[18,14],[13,15]];//[[2,22],[32,27],[1,33],[32,34],[20,9],[13,15],[13,9],[19,14]];
tran34 = [[22,31],[30,2],[3,31],[30,27],[18,15],[16,19],[10,19],[7,15]];//[[31,3],[1,33],[4,32],[21,27],[19,15],[16,20],[10,20],[15,7]];
tran13 = [[1,32],[31,32],[14,19],[13,14]];//[[2,33],[32,33],[14,20],[13,14]];
tran23 = [[31,2],[1,33],[26,1],[25,27],[0,2],[1,3],[31,21],[13,20],[19,15],[8,19],[8,10],[18,20],[19,21],[13,3]];//[[32,3],[2,34],[26,2],[25,27],[1,3],[2,4],[21,32],[27,20],[15,20],[13,21],[8,20],[2,13],[3,8],[19,21],[19,8]];
var s=0,nnb,b,a,c,s,k,flag,flag2;
var Armiss=[[]];
for(a=0;a<np;a++){
flag =0;
   for(c=s;c<vnmis.length;c++){
		if(a==vnmis[c]){
			flag = 1;
			s = c;
			break;
		}
   }
   if (flag==0){
   		nnb = nb;
		Armiss[a].push( new Array(nnb));
		for (j=0;j<nb;j++){
			Armiss[a][j] = Ar[a][j];
		}
   }else{
        nnb = nb-vConmis[c].length;
		Armiss[a].push( new Array(nnb));
		b=0;
		//flag2 = 0;
		for (j=0;j<nb;j++){
		flag2 = 0;
		    for(k=0;k<vConmis[c].length;k++){
				if (Ar[a][j]==vConmis[c][k]){
				flag2 = 1;
				}
			}
			if (flag2==0){
				Armiss[a][b] = Ar[a][j];
				b = b+1;
			}
		}

   }
   if(a<np-1){
		Armiss.push([]);
	}
}
return Armiss;
}