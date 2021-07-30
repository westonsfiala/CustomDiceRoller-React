import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpandedCategoryKey = 'ExpandedCategoryKey';

export default class ExpandedCategoryManager {

    private static mInstance = null as ExpandedCategoryManager;

    private mCategories = [] as Array<string>;

    private mUpdaters = new Map<string, () => void>();

    static getInstance() : ExpandedCategoryManager {
        if(ExpandedCategoryManager.mInstance === null) {
            ExpandedCategoryManager.mInstance = new ExpandedCategoryManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.getCategoriesStorage().then((categories) => {
            this.setCategories(categories)
        });
    }

    private setCategories(categories: Array<string>, specificUpdater?: string) {
        categories.sort()
        this.setCategoriesStorage(categories).then((categories) => {
            this.mCategories = categories;
            this.runUpdaters(specificUpdater);
        });
    }

    setUpdater(category: string, updater: () => void) {
        this.mUpdaters.set(category, updater);
    }

    isExpanded(category: string) : boolean {
        return this.mCategories.findIndex((value) => value == category) !== -1;
    }

    expandContract(category: string) {
        let removeIndex = this.mCategories.findIndex((value) => value == category);
        if(removeIndex !== -1) {
            this.mCategories.splice(removeIndex, 1);
        } else {
            this.mCategories.push(category);
        }

        this.setCategories(this.mCategories, category);
    }

    private runUpdaters(specificUpdater?: string) {
        if(specificUpdater != null) {
            let updater = this.mUpdaters.get(specificUpdater);

            if(updater != null) updater();
        } else {
            for(let [cat, up] of this.mUpdaters) {
                if(up != null) up();
            }
        }
    }

    private async setCategoriesStorage(categories: Array<string>) : Promise<Array<string>> {
        let categoriesString = JSON.stringify(categories);
        await AsyncStorage.setItem(ExpandedCategoryKey, categoriesString);
        return categories;
    }
    
    private async getCategoriesStorage() : Promise<Array<string>> {
        const categoriesString = await AsyncStorage.getItem(ExpandedCategoryKey);
    
        // If we don't have the value, or its empty, set the standard and return it.
        if(categoriesString === null || categoriesString.length === 0)
        {
            return [];
        }
    
        const rollArray = JSON.parse(categoriesString) as Array<string>;
        rollArray.sort();
        return rollArray;
    }
}