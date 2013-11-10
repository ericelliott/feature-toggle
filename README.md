feature-toggle
==============

A painless feature toggle system in JavaScript. Decouple development and deployment.

## Install

```
$ npm install --save feature-toggle
```


## In the browser

Using browserify:


```js
var setFeatures = require('feature-toggle');

// This will set the list of currently active
// features, and add the feature classes to the
// body element. It will take url parameters 
// into account:
var feature = setFeatures(['feature1', 'feature2']);

// Query for an active feature:
if ( feature.active('search') ) {
  // load the search code
}
```

Also supports AMD and standalone. Just load the UMD module in the `./dist` folder.

## What is a feature toggle?

***Continuous deployment*** is the process of testing, integrating, and deploying software in rapid cycles in order to deliver bug fixes and new features to customers as quickly as possible. It gained popular acceptance as a cornerstone of extreme programming and agile development. It is very popular among Software as a Service providers.

A ***feature toggle*** system allows you to integrate features into your codebase even before they're finished and ready to release. During development, the features are toggled off by default. In order to turn them on, you must enable them manually. Using this method, you can deploy unfinished or untested changes into your production system without interfering with the user experience.

Feature toggles can allow software integration cycles that run in weeks, days, or even hours, as opposed to months or years. They are an essential component in a broader continuous integration system.


### setFeatures(features):Object

Take an optional list of features, set the feature classes on the body tag, and return the feature toggle object.

* @param {Array} baseFeatures List of base features.
* @return {Object} feature object

The feature-toggle-client module returns a single function, `setFeatures()`, which determines the active features on the page.

It does so by combining:

* Features passed into `setFeatures()`
* Features passed as query parameters `?ft=feature1,feature2,feature3`

```js
var feature = setFeatures(['feature1', 'feature2']);

feature.active('feature1'); // true
```

### .active(feature):Boolean

Check to see if a feature is active.

* @param  {String} feature 
* @return {Boolean}

### .activate(features):Object (this)

Activate a list of features.

* @emits activated
* @param  {Array} features 
* @return {Object} this (for chaining)

activated event.

* @event activated
* @type {Array} activated features

### .deactivate(features):Object (this)

Deactivate a list of features.
* @emits deactivated
* @param  {Array} features 
* @return {Object} this (for chaining)

deactivated event.

* @event deactivated
* @type {Array} deactivated features


## Credit

Eric Elliott for ["Programming JavaScript Applications"](http://ericleads.com/javascript-applications/) (O'Reilly)
