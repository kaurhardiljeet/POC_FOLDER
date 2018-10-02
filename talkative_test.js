window.onload = function () { 
 var count=0;
 //Check the support for the File API support 
 if (window.File && window.FileReader && window.FileList && window.Blob) {
    var fileSelected = document.getElementById('filepath');
	var fileContents = document.getElementById('filecontents'); 
	
	var content="";
    fileSelected.addEventListener('change', function (e) { 
         //Set the extension for the file 
         var fileExtension = /text.*/; 
         //Get the file object 
         var fileTobeRead = fileSelected.files[0];
		//Check of the extension match 
         if (fileTobeRead.type.match(fileExtension)) { 
             //Initialize the FileReader object to read the 2file 
             var fileReader = new FileReader(); 
             fileReader.onload = function (e) { 				
				//fileContents.innerText = fileReader.result; 	
				content=fileReader.result; 
				content=content.replace("\r\n"," ");
				content=content.replace("\n"," ");
				var words=content.split(" ");
				words = words.map(function(v) {//to handle . and ; and not consider them for count by removing them if appearing at the end
					if(v.substring(v.length,v.length-1) ==';')		
						return v.substring(0,v.length-1);
					if(v.substring(v.length,v.length-1) =='.')		
						return v.substring(0,v.length-1);
					else	
						return v;
				});
				var sum=0;
				var array=[];//array to hold lengths and their occurences
				for (i=0 ; i < words.length ; i++){
					// inner loop -- do the count
					var len=words[i].trim().length;
					var f=0;//flag to push a new element or update the existing one
					if( len > 0){
						for(j=0;j <array.length; j++)
						{
							if(array[j][0]==len){//if the current words length already has an entry , increment its count
								array[j][1]=array[j][1] + 1;
								f=1;
							}
						}
						if(f==0){// push new length into array
							array.push([len,1]);
						}
						sum+=len;
					}					
				}
				var avg=sum/words.length;
				avg= +(Math.round(avg + "e+2")  + "e-2");
				avg=Math.round((sum/words.length)*1000)/1000;
				var output='';	
				array.sort(function (a, b) {  return a[0] - b[0];  });	// sort first dimension which is the length and print 	
							
				for (i=0;i <array.length ;i++){
					output+='<br>Number of words of length '+array[i][0]+ ' is ' +array[i][1];
				}
				array.sort(function (a, b) {  return a[1] - b[1];  });
				var mostoccuring=array[array.length-1][1];
				var last='<br>The most frequently occurring word length is '+mostoccuring+', for word lengths of ';
				for (i=0;i <array.length ;i++){
					if(array[i][1]==mostoccuring){
						last+=array[i][0]+ ' & '
					}
				}
				
				
				fileContents.innerHTML="There are "+words.length+" words in the text string you entered! <br> Average word length = " + avg + output+last ;
				//fileContents.innerText=content;
             } 
             fileReader.readAsText(fileTobeRead); 
			 
			 
         } 
         else { 
             alert("Please select text file"); 
         }

    }, false);
} 
 else { 
     alert("Files are not supported"); 
 } 
 }
