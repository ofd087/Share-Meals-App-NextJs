"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidField(field) {
  return !field || field.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (isInvalidField(meal.creator)) {
    return {
      message: "Please enter your name",
    };
  } else if (isInvalidField(meal.creator_email)) {
    return {
      message: "Please enter your email",
    };
  } else if (isInvalidField(meal.title)) {
    return {
      message: "Title field is required",
    };
  } else if (isInvalidField(meal.summary)) {
    return {
      message: "Summary field is required",
    };
  } else if (isInvalidField(meal.instructions)) {
    return {
      message: "Instructions field is required",
    };
  } else if (!meal.creator_email.includes("@")) {
    return {
      message: "Email is not valid",
    };
  } else if (!meal.image || meal.image.size === 0) {
    return {
      message: "Please add meal's photo",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
