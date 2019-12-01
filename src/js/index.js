import 'babel-polyfill';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import '../scss/main.scss';

import Header from './components/header/header';

const isLocalhost = window.location.hostname === 'localhost';

OfflinePluginRuntime.install({
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
});

(function init() {
  document.addEventListener('DOMContentLoaded', () => {
    if (isLocalhost) {
      Header();
    }
  });
})();
