# Explorer pHAT nodejs library #

This package aims to create a similar interface to the [official Python library](https://github.com/pimoroni/explorer-hat/blob/master/documentation/Function-reference.md).

## Usage

```js
const I2C = require('raspi-i2c').I2C;
const Explorer = require('rpi-explorerhat');

const explorer = new Explorer({
    i2c: new I2C()
});

explorer.motor.one.speed(100);
explorer.motor.two.speed(100);

explorer.analog.one.read((err, volts, value) => {
    // do something
});
```
