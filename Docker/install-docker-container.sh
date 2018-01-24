#!/bin/bash

echo building docker container
sudo docker build -t fakedoors .

sudo docker run --name mysql -e MYSQL_ROOT_PASSWORD= -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -d mysql
while [ $(sudo docker inspect --format "{{ json.State.Health.Status }}" mysql != "\"healthy\"" ]; do printf ".";
	sleep 20;
done

sudo docker run -ti --link mysql:mysql -p 3000:3000 --name fakedoors fakedoors

echo finish
