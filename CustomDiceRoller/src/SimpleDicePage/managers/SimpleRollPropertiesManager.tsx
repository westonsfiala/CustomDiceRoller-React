import AsyncStorage from '@react-native-async-storage/async-storage';

import { RollProperties } from '../../Common/dice/RollProperties';
import { createRollProperties } from '../../Common/dice/factory/RollPropertiesFactory';

const SimpleRollPropertiesKey = 'SimpleRollPropertiesKey';

export default class SimpleRollPropertiesManager {

    private static mInstance = null as SimpleRollPropertiesManager;

    private mProperties = new RollProperties({});

    static getInstance() : SimpleRollPropertiesManager {
        if(SimpleRollPropertiesManager.mInstance === null) {
            SimpleRollPropertiesManager.mInstance = new SimpleRollPropertiesManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveRollProperties().then((properties) => this.setProperties(properties));
    }

    getProperties() : RollProperties {
        return this.mProperties;
    }

    async setProperties(properties : RollProperties) : Promise<RollProperties> {

        this.mProperties = await this.saveRollProperties(properties);

        return this.mProperties;
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