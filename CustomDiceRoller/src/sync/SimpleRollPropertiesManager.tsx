import AsyncStorage from '@react-native-community/async-storage';
import { RollProperties } from '../dice/RollProperties';
import { createRollProperties } from '../dice/RollPropertiesFactory';

const SimpleRollPropertiesKey = 'SimpleRollPropertiesKey';

export default class SimpleRollPropertiesManager {

    private static mInstance = null as SimpleRollPropertiesManager;

    private mProperties = new RollProperties({});
    private mUpdater = null

    static getInstance() : SimpleRollPropertiesManager {
        if(SimpleRollPropertiesManager.mInstance === null) {
            SimpleRollPropertiesManager.mInstance = new SimpleRollPropertiesManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveRollProperties().then((properties) => this.setProperties(properties));
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    getProperties() : RollProperties {
        return this.mProperties;
    }

    setProperties(properties : RollProperties) {
        this.saveRollProperties(properties).then((properties) => {
            this.mProperties = properties;
            if(this.mUpdater !== null) this.mUpdater();
        });
    }

    private async saveRollProperties(properties: RollProperties) : Promise<RollProperties> {
        let rollProperties = JSON.stringify(properties);
        await AsyncStorage.setItem(SimpleRollPropertiesKey, rollProperties);
        return properties;
    }
    
    private async retrieveRollProperties() : Promise<RollProperties> {
        const propertiesString = await AsyncStorage.getItem(SimpleRollPropertiesKey);
        if(propertiesString === null) { return new RollProperties({}); }
        return createRollProperties(propertiesString);
    }
}