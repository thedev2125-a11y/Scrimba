import React, { useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../AI.js";

export default function Main() {
  // old way of using sumbit Handler
  // function handleAddIngredient(event) {
  //     event.preventDefault()
  //     const formData = new FormData(event.target)
  //     const newIngredient = formData.get('ingredient')
  //     setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  //     event.target.reset()
  // }
  const [ingredients, setIngredients] = useState([]);
  // New Way of using submit handlers
   const [recipeShown, setRecipeShown] = React.useState("");

    async function getRecipe() {
        // setRecipeShown(prevShown => !prevShown)
       const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipeShown(recipeMarkdown)
      }
  function handleIn(formData) {
    const newIngredient = formData.get("ingredient");
    if (newIngredient.trim() === "") return;
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }
  return (
    <main>
      <p style={{ textAlign: "center" }}>Please Enter at least 4 ingredients</p>
      <form
        className="add-ingredient-form"
        /*onSubmit={handleAddIngredient}*/ action={handleIn}
      >
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>
      {/* {ingredients.length > 0 && (
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          {ingredients.length > 3 && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
               </div>
              <button>Get a recipe</button>
            </div>
          )}
        </section>
      )} */}
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      )}

      {recipeShown && <ClaudeRecipe recipeShown={recipeShown} />}
    </main>
  );
}
// export default function Main() {
//     const [ingredients, setIngredients] = React.useState(
//         ["all the main spices", "pasta", "ground beef", "tomato paste"]
//     )
//     const [recipeShown, setRecipeShown] = React.useState(false)

//     function toggleRecipeShown() {
//         setRecipeShown(prevShown => !prevShown)
//     }

//     function addIngredient(formData) {
//         const newIngredient = formData.get("ingredient")
//         setIngredients(prevIngredients => [...prevIngredients, newIngredient])
//     }

//     return (
//         <main>
//             <form action={addIngredient} className="add-ingredient-form">
//                 <input
//                     type="text"
//                     placeholder="e.g. oregano"
//                     aria-label="Add ingredient"
//                     name="ingredient"
//                 />
//                 <button>Add ingredient</button>
//             </form>

//             {ingredients.length > 0 &&
//                 <IngredientsList
//                     ingredients={ingredients}
//                     toggleRecipeShown={toggleRecipeShown}
//                 />
//             }

//             {recipeShown && <ClaudeRecipe />}
//         </main>
//     )
// }
