import { remote } from 'electron';

if (remote.getGlobal('DEV_MODE')) {
  // Attempt to install DevTron
  try {
    if (!remote.BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')) {
      require('devtron').install();
    }
  } catch (e) {
    // Who cares
  }

  // Attempt to install React Developer Tools
  try {
    const devtoolsInstaller = require('electron-devtools-installer');
    devtoolsInstaller.default(devtoolsInstaller.REACT_DEVELOPER_TOOLS);
  } catch (err) {
    // Whoe cares
  }

  window.addEventListener('load', () => {
    const webview = document.querySelector('webview');
    if (!webview) {
      return;
    }
    window.openGPMDevTools = () => {
      webview.openDevTools();
    };
  });
}
