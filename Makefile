COVERALLS_EXEC = ./node_modules/coveralls/bin/coveralls.js

coveralls:
	@echo "\n---| Test Coverage to Coveralls |---"
	istanbul cover nodeunit
	cat ./coverage/lcov.info | $(COVERALLS_EXEC)
