export const readImageAsDataUrl = (file, maxSize = 1200, quality = 0.82) => new Promise((resolve, reject) => {
  if (!file.type.startsWith('image/')) {
    reject(new Error('Veuillez sélectionner un fichier image.'));
    return;
  }

  const reader = new FileReader();
  reader.onerror = () => reject(new Error('Impossible de lire cette image.'));
  reader.onload = () => {
    const image = new Image();
    image.onerror = () => reject(new Error('Cette image ne peut pas être utilisée.'));
    image.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});