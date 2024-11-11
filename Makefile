gendiff:
		node bin/gendiff.js -h

lint:
		npx eslint .
		
linter fix:
		npx eslint --fix .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npm test

install: install: deps-install
	npx simple-git-hooks