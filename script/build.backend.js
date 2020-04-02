const shell = require("shelljs");

shell.echo("build backend");
shell.cd("./backend");
shell.exec("yarn build");
shell.cd("..");
