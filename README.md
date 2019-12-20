# hackaton-inscription-ipssi

Exemple d'implémentation d'un formulaire d'inscription à un hackathon.

## Installation

```bash
git clone https://github.com/alexlouf/docker_eemi_e45.git
```

You need to create a mysql folder to bind files with mariadb container

```bash
cd *installation_folder*
mkdir mysql
```

## Usage

### Start project

```bash
docker-compose up
```

Open a browser and go to [localhost:8080](http://localhost:8080/)

### Update database

If you want to add some tables or columns you have to restart your database installation
To do that follow the commands : 

```bash
sudo rm -rf mysql/
mkdir mysql/
docker-compose up
```