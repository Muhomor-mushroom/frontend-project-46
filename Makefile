gendiff:
		node bin/gendiff.js -h

lint:
		npx eslint .
		
linter fix:
		npx eslint --fix .

test:
	npx test -- --coverage --coverageProvider=v8

test:
	npx test