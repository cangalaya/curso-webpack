const fs = require('fs');        // trabajamos con un modulo de node js para manipular archivos en el so

fs.writeFileSync('./.env', `API=${process.env.API}\n`);