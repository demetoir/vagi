const shell = require("shelljs");

shell.echo("build frontend");
shell.cd("./frontend");

shell.echo("build main-app");
shell.cd("./main-app");
shell.exec("yarn install");
shell.exec("yarn build");
shell.cd("..");

shell.echo("build main-app");
shell.cd("./main-app");
shell.exec("yarn install");
shell.exec("yarn build");
shell.cd("..");

shell.echo("build guest-app");
shell.cd("./guest-app");
shell.exec("yarn install");
shell.exec("yarn build");
shell.cd("..");

shell.echo("build host-app");
shell.cd("./host-app");
shell.exec("yarn install");
shell.exec("yarn build");
shell.cd("..");

shell.cd("..");
