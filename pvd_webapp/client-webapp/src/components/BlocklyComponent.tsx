import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { WorkspaceSvg } from 'blockly';

interface BlocklyComponentProps {
  initialXml: string;
  toolboxCategories: string;
  onWorkspaceChange: (workspace: WorkspaceSvg) => void;
}

const BlocklyComponent: React.FC<BlocklyComponentProps> = ({
  initialXml,
  toolboxCategories,
  onWorkspaceChange,
}) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDiv.current || workspaceRef.current) {
      return;
    }

    try {
      console.log('Initializing Blockly workspace...');

      // Define dark theme
      const darkTheme = Blockly.Theme.defineTheme('dark', {
        name: 'dark',
        base: Blockly.Themes.Classic,
        componentStyles: {
          workspaceBackgroundColour: '#1F2937',
          toolboxBackgroundColour: '#111827',
          toolboxForegroundColour: '#D1D5DB',
          flyoutBackgroundColour: '#1F2937',
          flyoutForegroundColour: '#D1D5DB',
          flyoutOpacity: 0.9,
          scrollbarColour: '#4B5563',
          insertionMarkerColour: '#4ADE80',
          insertionMarkerOpacity: 0.3,
          scrollbarOpacity: 0.4,
          cursorColour: '#D1D5DB',
        }
      });
      
      // Create workspace
      const workspace = Blockly.inject(blocklyDiv.current, {
        toolbox: toolboxCategories,
        theme: darkTheme,
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
          scrollbars: {
            horizontal: true,
            vertical: true
          },
          drag: true,
          wheel: true
        }
      });

      workspaceRef.current = workspace;

      // Add change listener
      workspace.addChangeListener((event: Blockly.Events.Abstract) => {
        if (event.type !== Blockly.Events.FINISHED_LOADING) {
          onWorkspaceChange(workspace);
        }
      });

      if (initialXml) {
        try {
          const xml = Blockly.Xml.textToDom(initialXml);
          Blockly.Xml.domToWorkspace(xml, workspace);
        } catch (e) {
          console.error('Error loading initial XML:', e);
        }
      }

    } catch (error) {
      console.error('Error initializing Blockly:', error);
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, [toolboxCategories, initialXml]);

  return (
    <div className="relative">
      <div 
        ref={blocklyDiv}
        className="w-full h-[600px] bg-gray-800 relative"
        style={{ 
          position: 'relative',
          overflow: 'hidden'
        }}
      />
      <style>{`
        .blocklyMainBackground {
          fill: #1F2937 !important;
        }
        .blocklyToolboxDiv {
          background-color: #111827 !important;
          color: #D1D5DB !important;
        }
        .blocklyFlyoutBackground {
          fill: #1F2937 !important;
        }
        .blocklyFlyout {
          background-color: #1F2937 !important;
        }
        .blocklyScrollbarHandle {
          fill: #4B5563 !important;
        }
        .blocklyScrollbarBackground {
          fill: #374151 !important;
        }
        .blocklySelected > .blocklyPath {
          stroke: #4ADE80 !important;
          stroke-width: 3px !important;
        }
        .blocklyHighlightedConnectionPath {
          stroke: #4ADE80 !important;
        }
      `}</style>
    </div>
  );
};

export default BlocklyComponent;