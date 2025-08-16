import { Link } from "react-router-dom";
import data from "../data.json";

function HomePage() {
    return (
        <div className="p-6">
            <div className="flex justify-end mb-6">
                <Link
                    to="/add-recipe"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    + Add Recipe
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.map((recipe) => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="rounded-md w-full h-48 object-cover"
                            />
                            <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
                            <p className="text-gray-600">{recipe.summary}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
