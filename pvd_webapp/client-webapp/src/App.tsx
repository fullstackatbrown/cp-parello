// src/App.tsx

import React, { useState } from 'react';
import BlocklyComponent from './BlocklyComponent';
import axios from 'axios';

const App: React.FC = () => {
  const [xmlData, setXmlData] = useState<string>('');

  const toolboxCategories = `
    <xml id="toolbox" style="display: none">
      <category name="Logic" colour="210">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
      </category>
      <category name="Loops" colour="120">
        <block type="controls_repeat_ext"></block>
        <block type="controls_whileUntil"></block>
      </category>
    </xml>
  `;

  const handleWorkspaceChange = (xml: string) => {
    setXmlData(xml);

    axios.post('http://127.0.0.1:5000/process_xml', { xml })
      .then(response => console.log('Data sent successfully:', response.data))
      .catch(error => console.error('Error sending data:', error));
  };

  return (
    <div>
      <h1>Blockly React App</h1>
      <BlocklyComponent
        initialXml={xmlData}
        toolboxCategories={toolboxCategories}
        onWorkspaceChange={handleWorkspaceChange}
      />
    </div>
  );
}

export default App;

