import React, { useState, useEffect } from 'react';
import BlocklyComponent from './components/BlocklyComponent';
import GridComponent from './components/GridComponent';
import { initCustomBlocks } from './blocks/customBlocks';
import { WorkspaceSvg } from 'blockly';
import { pythonGenerator } from 'blockly/python';

// Initialize custom blocks
initCustomBlocks();

const App: React.FC = () => {
  const [grid, setGrid] = useState<boolean[][]>([]);

  // Define toolbox in XML format
  const toolboxConfiguration = `
    <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
      <category name="Drawing" colour="#5C81A6">
        <block type="pixel_set">
          <value name="X">
            <shadow type="math_number">
              <field name="NUM">0</field>
            </shadow>
          </value>
          <value name="Y">
            <shadow type="math_number">
              <field name="NUM">0</field>
            </shadow>
          </value>
          <value name="on">
            <shadow type="logic_boolean">
              <field name="BOOL">TRUE</field>
            </shadow>
          </value>
        </block>
      </category>
      <category name="Logic" colour="#5C81A6">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_boolean"></block>
      </category>
      <category name="Loops" colour="#5CA65C">
        <block type="controls_repeat_ext">
          <value name="TIMES">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
        </block>
        <block type="controls_whileUntil"></block>
        <block type="controls_for">
          <value name="FROM">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="TO">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
          <value name="BY">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
        </block>
      </category>
      <category name="Math" colour="#5C68A6">
        <block type="math_number">
          <field name="NUM">0</field>
        </block>
        <block type="math_arithmetic"></block>
        <block type="math_modulo"></block>
      </category>
      <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>
      <category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>
    </xml>
  `;

  useEffect(() => {
    fetch('http://localhost:5000/fetchGrid')
      .then(response => response.json())
      .then(data => setGrid(data.grid))
      .catch(error => console.error('Error fetching grid:', error));
  }, []);

  const updateGridWithCode = async (code: string) => {
    try {
      const response = await fetch(`http://localhost:5000/updateGrid?code=${encodeURIComponent(code)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGrid(data.grid);
    } catch (error) {
      console.error('Error updating grid:', error);
    }
  };

  const handleWorkspaceChange = (workspace: WorkspaceSvg) => {
    try {
      const code = pythonGenerator.workspaceToCode(workspace);
      console.log('Generated Python code:', code);
      updateGridWithCode(code);
    } catch (error) {
      console.error('Error generating code:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col p-4 gap-4">
      {/* Grid Section */}
      <div className="w-full bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-300">
          Grid Output (256 x 64)
        </h2>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1280px]"> {/* Force minimum width */}
            <GridComponent grid={grid} />
          </div>
        </div>
      </div>

      {/* Blockly Section */}
      <div className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-lg font-semibold p-4 text-gray-300">
          Block Editor
        </h2>
        <BlocklyComponent
          initialXml=""
          toolboxCategories={toolboxConfiguration}
          onWorkspaceChange={handleWorkspaceChange}
        />
      </div>
    </div>
  );
};

export default App;