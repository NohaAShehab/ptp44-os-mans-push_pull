
console.log('hereeeeeeeeeeee')


divcontent = document.getElementById('content');
load_btn= document.getElementById('load_data');


// load_btn.addEventListener('click', function(){
//     $.ajax({
//         url: "http://localhost/os44-mans/polling/server.php",
//         method: "GET",
//         data: {
//             message: 'hi'
//         },
//         success: function(data){
//             console.log(data);
//             divcontent.innerHTML = `<pre>${data}</pre>`;
//         },
//         error: function(){
//             divcontent.innerHTML = `<h1 style="color: red">error getting data</h1>`;
//         }
//
//     });
// });

function dopolling(){

    $.ajax({
        url: "http://localhost/os44-mans/polling/server.php",
        method: "GET",
        data: {
            message: 'hi'
        },
        success: function(data){
            console.log(data);
            divcontent.innerHTML += `<pre>${data}</pre>`;
        },
        error: function(){
            divcontent.innerHTML += `<h1 style="color: red">error getting data</h1>`;
        }

    });
};

setInterval(dopolling,5);



/**
 *
 * update client content once content changes in the
 * server
 * */




