import { Navbar } from "@/components/navbar";
import "./Home.css";
import { ThemeProvider } from "@/components/theme-provider";

// function Home() {
//   return (
//     <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">  
//       <Navbar />
//     </ThemeProvider>
//   );
// }

// export default Home;

import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';

function Home() {        

  // API SETUP
  const [message, setMessage] = useState("loading...");
  const [windowWidth, setWindowWidth] = useState(0);
  const gridRef = useRef([]);
  const [gridState, setGridState] = useState<boolean[]>([]);

  Blockly.setLocale(En);

  const toolbox = {
    "kind": "flyoutToolbox",
    "contents": [
      {"kind": "block", "type": "controls_if"},

      {"kind": "block", "type": "controls_repeat_ext"},
      {"kind": "block", "type": "controls_repeat"},
      {"kind": "block", "type": "controls_whileUntil"},
      {"kind": "block", "type": "controls_for"},
      {"kind": "block", "type": "controls_forEach"},
      {"kind": "block", "type": "controls_flow_statements"},

      {"kind": "block", "type": "logic_compare"},
      {"kind": "block", "type": "logic_operation"},
      {"kind": "block", "type": "logic_negate"},
      {"kind": "block", "type": "logic_boolean"},
      {"kind": "block", "type": "logic_null"},
      {"kind": "block", "type": "logic_ternary"},

      {"kind": "block", "type": "math_number"},
      {"kind": "block", "type": "math_arithmetic"},
      {"kind": "block", "type": "math_single"},
      {"kind": "block", "type": "math_trig"},
      {"kind": "block", "type": "math_constant"},
      {"kind": "block", "type": "math_number_property"},
      {"kind": "block", "type": "math_round"},
      {"kind": "block", "type": "math_on_list"},
      {"kind": "block", "type": "math_modulo"},
      {"kind": "block", "type": "math_constrain"},
      {"kind": "block", "type": "math_random_int"},
      {"kind": "block", "type": "math_random_float"},
      {"kind": "block", "type": "math_atan2"},

      {"kind": "block", "type": "lists_create_empty"},
      {"kind": "block", "type": "lists_create_with"},
      {"kind": "block", "type": "lists_repeat"},
      {"kind": "block", "type": "lists_reverse"},
      {"kind": "block", "type": "lists_length"},
      {"kind": "block", "type": "lists_isEmpty"},
      {"kind": "block", "type": "lists_indexOf"},
      {"kind": "block", "type": "lists_getIndex"},
      {"kind": "block", "type": "lists_setIndex"},
      {"kind": "block", "type": "lists_getSublist"},
      {"kind": "block", "type": "lists_split"},
      {"kind": "block", "type": "logic_compare"},
      {"kind": "block", "type": "logic_operation"},
      {"kind": "block", "type": "logic_negate"},
      {"kind": "block", "type": "logic_boolean"},
      {"kind": "block", "type": "logic_null"},
      {"kind": "block", "type": "logic_ternary"},

      {"kind": "block", "type": "lists_create_empty"},
      {"kind": "block", "type": "lists_create_with"},
      {"kind": "block", "type": "lists_repeat"},
      {"kind": "block", "type": "lists_reverse"},
      {"kind": "block", "type": "lists_length"},
      {"kind": "block", "type": "lists_isEmpty"},
      {"kind": "block", "type": "lists_indexOf"},
      {"kind": "block", "type": "lists_getIndex"},
      {"kind": "block", "type": "lists_setIndex"},
      {"kind": "block", "type": "lists_getSublist"},
      {"kind": "block", "type": "lists_split"},
      {"kind": "block", "type": "lists_sort"},

      {"kind": "block", "type": "variables_get"},
      {"kind": "block", "type": "variables_set"},
      
      {"kind": "block", "type": "pixel_set"},

      {"kind": "block", "type": "text"},
      {"kind": "block", "type": "text_join"},
      {"kind": "block", "type": "text_append"},
      {"kind": "block", "type": "text_length"},
      {"kind": "block", "type": "text_isEmpty"},
      {"kind": "block", "type": "text_indexOf"},
      {"kind": "block", "type": "text_charAt"},
      {"kind": "block", "type": "text_getSubstring"},
      {"kind": "block", "type": "text_changeCase"},
      {"kind": "block", "type": "text_trim"},
      {"kind": "block", "type": "text_print"},
      {"kind": "block", "type": "text_prompt_ext"},
      {"kind": "block", "type": "text"},
      {"kind": "block", "type": "text_join"},
      {"kind": "block", "type": "text_append"},
      {"kind": "block", "type": "text_length"},
      {"kind": "block", "type": "text_isEmpty"},
      {"kind": "block", "type": "text_indexOf"},
      {"kind": "block", "type": "text_charAt"},
      {"kind": "block", "type": "text_getSubstring"},
      {"kind": "block", "type": "text_changeCase"},
      {"kind": "block", "type": "text_trim"},
      {"kind": "block", "type": "text_print"},
      {"kind": "block", "type": "text_prompt_ext"},

      {"kind": "block", "type": "procedures_defnoreturn"},
      {"kind": "block", "type": "procedures_defreturn"},
      {"kind": "block", "type": "procedures_callnoreturn"},
      {"kind": "block", "type": "procedures_callreturn"}
    ]
  }

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
      this.appendValueInput('On')
      .appendField('On')
      this.setNextStatement(true);
      this.setPreviousStatement(true);
    }
  }

  javascriptGenerator.forBlock['pixel_set'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_NONE) || '0';
    const y = generator.valueToCode(block, 'Y', generator.ORDER_NONE) || '0';
    const on = generator.valueToCode(block, 'On', generator.ORDER_NONE) || '0';
    return `setPixel(${x}, ${y}, ${on});\n`;
  }

  async function setPixel(x, y, on) {
    const index = Math.min(y, 63) * 256 + Math.min(255, x)
    const pixels = gridRef.current;
    if (index >= 0 && index < pixels.length) {
      pixels[index].style.backgroundColor = on ? 'white' : 'black';
      // Update the grid state
      const newGridState = [...gridState];
      newGridState[index] = on;
      setGridState(newGridState);
      // Send the update to the backend
      await fetch('http://localhost:8080/api/updateGrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x, y, on })
      });
    }
  }

  async function clearGrid() {
    await fetch('http://localhost:8080/api/clearGrid', {
      method: 'POST'
    });
    gridRef.current.forEach(pixel => {
      pixel.style.backgroundColor = 'black';
    });
    setGridState(new Array(64 * 256).fill(0));
  }

  useEffect(() => {
    async function fetchInitialGrid() {
      await clearGrid();
      const response = await fetch('http://localhost:8080/api/getGrid');
      const data = await response.json();
      setGridState(data.grid);
    }
    fetchInitialGrid();
  }, []);


  useEffect(() => {
    if (gridRef.current.length === 0) {
      const gridContainer = document.getElementById('gridContainer');
      const pixels = [];
      for (let y = 0; y < 64; y++) {
        for (let x = 0; x < 256; x++) {
          const pixel = document.createElement('div');
          pixel.style.width = '5px';
          pixel.style.height = '5px';
          pixel.style.display = 'inline-block';
          gridContainer.appendChild(pixel);
          pixels.push(pixel);
        }
      }
      gridRef.current = pixels;
    }

    gridState.forEach((on, index) => {
      const pixel = gridRef.current[index];
      if (pixel) {
        pixel.style.backgroundColor = on ? 'white' : 'black';
      }
    });
  }, [gridState]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.blocklyInjected) {

      const ws = Blockly.inject('blocklyDiv', { toolbox: toolbox });
      window.blocklyInjected = true;

      const supportedEvents = new Set([
        Blockly.Events.BLOCK_CHANGE,
        Blockly.Events.BLOCK_CREATE,
        Blockly.Events.BLOCK_DELETE,
        Blockly.Events.BLOCK_MOVE,
      ]);

      const updateCode = async function(event) {
        if (ws.isDragging()) return; // Don't update while changes are happening.
        if (!supportedEvents.has(event.type)) return;
        const code = javascriptGenerator.workspaceToCode(ws);
        try {
          await clearGrid();
          eval(code); // Execute the generated code
        } catch (e) {
          console.error('Error executing code:', e);
        }      };
      ws.addChangeListener(updateCode);
    }
  }, []);

  return (
    <div>      
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">  
//       <Navbar />
//     </ThemeProvider>
      <div id="gridContainer" style={{ display: 'grid', gridTemplateColumns: 'repeat(256, 5px)' }}></div>
      <div id="blocklyDiv" style={{ height: "60vh", width: "75vw" }}></div>
      
    </div>
  )
}

export default Home

