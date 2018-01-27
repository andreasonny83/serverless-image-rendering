.PHONY:
	image
	package
	clean
	clean-docker

image:
	docker build --tag amazonlinux:nodejs .

package: clean image
	docker run --rm --volume ${PWD}/lambda:/build/lambda amazonlinux:nodejs sls package -p lambda

clean:
	rm -rf lambda

clean-docker:
	docker rmi --force amazonlinux:nodejs
