import React from 'react';
import { Upload } from 'lucide-react';

const ImageUploader = ({ onImageUpload }) => {
  return (
    <div className="flex justify-center">
      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <span>Upload a file</span>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={onImageUpload}
              />
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ImageUploader;