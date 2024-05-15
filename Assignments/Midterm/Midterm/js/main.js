


function submitTheForm()
{
    var formData = document.forms["form1"];

    let agentName = formData["q1"].value;
    let agentNumber = formData["q2"].value;
    let agentCity = formData["q3"].value;

    var agentTotalPhones = 0;
    var agentTotalAccessories = 0;
    var agentReceivedCommission = 0;

    agentTotalPhones = formData["q4"].value;
    agentTotalAccessories = formData["q5"].value;
    agentReceivedCommission = formData["q6"].value;

    agentTotalPhones *= 1;
    agentTotalAccessories *= 1;
    agentReceivedCommission *= 1;

    let agentNameFormat = /[a-zA-Z]+/;
    if (!agentNameFormat.test(agentName.trim()))
    {
        alert("Enter your name.");
        return false;
    }

    agentNumber = agentNumber.toUpperCase();
    let agentNumberFormat = /[A-Z]{2}[0-9]{6}/;
    if (!agentNumberFormat.test(agentNumber.trim()))
    {
        alert("Enter a valid agent number ex.(XX999999).");
        return false;
    }

    if (agentCity.trim() == null || agentCity.trim() == "")
    {
        alert("Enter your city.");
        return false;
    }

    let numberFormat = /[0-9]*/;

    if (!numberFormat.test(agentTotalPhones))
    {
        alert("Enter your total sales for phones.");
        return false;
    }
    else if (agentTotalPhones < 0)
    {
        alert("Enter a positive number.");
        return false;
    }

    if (agentTotalAccessories == null || agentTotalAccessories == "" || agentTotalAccessories == 0)
    {
        
    }
    else if (!numberFormat.test(agentTotalAccessories))
    {
        alert("Enter a valid number.");
        return false;
    }
    if (agentTotalAccessories < 0)
    {
        alert("Enter a positive number.");
        return false;
    }

    if (!numberFormat.test(agentTotalAccessories))
    {
        alert("Enter your total commission received to date.");
        return false;
    }
    else if (agentReceivedCommission < 0)
    {
        alert("Enter a positive number.");
        return false;
    }

    let agentNameOutput = "Agent Name: " + agentName.trim();
    let agentNumberOutput = "Agent Number: " + agentNumber.trim();
    let agentCityOutput = "Agent City: " + agentCity.trim();

    let agentTotalSale = agentTotalPhones + agentTotalAccessories;

    let agentTotalCommission;
    if (agentTotalSale < 10000)
    {
        agentTotalCommission = agentTotalSale * 0.10;
    }
    else if (agentTotalSale < 20000)
    {
        agentTotalCommission = agentTotalSale * 0.15;
    }
    else
    {
        agentTotalCommission = agentTotalSale * 0.20;
    }

    let agentTotalCommissionPending = agentTotalCommission - agentReceivedCommission;

    let agentTotalSaleOutput = "Total Sale: $" + agentTotalSale.toFixed(2);
    let agentTotalCommissionOutput = "Total Commission: $" + agentTotalCommission.toFixed(2);
    let agentReceivedCommissionOutput = "Commission Recieved: $" + agentReceivedCommission.toFixed(2);
    let agentCommissionPendingOutput = "Commission Pending: $" + agentTotalCommissionPending.toFixed(2);

    let totalOutput = "<h2>Output</h2>";

    totalOutput += "<div>";

    totalOutput += "<p>" + agentNameOutput + "</p>";
    totalOutput += "<p>" + agentNumberOutput + "</p>";
    totalOutput += "<p>" + agentCityOutput + "</p>";

    totalOutput += "<p>" + agentTotalSaleOutput + "</p>";
    totalOutput += "<p>" + agentTotalCommissionOutput + "</p>";
    totalOutput += "<p>" + agentReceivedCommissionOutput + "</p>";
    totalOutput += "<p>" + agentCommissionPendingOutput + "</p>";

    totalOutput += "</div>";

    let documentPost = document.getElementById("main");
    documentPost.innerHTML = totalOutput;

    return false;
}