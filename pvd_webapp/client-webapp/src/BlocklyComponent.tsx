// src/BlocklyComponent.tsx

import React, { useRef, useEffect } from 'react';
import Blockly from 'blockly';

interface BlocklyComponentProps {
  initialXml: string;
  toolboxCategories: string;
  onWorkspaceChange: (xml: string) => void;
}

const BlocklyComponent: React.FC<BlocklyComponentProps> = ({ initialXml, toolboxCategories, onWorkspaceChange }) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (blocklyDiv.current) {
      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolboxCategories,
        grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
        trashcan: true,
      });

      workspace.current.addChangeListener(() => {
        const xml = Blockly.Xml.workspaceToDom(workspace.current!);
        const xmlText = Blockly.Xml.domToText(xml);
        onWorkspaceChange(xmlText);
      });

      return () => {
        workspace.current?.dispose();
      };
    }
  }, [toolboxCategories, onWorkspaceChange]);

  useEffect(() => {
    if (initialXml && workspace.current) {
      const xml = Blockly.utils.xml.textToDom(initialXml);
      Blockly.Xml.domToWorkspace(xml, workspace.current);
    }
  }, [initialXml]);

  return <div ref={blocklyDiv} style={{ height: '500px', width: '100%' }} />;
};

export default BlocklyComponent;
