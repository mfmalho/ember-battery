🔋 ember-battery [![Ember Observer Score](https://emberobserver.com/badges/ember-battery.svg)](https://emberobserver.com/addons/ember-battery)
==============================================================================

Battery status API packaged as a Service

## Usage

Inject the `battery` service in your classes and access its api:

```js
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
```

Or use them directly in the templates:

```hbs
{{#if this.battery.isSupported}}
  <p>{{this.battery.levelPercentage}}%  {{fa-icon this.iconName}}</p>

  {{#if this.battery.isCharging}}
    <p>Your battery is charging!</p>
  {{/if}}

  {{#if this.isTooLow}}
    <p>Your battery is too low!</p>
  {{/if}}

  <p>Discharging Time: {{this.battery.dischargingTime}}</p>
  <p>Charging Time: {{this.battery.chargingTime}}</p>
{{else}}
  <p>Your browser does not support battery status API.</p>
{{/if}}

```

Because the properties are `@tracked`, the templates and getters will update accordingly when the properties change.

## API

The battery service has the following properties:

* `isSupported` - A Boolean value indicating whether or not the [supports the battery status API](https://caniuse.com/battery-status).
* `isCharging` - A Boolean value indicating whether or not the battery is currently being charged.
* `level` - A number representing the system's battery charge level scaled to a value between 0.0 and 1.0.
* `chargingTime` - A number representing the remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged.
* `dischargingTime` - A number representing the remaining time in seconds until the battery is completely discharged and the system will suspend.
* `levelPercentage` - A number representing the system's battery charge level scaled to a value between 0 % and 100 %


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-battery
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
