import fs from 'fs/promises';
import { Chunk, WPlace } from './lib/WPlace';
import Logger from './lib/logger';
import './lib/pollyfil';

const wPlace = new WPlace(true);


// https://backend.wplace.live/files/s0/tiles/757/1159.png
const start = {
    col: 757,
    row: 1159
} satisfies Chunk;

// https://backend.wplace.live/files/s0/tiles/760/1162.png
const end = {
    col: 760,
    row: 1162
} satisfies Chunk;

(async () => {
    const FILE_NAME = 'output.png';

    const cwd = process.cwd();

    const l = new Logger('Main', 'cyan');
    l.start('Starting download...');
    const chunks = await wPlace.fetchChunksInRange(start, end);
    const image = await wPlace.constructImage(chunks);
    await fs.writeFile(FILE_NAME, await image.toBuffer());
    l.stop(`Download complete! ${cwd}/${FILE_NAME}`);
})();
