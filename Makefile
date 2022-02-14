DOCKER_COMPOSE = docker-compose
EXEC_NPM = $(DOCKER_COMPOSE) exec -T node npm
CURRENT_PROJECT_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

## Protect targets
.PHONY: help start stop down build up

help:
	 @grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[33m %s\n\033[0m", $$1, $$2}'

install: build up npm-install

reset: down install

container-stop: ## Stop all docker's container
	@echo -e "\e[32mStopping docker container\e[m"
	$(DOCKER_COMPOSE) stop

container-down: ## Remove all docker's container
	@echo -e "\e[32mRemoving docker container\e[0m"
	$(DOCKER_COMPOSE) down

container-remove: ## Removes stopped service containers
	@echo -e "\e[32mRemoving docker container(s)\e[0m"
	$(DOCKER_COMPOSE) rm

build: ## Build all dockers images in local ways
	@echo -e "\e[32mBuilding local images...\e[0m"
	@$(DOCKER_COMPOSE) build

up: ## Builds, (re)creates, starts, and attaches to containers for a service
	@echo -e "\e[32mUp environment...\e[0m"
	test -d $(CURRENT_PROJECT_DIR)node_modules || mkdir $(CURRENT_PROJECT_DIR)node_modules
	@$(DOCKER_COMPOSE) up -d --remove-orphans

down: ## Stops containers and removes containers, networks, volumes, and images created by up.
	@echo -e "\e[32mDown environment...\e[0m"
	@$(DOCKER_COMPOSE) kill
	@$(DOCKER_COMPOSE) down --remove-orphans

start: ## Starts existing containers for a service.
	@echo -e "\e[32mStart containers...\e[0m"
	@$(DOCKER_COMPOSE) unpause || true
	@$(DOCKER_COMPOSE) start || true

stop: ## Stops running containers without removing them.
	@echo -e "\e[32mStop containers...\e[0m"
	@$(DOCKER_COMPOSE) pause || true

npm-install: ## Command reads the composer.json file to resolves the dependencies, and installs them.
	@echo -e "\e[32mInstall dependencies...\e[0m"
	$(EXEC_NPM) install
