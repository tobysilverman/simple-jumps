import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'phosphor-react';
import './App.css';
import longJumpImage from './assets/images/LongJumpV1.png';
import highJumpImage from './assets/images/High JumpV1.png';
import reachingHighJumpImage from './assets/images/ReachingHighJumpV1.png';
import orionImage from './assets/images/OrionEverlight.png';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [strength, setStrength] = useState(12);
  const [height, setHeight] = useState(6);
  const [runningStart, setRunningStart] = useState(false);
  const [showCalcModal, setShowCalcModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuItemModal, setShowMenuItemModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showMenuContentInPanel, setShowMenuContentInPanel] = useState(false);
  const [magicItems, setMagicItems] = useState({
    bootsOfSpringing: false,
    placeholder1: false,
    placeholder2: false
  });
  const [expandedItems, setExpandedItems] = useState({
    bootsOfSpringing: false,
    placeholder1: false,
    placeholder2: false
  });
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const tabs = [
    { id: 0, name: 'Long Jump', type: 'long', buttonText: 'Long Jump' },
    { id: 1, name: 'High Jump', type: 'high', buttonText: 'High Jump' },
    { id: 2, name: 'Reaching High Jump', type: 'reach', buttonText: 'Reaching High Jump' }
  ];

  const calculateJumpDistance = () => {
    const strengthMod = Math.floor((strength - 10) / 2);
    let distance = 0;

    switch (tabs[activeTab].type) {
      case 'long':
        distance = runningStart ? strength : Math.floor(strength / 2);
        break;
      case 'high':
        distance = runningStart ? (3 + strengthMod) : Math.floor((3 + strengthMod) / 2);
        break;
      case 'reach':
        const highJump = runningStart ? (3 + strengthMod) : Math.floor((3 + strengthMod) / 2);
        distance = highJump + Math.floor(height * 1.5);
        break;
      default:
        distance = 0;
    }

    // Apply Boots of Springing and Striding multiplier
    if (magicItems.bootsOfSpringing && tabs[activeTab].type !== 'reach') {
      distance = distance * 3;
    } else if (magicItems.bootsOfSpringing && tabs[activeTab].type === 'reach') {
      // For reach, only multiply the jump height portion
      const highJump = runningStart ? (3 + strengthMod) : Math.floor((3 + strengthMod) / 2);
      const multipliedJump = highJump * 3;
      distance = multipliedJump + Math.floor(height * 1.5);
    }

    return distance;
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
    const hasBoots = magicItems.bootsOfSpringing;

    switch (tabs[activeTab].type) {
      case 'long':
        if (runningStart) {
          const baseJump = strength;
          const finalJump = hasBoots ? baseJump * 3 : baseJump;
          const movementCost = 10 + finalJump;
          let calc = `${strength} (Strength score)\n+ 10ft running start`;
          if (hasBoots) {
            calc += `\n× 3 (Boots of Springing)`;
          }
          calc += `\n──────────────────────────\nTotal Long Jump = ${finalJump} ft\n\nMovement cost: ${movementCost} ft`;
          return calc;
        } else {
          const baseJump = Math.floor(strength / 2);
          const finalJump = hasBoots ? baseJump * 3 : baseJump;
          const movementCost = finalJump;
          let calc = `${strength} (Strength score)\n÷ 2 (no run-up)`;
          if (hasBoots) {
            calc += `\n× 3 (Boots of Springing)`;
          }
          calc += `\n──────────────────────────\nTotal Long Jump = ${finalJump} ft\n\nMovement cost: ${movementCost} ft`;
          return calc;
        }
      case 'high':
        if (runningStart) {
          const baseJump = 3 + strengthMod;
          const finalJump = hasBoots ? baseJump * 3 : baseJump;
          const movementCost = 10 + Math.ceil(finalJump);
          let calc = `3 (base) + ${strengthMod} (STR mod)\n+ 10ft running start`;
          if (hasBoots) {
            calc += `\n× 3 (Boots of Springing)`;
          }
          calc += `\n──────────────────────────\nTotal High Jump = ${finalJump} ft\n\nMovement cost: ${movementCost} ft`;
          return calc;
        } else {
          const baseCalc = 3 + strengthMod;
          const baseJump = Math.floor(baseCalc / 2);
          const finalJump = hasBoots ? baseJump * 3 : baseJump;
          const movementCost = Math.ceil(finalJump);
          let calc = `3 (base) + ${strengthMod} (STR mod)\n÷ 2 (no run-up)`;
          if (hasBoots) {
            calc += `\n× 3 (Boots of Springing)`;
          }
          calc += `\n──────────────────────────\nTotal High Jump = ${finalJump} ft\n\nMovement cost: ${movementCost} ft`;
          return calc;
        }
      case 'reach':
        if (runningStart) {
          const baseJumpHeight = 3 + strengthMod;
          const jumpHeight = hasBoots ? baseJumpHeight * 3 : baseJumpHeight;
          const reachAdd = Math.floor(height * 1.5);
          const total = jumpHeight + reachAdd;
          const movementCost = 10 + Math.ceil(jumpHeight);
          let calc = `3 (base) + ${strengthMod} (STR mod)\n= ${baseJumpHeight} ft`;
          if (hasBoots) {
            calc += `\n× 3 (Boots of Springing)\n= ${jumpHeight} ft`;
          }
          calc += `\n+ ${reachAdd} ft (reach: 1.5 × height)\n──────────────────────────\nTotal Reach = ${total} ft\n\nMovement cost: ${movementCost} ft`;
          return calc;
        } else {
          const baseCalc = 3 + strengthMod;
          const baseJumpHeight = Math.floor(baseCalc / 2);
          const jumpHeight = hasBoots ? baseJumpHeight * 3 : baseJumpHeight;
          const reachAdd = Math.floor(height * 1.5);
          const total = jumpHeight + reachAdd;
          const movementCost = Math.ceil(jumpHeight);
          let calc = `3 (base) + ${strengthMod} (STR mod)\n÷ 2 (no run-up)`;
          if (hasBoots) {
            calc += `\n× 3 (Boots of Springing)`;
          }
          calc += `\n+ ${reachAdd} ft (reach: 1.5 × height)\n──────────────────────────\nTotal Reach = ${total} ft\n\nMovement cost: ${movementCost} ft`;
          return calc;
        }
      default:
        return '';
    }
  };

  const toggleItemExpansion = (itemKey) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
    if (isMobile) {
      setShowMenuItemModal(true);
      setShowMenu(false);
      // Ensure modal scrolls to top when opened
      setTimeout(() => {
        const modalBody = document.querySelector('.menu-item-modal-body');
        if (modalBody) {
          modalBody.scrollTop = 0;
        }
      }, 0);
    } else {
      setShowMenuContentInPanel(true);
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setShowMenuContentInPanel(false);
    setSelectedMenuItem(null);
  };

  const menuItems = [
    { id: 'magic-items', name: 'Jump Boosts' },
    { id: 'official-rules', name: 'Rules' },
    { id: 'about', name: 'About' }
  ];

  const mobileMenuItems = [
    ...menuItems,
    { id: 'download-app', name: 'Download App' }
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const visibleMenuItems = isMobile ? mobileMenuItems : menuItems;

  return (
    <div className="app">
      {/* Theme Toggle Button - Fixed Top Right */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? (
          <Moon size={20} weight="fill" />
        ) : (
          <Sun size={20} weight="fill" />
        )}
      </button>

      {/* Hamburger Menu Button - Mobile Only */}
      {isMobile && (
        <button
          className="hamburger-btn"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      )}

      {/* Menu Overlay */}
      {showMenu && (
        <div className="menu-overlay" onClick={() => setShowMenu(false)}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="menu-close"
              onClick={() => setShowMenu(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            <nav className="menu-nav">
              {visibleMenuItems.map((item) => (
                <button
                  key={item.id}
                  className="menu-item"
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Menu Item Modal */}
      {showMenuItemModal && selectedMenuItem && (
        <div className="modal-overlay" onClick={() => setShowMenuItemModal(false)}>
          <div className="menu-item-modal" onClick={(e) => e.stopPropagation()}>
            <div className="menu-item-modal-header">
              <h2 className="menu-item-modal-title">{selectedMenuItem.name}</h2>
              <button
                className="modal-close"
                onClick={() => setShowMenuItemModal(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="menu-item-modal-body">
              {selectedMenuItem.id === 'official-rules' ? (
                <div className="rules-content mobile-rules">
                  <div className="rules-section">
                    <h2 className="rules-section-title">Long Jump</h2>
                    <p className="rules-text">
                      When you make a long jump, you cover a number of feet up to your Strength score if you move at least 10 feet on foot immediately before the jump. When you make a standing long jump, you can leap only half that distance. Either way, each foot you clear on the jump costs a foot of movement.
                    </p>
                    <p className="rules-text">
                      This rule assumes that the height of your jump doesn't matter, such as a jump across a stream or chasm. At your GM's option, you must succeed on a DC 10 Strength (Athletics) check to clear a low obstacle (no taller than a quarter of the jump's distance), such as a hedge or low wall. Otherwise, you hit it.
                    </p>
                    <p className="rules-text">
                      When you land in difficult terrain, you must succeed on a DC 10 Dexterity (Acrobatics) check to land on your feet. Otherwise, you land prone.
                    </p>
                  </div>

                  <div className="rules-section">
                    <h2 className="rules-section-title">High Jump</h2>
                    <p className="rules-text">
                      When you make a high jump, you leap into the air a number of feet equal to 3 + your Strength modifier if you move at least 10 feet on foot immediately before the jump. When you make a standing high jump, you can jump only half that distance. Either way, each foot you clear on the jump costs a foot of movement. In some circumstances, your GM might allow you to make a Strength (Athletics) check to jump higher than you normally can.
                    </p>
                    <p className="rules-text">
                      You can extend your arms half your height above yourself during the jump. Thus, you can reach above you a distance equal to the height of the jump plus 1½ times your height.
                    </p>
                  </div>
                </div>
              ) : selectedMenuItem.id === 'about' ? (
                <div className="about-content mobile-about">
                  <div className="about-mobile-layout">
                    <img src={orionImage} alt="Toby Silverman" className="about-image-mobile" />
                    <p className="about-text">
                      My table had a tough time remembering the rules for jumping. Hope this helps yours.
                    </p>
                    <p className="about-text about-dedication">
                      Dedicated to Bowser the Butcher; may he find peace — and remember how to jump.
                    </p>
                    <p className="about-text about-signature">
                      Built with ❤️ in San Francisco by{' '}
                      <a href="https://design.tobysilverman.com" target="_blank" rel="noopener noreferrer" className="about-link">
                        Toby Silverman
                      </a>.
                    </p>
                  </div>
                </div>
              ) : selectedMenuItem.id === 'magic-items' ? (
                <div className="boons-content mobile-boons">
                  <div className="boons-list">
                    <div className="boon-item">
                      <div className="boon-item-row">
                        <div className="boon-item-content">
                          <label className="boon-checkbox-label">
                            <input
                              type="checkbox"
                              checked={magicItems.bootsOfSpringing}
                              onChange={(e) => setMagicItems({...magicItems, bootsOfSpringing: e.target.checked})}
                              className="boon-checkbox"
                            />
                            <span className="boon-custom-checkbox">
                              <span className="boon-checkmark"></span>
                            </span>
                            <span className="boon-name">Boots of Springing and Striding</span>
                          </label>
                          {expandedItems.bootsOfSpringing && (
                            <div className="boon-description">
                              While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow.
                            </div>
                          )}
                        </div>
                        <button
                          className={`boon-caret ${expandedItems.bootsOfSpringing ? 'expanded' : ''}`}
                          onClick={() => toggleItemExpansion('bootsOfSpringing')}
                          aria-label="Toggle description"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="boon-item">
                      <div className="boon-item-row">
                        <div className="boon-item-content">
                          <label className="boon-checkbox-label">
                            <input
                              type="checkbox"
                              checked={magicItems.placeholder1}
                              onChange={(e) => setMagicItems({...magicItems, placeholder1: e.target.checked})}
                              className="boon-checkbox"
                              disabled
                            />
                            <span className="boon-custom-checkbox disabled">
                              <span className="boon-checkmark"></span>
                            </span>
                            <span className="boon-name disabled">Ring of Jumping (Coming Soon)</span>
                          </label>
                          {expandedItems.placeholder1 && (
                            <div className="boon-description">
                              Coming soon...
                            </div>
                          )}
                        </div>
                        <button
                          className={`boon-caret ${expandedItems.placeholder1 ? 'expanded' : ''}`}
                          onClick={() => toggleItemExpansion('placeholder1')}
                          aria-label="Toggle description"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="boon-item">
                      <div className="boon-item-row">
                        <div className="boon-item-content">
                          <label className="boon-checkbox-label">
                            <input
                              type="checkbox"
                              checked={magicItems.placeholder2}
                              onChange={(e) => setMagicItems({...magicItems, placeholder2: e.target.checked})}
                              className="boon-checkbox"
                              disabled
                            />
                            <span className="boon-custom-checkbox disabled">
                              <span className="boon-checkmark"></span>
                            </span>
                            <span className="boon-name disabled">Jump Spell (Coming Soon)</span>
                          </label>
                          {expandedItems.placeholder2 && (
                            <div className="boon-description">
                              Coming soon...
                            </div>
                          )}
                        </div>
                        <button
                          className={`boon-caret ${expandedItems.placeholder2 ? 'expanded' : ''}`}
                          onClick={() => toggleItemExpansion('placeholder2')}
                          aria-label="Toggle description"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="menu-item-placeholder">Content Area</p>
              )}
            </div>
          </div>
        </div>
      )}
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

          {/* Desktop Menu Items in Left Panel */}
          {!isMobile && (
            <div className="menu-items-section">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`panel-menu-item ${selectedMenuItem?.id === item.id && showMenuContentInPanel ? 'active' : ''}`}
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
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
                <h3 className="modal-title h4">{getModalTitleAndDescription().title}</h3>
                <p className="modal-description body-base">{getModalTitleAndDescription().description}</p>
                <div className="modal-calculation-text">
                  {getCalculationExplanation()}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`illustration-section ${tabs[activeTab].type === 'long' ? 'long-background' : ''} ${tabs[activeTab].type === 'high' ? 'high-background' : ''} ${tabs[activeTab].type === 'reach' ? 'reach-background' : ''}`}>
          {/* Show menu content or jump illustration based on state */}
          {showMenuContentInPanel && selectedMenuItem ? (
            <div className="panel-content-container">
              <button
                className="panel-close-btn"
                onClick={() => {
                  setShowMenuContentInPanel(false);
                  setSelectedMenuItem(null);
                }}
                aria-label="Close"
              >
                ×
              </button>
              <div className="panel-content">
                {selectedMenuItem.id === 'official-rules' ? (
                  <div className="rules-content">
                    <h1 className="rules-main-title h2">Rules</h1>

                    <div className="rules-section">
                      <h2 className="rules-section-title h5">Long Jump</h2>
                      <p className="rules-text">
                        When you make a long jump, you cover a number of feet up to your Strength score if you move at least 10 feet on foot immediately before the jump. When you make a standing long jump, you can leap only half that distance. Either way, each foot you clear on the jump costs a foot of movement.
                      </p>
                      <p className="rules-text">
                        This rule assumes that the height of your jump doesn't matter, such as a jump across a stream or chasm. At your GM's option, you must succeed on a DC 10 Strength (Athletics) check to clear a low obstacle (no taller than a quarter of the jump's distance), such as a hedge or low wall. Otherwise, you hit it.
                      </p>
                      <p className="rules-text">
                        When you land in difficult terrain, you must succeed on a DC 10 Dexterity (Acrobatics) check to land on your feet. Otherwise, you land prone.
                      </p>
                    </div>

                    <div className="rules-section">
                      <h2 className="rules-section-title h5">High Jump</h2>
                      <p className="rules-text">
                        When you make a high jump, you leap into the air a number of feet equal to 3 + your Strength modifier if you move at least 10 feet on foot immediately before the jump. When you make a standing high jump, you can jump only half that distance. Either way, each foot you clear on the jump costs a foot of movement. In some circumstances, your GM might allow you to make a Strength (Athletics) check to jump higher than you normally can.
                      </p>
                      <p className="rules-text">
                        You can extend your arms half your height above yourself during the jump. Thus, you can reach above you a distance equal to the height of the jump plus 1½ times your height.
                      </p>
                    </div>
                  </div>
                ) : selectedMenuItem.id === 'about' ? (
                  <div className="about-content">
                    <div className="about-columns">
                      <div className="about-image-column">
                        <img src={orionImage} alt="Toby Silverman" className="about-image" />
                      </div>
                      <div className="about-text-column">
                        <h1 className="about-title h2">About</h1>
                        <p className="about-text">
                          My table had a tough time remembering the rules for jumping. Hope this helps yours.
                        </p>
                        <p className="about-text">
                          Dedicated to Bowser the Butcher; may he find peace — and remember how to jump.
                        </p>
                        <p className="about-text about-signature">
                          Built with ❤️ in San Francisco by{' '}
                          <a href="https://design.tobysilverman.com" target="_blank" rel="noopener noreferrer" className="about-link">
                            Toby Silverman
                          </a>.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : selectedMenuItem.id === 'magic-items' ? (
                  <div className="boons-content">
                    <h1 className="boons-title h2">Jump Boosts</h1>
                    <div className="boons-list">
                      <div className="boon-item">
                        <label className="boon-checkbox-label">
                          <input
                            type="checkbox"
                            checked={magicItems.bootsOfSpringing}
                            onChange={(e) => setMagicItems({...magicItems, bootsOfSpringing: e.target.checked})}
                            className="boon-checkbox"
                          />
                          <span className="boon-custom-checkbox">
                            <span className="boon-checkmark"></span>
                          </span>
                          <span className="boon-name">Boots of Springing and Striding</span>
                        </label>
                        <div className="boon-info-icon" data-tooltip="While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow.">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                            <path d="M10 14V9M10 6V6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                      <div className="boon-item">
                        <label className="boon-checkbox-label">
                          <input
                            type="checkbox"
                            checked={magicItems.placeholder1}
                            onChange={(e) => setMagicItems({...magicItems, placeholder1: e.target.checked})}
                            className="boon-checkbox"
                            disabled
                          />
                          <span className="boon-custom-checkbox disabled">
                            <span className="boon-checkmark"></span>
                          </span>
                          <span className="boon-name disabled">Ring of Jumping (Coming Soon)</span>
                        </label>
                        <div className="boon-info-icon" data-tooltip="Coming soon...">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                            <path d="M10 14V9M10 6V6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                      <div className="boon-item">
                        <label className="boon-checkbox-label">
                          <input
                            type="checkbox"
                            checked={magicItems.placeholder2}
                            onChange={(e) => setMagicItems({...magicItems, placeholder2: e.target.checked})}
                            className="boon-checkbox"
                            disabled
                          />
                          <span className="boon-custom-checkbox disabled">
                            <span className="boon-checkmark"></span>
                          </span>
                          <span className="boon-name disabled">Jump Spell (Coming Soon)</span>
                        </label>
                        <div className="boon-info-icon" data-tooltip="Coming soon...">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                            <path d="M10 14V9M10 6V6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="panel-content-title">{selectedMenuItem.name}</h2>
                    <p className="panel-content-placeholder">Content Area for Selected Nav Item</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.buttonText}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

