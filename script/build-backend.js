const shell = require("shelljs");

shell.echo("build backend");
shell.cd("./backend/node");
const code = shell.exec("yarn build").code;
if (code !== 0) {
	shell.exit(code)
}
shell.cd("../..");
