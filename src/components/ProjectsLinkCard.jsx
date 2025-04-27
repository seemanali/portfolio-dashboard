import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProjectsLinkCard({ title, technologies, imageUrl, viewLink }) {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col space-y-4">
        {/* Image Section */}
        <div className="h-40 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Project Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-400">{technologies.join(', ')}</p>
        </div>

        {/* View Link Button */}
        <Link
          to={viewLink}
          rel="noopener noreferrer"
          className="flex items-center justify-center text-blue-500 hover:text-blue-400"
        >
          <ExternalLink className="mr-2" />
          View Project
        </Link>
      </div>
    </div>
  );
}

export default ProjectsLinkCard;
