// Same as Object.create but enables super calls
// If function property is found in both objects, and child function arguments
// list starts with '_super' argument, then it will be extended such as child
// method will receive descendand.call method as first argument.

'use strict';

var create     = Object.create
  , copy       = require('../plain/clone').call
  , map        = require('../plain/map').call
  , currySuper = require('./_curry_super')

  , prepare;

prepare = function (desc, name) {
	desc = copy(desc);
	desc.value = currySuper(this[name], desc.value, this);
	return desc;
};

module.exports = function (descriptors) {
	return create(this, map(descriptors || {}, prepare, this));
};