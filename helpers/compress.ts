import Compressor from 'compressorjs';

export const compressImage = (file: File, quality: number = 0.7): Promise<Blob | File> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality,
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      },
    });
  });
};
