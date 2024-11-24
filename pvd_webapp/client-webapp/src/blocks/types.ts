import { Block } from 'blockly';

export interface CustomBlockDefinition {
  init(): void;
  setColour(colour: number | string): void;
  setTooltip(tooltip: string): void;
  setHelpUrl?(url: string): void;
  setPreviousStatement(enable: boolean, type?: string | null): void;
  setNextStatement(enable: boolean, type?: string | null): void;
  setInputsInline(enable: boolean): void;
  appendValueInput(name: string): any;
  appendDummyInput(): any;
}

export interface BlockGeneratorFunction {
  (block: Block): string;
}

export interface BlockGenerators {
  [key: string]: BlockGeneratorFunction;
}