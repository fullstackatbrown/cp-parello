import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { WorkspaceSvg } from 'blockly';
import { motion } from 'framer-motion';
import { darkTheme, workspaceConfig } from './blocklyTheme';
import { blocklyStyles } from './blocklyStyles';

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
    if (!blocklyDiv.current || workspaceRef.current) return;

    try {
      const workspace = Blockly.inject(blocklyDiv.current, {
        toolbox: toolboxCategories,
        theme: darkTheme,
        ...workspaceConfig
      });

      workspaceRef.current = workspace;

      // Handle initial XML loading
      if (initialXml) {
        try {
          Blockly.Xml.domToWorkspace(
            Blockly.Xml.textToDom(initialXml),
            workspace
          );
        } catch (e) {
          console.error('Error loading initial XML:', e);
        }
      }

      // Add workspace change listener
      workspace.addChangeListener((event: Blockly.Events.Abstract) => {
        if (event.type !== Blockly.Events.FINISHED_LOADING) {
          onWorkspaceChange(workspace);
        }
      });

      // Add flyout animation handlers
      const addFlyoutAnimations = () => {
        const flyouts = document.getElementsByClassName('blocklyFlyout');
        Array.from(flyouts).forEach(flyout => {
          if (flyout instanceof HTMLElement) {
            flyout.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Create motion element wrapper
            const motionWrapper = document.createElement('div');
            motionWrapper.style.position = 'absolute';
            motionWrapper.style.top = '0';
            motionWrapper.style.left = '0';
            motionWrapper.style.width = '100%';
            motionWrapper.style.height = '100%';
            
            // Move the flyout into the motion wrapper
            flyout.parentNode?.insertBefore(motionWrapper, flyout);
            motionWrapper.appendChild(flyout);
            
            // Add animation class
            const animated = motion(motionWrapper);
            Object.assign(animated.style, {
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%'
            });
          }
        });
      };

      // Initialize animations after a short delay to ensure DOM is ready
      setTimeout(addFlyoutAnimations, 100);

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
      <style>{blocklyStyles}</style>
    </div>
  );
};

export default BlocklyComponent;