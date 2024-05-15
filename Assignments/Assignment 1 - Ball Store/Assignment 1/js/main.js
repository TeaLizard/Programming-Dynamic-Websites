var pingPongBallNumber = 0;
var golfBallNumber = 0;
var soccarBallNumber = 0;
var footBallNumber = 0;
var basketBallNumber = 0;

function pingPong()
{
    var ballNumberString = prompt('How many ping pong balls do you want?',' ');
    if (ballNumberString === null)
    {
        return;
    }
    var ballNumber = parseInt(ballNumberString);
    var displayNumber = document.getElementById("pingPong");
    if (isNaN(ballNumber))
    {
        NaNInput("pingPong");
        return;
    }
    else if(ballNumber < 0)
    {
        negativeBallNumber("pingPong");
        return;
    }
    else if (ballNumber == 0)
    {
        displayNumber.innerHTML = "$1";
        pingPongBallNumber = ballNumber;
    }
    else
    {
        displayNumber.innerHTML = "$1 x" + ballNumber;
        pingPongBallNumber = ballNumber;
    }
    checkoutAppears();
}

function golf()
{
    var ballNumberString = prompt('How many golf balls do you want?',' ');
    if (ballNumberString === null)
    {
        return;
    }
    var ballNumber = parseInt(ballNumberString);
    var displayNumber = document.getElementById("golf");
    if (isNaN(ballNumber))
    {
        NaNInput("golf");
        return;
    }
    else if(ballNumber < 0)
    {
        negativeBallNumber("golf");
        return;
    }
    else if (ballNumber == 0)
    {
        displayNumber.innerHTML = "$2";
        golfBallNumber = ballNumber;
    }
    else
    {
        displayNumber.innerHTML = "$2 x" + ballNumber;
        golfBallNumber = ballNumber;
    }
    checkoutAppears();
}

function soccar()
{
    var ballNumberString = prompt('How many soccar balls do you want?',' ');
    if (ballNumberString === null)
    {
        return;
    }
    var ballNumber = parseInt(ballNumberString);
    var displayNumber = document.getElementById("soccar");
    if (isNaN(ballNumber))
    {
        NaNInput("soccar");
        return;
    }
    else if(ballNumber < 0)
    {
        negativeBallNumber("soccar");
        return;
    }
    else if (ballNumber == 0)
    {
        displayNumber.innerHTML = "$5";
        soccarBallNumber = ballNumber;
    }
    else
    {
        displayNumber.innerHTML = "$5 x" + ballNumber;
        soccarBallNumber = ballNumber;
    }
    checkoutAppears();
}

function football()
{
    var ballNumberString = prompt('How many footballs do you want?',' ');
    if (ballNumberString === null)
    {
        return;
    }
    var ballNumber = parseInt(ballNumberString);
    var displayNumber = document.getElementById("football");
    if (isNaN(ballNumber))
    {
        NaNInput("football");
        return;
    }
    else if(ballNumber < 0)
    {
        negativeBallNumber("football");
        return;
    }
    else if (ballNumber == 0)
    {
        displayNumber.innerHTML = "$6";
        footBallNumber = ballNumber;
    }
    else
    {
        displayNumber.innerHTML = "$6 x" + ballNumber;
        footBallNumber = ballNumber;
    }
    checkoutAppears();
}

function basketball()
{
    var ballNumberString = prompt('How many basketballs do you want?',' ');
    if (ballNumberString === null)
    {
        return;
    }
    var ballNumber = parseInt(ballNumberString);
    var displayNumber = document.getElementById("basketball");
    if (isNaN(ballNumber))
    {
        NaNInput("basketball");
        return;
    }
    else if(ballNumber < 0)
    {
        negativeBallNumber("basketball");
        return;
    }
    else if (ballNumber == 0)
    {
        displayNumber.innerHTML = "$6";
        basketBallNumber = ballNumber;
    }
    else
    {
        displayNumber.innerHTML = "$6 x" + ballNumber;
        basketBallNumber = ballNumber;
    }
    checkoutAppears();
}

function NaNInput(ballType)
{
    alert("Enter a whole number of balls!");
    switch(ballType)
    {
        case "pingPong":
            pingPong();
            break;
        
        case "golf":
            golf();
            break;

        case "soccar":
            soccar();
            break;

        case "football":
            football();
            break;

        case "basketball":
            basketball();
            break;
    }
}

function negativeBallNumber(ballType)
{
    alert("Enter a positive whole number of balls!");
    switch(ballType)
    {
        case "pingPong":
            pingPong();
            break;
        
        case "golf":
            golf();
            break;

        case "soccar":
            soccar();
            break;

        case "football":
            football();
            break;

        case "basketball":
            basketball();
            break;
    }
}

function checkoutAppears()
{
    if (pingPongBallNumber === 0 && golfBallNumber === 0 && soccarBallNumber === 0 && footBallNumber === 0 && basketBallNumber === 0)
    {
        var checkoutButton = document.getElementById("checkout");
        checkoutButton.innerHTML = null;
    }
    else
    {
        var checkoutButton = document.getElementById("checkout");
        checkoutButton.innerHTML = '<button onclick="checkout()">Checkout</button> <p id="checkout"></p> <br>';
    }
}

function checkout()
{
    var customerName = prompt('What is your name?',' ');
    if (customerName === null)
    {
        return;
    }
    else if (customerName === "" || customerName === " ")
    {
        alert("Please enter your name!");
        checkout();
        return;
    }
    var totalBeforeTax = pingPongBallNumber * 1 + golfBallNumber * 2 + soccarBallNumber * 5 + footBallNumber * 6 + basketBallNumber * 6;
    var totalAfterTax = totalBeforeTax * 1.13;
    var onlyTax = totalBeforeTax * 0.13;

    var printRecipt = document.getElementById("recipt");
    printRecipt.innerHTML = "<p>" + customerName + "<p/>";
    
    if (pingPongBallNumber != 0)
    {
        printRecipt.innerHTML += "<p>Ping Pong Balls x" + pingPongBallNumber + ": $" + (pingPongBallNumber * 1).toFixed(2) + "<p/>";
    }
    if (golfBallNumber != 0)
    {
        printRecipt.innerHTML += "<p>Golf Balls x" + golfBallNumber + ": $" + (golfBallNumber * 2).toFixed(2) + "<p/>";
    }
    if (soccarBallNumber != 0)
    {
        printRecipt.innerHTML += "<p>Soccar Balls x" + soccarBallNumber + ": $" + (soccarBallNumber * 5).toFixed(2) + "<p/>";
    }
    if (footBallNumber != 0)
    {
        printRecipt.innerHTML += "<p>Footballs x" + footBallNumber + ": $" + (footBallNumber * 6).toFixed(2) + "<p/>";
    }
    if (basketBallNumber != 0)
    {
        printRecipt.innerHTML += "<p>Basketballs x" + basketBallNumber + ": $" + (basketBallNumber * 6).toFixed(2) + "<p/>";
    }

    printRecipt.innerHTML += "<p>Your total before tax is " + totalBeforeTax.toFixed(2) + "$<p/>";
    printRecipt.innerHTML += "<p>Your total after tax is " + totalAfterTax.toFixed(2) + "$<p/>";
    printRecipt.innerHTML += "<p>Your tax is " + onlyTax.toFixed(2) + "$<p/>";
    printRecipt.innerHTML += "<p>Have a good day!<p/>";
}