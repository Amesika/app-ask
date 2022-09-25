# PokeApp

## Commande
 - npx react-native start
 - npx react-native run-android

## Pokemon Api
    https://pokedevs.gitbook.io/pokedex/resources/pokemon

## Deploiement sur AppStore

### Screenshots
 - https://www.appstorescreenshot.com/preview

### Policy Generator*
 - https://app-privacy-policy-generator.firebaseapp.com/

### Key Generator
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias ask-pokemon-key -keyalg RSA -keysize 2048 -validity 10000

cd android
./gradlew bundleRelease
