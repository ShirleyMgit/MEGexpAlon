function creatMissArGen(Ar,vnmis,vConmis){// general function to introduce missing link
  // vmis: the nodes that have missink links
  // vCmiss: the nodes that are connected to the nodes in vmis which their link should be deleted
  lnmis  = vnmis.length;
  var s=0,nnb,b,a,c,s,k,flag,flag2;
  var Armiss=[[]];
  for(a=0;a<np;a++){//go over states
    flag =0;
    for(c=s;c<vnmis.length;c++){
      if(a==vnmis[c]){
        flag = 1;
        s = c;
        break;
      }
    }
    nnb0 = Ar[a].length;// number of neighbours in the original array
    if (flag==0){// no missing link - copy neighbours
      nnb = nnb0;
      Armiss[a].push( new Array(nnb));
      for (j=0;j<nnb;j++){
        Armiss[a][j] = Ar[a][j];
      }
    }else{// there are missing links
      nnb = nnb0-vConmis[c].length;
      Armiss[a].push( new Array(nnb));
      b=0;
      for (j=0;j<nnb0;j++){
        flag2 = 0;
        for(k=0;k<vConmis[c].length;k++){// check if node Arp[a][j] is a miising neighbour, if it is make flag2 equal 1
          if (Ar[a][j]==vConmis[c][k]){
            flag2 = 1;
          }
        }
        if (flag2==0){// add the links that remain
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
