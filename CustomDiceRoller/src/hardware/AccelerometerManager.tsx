import { 
    accelerometer, 
    setUpdateIntervalForType, 
    SensorTypes,
} from "react-native-sensors";

export default class AccelerometerManager {

    static mInstance = null as AccelerometerManager;

    private mChangeVector = [0,0,0,0,0,0,0,0,0];
    private xAcceleration = 0;
    private yAcceleration = 0;
    private zAcceleration = 0;
    private mAccelerationStable = false;

    static getInstance() : AccelerometerManager {
        if(AccelerometerManager.mInstance === null) {
            AccelerometerManager.mInstance = new AccelerometerManager();
        }

        return this.mInstance;
    }

    private constructor() {
        const subscription = accelerometer.subscribe(({ x, y, z }) =>
        {
            
            let dX = this.xAcceleration - x;
            let dY = this.yAcceleration - y;
            let dZ = this.zAcceleration - z;

            let combinedChange = Math.sqrt(dX*dX + dY*dY + dZ*dZ);

            this.mChangeVector.push(combinedChange);
            this.mChangeVector.shift();

            let totalChange = this.mChangeVector.reduce((prev, curr) => prev + curr);
            
            console.log({ totalChange });

            // TODO: Change the 250 to something more meaningful.
            this.mAccelerationStable = totalChange < 100;

            this.xAcceleration = x;
            this.yAcceleration = y;
            this.zAcceleration = z;
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