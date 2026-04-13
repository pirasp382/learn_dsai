
import React from 'react';
import './number_output.css';

const NumberOutput = ({ title, value, subtitle, currency = "€" }) => {
    
    const formatNumber = (number) => {
        let cleanNumber = String(number).replace(/[^0-9,.-]/g, '');
        
        let numValue = parseFloat(cleanNumber);
        
        if (isNaN(numValue)) {
            return number;
        }
        
        return numValue.toLocaleString('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        });
    };
    
    const isFormatted = (str) => {
        return typeof str === 'string' && (str.includes('.') || str.includes(','));
    };
    
    const getDisplayValue = () => {
        if (!value) return '—';
        
        let cleanValue = value;
        if (typeof value === 'string') {
            cleanValue = value.replace('€', '').replace('$', '').trim();
        }
        
        const formattedNumber = formatNumber(cleanValue);
        
        if (typeof value === 'string' && value.includes('$')) {
            return `$${formattedNumber}`;
        }
        
        return `${formattedNumber} ${currency}`;
    };
    
    return (
        <div className="number-output-card">
            {subtitle && <div className="output-subtitle">{subtitle}</div>}
            <div className="output-title">{title}</div>
            <div className="output-value">
                <span className="value">{getDisplayValue()}</span>
            </div>
        </div>
    );
};

export default NumberOutput;