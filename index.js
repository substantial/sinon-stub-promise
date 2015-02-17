

function buildThenable() {
  return {
    then: function(onFulfill, onReject) {
      if (this.resolved) {
        var returned = onFulfill(this.resolveValue);

        // promise returned, return that for next handler in chain
        if (returned && returned.then) {
          return returned;
        }

        // update resolve value for next promise in chain
        if (returned) {
          this.resolveValue = returned;
        }

        return this;
      }

      if (this.rejected && onReject) {
        onReject(this.rejectValue);
        return this;
      }
      return this;
    },

    catch: function(onReject) {
      if (this.rejected) {
        onReject(this.rejectValue);
        return this;
      }
      return this;
    },

    finally: function(callback) {
      if (this.resolved || this.rejected) {
        callback();
      }
    }
  };
}

function setup(sinon) {
  function resolves(value) {
    this.thenable.resolved = true;
    this.thenable.rejected = false;
    this.thenable.resolveValue = value;
    return this;
  }

  function rejects(value) {
    this.thenable.rejected = true;
    this.thenable.resolved = false;
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

