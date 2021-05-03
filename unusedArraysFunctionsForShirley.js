
function creatMissArHexPair(Ar){
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



function creat2MissLinkAr(Ar){
	var missNN = [14,30];
	 misInPileA = [[5,0,31,30],[20,21,15,14],[30,29,35,5],[14,8,13,20],[0,30,24,19],[21,14,9,3]];
	 var j,nnb,b;
	 var MISSnnV = [20,13,5,35];
	 var lenMsV = MISSnnV.length;
	 var Armiss=[[]];
	 for(a=0;a<np;a++){
	   flag = -1;
	   if (a==missNN[0]){
	     flag = missNN[0];
		}else{
			if (a==missNN[1]){
				flag = missNN[1];
			}else{
			   for(j=0;j<lenMsV;j++){
					if(a==MISSnnV[j]){
						flag = MISSnnV[j];
					}
			   }
			}
		}
		if(flag==-1){
			nnb = nb;
			Armiss[a].push( new Array(nnb));
			for (j=0;j<nb;j++){
				Armiss[a][j] = Ar[a][j];
			}
		}else{
			if(flag!= missNN[0]&&flag!= missNN[1]){
				nnb = nb-1;
				Armiss[a].push( new Array(nnb));
				b = 0;
				for (j=0;j<nb;j++){
					if (Ar[a][j]!=missNN[0]&&Ar[a][j]!= missNN[1]){
						Armiss[a][b] = Ar[a][j];
						b = b+1;
					}
				}
			}else{
				nnb = 4;
				Armiss[a].push( new Array(nnb));
				b=0;
				if(a==missNN[0]){
					for (j=0;j<nb;j++){
						if (Ar[a][j]!=MISSnnV[0]&&Ar[a][j]!= MISSnnV[1]){
							Armiss[a][b] = Ar[a][j];
							b = b+1;
						}
					}
				}else{
					for (j=0;j<nb;j++){
						if (Ar[a][j]!=MISSnnV[3]&&Ar[a][j]!= MISSnnV[2]){
							Armiss[a][b] = Ar[a][j];
							b = b+1;
						}
					}
				}
			}
		}

	   if(a<np-1){
		  Armiss.push([]);
		 }
	   }//first for
	  return Armiss;
}
function creatMissArCluster(Ar){
	var a,j,b;
	var nMiss = (nc-1)*ninc;
	var ArmissC=[[]];
	for(a=0;a<nMiss;a++){
		if (a==0){
			b=0;
			ArmissC[a].push( new Array(nb-1));
			for(j=0;j<nb-1;j++){
				if (Ar[a][j]<nMiss){
					ArmissC[a][b]=	Ar[a][j];
					b=b+1;
				}
			}
		}else{
			if(a<nMiss-1){
				ArmissC[a].push( new Array(nb));
				for(j=0;j<nb;j++){
					ArmissC[a][j]=	Ar[a][j];
				}
				}else{
					ArmissC[a].push( new Array(nb-1));
					var ab=0;
					for(j=0;j<nb;j++){
						if(Ar[a][j]!=nMiss){
							ArmissC[a][ab]=	Ar[a][j];
							ab=ab+1;
						}
					}
				}
		}
		if(a<nMiss-1){
			ArmissC.push([]);
			}
	}
	return ArmissC;
}

function creatMissArCluster2(Ar){
	var a,j,b;
	var nMiss = (nc-1)*ninc;
	var ArmissC=[[]];
	for(a=0;a<nMiss;a++){
		if (a==0){
			b=0;
			ArmissC[a].push( new Array(nb-1));
			for(j=0;j<nb-1;j++){
				if (Ar[a][j]<nMiss){
					ArmissC[a][b]=	Ar[a][j];
					b=b+1;
				}
			}
		}else{
			if(a<nMiss-1){
				ArmissC[a].push( new Array(nb));
				for(j=0;j<nb;j++){
					ArmissC[a][j]=	Ar[a][j];
				}
				}else{
					ArmissC[a].push( new Array(nb-1));
					var ab=0;
					for(j=0;j<nb;j++){
						if(Ar[a][j]!=nMiss){
							ArmissC[a][ab]=	Ar[a][j];
							ab=ab+1;
						}
					}
				}
		}

		ArmissC.push([]);

	}

	for(a=nMiss;a<nc*ninc;a++){
		if (a==nMiss){
			b=0;
			ArmissC[a].push( new Array(nb-1));
			for(j=0;j<nb-1;j++){
				if (Ar[a][j]>=nMiss){
					ArmissC[a][b]=	Ar[a][j];
					b=b+1;
				}
			}
		}else{
			if(a<nc*ninc-1){
				ArmissC[a].push( new Array(nb));
				for(j=0;j<nb;j++){
					ArmissC[a][j]=	Ar[a][j];
				}
				}else{
					ArmissC[a].push( new Array(nb-1));
					var ab=0;
					for(j=0;j<nb;j++){
						if(Ar[a][j]>=nMiss){//!=0){
							ArmissC[a][ab]=	Ar[a][j];
							ab=ab+1;
						}
					}
				}
		}
		if(a<nc*ninc-1){
			ArmissC.push([]);
			}
	}

	return ArmissC;
}