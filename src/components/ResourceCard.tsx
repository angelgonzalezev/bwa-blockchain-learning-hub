import { ExternalLink } from 'lucide-react';
import { Resource } from '../types';
import { useState } from 'react';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const imageUrl = resource.imageUrl || `https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400`;

  return (
    <article className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col h-full group hover:shadow-lg">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        <img
          src={imageUrl}
          alt={resource.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(resource.level)}`}>
            {resource.level}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            {resource.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 font-heading">
          {resource.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3 leading-relaxed">
          {resource.description}
        </p>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
          aria-label={`Open ${resource.title} in new tab`}
        >
          Learn More
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
