import React from 'react';

const Header = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Food Label Analyzer</h1>
      <p className="mt-2 text-gray-600">
        Upload a food label image to get detailed nutritional insights
      </p>
    </div>
  );
};

export default Header;