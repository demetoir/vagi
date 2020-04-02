const shell = require("shelljs");

// build backend
require("./build-backend.js");

// build frontend
require("./build-frontend.js");

// build dump public files
shell.exec("sh ./script/build_dump_public_files.sh");

