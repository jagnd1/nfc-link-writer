# NFC Link Writer

Write URLs to NFC tags. That's it.

A minimal React Native app with a single purpose: paste a URL, tap write, hold near an NFC tag. Works on Android and iOS.

## Quick Start

```bash
git clone https://github.com/jagnd1/nfc-link-writer.git
cd nfc-link-writer
npm install

# Android
npm run android

# iOS
cd ios && pod install && cd ..
npm run ios
```

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
