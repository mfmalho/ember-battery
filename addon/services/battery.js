import Ember from 'ember';

export default Ember.Service.extend({
  isCharging: null,
  level: null,
  chargingTime: null,
  dischargingTime: null,
  levelPercentage: Ember.computed('level', function() {
    return this.get('level') * 100;
  }),

  init() {
    this._super(...arguments);
    if (navigator && navigator.getBattery) {
      this.set('isSupported', true);
      navigator.getBattery().then((battery) => {
        this._battery = battery;
        this.set('isCharging', battery.charging);
        this.set('level', battery.level);
        this.set('chargingTime', battery.chargingTime);
        this.set('dischargingTime', battery.dischargingTime);
        this.addListeners();
      });
    } else {
      this.set('isSupported', false);
    }
  },

  addListeners() {
    this.onChargingChange = () => {
      this.set('isCharging', this._battery.charging);
    };

    this.onLevelChange = () => {
      this.set('level', this._battery.level);
    };

    this.onChargingTimeChange = () => {
      this.set('chargingTime', this._battery.chargingTime);
    };

    this.onDischargingTimeChange = () => {
      this.set('dischargingTime', this._battery.dischargingTime);
    };

    this._battery.addEventListener('chargingchange', this.onChargingChange);
    this._battery.addEventListener('levelchange', this.onLevelChange);
    this._battery.addEventListener('chargingtimechange', this.onChargingTimeChange);
    this._battery.addEventListener('dischargingtimechange', this.onDischargingTimeChange);
  },

  onDischargingTimeChange() {
     this.set('dischargingTime', this._battery.dischargingTime);
  },

  willDestroy() {
    this._super(...arguments);
    this.removeListeners();
  },

  removeListeners() {
    let battery = this.get('_battery');
    if (battery) {
      battery.removeEventListener('chargingchange', this.onChargingChange);
      battery.removeEventListener('levelchange', this.onLevelChange);
      battery.removeEventListener('chargingtimechange', this.onChargingTimeChange);
      battery.removeEventListener('dischargingtimechange', this.onDischargingTimeChange);
    }
  }
});
