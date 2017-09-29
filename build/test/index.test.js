"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var index_1 = require("../index");
describe('main test suite', function () {
    it('should be true', function () {
        chai_1.expect((new index_1.ExampleClass()).returnsTrue()).to.be.true;
    });
});
//# sourceMappingURL=index.test.js.map