
import React from 'react'

import { randomIntFromInterval } from './NumberHelper';
import AccelerometerManager from '../hardware/AccelerometerManager';
import { Animated } from 'react-native';
import { getRequiredImage } from '../dice/dieImages/DieImageGetter';
import EStyleSheet from 'react-native-extended-stylesheet';

export class ShakeDie {
    dieImageID : number;
    maxX : number;
    maxY : number;

    xPosition : number;
    yPosition : number;
    xVelocity : number;
    yVelocity : number;
    rotation : number;
    rotationVelocity : number;

    collisionVelocity : number;

    key : string;

    constructor(imageID : number, maxX : number, maxY: number) {
        this.dieImageID = imageID;
        this.maxX = maxX - styles.DisplayDice.width;
        this.maxY = maxY - styles.DisplayDice.height;

        this.xPosition = randomIntFromInterval(0, maxX);
        this.yPosition = randomIntFromInterval(0, maxY);
        this.xVelocity = randomIntFromInterval(-50, 50);
        this.yVelocity = randomIntFromInterval(-50, 50);
        this.rotation = randomIntFromInterval(0, 360);
        this.rotationVelocity = randomIntFromInterval(0, 30);

        this.collisionVelocity = 0;
    }

    getCollisionVelocity() : number {
        return this.collisionVelocity;
    }

    updatePosition(speedKillMod : number) {

        this.collisionVelocity = 0;

        let hitXBound = false;
        this.xPosition += this.xVelocity * speedKillMod;
        if(this.xPosition < 0) {
            this.xPosition = 0;
            hitXBound = true;
        } else if (this.xPosition > this.maxX) {
            this.xPosition = this.maxX;
            hitXBound = true;
        }

        if(hitXBound) {
            this.collisionVelocity = Math.abs(this.xVelocity);
            this.xVelocity *= -0.95;
            this.xVelocity += Math.random() - 0.5;
        }

        let hitYBound = false;
        this.yPosition += this.yVelocity * speedKillMod;
        if(this.yPosition < 0) {
            this.yPosition = 0;
            hitYBound = true;
        } else if (this.yPosition > this.maxY) {
            this.yPosition = this.maxY;
            hitYBound = true;
        }

        if(hitYBound) {
            this.collisionVelocity = Math.abs(this.yVelocity);
            this.yVelocity *= -0.95;
            this.yVelocity += Math.random() - 0.5;
        }

        if(hitXBound || hitYBound) {
            this.rotationVelocity += randomIntFromInterval(-5, 5);
        }

        if(this.maxX < this.maxY) {
            // Portrait
            this.xVelocity -= AccelerometerManager.getInstance().xAccel;
            this.yVelocity += AccelerometerManager.getInstance().yAccel;
        } else {
            // Landscape
            this.xVelocity -= AccelerometerManager.getInstance().yAccel;
            this.yVelocity -= AccelerometerManager.getInstance().xAccel;
        }

        this.rotation += this.rotationVelocity * speedKillMod;
    }
}

export function renderShakeDie(shakeDie: ShakeDie) {
    return(
        <Animated.Image key={shakeDie.key} source={getRequiredImage(shakeDie.dieImageID)} style={[{transform:[
            { translateX: shakeDie.xPosition },
            { translateY: shakeDie.yPosition },
            { rotate: shakeDie.rotation.toString() + 'deg' },
        ]}, styles.DisplayDice]}/>
    )
}

const styles = EStyleSheet.create({
    DisplayDice: {
        width:'30rem',
        height:'30rem',
        position:'absolute'
    }
})