const I2C = require('raspi-i2c').I2C;
const ADS1x15 = require('raspi-kit-ads1x15');
const Analog = require('./analog');
const Motor = require('./motor');

class Explorer {
    constructor(theOptions) {
        const options = theOptions || {};
        this.i2c = options.i2c || new I2C();

        // Init the ADC
        this.adc = new ADS1x15({
            i2c: this.i2c,                          // i2c interface
            chip: ADS1x15.chips.IC_ADS1015,         // chip model
            address: ADS1x15.address.ADDRESS_0x48,  // i2c address on the bus

            // Defaults for future readings
            pga: ADS1x15.pga.PGA_6_144V,            // power-gain-amplifier range
            sps: ADS1x15.spsADS1015.SPS_1600        // data rate (samples per second)
        });

        this.analog = {
            one: new Analog(ADS1x15.channel.CHANNEL_3, { i2c: this.i2c, adc: this.adc }),
            two: new Analog(ADS1x15.channel.CHANNEL_2, { i2c: this.i2c, adc: this.adc }),
            three: new Analog(ADS1x15.channel.CHANNEL_1, { i2c: this.i2c, adc: this.adc }),
            four: new Analog(ADS1x15.channel.CHANNEL_0, { i2c: this.i2c, adc: this.adc })
        };
        this.motor = {
            one: new Motor(19, 20),
            two: new Motor(21, 26)
        }
    }
}

module.exports = Explorer;
