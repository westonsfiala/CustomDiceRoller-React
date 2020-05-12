import { Linking, Platform } from "react-native";

export function openRatePage() {
    Linking.openURL(Platform.OS === 'ios' ? "itms://itunes.apple.com/us/app/apple-store/id1499274239?mt=8" : "market://details?id=com.fialasfiasco.rpgdiceroller").then(() => null).catch(() => null)
}