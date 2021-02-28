"use strict";
var zeroes = require("../zeroes.js");
var expect = require("chai").expect;

describe("zeroes", function(){

    it("should create an array of 0s of any size", function(){
        expect(zeroes()).to.deep.equal([]);
        expect(zeroes(0)).to.deep.equal([]);
        expect(zeroes(1)).to.deep.equal([0]);
        expect(zeroes(5)).to.deep.equal([0, 0,0, 0, 0]);
    });

});
