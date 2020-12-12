import Service from '@ember/service';

import { tracked } from '@glimmer/tracking';

export default class BatteryService extends Service {
  #battery = null;

  isSupported = Boolean(navigator && navigator.getBattery);

  @tracked isCharging = null;
  @tracked level = null;
  @tracked chargingTime = null;
  @tracked dischargingTime = null;

  get levelPercentage() {
    return this.level * 100;
  }

  constructor() {
    super(...arguments);
    if (this.isSupported) {
      this.initBattery();
    }
  }

  async initBattery() {
    let battery = await navigator.getBattery();
    this.#battery = battery;
    this.isCharging = battery.charging;
    this.level = battery.level;
    this.chargingTime = battery.chargingTime;
    this.dischargingTime = battery.dischargingTime;
    this.addListeners();
  }

  addListeners() {
    this._onChargingChange = () => {
      this.isCharging = this.#battery.charging;
    };

    this._onLevelChange = () => {
      this.level = this.#battery.level;
    };

    this._onChargingTimeChange = () => {
      this.chargingTime = this.#battery.chargingTime;
    };

    this._onDischargingTimeChange = () => {
      this.dischargingTime = this.#battery.dischargingTime;
    };

    this.#battery.addEventListener('chargingchange', this._onChargingChange);
    this.#battery.addEventListener('levelchange', this._onLevelChange);
    this.#battery.addEventListener('chargingtimechange', this._onChargingTimeChange);
    this.#battery.addEventListener('dischargingtimechange', this._onDischargingTimeChange);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.removeListeners();
  }

  removeListeners() {
    if (this.#battery) {
      this.#battery.removeEventListener('chargingchange', this._onChargingChange);
      this.#battery.removeEventListener('levelchange', this._onLevelChange);
      this.#battery.removeEventListener('chargingtimechange', this._onChargingTimeChange);
      this.#battery.removeEventListener('dischargingtimechange', this._onDischargingTimeChange);
    }
  }
}
