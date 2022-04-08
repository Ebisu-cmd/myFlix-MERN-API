
const buffer = require('buffer')

const bufs = buffer.Buffer.from([1, 2, 3, 4]);

for (const buf of bufs) {
  console.log(buf);
}