import React, { useState } from 'react';
import './App.css';
import longJumpImage from './assets/images/LongJumpV1.png';
import highJumpImage from './assets/images/High JumpV1.png';
import reachingHighJumpImage from './assets/images/ReachingHighJumpV1.png';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [strength, setStrength] = useState(12);
  const [height, setHeight] = useState(6);
  const [runningStart, setRunningStart] = useState(false);
  const [showCalcModal, setShowCalcModal] = useState(false);

  const tabs = [
    { id: 0, name: 'Long Jump', type: 'long', buttonText: 'Long Jump' },
    { id: 1, name: 'High Jump', type: 'high', buttonText: 'High Jump' },
    { id: 2, name: 'Reaching High Jump', type: 'reach', buttonText: 'Reaching High Jump' }
  ];

  const calculateJumpDistance = () => {
    const strengthMod = Math.floor((strength - 10) / 2);
    
    switch (tabs[activeTab].type) {
      case 'long':
        return runningStart ? strength : Math.floor(strength / 2);
      case 'high':
        return runningStart ? (3 + strengthMod) : Math.floor((3 + strengthMod) / 2);
      case 'reach':
        const highJump = runningStart ? (3 + strengthMod) : Math.floor((3 + strengthMod) / 2);
        return highJump + Math.floor(height * 1.5);
      default:
        return 0;
    }
  };

  const jumpDistance = calculateJumpDistance();

  const getModalTitleAndDescription = () => {
    switch (tabs[activeTab].type) {
      case 'long':
        if (runningStart) {
          return {
            title: 'Running Long Jump',
            description: 'With a running start, you can jump your strength score horizontally'
          };
        } else {
          return {
            title: 'Standing Long Jump',
            description: 'Without a running start, you can jump half your strength score horizontally'
          };
        }
      case 'high':
        if (runningStart) {
          return {
            title: 'Running High Jump',
            description: 'With a running start, you can jump vertically 3 plus your strength modifier'
          };
        } else {
          return {
            title: 'Standing High Jump',
            description: 'Without a running start, you can jump vertically up to 3+your Strength Modifier divided by 2'
          };
        }
      case 'reach':
        return {
          title: 'Reaching High Jump',
          description: 'You can jump up and reach something that is 1.5 times your height + your High Jump'
        };
      default:
        return { title: '', description: '' };
    }
  };

  const getCalculationExplanation = () => {
    const strengthMod = Math.floor((strength - 10) / 2);

    switch (tabs[activeTab].type) {
      case 'long':
        if (runningStart) {
          const movementCost = 10 + strength;
          return `${strength} (Strength score)\n+ 10ft running start\n──────────────────────────\nTotal Long Jump = ${strength} ft\n\nMovement cost: ${movementCost} ft`;
        } else {
          const result = Math.floor(strength / 2);
          return `${strength} (Strength score)\n÷ 2 (no run-up)\n──────────────────────────\nTotal Long Jump = ${result} ft\n\nMovement cost: ${result} ft`;
        }
      case 'high':
        if (runningStart) {
          const result = 3 + strengthMod;
          const movementCost = 10 + Math.ceil(result);
          return `3 (base) + ${strengthMod} (STR mod)\n+ 10ft running start\n──────────────────────────\nTotal High Jump = ${result} ft\n\nMovement cost: ${movementCost} ft`;
        } else {
          const baseCalc = 3 + strengthMod;
          const result = Math.floor(baseCalc / 2);
          const movementCost = Math.ceil(result);
          return `3 (base) + ${strengthMod} (STR mod)\n÷ 2 (no run-up)\n──────────────────────────\nTotal High Jump = ${result} ft\n\nMovement cost: ${movementCost} ft`;
        }
      case 'reach':
        if (runningStart) {
          const jumpHeight = 3 + strengthMod;
          const reachAdd = Math.floor(height * 1.5);
          const total = jumpHeight + reachAdd;
          const movementCost = 10 + Math.ceil(jumpHeight);
          return `3 (base) + ${strengthMod} (STR mod)\n= ${jumpHeight} ft\n+ ${reachAdd} ft (reach: 1.5 × height)\n──────────────────────────\nTotal Reach = ${total} ft\n\nMovement cost: ${movementCost} ft`;
        } else {
          const baseCalc = 3 + strengthMod;
          const jumpHeight = Math.floor(baseCalc / 2);
          const reachAdd = Math.floor(height * 1.5);
          const total = jumpHeight + reachAdd;
          const movementCost = Math.ceil(jumpHeight);
          return `3 (base) + ${strengthMod} (STR mod)\n÷ 2 (no run-up)\n+ ${reachAdd} ft (reach: 1.5 × height)\n──────────────────────────\nTotal Reach = ${total} ft\n\nMovement cost: ${movementCost} ft`;
        }
      default:
        return '';
    }
  };

  return (
    <div className="app">
      <div className="main-card">
        <div className="controls-section">
          <div className="header-section">
            <div className="distance-display">
              <button
                className="info-icon-btn distance-info"
                onClick={() => setShowCalcModal(true)}
                aria-label="Show calculations"
              >
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 14V9M10 6V6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="distance-value">
                <span className="distance-number">{jumpDistance}</span>
                <span className="distance-unit">ft</span>
              </div>
              <span className="jump-type">
                {tabs[activeTab].name.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="controls-area">
            <div className="control-group">
              <div className="control-item">
                <button 
                  className="control-btn"
                  onClick={() => setStrength(Math.max(1, strength - 1))}
                >
                  -
                </button>
                <span className="control-value">{strength}</span>
                <button 
                  className="control-btn"
                  onClick={() => setStrength(strength + 1)}
                >
                  +
                </button>
              </div>
              <label className="control-label">Strength</label>
            </div>

            {tabs[activeTab].type === 'reach' && (
              <div className="control-group">
                <div className="control-item">
                  <button 
                    className="control-btn"
                    onClick={() => setHeight(Math.max(1, height - 1))}
                  >
                    -
                  </button>
                  <span className="control-value">{height}</span>
                  <button 
                    className="control-btn"
                    onClick={() => setHeight(height + 1)}
                  >
                    +
                  </button>
                </div>
                <label className="control-label">Height</label>
              </div>
            )}

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={runningStart}
                  onChange={(e) => setRunningStart(e.target.checked)}
                />
                <span className="custom-checkbox">
                  <span className="checkmark"></span>
                </span>
                <span>Add 10ft running start</span>
              </label>
            </div>
          </div>
        </div>

        {showCalcModal && (
          <div className="modal-overlay" onClick={() => setShowCalcModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setShowCalcModal(false)}
                aria-label="Close modal"
              >
                ×
              </button>
              <div className="modal-body">
                <h3 className="modal-title">{getModalTitleAndDescription().title}</h3>
                <p className="modal-description">{getModalTitleAndDescription().description}</p>
                <div className="modal-calculation-text">
                  {getCalculationExplanation()}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`illustration-section ${tabs[activeTab].type === 'long' ? 'long-background' : ''} ${tabs[activeTab].type === 'high' ? 'high-background' : ''} ${tabs[activeTab].type === 'reach' ? 'reach-background' : ''}`}>
          {tabs[activeTab].type === 'long' && (
            <img 
              src={longJumpImage} 
              alt="Character performing a long jump across cliffs" 
              className="jump-image"
            />
          )}
          {tabs[activeTab].type === 'high' && (
            <img 
              src={highJumpImage} 
              alt="Character performing a high jump" 
              className="jump-image"
              onError={(e) => console.error('Failed to load high-jump.png:', e)}
              onLoad={() => console.log('Successfully loaded high-jump.png')}
            />
          )}
          {tabs[activeTab].type === 'reach' && (
            <img 
              src={reachingHighJumpImage} 
              alt="Character performing a reaching high jump" 
              className="jump-image"
            />
          )}
        </div>
      </div>

      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.buttonText}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

