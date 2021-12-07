function fileValidation() {
    var fileInput = 
        document.getElementById('capture');
      
    var filePath = fileInput.value;
  
    // Allowing file type
    var allowedExtensions = 
            /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      
    if (!allowedExtensions.exec(filePath)) {
        alert('jpg,jpeg,png only are supported.');
        fileInput.value = '';
        return false;
    } 
    else 
    {
      
        // Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById(
                    'imagePreview').innerHTML = 
                    '<img src="' + e.target.result+'" width="450" height="300"/>';
            };
              
            reader.readAsDataURL(fileInput.files[0]);
        }
        
    }
}

function predictPicture()
{
    
    const file = document.getElementById('capture').files[0];
        console.log(file);
        var URL = "https://pia1demo-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/f121d440-41a4-4513-bef3-92b87106ad03/classify/iterations/Iteration3/image";
        var xhr = new XMLHttpRequest();
        
        xhr.open('POST', URL, true);
        xhr.setRequestHeader('Prediction-Key','afeaf65a7c05442e9934b49eaf122596');
        xhr.setRequestHeader('Content-Type','application/octet-stream');
        xhr.send(file); 
        xhr.onreadystatechange = processRequest;
        if(xhr.readyState == 4 && xhr.status == 200){
            //alert(xhr.responseText);
            console.log(typeof(xhr.responseText));
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            console.log(json.predictions[0]['probability']);
            console.log(typeof(json));  
              
            var table = document.getElementById("myTable");

            for(var i = json.predictions.length -1 ; i >= 0 ; i--){


            var row = table.insertRow(1);


            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            // Add some text to the new cells:
            cell1.innerHTML = json.predictions[i]['tagName'];
            cell2.innerHTML = json.predictions[i]['probability'] * 100 + '%';
            }
        } 
        
}
