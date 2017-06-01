import Ember from 'ember';

export default Ember.Controller.extend({
  battery: Ember.inject.service(),

  isTooLow: Ember.computed('battery.level', 'battery.isCharging', function() {
    return !this.get('battery.isCharging') && this.get('battery.level') < 0.2;
  }),

  iconName: Ember.computed('battery.level', function() {
    let level = this.get('battery.level');
    if (level < 0.02) {
      return 'battery-0';
    } else if (level < 0.25) {
      return 'battery-1';
    } else if (level < 0.5) {
      return 'battery-2';
    } else if (level < 0.75) {
      return 'battery-3';
    } else {
      return 'battery-4';
    }
  })
});