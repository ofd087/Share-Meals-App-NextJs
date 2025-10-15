import MealsGrid from "./MealsGrid";

import { getMeals } from "@/lib/meals";

export default async function FetchingMeals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
