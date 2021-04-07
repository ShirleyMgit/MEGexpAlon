function checkExists(Fname,Sname){
	 var fname=Fname+"_"+Sname; // file name
	 var map;
	 var xhttp;
	 xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
	     var myData = JSON.parse(this.responseText);
		 map = getORuseMap(myData);
        }
     };
	 xhttp.open("GET", "checkExistsNewDBmysqliMEG.php?q="+fname, false);
     xhttp.send();
     return map;
}


function getORuseMap(data){
	var lenData = data.length;
	var map=[],j;
	if(lenData==0){ //if not exists sql returns an empty array
		map[0]=-1;
	}else{ // if exists, build map array
		for(j=1;j<=npmax;j++){
			map[j-1]=data[0][j];
		}
	}
	return map;
}

/* function checkNumMap(s){
var TableName = "mapTable";
var numMap=0;
      $.ajax({
      type:'POST',
      url: 'checkNumMap.php',
      data: {tableN:TableName},
	  async: false,
	  dataType:'json',
	  success: function(data,iss) {
         numMap = data.length;
      }

   });
   return numMap;
} */
