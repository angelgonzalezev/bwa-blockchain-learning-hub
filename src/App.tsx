import { useState, useMemo } from "react";
import { BookOpen } from "lucide-react";
import FilterSection from "./components/FilterSection";
import ResourceCard from "./components/ResourceCard";
import { resources } from "./data/resources";
import { ResourceCategory, LearningLevel } from "./types";

function App() {
	const [selectedCategories, setSelectedCategories] = useState<ResourceCategory[]>([]);
	const [selectedLevels, setSelectedLevels] = useState<LearningLevel[]>([]);

	const filteredResources = useMemo(() => {
		return resources.filter((resource) => {
			const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(resource.category);

			const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(resource.level);

			return matchesCategory && matchesLevel;
		});
	}, [selectedCategories, selectedLevels]);

	const handleCategoryToggle = (category: ResourceCategory) => {
		setSelectedCategories((prev) =>
			prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
		);
	};

	const handleLevelToggle = (level: LearningLevel) => {
		setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]));
	};

	const handleClearFilters = () => {
		setSelectedCategories([]);
		setSelectedLevels([]);
	};

	return (
		<div className="min-h-screen bg-[#faf9f6]">
			<header className="bg-white border-b border-gray-100 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center gap-3">
						<a
							href="https://buildwithangel.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex-shrink-0 transition-opacity hover:opacity-80"
							aria-label="Visit buildwithangel.com"
						>
							<img src="/Logo-11.png" alt="Logo" className="h-12 w-auto" />
						</a>
						<div>
							<h1 className="text-2xl font-bold text-gray-900 font-heading">Blockchain Learning Hub</h1>
							<p className="text-sm text-gray-600 mt-0.5">Your comprehensive guide to blockchain development</p>
						</div>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<FilterSection
						selectedCategories={selectedCategories}
						selectedLevels={selectedLevels}
						onCategoryToggle={handleCategoryToggle}
						onLevelToggle={handleLevelToggle}
						onClearFilters={handleClearFilters}
					/>
				</div>

				<div className="mb-4">
					<p className="text-sm text-gray-600 font-medium">
						Showing <span className="font-semibold text-gray-900">{filteredResources.length}</span>{" "}
						{filteredResources.length === 1 ? "resource" : "resources"}
					</p>
				</div>

				{filteredResources.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
						{filteredResources.map((resource) => (
							<ResourceCard key={resource.id} resource={resource} />
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<div className="bg-white rounded-xl border border-gray-200 p-12 max-w-md mx-auto">
							<BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
							<h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">No resources found</h3>
							<p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
							<button
								onClick={handleClearFilters}
								className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
							>
								Clear all filters
							</button>
						</div>
					</div>
				)}
			</main>

			<footer className="bg-white border-t border-gray-100 mt-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center text-sm text-gray-600">
						<p className="mb-2">A curated collection of blockchain learning resources for developers at all levels</p>
						<p className="text-gray-500 mb-2">
							Source:{" "}
							<a
								href="https://github.com/nqcm/learning-blockchain"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-700 hover:text-gray-900 underline transition-colors"
							>
								Public APIs
							</a>
						</p>
						<p className="text-gray-500">Free and open for the community. Happy learning!</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
