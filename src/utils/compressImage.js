// Compresse et redimensionne une image côté navigateur AVANT l'envoi.
// Une photo de téléphone (3-5 Mo) devient ~150-300 Ko, sans perte visible.
// Retourne un nouveau File prêt à uploader (ou l'original si compression impossible).

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const readAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export async function compressImage(file, { maxDim = 1400, quality = 0.8 } = {}) {
  try {
    if (!file || !file.type?.startsWith('image/')) return file;
    // On ne touche pas aux GIF (animation) ni aux SVG (vectoriel)
    if (file.type === 'image/gif' || file.type === 'image/svg+xml') return file;

    const dataUrl = await readAsDataURL(file);
    const img = await loadImage(dataUrl);

    let { width, height } = img;
    if (width > maxDim || height > maxDim) {
      const scale = Math.min(maxDim / width, maxDim / height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    // WebP si supporté (plus léger), sinon JPEG
    let blob = await new Promise((res) => canvas.toBlob(res, 'image/webp', quality));
    if (!blob) {
      blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', quality));
    }
    if (!blob) return file; // secours : on garde l'original

    // Si la "compression" a rendu le fichier plus lourd, on garde l'original
    if (blob.size >= file.size) return file;

    const ext = blob.type.includes('webp') ? 'webp' : 'jpg';
    const baseName = (file.name || 'image').replace(/\.[^.]+$/, '') || 'image';
    return new File([blob], `${baseName}.${ext}`, { type: blob.type });
  } catch {
    return file; // en cas de souci, on n'empêche jamais l'upload
  }
}
