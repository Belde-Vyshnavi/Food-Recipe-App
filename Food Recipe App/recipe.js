const apiKey = '130cc570e27145358fc56673253ebb93';

function getSpoonacularData(query) {
    $.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`)
        .done(function(data) {
            displayRecipes(data.results);
        })
        .fail(function(error) {
            console.error("Error fetching data:", error);
        });
}


function getRandomRecipes(numberOfRecipes) {
    $.get(`https://api.spoonacular.com/recipes/random?number=${numberOfRecipes}&apiKey=${apiKey}`)
        .done(function(data) {
            displayRecipes(data.recipes);
        })
        .fail(function(error) {
            console.error("Error fetching random recipes:", error);
        });

        
}

function displayRecipes(recipes) {
    const body = document.getElementById('body');
    body.innerHTML = ''; 
    if (recipes.length === 0) {
        const message = document.createElement('p');
        message.textContent = "Recipe not available.";
        body.appendChild(message);
    } else {
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const title = document.createElement('h2');
        title.textContent = recipe.title;

        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt="Image of"+recipe.title;
      

       const btn=document.createElement('button');
       btn.textContent="View Recipe";
       btn.addEventListener('click', function() {
        getViewRecipe(recipe.id);
       
    });
   
        const likeContainer = document.createElement('div');

        const likeCount = document.createElement('span');
        let likeValue = parseInt(localStorage.getItem(`recipe_${recipe.id}_likes`)) || 0;
        likeCount.textContent = likeValue;
    
        const like = document.createElement('button');
        like.innerHTML = "&#x2764;"; // Heart symbol
    
        let hasLiked = localStorage.getItem(`recipe_${recipe.id}_liked`);
        if (hasLiked === null) {
            hasLiked = false;
        } else {
            hasLiked = JSON.parse(hasLiked);
        }
    
        if (hasLiked) {
            like.disabled = true; 
        }
    
        like.addEventListener('click', function() {
            if (!hasLiked) {
                likeValue++;
                likeCount.textContent = likeValue;
                localStorage.setItem(`recipe_${recipe.id}_title`, recipe.title);
                localStorage.setItem(`recipe_${recipe.id}_likes`, likeValue);
                localStorage.setItem(`recipe_${recipe.id}_liked`, true);
                localStorage.setItem(`recipe_${recipe.id}_image`, recipe.image);
                
                like.disabled = true; 
            }
        });
    
        likeContainer.appendChild(likeCount);
        likeContainer.appendChild(like);
    
        recipeDiv.appendChild(title);
        recipeDiv.appendChild(image);
        recipeDiv.appendChild(btn);
        recipeDiv.appendChild(likeContainer);
    
        body.appendChild(recipeDiv);
    });
}
}


$(document).ready(function() {

    getRandomRecipes(20); 

   
    $('#btn').click(function() {
        getRandomRecipes(20); 
    });
    
    $('#searchbtn').click(function() {
        const query = $('#searchbox').val();
        getSpoonacularData(query);
    });

    $('#likePage').click(function() {
        displayLikedRecipes(); 
    });

    
});


