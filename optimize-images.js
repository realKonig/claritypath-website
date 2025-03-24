const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './assets/images';
const outputDir = './assets/images/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Process all images in the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
            return;
        }

        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

        // Optimize and convert to WebP
        sharp(inputPath)
            .webp({ quality: 80 })
            .resize(1920, null, { // Max width 1920px, maintain aspect ratio
                withoutEnlargement: true,
                fit: 'inside'
            })
            .toFile(outputPath)
            .then(info => {
                console.log(`Optimized: ${file} -> ${path.basename(outputPath)}`);
                console.log(`Size reduction: ${Math.round((1 - info.size / fs.statSync(inputPath).size) * 100)}%`);
            })
            .catch(err => {
                console.error(`Error processing ${file}:`, err);
            });

        // Create thumbnail version
        const thumbPath = path.join(outputDir, `${path.parse(file).name}-thumb.webp`);
        sharp(inputPath)
            .webp({ quality: 80 })
            .resize(400, null, { // Thumbnail width 400px
                withoutEnlargement: true,
                fit: 'inside'
            })
            .toFile(thumbPath)
            .then(info => {
                console.log(`Created thumbnail: ${path.basename(thumbPath)}`);
            })
            .catch(err => {
                console.error(`Error creating thumbnail for ${file}:`, err);
            });
    });
}); 