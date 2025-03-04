
import React from 'react'
import { Animated } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import AccelerometerManager from '../../Common/hardware/AccelerometerManager';
import ShakeDieSizeManager from '../../SettingsPage/Roller/ShakeDieSizeManager';

import { randomIntFromInterval } from '../../Common/utility/NumberHelper';
import { getRequiredImage } from '../../Common/dice/dieImages/DieImageGetter';
import { DieImage } from '../../Common/dice/views/DieView';

export class ShakeDie {
    dieImageID : number;
    size : number;

    maxX : number;
    maxY : number;
    portraitMode : boolean;

    xPosition : number;
    yPosition : number;
    xVelocity : number;
    yVelocity : number;
    rotation : number;
    rotationVelocity : number;

    collisionVelocity : number;

    key : string;

    constructor(imageID : number, maxX : number, maxY: number, portraitMode: boolean) {
        this.dieImageID = imageID;
        this.size = Math.min(maxX, maxY) / ShakeDieSizeManager.getInstance().shakeDieSizeDivider;
        this.maxX = maxX - this.size;
        this.maxY = maxY - this.size;
        this.portraitMode = portraitMode;

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

        if(this.portraitMode) {
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
        <Animated.View key={shakeDie.key} style={[{transform:[
            { translateX: shakeDie.xPosition },
            { translateY: shakeDie.yPosition },
            { rotate: shakeDie.rotation.toString() + 'deg' },
        ]}, styles.DisplayDice]}>
            <DieImage dieId={shakeDie.dieImageID} size={shakeDie.size}/>
        </Animated.View>
    )
}

const styles = EStyleSheet.create({
    DisplayDice: {
        position:'absolute'
    }
})