const I2C = require('raspi-i2c').I2C;
const ADS1x15 = require('raspi-kit-ads1x15');

class Analog {
    constructor(channel, options) {
        options = options || {};
        this.channel = channel;


        // Init Raspi-I2c
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
    }

    /**
     * Returns the value of the analog input in volts.
     */
    read(callback) {

// Get a single-ended reading from channel-0 and display the results
        this.adc.readChannel(this.channel, (err, value, volts) => {
            callback(err, volts, value);
        });
    }
}

module.exports = Analog;
