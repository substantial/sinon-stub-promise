var sinon = require('sinon');
var sinonStubPromise = require('../index');
var expect = require('chai').expect;

sinonStubPromise(sinon);

describe('stubPromise', function() {
  var f, promise, resolveValue, rejectValue;
  beforeEach(function() {
    f = function() {};
    resolveValue = null;
    rejectValue = null;
    promise = sinon.stubPromise();
  });

  it('works without requiring explicit resolve or reject', function(done) {
    promise().then(function() {});
    done();
  });

  it('can resolve', function() {
    promise.resolves('resolve value');

    promise().then(function(arg) {
      resolveValue = arg;
    });

    expect(resolveValue).to.equal('resolve value');
  });

  it('can resolve empty value', function() {
    promise.resolves();

    var resolved = false;
    promise().then(function() {
      resolved = true;
    });

    expect(resolved).to.be.true;
  });

  it('does not resolve without explicitly being resolved', function() {
    var resolved = false;

    promise().then(function() {
      resolved = true;
    });

    expect(resolved).to.be.false;
  });

  it('returns stub from resolves call', function(done) {
    var stub = promise.resolves();
    stub();
    done();
  });

  it('handles resolves when no explicit resolve handler is setup', function(done) {
    promise.resolves();
    promise().catch(f);
    done();
  });

  it('can reject via catch', function() {
    promise.rejects('reject value');

    promise().catch(function(arg) {
      rejectValue = arg;
    });

    expect(rejectValue).to.equal('reject value');
  });

  it('can reject via reject function ', function() {
    promise.rejects('reject value');

    promise().then(function() {}, function(arg) {
      rejectValue = arg;
    });

    expect(rejectValue).to.equal('reject value');
  });

  it('can reject empty value', function() {
    promise.rejects();

    var rejected = false;
    promise().catch(function() {
      rejected = true;
    });

    expect(rejected).to.be.true;
  });

  it('does not reject without explicitly being rejected', function() {
    var rejected = false;

    promise().catch(function() {
      rejected = true;
    });

    expect(rejected).to.be.false;
  });

  it('returns stub from rejects call', function(done) {
    var stub = promise.rejects();
    stub();
    done();
  });

  it('handles rejects when no explicit reject handler is setup', function(done) {
    promise.rejects();
    promise().then(f);
    done();
  });

  describe('chaining', function() {
    it('supports then chaining', function(done) {
      promise().then(f).then(f);
      done();
    });

    it('supports then chaining when resolving', function(done) {
      promise.resolves('foo');
      promise().then(f).then(f);
      done();
    });

    it('supports chaining catch after then', function(done) {
      promise().then(f).catch(f);
      done();
    });

    it('supports chaining then, catch, then', function(done) {
      promise().then(f).catch(f).then(f);
      done();
    });

  });
});
