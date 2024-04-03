
function displayLikedRecipes() {
    const body = document.getElementById("body");
    body.innerHTML = ''; 

    for (let key in localStorage) {
        if (key.startsWith('recipe_') && key.endsWith('_liked')) {
            const recipeId = key.split('_')[1];
            const recipeTitle = localStorage.getItem(`recipe_${recipeId}_title`);
            const recipeImage = localStorage.getItem(`recipe_${recipeId}_image`);
            const likeCount = parseInt(localStorage.getItem(`recipe_${recipeId}_likes`)) || 0;

            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipea');

            const title = document.createElement('h2');
            title.textContent = recipeTitle;

            const image = document.createElement('img');
            image.src = recipeImage;
            image.alt = `Image of ${recipeTitle}`;

            const likeCountSpan = document.createElement('span');
            likeCountSpan.textContent = `Likes: ${likeCount}`;

            const viewDetailsBtn = document.createElement('button');
            viewDetailsBtn.textContent = 'View Recipe';
            viewDetailsBtn.classList.add('view-details-btn');
            viewDetailsBtn.dataset.recipeId = recipeId; 

           
            viewDetailsBtn.addEventListener('click', function() {
                getViewRecipe(recipeId); 
            });
            
            recipeDiv.appendChild(title);
            recipeDiv.appendChild(image);
            recipeDiv.appendChild(likeCountSpan);
            recipeDiv.appendChild(viewDetailsBtn);
            body.appendChild(recipeDiv);
        }
    }
}
