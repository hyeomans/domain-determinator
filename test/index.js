'use strict';

var chai                = require('chai'),
    expect              = chai.expect,
    chaiAsPromised      = require('chai-as-promised'),
    chaiString          = require('chai-string'),
    domainDeterminator  = require(process.cwd() + '/src/')('/test/domains/');

chai.use(chaiAsPromised);
chai.use(chaiString);

describe('Domain determinator tests', function() {
    it('should be fullfilled', function() {
        var host = 'www.example.com';
        var result = domainDeterminator.settingsPerHostname(host);
        return expect(result).to.eventually.be.fullfilled;
    });

    it('should retrieve correct settings', function() {
        var host = 'www.example.com';
        var result = domainDeterminator.settingsPerHostname(host);
        expect(result).to.eventually.have.property('domainId', 1);
        return expect(result).to.eventually.have.property('regexp', '^(\\w+\\.){0,1}example\\.com$');
    });
});