import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.personalfinances.app',
  appName: 'PersonalFinances',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
