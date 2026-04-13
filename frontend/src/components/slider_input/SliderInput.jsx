
import React from 'react';
import './SliderInput.css';

const SliderInput = ({ 
    id, 
    value, 
    onChange, 
    min, 
    max, 
    step, 
    title, 
    hasTooltip = false, 
    toolTipText = "",
    unit = "",
    icon = ""
}) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    const handleSliderChange = (e) => {
        onChange(e);
    };
    
    const handleNumberChange = (e) => {
        onChange(e);
    };
    
    return (
        <div className="slider-input-container">
            <div className="slider-header">
                <div className="slider-title">
                    {icon && <span className="slider-icon">{icon}</span>}
                    <label htmlFor={id} className="slider-label">
                        {title}
                    </label>
                    {hasTooltip && (
                        <span className="tooltip-icon" title={toolTipText}>ⓘ</span>
                    )}
                </div>
                <div className="slider-value-container">
                    <input
                        type="number"
                        id={`${id}_number`}
                        className="slider-number-input"
                        value={value}
                        onChange={handleNumberChange}
                        min={min}
                        max={max}
                        step={step}
                    />
                    {unit && <span className="slider-unit">{unit}</span>}
                </div>
            </div>
            
            <div className="slider-track-container">
                <input
                    type="range"
                    id={id}
                    className="slider"
                    value={value}
                    onChange={handleSliderChange}
                    min={min}
                    max={max}
                    step={step}
                    style={{
                        background: `linear-gradient(to right, #667eea 0%, #667eea ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`
                    }}
                />
                <div className="slider-markers">
                    <span>{min}</span>
                    <span>{min + (max - min) * 0.25}</span>
                    <span>{min + (max - min) * 0.5}</span>
                    <span>{min + (max - min) * 0.75}</span>
                    <span>{max}</span>
                </div>
            </div>
            
            <div className="slider-hint">
                <small>{toolTipText}</small>
            </div>
        </div>
    );
};

export default SliderInput;