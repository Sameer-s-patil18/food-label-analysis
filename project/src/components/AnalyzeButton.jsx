import React from 'react';
import { Loader2 } from 'lucide-react';

const AnalyzeButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          Processing...
        </>
      ) : (
        "Analyze Food Label"
      )}
    </button>
  );
};

export default AnalyzeButton;