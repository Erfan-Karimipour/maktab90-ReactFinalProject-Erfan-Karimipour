export function validateImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {

        const image = new Image();
        image.src = event.target.result;
        image.onerror = () => {
          reject(new Error('Invalid image file'));
        };

        image.onload = () => {
          if (image.width !== image.height) {

            reject(new Error('Image must have equal width and height'));

          } else if (file.size > 1000000) {

            reject(new Error('Image must be less than 1MB in size'));

          } else {

            resolve();

          }
        };
      };
      reader.readAsDataURL(file);
    });
  }