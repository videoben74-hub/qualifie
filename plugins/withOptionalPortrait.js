const { withAndroidManifest } = require('expo/config-plugins');

module.exports = function withOptionalPortrait(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    const features = manifest['uses-feature'] || [];
    const name = 'android.hardware.screen.portrait';
    manifest['uses-feature'] = [
      ...features.filter(item => item.$?.['android:name'] !== name),
      { $: { 'android:name': name, 'android:required': 'false' } }
    ];
    return config;
  });
};
