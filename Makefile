gendiff:
		node bin/gendiff.js -h

lint:
		npx eslint .
		
linter fix:
		npx eslint --fix .

test:
	npm test -- --coverage --coverageProvider=v8

test:
	npm test