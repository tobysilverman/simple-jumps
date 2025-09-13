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

  const getCalculationExplanation = () => {
    const strengthMod = Math.floor((strength - 10) / 2);
    const strengthModText = strengthMod >= 0 ? `+${strengthMod}` : `${strengthMod}`;
    
    switch (tabs[activeTab].type) {
      case 'long':
        if (runningStart) {
          return `${strength} (Strength score)\n\n= ${strength} ft (run-up met)\n\nMovement cost: ${strength} ft`;
        } else {
          const result = Math.floor(strength / 2);
          return `${strength} (Strength score)\n\n÷ 2 (no run-up) → round down\n\n= ${result} ft\n\nMovement cost: ${result} ft`;
        }
      case 'high':
        if (runningStart) {
          const result = 3 + strengthMod;
          return `3 (base) + ${strengthMod} (Strength mod)\n\n= ${result} ft (run-up met)\n\nMovement cost: ${result} ft`;
        } else {
          const baseCalc = 3 + strengthMod;
          const result = Math.floor(baseCalc / 2);
          return `3 (base) + ${strengthMod} (Strength mod)\n\n= ${baseCalc}\n\n÷ 2 (no run-up) → round down\n\n= ${result} ft\n\nMovement cost: ${result} ft`;
        }
      case 'reach':
        if (runningStart) {
          const jumpHeight = 3 + strengthMod;
          const reachAdd = Math.floor(height * 1.5);
          const total = jumpHeight + reachAdd;
          return `Jump height = 3 + ${strengthMod} = ${jumpHeight} ft (run-up met)\n\nReach add = 1.5 × ${height} = ${reachAdd} ft\n\nTotal reachable height = ${jumpHeight} + ${reachAdd} = ${total} ft`;
        } else {
          const baseCalc = 3 + strengthMod;
          const jumpHeight = Math.floor(baseCalc / 2);
          const reachAdd = Math.floor(height * 1.5);
          const total = jumpHeight + reachAdd;
          return `Base = 3 + ${strengthMod} = ${baseCalc}\n\nStanding: ÷ 2 → round down\n\nJump height = ${jumpHeight} ft\n\nReach add = 1.5 × ${height} = ${reachAdd} ft\n\nTotal reachable height = ${jumpHeight} + ${reachAdd} = ${total} ft`;
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
              <div className="distance-value">
                <span className="distance-number">{jumpDistance}</span>
                <span className="distance-unit">ft</span>
              </div>
              <div className="jump-type">
                {tabs[activeTab].name.toUpperCase()}
              </div>
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

          <div className="calculation-display">
            <div className="calculation-text">
              {getCalculationExplanation()}
            </div>
          </div>
        </div>

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

