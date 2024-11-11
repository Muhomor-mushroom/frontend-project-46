gendiff:
		node bin/gendiff.js -h

lint:
		npx eslint .
		
linter fix:
		npx eslint --fix .

coverage:
		npm test -- --coverage --coverageProvider=v8

test:
		npm test

install: deps-install
		npx simple-git-hooks