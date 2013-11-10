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
// body element. It will take parameters and
// the activeFeatures cookie into account:
var feature = setFeatures(['feature1', 'feature2']);

// Query for an active feature:
if ( feature.active('search') ) {
  // load the search code
}
```

### setFeatures(features):Object

Take an optional list of features, set the feature classes on the body tag, and return the feature toggle object.

* @param {Array} baseFeatures List of base features.


The feature-toggle-client module returns a single function, `setFeatures()`, which determines the active features on the page.

It does so by combining:

* Features passed into `setFeatures()`
* Features passed as query parameters `?ft=feature1,feature2,feature3`

```js
var feature = setFeatures(['feature1', 'feature2']);

feature.active('feature1'); // true
```