cross-env NODE_ENV=development npx sequelize-cli db:migrate:undo:all
cross-env NODE_ENV=development npx sequelize-cli db:migrate
cross-env NODE_ENV=development npx sequelize-cli db:seed:all
