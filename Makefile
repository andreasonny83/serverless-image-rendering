.PHONY: build \
	interactive \
	install

build:
	docker build -t lambdaci .

interactive:
	docker run --rm -it -v ${PWD}:/var/task --entrypoint bash lambdaci

install:
	docker run --rm -v ${PWD}:/var/task lambdaci npm install
