const fetch = require('node-fetch');

const errorCodes = [
  {
    "code": "E020",
    "title": "ATC Arm Misalignment",
    "category": "Tool Changer",
    "severity": "medium",
    "description": "The automatic tool changer arm is not correctly aligned with the spindle or the tool rack.",
    "symptoms": ["Tool change failure", "Loud noise during tool change", "ATC alarm on display"],
    "causes": ["Incorrect tool data in the controller", "A crash during a previous tool change", "Mechanical wear of the ATC arm components"],
    "quickFix": "Manually reset the ATC arm and check the tool data.",
    "estimatedTime": "30-60 minutes",
    "difficulty": "Hard",
    "toolsRequired": ["Allen keys", "Spindle alignment tool", "Manual for ATC calibration"],
    "partsNeeded": ["New alignment bolts (if damaged)"],
    "safetyWarnings": ["Always disable the machine before working on the ATC."],
    "steps": []
  },
  {
    "code": "E021",
    "title": "Lubrication System Pressure Low",
    "category": "Lubrication",
    "severity": "low",
    "description": "The pressure in the central lubrication system is below the minimum required level.",
    "symptoms": ["Low pressure alarm", "Visible oil leaks", "Squeaking noises from moving parts"],
    "causes": ["Low oil level in the reservoir", "Clogged oil filter", "A leak in the lubrication lines"],
    "quickFix": "Check the oil level and the filter.",
    "estimatedTime": "10-15 minutes",
    "difficulty": "Easy",
    "toolsRequired": ["Funnel", "Wrench to open the filter housing"],
    "partsNeeded": ["Lubrication oil", "New oil filter"],
    "safetyWarnings": ["Use the correct type of oil as specified in the manual."],
    "steps": []
  },
  {
    "code": "E022",
    "title": "Emergency Stop Circuit Fault",
    "category": "Electrical",
    "severity": "high",
    "description": "A fault has been detected in the emergency stop circuit, preventing the machine from starting.",
    "symptoms": ["Machine does not start", "E-stop alarm on the display", "E-stop buttons are not responding"],
    "causes": ["A faulty E-stop button", "A loose wire in the E-stop circuit", "A problem with the safety relay"],
    "quickFix": "Check all E-stop buttons and their wiring.",
    "estimatedTime": "20-40 minutes",
    "difficulty": "Medium",
    "toolsRequired": ["Multimeter", "Screwdrivers"],
    "partsNeeded": ["New E-stop button", "New safety relay"],
    "safetyWarnings": ["This is a critical safety circuit. Do not bypass it."],
    "steps": []
  },
  {
    "code": "E023",
    "title": "Software License Expired",
    "category": "Software",
    "severity": "high",
    "description": "The license for a required software module has expired.",
    "symptoms": ["A specific software function is not available", "A license error message on the screen"],
    "causes": ["The software license has expired", "The license file is corrupted or missing"],
    "quickFix": "Contact Biesse support to renew the license.",
    "estimatedTime": "1-2 hours (depending on support response time)",
    "difficulty": "Easy",
    "toolsRequired": ["A computer with internet access"],
    "partsNeeded": ["A new license file"],
    "safetyWarnings": ["Do not try to crack or bypass the software license."],
    "steps": []
  }
];

const addErrorCodes = async () => {
  for (const errorCode of errorCodes) {
    try {
      const response = await fetch('http://localhost:5000/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorCode),
      });
      const data = await response.json();
      console.log('Successfully added error code:', data.title);
    } catch (error) {
      console.error('Failed to add error code:', error);
    }
  }
};

addErrorCodes();
