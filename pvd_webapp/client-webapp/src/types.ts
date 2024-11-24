export interface GridState {
  grid: boolean[][];
}

export interface BlocklyEvent {
  type: string;
  // Add other event properties as needed
}

export interface ToolboxCategory {
  name: string;
  colour: string;
  blocks: {
    type: string;
    [key: string]: any;
  }[];
}

export interface WorkspaceConfig {
  toolbox: string;
  // Add other configuration options as needed
}

