// ==========================================================================
// Project:   SproutCore Handlebar Views
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var get = SC.get, set = SC.set, checkboxView;

module("SC.Checkbox", {
  teardown: function() {
    checkboxView.destroy();
  }
});

SC.Object.prototype.setAndFlush = function(key, value) {
  var args = arguments, self = this;

  SC.run(function() {
    SC.set(self, key, value);
  });
};

test("value property mirrors input value", function() {
  checkboxView = SC.Checkbox.create({});
  checkboxView.append();

  equals(get(checkboxView, 'value'), false, "initially starts with a false value");
  equals(!!checkboxView.$('input').prop('checked'), false, "the initial checked property is false");

  checkboxView.setAndFlush('value', true);

  equals(checkboxView.$('input').prop('checked'), true, "changing the value property changes the DOM");

  checkboxView.remove();
  checkboxView.append();

  equals(checkboxView.$('input').prop('checked'), true, "changing the value property changes the DOM");

  checkboxView.remove();
  set(checkboxView, 'value', false);
  checkboxView.append();

  equals(checkboxView.$('input').prop('checked'), false, "changing the value property changes the DOM");
});

test("value property mirrors input value", function() {
  checkboxView = SC.Checkbox.create({ value: true });
  checkboxView.append();

  equals(get(checkboxView, 'value'), true, "precond - initially starts with a true value");
  equals(!!checkboxView.$('input').prop('checked'), true, "the initial checked property is true");

  checkboxView.setAndFlush('value', false);

  equals(!!checkboxView.$('input').prop('checked'), false, "changing the value property changes the DOM");

  checkboxView.remove();
  checkboxView.append();

  equals(checkboxView.$('input').prop('checked'), false, "changing the value property changes the DOM");

  checkboxView.remove();
  set(checkboxView, 'value', true);
  checkboxView.append();

  equals(checkboxView.$('input').prop('checked'), true, "changing the value property changes the DOM");
});

test("checking the checkbox updates the value", function() {
  checkboxView = SC.Checkbox.create({ value: true });
  checkboxView.append();

  equals(checkboxView.get('value'), true, "precond - initially starts with a true value");
  equals(!!checkboxView.$('input').prop('checked'), true, "precond - the initial checked property is true");

  checkboxView.$('input:checkbox').change();

  equals(checkboxView.$('input').prop('checked'), true, "precond - after clicking a checkbox, the checked property changed");
  equals(checkboxView.get('value'), true, "changing the checkbox causes the view's value to get updated");
})
