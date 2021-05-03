function createArect(){
	var a,a1,b,rn1a;
	var nb=4;// number of neighbours - not on nodes at the adges
	var n0=nRow*nCol;// total states
	var Ar=[[]];
	for(a=0;a<n0;a++){
		//Ar.push([]);
		a1 = a+1;
		rn1a = rem(a1,nCol);//collumn
		if((rn1a>1)&&(a1>nCol)&&(a1<=n0-nCol)){//not on the edge
			Ar[a].push( new Array(4));
			Ar[a][0] = a-1;
			Ar[a][1] = a+1;
			Ar[a][2] = a+nCol;
			Ar[a][3] = a-nCol;
		}else{
			if(a1<=nCol){//first row
				if(rn1a>1){
					Ar[a].push( new Array(3));
					Ar[a][0] = a-1;
					Ar[a][1] = a+1;
					Ar[a][2] = a+nCol;
				}else{
					switch(rn1a){
						case 0:// last column
						Ar[a].push( new Array(2));
						Ar[a][0]=a-1;
						Ar[a][1]=a+nCol;
						break;
						case 1:// first column
						Ar[a].push( new Array(2));
						Ar[a][0]=a+1;
						Ar[a][1]=a+nCol;
						break;
					}
				}
			}else{// not first row
				if(a1>n0-nCol){//last row
					if(rn1a>1){// not first/last column
						Ar[a].push( new Array(3));
						Ar[a][0] = a-1;
						Ar[a][1] = a+1;
						Ar[a][2] = a-nCol;
					}else{
						switch(rn1a){
							case 0://last column
							Ar[a].push( new Array(2));
							Ar[a][0]=a-1;
							Ar[a][1]=a-nCol;
							break;
							case 1://first column
							Ar[a].push( new Array(2));
							Ar[a][0]=a+1;
							Ar[a][1]=a-nCol;
							break;
						}
					}
				}else{//not last/first row
					switch(rn1a){
						case 0://last column
						Ar[a].push( new Array(3));
						Ar[a][0]=a-1;
						Ar[a][1]=a-nCol;
						Ar[a][2]=a+nCol;
						break;
						case 1://first row
						Ar[a].push( new Array(3));
						Ar[a][0]=a+1;
						Ar[a][1]=a-nCol;
						Ar[a][2]=a+nCol;
						break;
					}
				}
			}
		}
		if(a<n0-1){
			Ar.push([]);
		}
	}
	return Ar;
}

/*define borer color*/
function defBorderA(im,tar,n11,n0){
	var a1 = tar+1;
	var rn1a = rem(a1,n11);

	if((rn1a>1)&&(a1>n11)&&(a1<=n0-n11)){//not on the edge
		im.style.borderColor="Gray";
	}else{
		if(a1<=n11){//first raw
			if(rn1a>1){
				im.style.borderColor="Red";
			}else{
				switch(rn1a){
					case 0://left up corner
					im.style.borderColor="Purple";
					break;
					case 1://right up corner
					im.style.borderColor="orange";
					break;
				}
			}
		}else{
			if(a1>n0-n11){//last raw
				if(rn1a>1){
					im.style.borderColor="Green";
				}else{
					switch(rn1a){
						case 0:
						im.style.borderColor="Cyan";
						break;
						case 1://low right
						im.style.borderColor="GreenYellow";
						break;
					}
				}
			}else{
				switch(rn1a){
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
