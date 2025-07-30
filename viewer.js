import { ViewerApp } from 'https://unpkg.com/3dgs-viewer/dist/3dgs-viewer.es.js';

async function init() {
  const viewer = new ViewerApp({
    canvas: null,  // Canvas wird automatisch erstellt
    backgroundColor: '#000000'
  });
  
  // Lade dein Modell hier
  await viewer.loadSplat('scene.splat');  // Passe den Dateinamen ggf. an
}

init();
