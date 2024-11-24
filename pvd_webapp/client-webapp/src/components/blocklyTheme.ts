import * as Blockly from 'blockly';

export const darkTheme = Blockly.Theme.defineTheme('dark', {
  name: 'dark',
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: '#1F2937',
    toolboxBackgroundColour: '#111827',
    toolboxForegroundColour: '#D1D5DB',
    flyoutBackgroundColour: '#1F2937',
    flyoutForegroundColour: '#D1D5DB',
    flyoutOpacity: 1,
    insertionMarkerColour: '#4ADE80',
    insertionMarkerOpacity: 0.3,
    cursorColour: '#D1D5DB',
  }
});

export const workspaceConfig = {
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  trashcan: true,
  move: {
    scrollbars: false,
    drag: true,
    wheel: true
  }
};