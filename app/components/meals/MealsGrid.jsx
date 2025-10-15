import classes from "./MealsGrid.module.css";
// COMPONENTS
import MealItem from "./MealItem";

export default function MealsGrid({ meals }) {
  const mealsList = meals.map((meal) => (
    <li key={meal.id}>
      <MealItem {...meal} />
    </li>
  ));
  return <ul className={classes.meals}>{mealsList}</ul>;
}
