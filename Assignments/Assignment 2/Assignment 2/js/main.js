



function submitTheForm()
{
    
    var formData = document.forms["form1"];

    var customerName = formData["name"].value;
    var customerEmail = formData["email"].value;
    var cardNumber = formData["card-number"].value;
    var cardMonth = formData["card-month"].value;
    var cardYear = formData["card-year"].value;

    var numWaterBottles = formData["i1"].value;
    var numBaseballCaps = formData["i2"].value;
    var numPens = formData["i3"].value;
    var numCandy = formData["i4"].value;
    var numCupcakes = formData["i5"].value;

    var nameFormat = /[A-Za-z]+ [A-Za-z]+/;
    if (nameFormat.test(customerName.trim()) == false)
    {
        alert("Enter your first and last name.");
        return false;
    }

    if (customerEmail.trim() == "")
    {
        alert("Enter your email address.");
        return false;
    }

    var cardNumberFormat = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}/;
    if (cardNumberFormat.test(cardNumber.trim()))
    {
        var cardNumberModified = "xxxx-xxxx-xxxx-" + cardNumber.trim().substr(15, 4);
    }
    else
    {
        alert("Card number must be entered in the format: \"xxxx-xxxx-xxxx-xxxx\".");
        return false;
    }

    cardMonth = cardMonth.toUpperCase();
    if (cardMonth != "JAN" && cardMonth != "FEB" && cardMonth != "MAR" && cardMonth != "APR" && cardMonth != "MAY" && cardMonth != "JUN" && cardMonth != "JUL" && cardMonth != "AUG" && cardMonth != "SEP" && cardMonth != "OCT" && cardMonth != "NOV" && cardMonth != "DEC")
    {
        alert("Card expiry month must be entered in the format: \"MMM\" ex(JAN).");
        return false;
    }

    var cardYearFormat = /[0-9]{4}/;
    if (cardYearFormat.test(cardYear.trim()) == false)
    {
        alert("Card expiry yeer must be entered in the format: \"yyyy\" ex(2025).");
        return false;
    }


    var table1String = "<table> <tr>";
        table1String += "<th>Name</th> <td>" + customerName + "</td>";
    table1String += "</tr> <tr>";
        table1String += "<th>Email</th> <td>" + customerEmail + "</td>";
    table1String += "</tr> <tr>";
        table1String += "<th>Credit Card</th> <td>" + cardNumberModified + "</td>";
    table1String += "</tr> </table>";

    table1String += "<table> <tr>";
        table1String += "<th>Item</th> <th>Quantity</th> <th>Unit Price</th> <th>Total Price</th>";
    table1String += "</tr> <tr>";

    var isNumber = /[0-9]+/;

    var totalPrice = 0;
    if (isNumber.test(numWaterBottles.trim()) && numWaterBottles.trim() != 0)
    {
            table1String += "<td>Water Bottles</td> <td>" + numWaterBottles + "</td> <td>$5.00</td> <td>$" + (numWaterBottles * 5).toFixed(2) + "</td>";
        table1String += "</tr> <tr>";
        totalPrice += (numWaterBottles * 5);
    }
    else if (numWaterBottles.trim() != "" && numWaterBottles.trim() != 0)
    {
        alert("Must enter a number of bottles.");
        return false;
    }
    if (isNumber.test(numBaseballCaps.trim()) && numWaterBottles.trim() != 0)
    {
            table1String += "<td>Baseball Caps</td> <td>" + numBaseballCaps + "</td> <td>$20.00</td> <td>$" + (numBaseballCaps * 20).toFixed(2) + "</td>";
        table1String += "</tr> <tr>";
        totalPrice += (numBaseballCaps * 20);
    }
    else if (numBaseballCaps.trim() != "" && numWaterBottles.trim() != 0)
    {
        alert("Must enter a number of caps.");
        return false;
    }
    if (isNumber.test(numPens.trim()) && numWaterBottles.trim() != 0)
    {
            table1String += "<td>Pens</td> <td>" + numPens + "</td> <td>$2.00</td> <td>$" + (numPens * 2).toFixed(2) + "</td>";
        table1String += "</tr> <tr>";
        totalPrice += (numPens * 2);
    }
    else if (numPens.trim() != "" && numWaterBottles.trim() != 0)
    {
        alert("Must enter a number of pens.");
        return false;
    }
    if (isNumber.test(numCandy.trim()) && numWaterBottles.trim() != 0)
    {
            table1String += "<td>Bags of Candy</td> <td>" + numCandy + "</td> <td>$10.00</td> <td>$" + (numCandy * 10).toFixed(2) + "</td>";
        table1String += "</tr> <tr>";
        totalPrice += (numCandy * 10);
    }
    else if (numCandy.trim() != "" && numWaterBottles.trim() != 0)
    {
        alert("Must enter a number of candy bags.");
        return false;
    }
    if (isNumber.test(numCupcakes.trim()) && numWaterBottles.trim() != 0)
    {
            table1String += "<td>Cupcakes</td> <td>" + numCupcakes + "</td> <td>$3.00</td> <td>$" + (numCupcakes * 3).toFixed(2) + "</td>";
        table1String += "</tr> <tr>";
        totalPrice += (numCupcakes * 3);
    }
    else if (numCupcakes.trim() != "" && numWaterBottles.trim() != 0)
    {
        alert("Must enter a number of cupcakes.");
        return false;
    }

    var donationPrice = 0;
    if ((totalPrice * 0.1) > 10)
    {
        donationPrice = (totalPrice * 0.1);
    }
    else
    {
        donationPrice = 10;
    }
    totalPrice += donationPrice;

        table1String += "<td>Donation</td> <td colspan=\"2\">Minimum</td> <td>$" + donationPrice.toFixed(2) + "</td>";
    table1String += "</tr> <tr>";
        table1String += "<td colspan=\"3\" class=\"to-bold\">Total</td> <td class=\"to-bold\">$" + totalPrice.toFixed(2) + "</td>";
    table1String += "</tr> </table>";

    var table1 = document.getElementById("table1");
    table1.innerHTML = table1String;

    return false;
}
