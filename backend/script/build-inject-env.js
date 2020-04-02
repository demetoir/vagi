const shell = require("shelljs");

shell.echo("copy .env");
const code = shell.exec("cp .env ./build/.env");

if (code !== 0) {
	shell.echo("build fail while execute 'copy .env'");
	shell.exit(code);
}
