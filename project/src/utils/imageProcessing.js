// Browser-based image processing utilities
export const preprocessImage = async (imageFile) => {
  try {
    return await browserPreprocessImage(imageFile);
  } catch (error) {
    console.error('Image preprocessing error:', error);
    throw new Error('Failed to process image');
  }
};

const browserPreprocessImage = async (imageFile) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Create image object from file
  const image = await createImageFromFile(imageFile);
  
  // Set canvas dimensions
  canvas.width = image.width;
  canvas.height = image.height;
  
  // Draw original image
  ctx.drawImage(image, 0, 0);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Enhanced image processing pipeline
  for (let i = 0; i < data.length; i += 4) {
    // Convert to grayscale with enhanced weights for better text contrast
    const gray = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
    
    // Advanced contrast enhancement
    const contrast = 2.0; // Increased for better text separation
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    const enhancedGray = factor * (gray - 128) + 128;
    
    // Adaptive thresholding simulation
    const localThreshold = getLocalThreshold(data, i, canvas.width, canvas.height);
    const final = enhancedGray > localThreshold ? 255 : 0;
    
    // Apply sharpening
    const sharpened = applySharpening(final, data, i, canvas.width);
    
    data[i] = sharpened;     // R
    data[i + 1] = sharpened; // G
    data[i + 2] = sharpened; // B
  }
  
  // Put processed image data back
  ctx.putImageData(imageData, 0, 0);
  
  // Return as base64
  return canvas.toDataURL('image/png');
};

// Helper function to calculate local threshold
const getLocalThreshold = (data, index, width, height) => {
  const windowSize = 15;
  let sum = 0;
  let count = 0;
  
  const x = (index / 4) % width;
  const y = Math.floor((index / 4) / width);
  
  for (let dy = -windowSize; dy <= windowSize; dy++) {
    for (let dx = -windowSize; dx <= windowSize; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIndex = (ny * width + nx) * 4;
        sum += data[nIndex];
        count++;
      }
    }
  }
  
  return (sum / count) * 0.95; // Slight bias towards white
};

// Helper function to apply sharpening
const applySharpening = (value, data, index, width) => {
  const kernel = [
    -1, -1, -1,
    -1,  9, -1,
    -1, -1, -1
  ];
  
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const idx = index + (i * width + j) * 4;
      if (data[idx] !== undefined) {
        sum += data[idx] * kernel[(i + 1) * 3 + (j + 1)];
      }
    }
  }
  
  return Math.max(0, Math.min(255, sum));
};

const createImageFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};