
import { db } from '@/db';
import { categories } from '@/db/schema';

const categoryName = [
  "Art",
  "Science",
  "Technology",
  "Health",
  "Education",
  "Sports",
  "News",
  "Entertainment",
  "Travel",
  "Food",
  "Fashion",
  "Music",
  "Movies",
  "Books",
  "Games",
  "Politics",
  "Religion",
  "Philosophy",
  "History",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Psychology",
  "Sociology",
  "Anthropology",
  "Geography",
  "Comedy",
  "Car and Vehicles"
]

async function main() {
  console.log("Seeding categories..")

  try {
    const value = categoryName.map((name) => ({
      name,
      description: `Video releted to ${name.toLowerCase()}`
    }))

    await db.insert(categories).values(value)

    console.log("Successfully seeded categories")
  } catch (error) {
    console.error("Error seeding categoris: ", error)
    process.exit(1)
  }
}

main()