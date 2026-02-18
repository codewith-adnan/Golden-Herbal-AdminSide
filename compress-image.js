import { Jimp } from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(__dirname, 'src/assets/hero.png');
const outputPath = path.resolve(__dirname, 'src/assets/hero-optimized.jpg');

console.log(`Starting compression of ${inputPath}...`);

async function compress() {
    try {
        const image = await Jimp.read(inputPath);
        console.log('Image read successfully. Resizing...');
        await image
            .resize({ w: 1920 }) // resize to 1920px width
            .quality(80) // set quality
            .write(outputPath); // save
        console.log(`Success! Compressed image saved to ${outputPath}`);
    } catch (err) {
        console.error('Error during compression:', err);
        if (err.message) console.error(err.message);
        if (err.stack) console.error(err.stack);
    }
}

compress();
