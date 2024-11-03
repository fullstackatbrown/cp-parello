const pythonGenerator = Blockly.Python

pythonGenerator.forBlock['pixel_set'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_NONE) || '0';
    const y = generator.valueToCode(block, 'Y', generator.ORDER_NONE) || '0';
    const on = generator.valueToCode(block, 'on', generator.ORDER_NONE) || '0';
    const code = `set_pixel(${x}, ${y}, '${on}')\n`;
    return code;
};

export default pythonGenerator;