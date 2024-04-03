// Function to fetch recipe details by ID

function getViewRecipe(recipeId) {
    $.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`)
        .done(function(data) {
            displayRecipeInformation(data);
        })
        .fail(function(error) {
            console.error("Error fetching recipe information:", error);
        });
}

function displayRecipeInformation(recipee) {
    const body = document.getElementById('body');
    body.innerHTML = ''; 
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipee');

    const title = document.createElement('h2');
    title.textContent = recipee.title;

    const image = document.createElement('img');
    image.src = recipee.image;
    image.alt = "Image of " + recipee.title;

    function stripHtmlTags(html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
      }
    const description = document.createElement('p');
    description.innerText = stripHtmlTags(recipee.summary);

    recipeDiv.appendChild(title);
    recipeDiv.appendChild(image);
    recipeDiv.appendChild(description);

    body.appendChild(recipeDiv);
}

function addViewDetailEventListeners() {
    const viewDetailButtons = document.querySelectorAll('.view-detail-btn');
    viewDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = button.dataset.recipeId; 
                     getViewRecipe(recipeId);
        });
    });
}

$(document).ready(function() {

    addViewDetailEventListeners();
});



