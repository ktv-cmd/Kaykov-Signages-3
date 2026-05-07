#!/usr/bin/env node

/**
 * Comprehensive Test Runner
 * Generates test configurations and validates prompt generation
 * for all color, font, and lighting variations
 */

const fs = require('fs');
const path = require('path');

// Test configurations
const testMatrix = {
  colors: [
    { name: 'Navy Blue', hex: '#1E3A8A', description: 'Original test color' },
    { name: 'Red', hex: '#DC2626', description: 'Bold high contrast' },
    { name: 'Black', hex: '#1C1C1C', description: 'Matte black' },
    { name: 'White', hex: '#FFFFFF', description: 'Light on dark' },
    { name: 'Bronze', hex: '#CD7F32', description: 'Brushed bronze' },
    { name: 'Silver', hex: '#C0C0C0', description: 'Brushed aluminum' },
    { name: 'Emerald', hex: '#059669', description: 'Deep green' },
    { name: 'Auto', hex: null, description: 'AI facade analysis' }
  ],
  
  fonts: [
    { id: 'classic-serif', name: 'Classic Serif', description: 'Trajan/Times Roman' },
    { id: 'modern-sans', name: 'Modern Sans', description: 'Clean contemporary' },
    { id: 'bold-condensed', name: 'Bold Condensed', description: 'Strong compact' },
    { id: 'elegant-script', name: 'Elegant Script', description: 'Flowing sophisticated' }
  ],
  
  references: [
    { id: 'front-lid', name: 'Front Lit', lighting: 'front', description: 'Illuminated from front' },
    { id: 'back-lit', name: 'Back Lit', lighting: 'back', description: 'Halo effect behind' },
    { id: 'back-front-lid', name: 'Front & Back Lit', lighting: 'both', description: 'Combined lighting' },
    { id: 'light-box', name: 'Light Box', lighting: 'front', description: 'Cabinet sign' },
    { id: 'no-light-outdoor', name: 'No Light 3D', lighting: 'none', description: 'Dimensional no LED' },
    { id: 'awning', name: 'Awning', lighting: 'none', description: 'Fabric graphics' }
  ],
  
  texts: {
    short: ['VALERIA', 'BISTRO', 'CAFE'],
    medium: ['CAFE PARIS', 'KAYKOV MEDIA'],
    long: ['THE METROPOLITAN BISTRO', 'METROPOLITAN RESTAURANT']
  }
};

// Generate test suite
function generateTestSuite() {
  const tests = [];
  let testId = 1;
  
  // Phase A: Color Variations (8 tests)
  console.log('\n=== PHASE A: COLOR VARIATIONS ===\n');
  testMatrix.colors.forEach(color => {
    const test = {
      id: `A${testId}`,
      phase: 'A',
      name: `Color Test: ${color.name}`,
      brandText: 'VALERIA',
      textStyling: {
        fontStyle: 'classic-serif',
        color: color.hex
      },
      reference: 'back-lit',
      expectedPromptKeywords: [
        'EXTRUDED VOLUMETRIC LETTERFORMS',
        '6-faced mesh',
        'Z-axis: 3.5 inches (89mm)',
        color.hex ? `CRITICAL COLOR REQUIREMENT: MUST BE ${color.hex}` : 'Analyze building facade',
        'RAY-TRACED BACKLIGHTING'
      ],
      validation: {
        colorAccuracy: color.hex ? `Letters must be exactly ${color.hex}` : 'AI-selected color must complement facade',
        typography: 'Classic serif letterforms (Trajan style)',
        lighting: 'Back-lit halo effect on wall',
        depth: 'Visible side-walls on at least one letter'
      }
    };
    tests.push(test);
    console.log(`✓ ${test.id}: ${test.name} (${color.description})`);
    testId++;
  });
  
  testId = 1;
  
  // Phase B: Font Variations (4 tests)
  console.log('\n=== PHASE B: FONT VARIATIONS ===\n');
  testMatrix.fonts.forEach(font => {
    const test = {
      id: `B${testId}`,
      phase: 'B',
      name: `Font Test: ${font.name}`,
      brandText: 'BISTRO',
      textStyling: {
        fontStyle: font.id,
        color: '#DC2626'
      },
      reference: 'front-lid',
      expectedPromptKeywords: [
        'EXTRUDED VOLUMETRIC LETTERFORMS',
        `TYPOGRAPHY REQUIREMENT: ${font.description}`,
        'CRITICAL COLOR REQUIREMENT: MUST BE #DC2626',
        'Subsurface Scattering'
      ],
      validation: {
        typography: `${font.description} letterforms`,
        colorAccuracy: 'Letters must be exactly #DC2626 red',
        lighting: 'Internal glow from front',
        depth: 'Visible side-walls'
      }
    };
    tests.push(test);
    console.log(`✓ ${test.id}: ${test.name} (${font.description})`);
    testId++;
  });
  
  testId = 1;
  
  // Phase C: Lighting Variations (6 tests)
  console.log('\n=== PHASE C: LIGHTING VARIATIONS ===\n');
  testMatrix.references.forEach(ref => {
    const test = {
      id: `C${testId}`,
      phase: 'C',
      name: `Lighting Test: ${ref.name}`,
      brandText: 'CAFE',
      textStyling: {
        fontStyle: 'bold-condensed',
        color: '#1C1C1C'
      },
      reference: ref.id,
      expectedPromptKeywords: [
        'EXTRUDED VOLUMETRIC LETTERFORMS',
        ref.lighting === 'back' ? 'RAY-TRACED BACKLIGHTING' : 
        ref.lighting === 'front' ? 'Subsurface Scattering' :
        ref.lighting === 'both' ? 'RAY-TRACED BACKLIGHTING' : 
        ref.id === 'awning' ? 'FLAT graphics' : 'Ambient Occlusion',
        ref.id === 'awning' ? 'Sunbrella fabric' : 'PBR'
      ],
      validation: {
        lighting: ref.description,
        depth: ref.id === 'awning' ? 'NO 3D extrusion (flat)' : 'Visible side-walls',
        material: ref.id === 'awning' ? 'Fabric texture' : 'Metallic finish'
      }
    };
    tests.push(test);
    console.log(`✓ ${test.id}: ${test.name} (${ref.description})`);
    testId++;
  });
  
  testId = 1;
  
  // Phase D: Length Variations (5 tests)
  console.log('\n=== PHASE D: TEXT LENGTH VARIATIONS ===\n');
  [...testMatrix.texts.short, ...testMatrix.texts.medium, ...testMatrix.texts.long].slice(0, 5).forEach(text => {
    const lengthCategory = text.length <= 7 ? 'Short' : text.length <= 12 ? 'Medium' : 'Long';
    const test = {
      id: `D${testId}`,
      phase: 'D',
      name: `Length Test: ${lengthCategory} (${text})`,
      brandText: text,
      textStyling: {
        fontStyle: 'modern-sans',
        color: '#1E3A8A'
      },
      reference: 'back-front-lid',
      expectedPromptKeywords: [
        'EXTRUDED VOLUMETRIC LETTERFORMS',
        `CRITICAL SIZING: The complete text "${text}" MUST FIT`,
        'Scale letters or tighten spacing',
        'MUST FIT within golden zone boundaries'
      ],
      validation: {
        boundary: 'All letters fit within golden zone',
        legibility: 'Text still readable despite any scaling',
        noOverflow: 'No letters extend beyond edges'
      }
    };
    tests.push(test);
    console.log(`✓ ${test.id}: ${test.name} (${text.length} chars)`);
    testId++;
  });
  
  // Summary
  console.log(`\n=== TEST SUITE SUMMARY ===\n`);
  console.log(`Total Tests Generated: ${tests.length}`);
  console.log(`Phase A (Colors): ${tests.filter(t => t.phase === 'A').length}`);
  console.log(`Phase B (Fonts): ${tests.filter(t => t.phase === 'B').length}`);
  console.log(`Phase C (Lighting): ${tests.filter(t => t.phase === 'C').length}`);
  console.log(`Phase D (Length): ${tests.filter(t => t.phase === 'D').length}`);
  console.log(`\n`);
  
  return tests;
}

// Save test configurations
function saveTestConfigurations(tests) {
  const outputDir = path.join(__dirname, 'test-results', 'configurations');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Save individual test configs
  tests.forEach(test => {
    const filename = path.join(outputDir, `test-${test.id}.json`);
    fs.writeFileSync(filename, JSON.stringify(test, null, 2));
  });
  
  // Save master config
  const masterConfig = {
    generated: new Date().toISOString(),
    totalTests: tests.length,
    phases: {
      A: tests.filter(t => t.phase === 'A').length,
      B: tests.filter(t => t.phase === 'B').length,
      C: tests.filter(t => t.phase === 'C').length,
      D: tests.filter(t => t.phase === 'D').length
    },
    tests: tests
  };
  
  const masterFile = path.join(outputDir, 'master-test-suite.json');
  fs.writeFileSync(masterFile, JSON.stringify(masterConfig, null, 2));
  
  console.log(`✅ Saved ${tests.length} test configurations to: ${outputDir}`);
  console.log(`✅ Master config: ${masterFile}`);
  
  return outputDir;
}

// Generate validation checklist
function generateValidationChecklist(tests) {
  let markdown = '# Comprehensive Test Validation Checklist\n\n';
  markdown += `**Generated**: ${new Date().toISOString()}\n`;
  markdown += `**Total Tests**: ${tests.length}\n\n`;
  markdown += '---\n\n';
  
  ['A', 'B', 'C', 'D'].forEach(phase => {
    const phaseTests = tests.filter(t => t.phase === phase);
    if (phaseTests.length === 0) return;
    
    const phaseName = {
      'A': 'COLOR VARIATIONS',
      'B': 'FONT VARIATIONS',
      'C': 'LIGHTING VARIATIONS',
      'D': 'LENGTH VARIATIONS'
    }[phase];
    
    markdown += `## Phase ${phase}: ${phaseName}\n\n`;
    
    phaseTests.forEach(test => {
      markdown += `### ${test.id}: ${test.name}\n\n`;
      markdown += `**Input**:\n`;
      markdown += `- Text: "${test.brandText}"\n`;
      markdown += `- Font: ${test.textStyling.fontStyle}\n`;
      markdown += `- Color: ${test.textStyling.color || 'Auto-select'}\n`;
      markdown += `- Reference: ${test.reference}\n\n`;
      
      markdown += `**Expected in Prompt**:\n`;
      test.expectedPromptKeywords.forEach(kw => {
        markdown += `- [ ] "${kw}"\n`;
      });
      markdown += `\n`;
      
      markdown += `**Visual Validation**:\n`;
      Object.entries(test.validation).forEach(([key, value]) => {
        markdown += `- [ ] ${key}: ${value}\n`;
      });
      markdown += `\n`;
      
      markdown += `**4-Point Checklist**:\n`;
      markdown += `- [ ] Side-Wall Test: ${test.validation.depth || 'Visible depth'}\n`;
      markdown += `- [ ] Zero Gold Policy: 0% golden pixels\n`;
      markdown += `- [ ] Surface Continuity: Restored facade texture\n`;
      markdown += `- [ ] Shadow Authenticity: Multi-plane gradation\n\n`;
      
      markdown += `**Score**: ___/45\n`;
      markdown += `**Status**: ⬜ PASS / ⬜ PARTIAL / ⬜ FAIL\n\n`;
      markdown += `---\n\n`;
    });
  });
  
  const checklistFile = path.join(__dirname, 'test-results', 'COMPREHENSIVE_VALIDATION_CHECKLIST.md');
  fs.writeFileSync(checklistFile, markdown);
  console.log(`✅ Validation checklist saved to: ${checklistFile}`);
}

// Main execution
function main() {
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║  COMPREHENSIVE TEST CONFIGURATION GENERATOR        ║');
  console.log('╚════════════════════════════════════════════════════╝\n');
  
  const tests = generateTestSuite();
  const outputDir = saveTestConfigurations(tests);
  generateValidationChecklist(tests);
  
  console.log('\n✅ Test configuration generation complete!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Review test configurations in: test-results/configurations/');
  console.log('   2. Execute tests manually via browser for each configuration');
  console.log('   3. Use validation checklist to document results');
  console.log('   4. Run: ./run-test-validation.sh for each completed test\n');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateTestSuite, testMatrix };
