const shell = require("shelljs");

shell.echo("cp .env.example -> .env");
shell.exec("cp .env.example .env");

shell.echo("start test");
const code = shell.exec("yarn test").code;

if (code !== 0) {
	shell.exit(code);
}
