const { Gpio } = require('pigpio');

class Motor {
    constructor(pin1, pin2) {
        this.pin1 = new Gpio(pin1, { mode: Gpio.OUTPUT });
        this.pin2 = new Gpio(pin2, { mode: Gpio.OUTPUT });
        this.reverse = false;
        this._speed = 0;
    }

    /**
     * Reverses the direction of forwards for this motor
     */
    invert() {
        this.reverse = !this.reverse;
        this._applySpeed();
    }

    _applySpeed() {
        // rescale -100..100 to -255..255
        let speed = Math.min(255, Math.max(-255, Math.round(this._speed * 255 / 100)));
        if (this.reverse) {
            speed = -speed;
        }
        if (speed > 0) {
            this.pin2.pwmWrite(speed);
            this.pin1.digitalWrite(0);
        } else if (speed < 0) {
            this.pin2.digitalWrite(0);
            this.pin1.pwmWrite(-speed);
        } else {
            this.pin2.digitalWrite(0);
            this.pin1.digitalWrite(0);
        }
    }

    /**
     * Turns the motor "forwards" at speed ( default 100% )
     *
     * @param speed
     */
    forwards(speed) {
        if (speed === undefined) {
            this._speed = 100;
        } else {
            if (speed < 0 || speed > 100) {
                throw "Speed must be between 0 and 100"
            }
            this._speed = speed;
        }
        this._applySpeed();
    }

    /**
     * Turns the motor "backwards" at speed ( default 100% )
     * @param speed
     */
    backwards(speed) {
        if (speed === undefined) {
            this._speed = -100;
        } else {
            if (speed < 0 || speed > 100) {
                throw "Speed must be between 0 and 100"
            }
            this._speed = -speed;
        }
        this._applySpeed();
    }

    /**
     * Moves the motor at speed, from full backwards to full forwards
     * @param theSpeed
     */
    speed(theSpeed) {
        if (theSpeed < -100 || theSpeed > 100) {
            throw "Speed must be between -100 and 100"
        }
        this._speed = theSpeed;
        this._applySpeed();
    }

    /**
     * Stops the motor by setting its speed to 0
     */
    stop() {
        this._speed = 0;
        this._applySpeed();
    }
}

module.exports = Motor;
