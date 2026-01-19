# NFC Link Writer

Write URLs to NFC tags. That's it.

A minimal React Native app with a single purpose: paste a URL, tap write, hold near an NFC tag. Works on Android and iOS.

## Quick Start

```bash
git clone https://github.com/jagnd1/nfc-link-writer.git
cd nfc-link-writer
npm install

# Android (with Metro bundler)
npm run android

# iOS
cd ios && pod install && cd ..
npm run ios
```

## Build Standalone APK (Android)

Create an APK that works without Metro bundler:

```bash
# Bundle JavaScript into APK
mkdir -p android/app/src/main/assets

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Build APK
cd android && ./gradlew assembleDebug && cd ..

# Install on device
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

## Requirements

**Build tools:**
- Node.js 18+
- Java JDK 17 (Android)
- Xcode 14+ (iOS, macOS only)
- Android SDK API 33+

**Testing:**
- Physical device with NFC (emulators don't support NFC)
- NTAG215/216 NFC tags recommended

## Device Setup

**Android:** Enable Developer Options → USB Debugging → connect via USB.

**iOS:** Connect iPhone → trust computer → select device in Xcode.

## Troubleshooting

```bash
# Clean builds
cd android && ./gradlew clean && cd ..
cd ios && rm -rf build Pods && pod install && cd ..
npm start -- --reset-cache
```

## Dependencies

| Package | Version | License |
|---------|---------|---------|
| react | 19.2.0 | MIT |
| react-native | 0.83.1 | MIT |
| react-native-nfc-manager | 3.17.2 | MIT |
| react-native-safe-area-context | 5.5.2 | MIT |

## License

MIT - see [LICENSE](LICENSE)
