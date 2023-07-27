import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.appurao.app',
  appName: 'AppUrao',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
