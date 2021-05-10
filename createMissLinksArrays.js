// diffreerent functions to introduce missing links


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
    graph.numNghbrOrigAr = Ar[a].length;// number of neighbours in the original array
    if (flag==0){// no missing link - copy neighbours
      nnb = graph.numNghbrOrigAr;
      Armiss[a].push( new Array(nnb));
      for (j=0;j<nnb;j++){
        Armiss[a][j] = Ar[a][j];
      }
    }else{// there are missing links
      nnb = graph.numNghbrOrigAr-vConmis[c].length;
      Armiss[a].push( new Array(nnb));
      b=0;
      for (j=0;j<graph.numNghbrOrigAr;j++){
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


function creat2MissLinkAr(Ar){
  var missNN = [14,30];
  misPileA = [[5,0,31,30],[20,21,15,14],[30,29,35,5],[14,8,13,20],[0,30,24,19],[21,14,9,3]];
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
