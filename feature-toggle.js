'use strict';

var union = require('mout/array/union'),
  contains = require('mout/array/contains'),
  EventEmitter = require('events').EventEmitter,
  stampit = require('stampit'),

  /**
   * Grab the url parameters and build a map of
   * parameter names and values.
   * @return {Object} params object
   */
  getParams = function getParams() {
    var params = {};
    if ('undefined' !== typeof window && window.location.search) {
      var parts = window.location.search.slice(1).split('&');

      parts.forEach(function (part) {
        var pair = part.split('=');
        pair[0] = decodeURIComponent(pair[0]);
        pair[1] = decodeURIComponent(pair[1]);
        params[pair[0]] = (pair[1] !== 'undefined') ?
          pair[1] : true;
      });
    }
    return params;
  },

  /**
   * Get a list of feature names from the url
   * parameters.
   * @return {Array} Features list
   */
  getParamFeatures = function getParamFeatures() {
    var features = getParams().ft;
    return features ? features.split(',') : undefined;
  },

  /**
   * Get a list of deselected features that need
   * to be turned off. This list will override
   * settings from baseFeatures.
   * @return {Array} Features list
   */
  getInactiveFeatures = function getInactiveFeatures() {
    var features = getParams()['ft-off'];
    return features ? features.split(',') : undefined;
  },

  /**
   * Combine the list of base features with
   * the features passed in via URL parameters.
   * @type {Array} active features
   */
  getActiveFeatures =
      function getActiveFeatures(baseFeatures,
        paramFeatures, inactiveFeatures) {
    var features = union(baseFeatures, paramFeatures);

    inactiveFeatures = inactiveFeatures || [];      

    return features.filter(function (feature) {
      return inactiveFeatures.indexOf(feature) === -1;
    });
  },

  /**
   * Takes an array of features and creates a class for
   * each of them on the body tag.
   * New features should be hidden in CSS by default
   * and revealed only when the feature toggle is set:
   *
   * .new-feature { display: none; }
   * .ft-new-feature .new-feature { display: block; }
   * 
   * @param {Array} features An array of active features.
   */
  setFlags = function setFlags(features) {
    if ('undefined' === typeof document) {
      return;
    }
    var featureClasses = features.map(function (feature) {
        return 'ft-' + feature;
      }).join(' '),
      classNames = document.getElementsByTagName('body')[0]
        .className.split(' ').filter(function (className) {
          return !className.match(/^ft/);
        });
    document.getElementsByTagName('body')[0].className = 
      classNames.join(' ') + ' ' + featureClasses;
  },

  /**
   * Take an optional list of features, set the feature
   * classes on the body tag, and return the feature
   * toggle object.
   * @param {Array} baseFeatures List of base features.
   * @return {Object} feature object
   */
  setFeatures = function setFeatures(baseFeatures) {
    var paramFeatures = getParamFeatures(),
      inactiveFeatures = getInactiveFeatures(),
      activeFeatures = getActiveFeatures(baseFeatures,
        paramFeatures, inactiveFeatures),

      methods = {
        /**
         * Check to see if a feature is active.
         * @param  {String} feature 
         * @return {Boolean}
         */
        active: function active(feature) {
          var testFeature = feature && feature.trim &&
            feature.trim();
          return contains(activeFeatures, testFeature);
        },

        /**
         * Activate a list of features.
         * @emits activated
         * @param  {Array} features 
         * @return {Object} this (for chaining)
         */
        /**
         * activated event.
         *
         * @event activated
         * @type {Array} activated features
         */
        activate: function activate(features) {
          activeFeatures = union(activeFeatures, features);
          setFlags(activeFeatures);
          this.emit('activated', features);
          return this;
        },

        /**
         * Deactivate a list of features.
         * @emits deactivated
         * @param  {Array} features 
         * @return {Object} this (for chaining)
         */
        /**
         * deactivated event.
         *
         * @event deactivated
         * @type {Array} deactivated features
         */        
        deactivate: function deactivate(features) {
          activeFeatures = 
            activeFeatures.filter(function (feature) {
              return !contains(features, feature);
            });
          setFlags(activeFeatures);
          this.emit('deactivated', features);
          return this;
        }
      },

      // Creates the feature toggle object by
      // composing the methods above with an
      // event emitter using the Stampit
      // prototypal inheritance library.
      ft = stampit.compose(
        stampit.convertConstructor(EventEmitter),
        stampit(methods)
      ).create();

    // Kick things off by setting feature classes
    // for the currently active features.
    setFlags(activeFeatures);

    return ft;
  };

module.exports = setFeatures;
