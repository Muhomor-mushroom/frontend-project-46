gendiff:
		node bin/gendiff.js -h

install: deps-install
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

deps-install:
	npm ci --legacy-peer-deps

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

linter-fix:
	npx eslint --fix .

publish:
	npm publish