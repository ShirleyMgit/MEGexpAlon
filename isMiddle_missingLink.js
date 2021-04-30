function isItMiddle(nn){// is it in the middle task
	repTmis = 0;
   var ran1 = Math.random();
   var ran2 = Math.random();
   flagSs = -1;//signal that it is not task part - important for response key function
   flagSp=2;
   flagCov = 0;//signal that it is not in the cover part
   flagTr=1;//can get an answer

   if(nn==1){
	  y = y0;
	  x = 0;
	  clearCanvas(crE,300,450);
      ncoinT=0;
      flagC=0;
	  if(isNestDis==1){
	  nxIsM.disabled=true;
	  }
	  nrep=1;
   }else{
	   nrep = nrep+1;
   }

   flagIsM=0;
   /*manage display*/
   PileDiv[0].style.display="none";
   allTask[0].style.display="none";
   isMc[0].style.display="inline";
   ism = Math.floor(Math.random() * (np));

    if(curMp>1){
		[ism1p,ism2p ]=detNextPicExA2(ism,ran1,ArMiss);
	}else{
		[ism1p,ism2p ]=detNextPicExA2(ism,ran1,Ar);
	}

   var ismnew=ism;
   var nbism,j,j2,flagNb=0;
   ys=1;
   if(ran2<0.5){//make it not in the middle
   ys=0;
      while(ismnew==ism1p||ism2p==ismnew||ism==ismnew||flagNb==1){//fixed for fixed Ar - I want it not to be a neighbour of both of them on the complete graph
		ismnew = Math.floor(Math.random() * (np));
		nbism = Ar[ismnew];
		flagNb=0;
		for(j=0;j<nbism.length;j++){
			if(ism1p==nbism[j]){
				for(j2=0;j2<nbism.length;j2++){
			        if(ism2p==nbism[j2]){
				       flagNb=1;
					}
			    }
			}
		}
	  }
	  ism = ismnew;
   }
   /* the pictures*/
   im1.src = FileName+"pic"+ myPic[ism1p].toString() + ".jpg";
   im2.src = FileName+"pic"+ myPic[ism2p].toString() + ".jpg";
   im3.src = FileName+"pic"+ myPic[ism].toString() + ".jpg";

   /* manage display*/
   m3.style.display="inline";
   m3div.style.display="inline";
   m3cor.style.display="none";
   m3con.style.display="none";

   thisLast=new Date();
}

function isItMiddleYN(yn){// check if correct and give feedback
    var corA;
	var  thisTime=new Date();
    var RTm = calResponseTime(thisTime,thisLast);
	if(ys==yn){
	  ncoin = ncoin+1;
	  ncoinT = ncoinT+1;
	  corA =1;
	  m3cor.innerHTML = "Correct!";
	  flagIsM=1;
	  m3div.style.display="none";
      m3cor.style.display="inline";
	  if(ys==1){
	     m3cor.style.color="green";
	  }else{
		  m3cor.style.color="blue";
	  }
      m3con.style.display="inline";
	  if (flagC==0){
	      plotCircle(crE,y,"blue",x);
	  }else{
		  replotCircle(crE,y,x);
	  }
	  y = y-dy;
	}else{
		if (ncoinT>0){
			   y = y+dy;
			   ncoinT = ncoinT-1;
		   }
	   flagIsM=1;
	   ncoin = ncoin-1;

	   m3div.style.display="none";
	   m3cor.innerHTML = "NOT Correct!";
	   m3cor.style.display="inline";
	   m3cor.style.color="red";
	   m3con.style.display="inline";
	   ncolCrc = ncolCrc-1;
	   corA=0;
	   clearCircle(crE,y,x);
	}
   ncoinPv.style.display="inline";
   ncoinPv.innerHTML=ncoin+" coins";
	if(y<=0){
	   x = x+dx;
	   y = y0;
   }
   if(y>y0&&ncolCrc>1){
	   x = x-dx;
	   y = 0;
   }
   save2isMiddleTable(nrep,RTm,corA);// save data into sql table
   if (nrep>maxIsM){// if number of trials exceeded maxIsM start navigation task with intial distance 2 between current picture and target picture
		if(task.curRun<9){
			startNavigTask(2);
		}else{
			startWhichIsCloser(0);
		}
   }
}

function writeResp(){// go to next task
	if(task.curRun<9){
		startNavigTask(2);
	}else{
		startWhichIsCloser(0);
	}
}
