class Analog {
    constructor(channel, options) {
        options = options || {};
        this.channel = channel;

        // set the ADC
        this.adc = options.adc;
    }

    /**
     * Returns the value of the analog input in volts.
     */
    read(callback) {

// Get a single-ended reading from channel-0 and display the results
        this.adc.readChannel(this.channel, (err, value, volts) => {
            // console.log(`read adc#${this.channel} gives value=${value}, volts=${volts}`);
            callback(err, volts, value);
        });
    }
}

module.exports = Analog;
