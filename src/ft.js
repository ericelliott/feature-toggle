var EventEmitter = require('events').EventEmitter;
var union = require('lodash.union');
var inherits = require('util').inherits;

/**
 * Take an optional list of features, set the feature
 * classes on the body tag, and return the feature
 * toggle object.
 * @param {Array} baseFeatures List of base features.
 * @return {Object} feature object
 */
var FT = module.exports = function(baseFeatures){
  if(!(this instanceof FT)) return new FT(baseFeatures);
  EventEmitter.call(this);
  this.activeFeatures = Array.isArray(baseFeatures) ? baseFeatures : [];
  this.inactiveFeatures = [];
};

inherits(FT, EventEmitter);

/**
 * Check to see if a feature is active.
 * @param  {String} feature
 * @return {Boolean}
 */
FT.prototype.active = function(feature){
  return this.activeFeatures.indexOf(feature) >= 0;
};

/**
 * Activate a list of features.
 * @emits activated
 * @param  {Array} features
 * @return {Object} this (for chaining)
 */
FT.prototype.activate = function(features){
  features = Array.isArray(features) ? features : [features];
  this.activeFeatures = union(this.activeFeatures, features);
  this.emit('activated', features);
  return this;
};

/**
 * Deactivate a list of features.
 * @emits deactivated
 * @param  {Array} features
 * @return {Object} this (for chaining)
 */
FT.prototype.deactivate = function(features){
  features = Array.isArray(features) ? features : [features];

  var diff = this.activeFeatures.filter(function(feature){
    return features.indexOf(feature) >= 0;
  });

  this.activeFeatures = this.activeFeatures.filter(function(feature){
    return features.indexOf(feature) < 0;
  });

  this.emit('deactivated', diff);
  return this;
};