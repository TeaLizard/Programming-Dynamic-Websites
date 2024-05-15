


function submitForm()
{
    var answersArray = [];
    var correctAnswersArray = ['true', 'true', 'true'];
    var post = document.getElementById("asidePost");
    var score = 0;

    var formData = document.forms["form"];
    var ans1 = formData["question1"].value;
    var ans2 = formData["question2"].value;
    var ans3 = formData["question3"].value;
    
    answersArray = [ans1, ans2, ans3];
    
    for (var i = 0; i < 3; i++)
    {
        if (answersArray[i] == correctAnswersArray[i])
        {
            score++;
        }
    }

    post.innerHTML = "<p>Your score is " + score + ".</p>";
    return false;
}