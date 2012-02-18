// ==========================================================================
// Project:   Ember - JavaScript Application Framework
// Copyright: ©2006-2011 Apple Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var set = Ember.set, get = Ember.get;

module("Ember.View#element");

test("returns null if the view has no element and no parent view", function() {
  var view = Ember.View.create() ;
  equal(get(view, 'parentView'), null, 'precond - has no parentView');
  equal(get(view, 'element'), null, 'has no element');
});

test("returns null if the view has no element and parent view has no element", function() {
  var parent = Ember.ContainerView.create({
    childViews: [ Ember.View.extend() ]
  });
  var view = get(parent, 'childViews').objectAt(0);

  equal(get(view, 'parentView'), parent, 'precond - has parent view');
  equal(get(parent, 'element'), null, 'parentView has no element');
  equal(get(view, 'element'), null, ' has no element');
});

test("returns element if you set the value", function() {
  var view = Ember.View.create();
  equal(get(view, 'element'), null, 'precond- has no element');

  var dom = document.createElement('div');
  set(view, 'element', dom);

  equal(get(view, 'element'), dom, 'now has set element');
});

var parent, child, parentDom, childDom ;

module("Ember.View#element - autodiscovery", {
  setup: function() {

    parent = Ember.ContainerView.create({
      childViews: [ Ember.View.extend({
        elementId: 'child-view'
      }) ]
    });

    child = get(parent, 'childViews').objectAt(0);

    // setup parent/child dom
    parentDom = Ember.$("<div><div id='child-view'></div></div>")[0];

    // set parent element...
    set(parent, 'element', parentDom);
  },

  teardown: function() {
    parent = child = parentDom = childDom = null ;
  }
});

test("discovers element if has no element but parent view does have element", function() {
  equal(get(parent, 'element'), parentDom, 'precond - parent has element');
  ok(parentDom.firstChild, 'precond - parentDom has first child');

  equal(child.$().attr('id'), 'child-view', 'view discovered child');
});

