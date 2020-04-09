socketIO_server="cd ./backend/node & yarn start:socket"
express_server="cd ./backend/node & yarn start:express"
DB_server="cd ./backend/node & yarn start:DB"
yoga_server="cd ./backend/node & yarn start:yoga"

concurrently "$socketIO_server" "$express_server" "$DB_server" "$yoga_server"
