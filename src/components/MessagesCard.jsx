import React, { useState } from 'react';
import { User, Mail, ChevronDown, ChevronUp } from 'lucide-react';

function MessagesCard({ name, email, subject, message }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <User className="text-blue-500 w-6 h-6 mr-2" />
        <span className="font-semibold">{name}</span>
      </div>
      <div className="flex items-center mb-2">
        <Mail className="text-green-500 w-6 h-6 mr-2" />
        <span className="text-gray-400">{email}</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="font-semibold">{subject}</span>
      </div>
      {isExpanded ? (
        <>
          <p className="text-gray-300 mt-2">{message}</p>
          <button
            onClick={() => setIsExpanded(false)}
            className="flex items-center text-blue-500 mt-4"
          >
            <ChevronUp className="mr-2" />
            Show Less
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center text-blue-500 mt-4"
        >
          <ChevronDown className="mr-2" />
          View More
        </button>
      )}
    </div>
  );
}

export default MessagesCard;
