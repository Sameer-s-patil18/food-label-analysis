import React from 'react';

const ExtractedText = ({ text }) => {
  if (!text) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900">Extracted Text:</h3>
      <pre className="mt-2 text-sm text-gray-600 whitespace-pre-wrap overflow-auto max-h-60">
        {text}
      </pre>
    </div>
  );
};

export default ExtractedText;