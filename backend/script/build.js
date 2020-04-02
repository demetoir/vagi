const shell = require("shelljs");

shell.echo("install package");
shell.exec("yarn install");

shell.echo("clean build");
shell.exec("yarn build:clean");

shell.echo("babel compile");
shell.exec("yarn build:babel");

shell.echo("inject env");
shell.exec("yarn build:inject-env");

