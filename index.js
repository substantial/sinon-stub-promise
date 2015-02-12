

function buildThenable() {
  return {
    _reject: function(onReject) {
      var rejectedValue = onReject(this.rejectValue);

      // update reject value for next promise in chain
      if (rejectedValue) {
        this.rejectValue = rejectedValue;
      }
    },

    then: function(onFulfill, onReject) {
      if (this.resolved) {
        var resolvedValue = onFulfill(this.resolveValue);

        // promise returned, return that for next handler in chain
        if (resolvedValue && resolvedValue.then) {
          return resolvedValue;
        }

        // update resolve value for next promise in chain
        if (resolvedValue) {
          this.resolveValue = resolvedValue;
        }
      }

      if (this.rejected && onReject) {
        this._reject(onReject);
      }

      return this;
    },

    catch: function(onReject) {
      if (this.rejected && onReject) {
        this._reject(onReject);
      }

      return this;
    },

    finally: function() {
    }
  };
}

function setup(sinon) {
  function resolves(value) {
    this.thenable.resolved = true;
    this.thenable.resolveValue = value;
    return this;
  }

  function rejects(value) {
    this.thenable.rejected = true;
    this.thenable.rejectValue = value;
    return this;
  }

  sinon.stub.returnsPromise = function() {
    this.resolves = resolves;
    this.rejects = rejects;

    var thenable = buildThenable();
    this.thenable = thenable;
    this.returns(thenable);

    return this;
  };
}

if (module && module.exports) {
  module.exports = setup;
} else if (window.sinon) {
  setup(window.sinon);
}

