# ember-battery

This README outlines the details of collaborating on this Ember addon.

## Properties

* isCharging - A Boolean value indicating whether or not the battery is currently being charged.
* level - A number representing the system's battery charge level scaled to a value between 0.0 and 1.0.
* chargingTime - A number representing the remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged.
* dischargingTime - A number representing the remaining time in seconds until the battery is completely discharged and the system will suspend.
* levelPercentage - A number representing the system's battery charge level scaled to a value between 0 % and 100 %

## Installation

* ember install ember-battery

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
