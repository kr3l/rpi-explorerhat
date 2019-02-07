const I2C = require('raspi-i2c').I2C;
const ADS1x15 = require('raspi-kit-ads1x15');
const Analog = require('./analog');
const Motor = require('./motor');

class Explorer {
    constructor(options) {
        this.i2c = options.i2c || new I2C();
        this.analog = {
            one: new Analog(ADS1x15.channel.CHANNEL_3, { i2c: this.i2c }),
            two: new Analog(ADS1x15.channel.CHANNEL_2, { i2c: this.i2c }),
            three: new Analog(ADS1x15.channel.CHANNEL_1, { i2c: this.i2c }),
            four: new Analog(ADS1x15.channel.CHANNEL_0, { i2c: this.i2c })
        };
        this.motor = {
            one: new Motor(19, 20),
            two: new Motor(21, 26)
        }
    }
}

module.exports = Explorer;
