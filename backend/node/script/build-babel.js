const shell = require("shelljs");

shell.echo("copy target files");
shell.exec("mkdir build");
shell.exec("cp -r ./DB ./build/DB");
shell.exec("cp -r ./express ./build/express");
shell.exec("cp -r ./socket_io_server ./build/socket_io_server");
shell.exec("cp -r ./graphQL ./build/graphQL");
shell.exec("cp -r ./libs ./build/libs");
shell.exec("cp -r ./redis ./build/redis");
shell.exec("cp -r ./constants ./build/constants");

const sourceDirectory = "./build";
const outDirectory = "./build";
const ignoreDirectory = "build/express/public";

shell.echo("build babel");
shell.exec(
	`npx babel ${sourceDirectory} --out-dir ${outDirectory} --ignore ${ignoreDirectory} --verbose --source-maps`,
);
