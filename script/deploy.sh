echo "build all"
yarn build

cd ./backend/node

echo "build docker image"
yarn docker:build:force

echo "clean docker volume"
yarn docker:volumes:remove

echo "start deply"
yarn deploy

echo "DB migration"
yarn migration:production
