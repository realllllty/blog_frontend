docker run -d \
  --name=admin \
  -e MYSQL_ROOT_PASSWORD=admin \
  -p 3306:3306 \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0