
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

function dopolling(lastmodified){

    $.ajax({
        url: "http://localhost/os44-mans/long-polling/server.php",
        method: "GET",
        data: {
            message: 'hi',
            lastModified : lastmodified
        },
        success: function(data){
            // console.log(data);
            data_received = JSON.parse(data);
            console.log(data_received);
            divcontent.innerHTML += `<pre>${data_received.data}</pre>`;
            divcontent.innerHTML+= '<hr style="color: red"> ';
            dopolling(data_received.server_time);
        },
        error: function(){

            divcontent.innerHTML += `<h1 style="color: red">error getting data</h1>`;
            dopolling(0);
        }

    });
};

dopolling(0);
// setInterval(dopolling,5);



/**
 *
 * update client content once content changes in the
 * server
 * */




