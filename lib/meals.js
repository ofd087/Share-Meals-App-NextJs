import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { v4 as uid } from "uuid";

import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error("Loading meals failed");

  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const imageExtension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}${uid()}.${imageExtension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferImage), (error) => {
    if (error) {
      throw new Error("Saving image failes");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
       @title,
       @summary,
       @instructions,
       @creator,
       @creator_email,
       @image,
       @slug
    )  
  `
  ).run(meal);
}
