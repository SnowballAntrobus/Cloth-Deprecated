# Development: Everyhting runs in containers
build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

# Local: Runs on Caddy web server with Atlas DB
build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up --remove-orphans

# Production: Same as local but without hot reload. Ready for digital ocaean!
build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up -d --remove-orphans

stop:
	docker-compose down

# Remote

SSH_STRING:=root@45.55.62.139

ssh:
	ssh $(SSH_STRING)


# apt install make

copy-files:
	cd client && rm -rf node_modules
	cd server && rm -rf node_modules
	scp -r ./* $(SSH_STRING):/root/

# when you add firewall rule, have to add SSH on port 22 or it will stop working

# run challenge with cloudflare on flexible, then bump to full