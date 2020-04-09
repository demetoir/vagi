var shell = require("shelljs");

shell.echo("install backend");
shell.cd("./backend/node");
shell.exec("yarn install");
shell.cd("../node");
