export const StorageConfig = {
  photo: {
    directory: '../storage/photos/',
    photoMaxFileSize: 1024 * 1024 * 4,
    resize: {
      square: {
          directory: 'resized/',
          width: 400,
          height: 400,
      },
    }
  }
  
}