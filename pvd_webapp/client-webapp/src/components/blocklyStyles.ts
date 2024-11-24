export const blocklyStyles = `
  .blocklyMainBackground {
    fill: #1F2937 !important;
  }
  .blocklyToolboxDiv {
    background-color: #111827 !important;
    color: #D1D5DB !important;
    overflow: hidden !important;
  }
  .blocklyFlyoutBackground {
    fill: #1F2937 !important;
  }
  .blocklyFlyout {
    background-color: #1F2937 !important;
    overflow: hidden !important;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  .blocklyScrollbarVertical,
  .blocklyScrollbarHorizontal {
    display: none !important;
  }
  .blocklyToolboxDiv,
  .blocklyFlyout,
  .blocklyBlockCanvas,
  .blocklyWorkspace {
    overflow: hidden !important;
  }
  .blocklySelected > .blocklyPath {
    stroke: #4ADE80 !important;
    stroke-width: 3px !important;
    transition: stroke-width 0.2s ease !important;
  }
  .blocklyHighlightedConnectionPath {
    stroke: #4ADE80 !important;
    transition: stroke-width 0.2s ease, opacity 0.2s ease !important;
  }
  .blocklyTreeRow {
    transition: background-color 0.2s ease !important;
  }
  .blocklyTreeRow:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  .blocklyDragging {
    transition: transform 0.1s ease !important;
  }
  .blocklyWorkspace {
    transition: transform 0.3s ease-out !important;
  }
`;