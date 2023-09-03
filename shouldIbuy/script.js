const msgDiv = document.getElementById("result");
const table = document.getElementById("allQs");
const nextBtn = document.getElementById("next");
const priceElement = document.getElementById("price");
const imgResult = document.getElementById("imgResult");

function calc() {
    let price = priceElement.value;

    if(price==0) {
        msgDiv.innerHTML="If it's free, don't even ask";
        return;
    }

    let counter = 0;
    let necessity = 0;
    let cost = 0;

    for(let i=1; i<11; i++) {
        const qs = document.getElementsByName('q'+i);
        for(let radio of qs) {
            if(radio.checked) {
                counter += parseInt(radio.value);
            }
        }

    }

    if(counter>=16) {
        necessity = 5;
    } else if(counter>=13) {
        necessity = 4;
    } else if(counter>=10) {
        necessity = 3;
    } else if(counter>=7) {
        necessity = 2;
    } else {
        necessity = 1;
    }

    if(price>400) {
        cost = 1;
    } else if(price>200) {
        cost = 2;
    } else if(price>100) {
        cost = 3;
    } else if(price>50) {
        cost = 4;
    } else if(price>20) {
        cost = 5;
    } else {
        cost = 6;
    }

    let message;
    const result = 2*necessity + cost;
    let src;

    if(result>=13) {
        message = "Buy it";
        src="imgs/buy.png";
    } else if(result>=11) {
        message = "Buy if you have spare money";
        src="imgs/maybe.png";
    } else if(result>=7) {
        message = "Don't buy it";
        src="imgs/dontbuy.png";
    } else {
        message = "Maybe when you're rich";
        src="imgs/no.png";
    }
    const again = document.getElementById("again");

    again.style.display = "inline-block";
    priceElement.style.display = "none";
    table.style.display = "none";
    nextBtn.style.display = "none";
    imgResult.style.display="block";
    imgResult.src=src;
    msgDiv.style.display = "block";
    msgDiv.innerHTML = message;
   
}

function startAgain() {
    again.style.display = "none";
    priceElement.style.display = "inline-block";
    table.style.display = "flex";
    nextBtn.style.display = "inline-block";
    msgDiv.style.display = "none";
    imgResult.style.display="none";
}