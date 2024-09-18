import fs from 'fs';

class Reader {
    constructor() {
        return this.read();
    }

    read() {
        return fs.readFileSync('./DefaultInstructions.txt', 'utf8');
    }
}

export default Reader