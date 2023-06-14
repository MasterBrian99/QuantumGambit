BINARY_NAME=bukmarq
export GO111MODULE=on

.DEFAULT_GOAL := build

.PHONY: bot-start
bot-start:
	
	@echo "> Starting engine 2 ..."
	@npm run local

.PHONY: init-server
init-server:
	@echo "> Installing the server dependencies ..."
	@go mod tidy -v
	@go get -v ./...

