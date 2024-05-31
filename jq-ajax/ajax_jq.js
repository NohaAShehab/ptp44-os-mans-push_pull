
console.log('hereeeeeeeeeeee')


divcontent = document.getElementById('content');
load_btn= document.getElementById('load_data');
divcv = document.getElementById('cv');
cv_btn = document.getElementById('mycv');


load_btn.addEventListener('click', function(){
    $.ajax({
        url: "students.txt",
        method: "GET",
        data: {
            message: 'hi'
        },
        success: function(data){
            console.log(data);
            divcontent.innerHTML = `<pre>${data}</pre>`;
        },
        error: function(){
            // console.log('error getting data');
            divcontent.innerHTML = `<h1 style="color: red">error getting data</h1>`;
        }

    });

})




