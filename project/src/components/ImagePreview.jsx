import React from 'react';

const ImagePreview = ({ src }) => {
  if (!src) return null;

  return (
    <div className="mt-4 flex justify-center">
      <div className="relative w-full max-w-md">
        <img
          src={src}
          alt="Food Label Preview"
          className="rounded-lg shadow-md object-contain max-h-[300px] w-full"
        />
      </div>
    </div>
  );
};

export default ImagePreview;