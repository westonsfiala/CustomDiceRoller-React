import CustomRollManager from "./CustomRollManager";
import DiceManager from "./DiceManager";
import DieSizeManager from "./DieSizeManager";
import ExpandedCategoryManager from "./ExpandedCategoryManager";
import ExpectedResultManager from "./ExpectedResultManager";
import HistoryManager from "./HistoryManager";
import RollManager from "./RollManager";
import RollResultVolumeManager from "./RollResultVolumeManager";
import ShakeEnabledManager from "./ShakeEnabledManager";
import ShakeSensitivityManager from "./ShakeSensitivityManager";
import ShakeVolumeManager from "./ShakeVolumeManager";
import SimpleRollPropertiesManager from "./SimpleRollPropertiesManager";
import SortTypeManager from "./SortTypeManager";
import TabManager from "./TabManager";
import ThemeManager from "./ThemeManager";

export function OpenAllSingletons() {
    CustomRollManager.getInstance();
    DiceManager.getInstance();
    DieSizeManager.getInstance();
    ExpandedCategoryManager.getInstance();
    ExpectedResultManager.getInstance();
    HistoryManager.getInstance();
    RollManager.getInstance();
    RollResultVolumeManager.getInstance();
    ShakeEnabledManager.getInstance();
    ShakeSensitivityManager.getInstance();
    ShakeVolumeManager.getInstance();
    SimpleRollPropertiesManager.getInstance();
    SortTypeManager.getInstance();
    TabManager.getInstance();
    ThemeManager.getInstance();
}