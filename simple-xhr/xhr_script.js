
console.log('hereeeeeeeeeeee')


divcontent = document.getElementById('content');
load_btn= document.getElementById('load_data');
divcv = document.getElementById('cv');
cv_btn = document.getElementById('mycv');

console.log(load_btn, divcontent);

// use hr to send request to the file to reload the data
let myxhr = new XMLHttpRequest();
console.log(myxhr);

// open connection between client and server o==> onclick

load_btn.addEventListener('click', function () {
    console.log('button clicked');
    // 1- open connection
    myxhr.open('GET', 'students.txt');

    // 2- send request
    myxhr.send();

    //3- get data
    console.log(myxhr.response);
    console.log(myxhr)

    // track ready state change -->
    // get data from object only if ? request send and received correctly --> status 200
    myxhr.onreadystatechange = function () {
        console.log('READY STATE', myxhr.readyState);
        if (myxhr.status === 200 && myxhr.readyState===4) {
            console.log("Data received successfully", this.responseText);
            divcontent.innerHTML = `<pre>${this.responseText}</pre>`;
        }
    };

});

mycv.addEventListener('click', function () {
    myxhr.open('GET', 'mycv.txt');
    myxhr.send();
    myxhr.onreadystatechange = function () {
        if (myxhr.status === 200 && myxhr.readyState===4) {
            divcv.innerHTML = `<pre>${this.responseText}</pre>`;
        }
    }
});














