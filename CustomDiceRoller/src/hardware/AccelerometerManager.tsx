import { 
    accelerometer, 
    setUpdateIntervalForType, 
    SensorTypes,
} from "react-native-sensors";

import { isEmulator } from 'react-native-device-info';
import ShakeSensitivityManager from "../sync/ShakeSensitivityManager";
import { Platform } from "react-native";

export default class AccelerometerManager {

    private static mInstance = null as AccelerometerManager;

    private mChangeVector = [0,0,0,0,0,0,0,0,0];
    private xAcceleration = 0;
    private yAcceleration = 0;
    private zAcceleration = 0;
    private mAccelerationStable = true;

    static getInstance() : AccelerometerManager {
        if(AccelerometerManager.mInstance === null) {
            AccelerometerManager.mInstance = new AccelerometerManager();
        }

        return this.mInstance;
    }

    private constructor() {
        const subscription = accelerometer.subscribe(({ x, y, z }) =>
        {
            // iOS devices seem to report values reversed and a magnitude down from android.
            // So we adust by bumping them up.
            let adjustForIos = 1;
            if(Platform.OS === 'ios') adjustForIos = -10;

            let realX = x * adjustForIos;
            let realY = y * adjustForIos;
            let realZ = z * adjustForIos;

            let dX = this.xAcceleration - realX;
            let dY = this.yAcceleration - realY;
            let dZ = this.zAcceleration - realZ;

            let combinedChange = Math.sqrt(dX*dX + dY*dY + dZ*dZ);

            this.mChangeVector.push(combinedChange);
            this.mChangeVector.shift();

            let totalChange = this.mChangeVector.reduce((prev, curr) => prev + curr);

            this.mAccelerationStable = totalChange < ShakeSensitivityManager.getInstance().getShakeSensitivityValue();

            this.xAcceleration = realX;
            this.yAcceleration = realY;
            this.zAcceleration = realZ;

            //console.log({realX,realY,realZ})
        });

        setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    }

    get xAccel() : number {
        return this.xAcceleration;
    }

    get yAccel() : number {
        return this.yAcceleration;
    }

    get zAccel() : number {
        return this.zAcceleration;
    }

    get accelStable() : boolean {
        return this.mAccelerationStable;
    }
}