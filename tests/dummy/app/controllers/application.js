import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @service battery;

  get isTooLow() {
    return !this.battery.isCharging && this.battery.level < 0.2;
  }

  get iconName() {
    let level = this.battery.level;
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
  }
}
