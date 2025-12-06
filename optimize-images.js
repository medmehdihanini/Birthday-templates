const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets';
const outputDir = './src/assets/optimized';

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Optimiser toutes les images
const images = fs.readdirSync(inputDir).filter(file => 
  file.match(/\.(jpg|jpeg|png)$/i)
);

console.log('🖼️  Optimisation des images...\n');

Promise.all(
  images.map(async (image) => {
    const inputPath = path.join(inputDir, image);
    const outputPath = path.join(outputDir, image);
    
    try {
      await sharp(inputPath)
        .resize(800, 800, { 
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ 
          quality: 75,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      
      console.log(`✅ ${image}`);
      console.log(`   ${(originalSize / 1024).toFixed(0)} KB → ${(optimizedSize / 1024).toFixed(0)} KB (${reduction}% réduit)\n`);
    } catch (error) {
      console.error(`❌ Erreur avec ${image}:`, error.message);
    }
  })
).then(() => {
  console.log('✨ Optimisation terminée!\n');
  console.log('📁 Images optimisées dans: src/assets/optimized/\n');
});
