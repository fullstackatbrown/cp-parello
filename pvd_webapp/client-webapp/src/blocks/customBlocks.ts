import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';

export function initCustomBlocks() {
  // Pixel Set Block
  Blockly.Blocks['pixel_set'] = {
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel('Set Pixel'));
      this.appendValueInput('X')
          .setCheck('Number')
          .appendField('X');
      this.appendValueInput('Y')
          .setCheck('Number')
          .appendField('Y');
      this.appendValueInput('on')
          .setCheck('Boolean')
          .appendField('on');
      this.setNextStatement(true);
      this.setPreviousStatement(true);
    }
  };

  // Python Generator
  pythonGenerator.forBlock['pixel_set'] = function(block: Blockly.Block) {
    const x = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_NONE) || '0';
    const y = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_NONE) || '0';
    const on = pythonGenerator.valueToCode(block, 'on', pythonGenerator.ORDER_NONE) || 'False';
    return `set_pixel(${x}, ${y}, ${on})\n`;
  };
}