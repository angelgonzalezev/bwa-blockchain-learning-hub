import { useState, useRef, useEffect } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

interface LearningHub {
	name: string;
	url: string;
	description: string;
}

const LEARNING_HUBS: LearningHub[] = [
	{
		name: "Public APIs Directory",
		url: "https://apis.buildwithangel.com/",
		description: "Free APIs for software development",
	},
	{
		name: "Blockchain Learning Hub",
		url: window.location.href,
		description: "Comprehensive blockchain resources",
	},
];

export default function LearningHubsMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={menuRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
				aria-expanded={isOpen}
				aria-haspopup="true"
			>
				Learning HUBs
				<ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
					{LEARNING_HUBS.map((hub) => (
						<a
							key={hub.name}
							href={hub.url}
							target={hub.url === window.location.href ? "_self" : "_blank"}
							rel={hub.url === window.location.href ? undefined : "noopener noreferrer"}
							className="block px-4 py-3 hover:bg-gray-50 transition-colors group"
							onClick={() => setIsOpen(false)}
						>
							<div className="flex items-start justify-between gap-2">
								<div className="flex-1">
									<div className="font-medium text-gray-900 group-hover:text-gray-700 mb-1">{hub.name}</div>
									<div className="text-xs text-gray-500">{hub.description}</div>
								</div>
								{hub.url !== window.location.href && (
									<ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
								)}
							</div>
						</a>
					))}
				</div>
			)}
		</div>
	);
}
