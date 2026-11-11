'use client';

import React from 'react';

interface RegistrationClosedButtonProps {
    style?: React.CSSProperties;
    className?: string;
    label?: string;
    size?: 'sm' | 'md' | 'lg' | string;
    showBadge?: boolean;
    badgeText?: string;
    fullWidth?: boolean;
}

export default function RegistrationClosedButton({
    style,
    className = '',
    label,
    size = 'md',
    showBadge = true,
    badgeText,
    fullWidth = false,
}: RegistrationClosedButtonProps) {
    const displayLabel = label || badgeText || 'Event Completed • Registration Closed';
    const padding = size === 'sm' ? '8px 16px' : size === 'lg' ? '16px 32px' : '13px 26px';
    const fontSize = size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem';

    return (
        <span
            role="status"
            aria-label={displayLabel}
            className={`reg-closed-badge ${className}`}
            style={{
                display: fullWidth ? 'flex' : 'inline-flex',
                width: fullWidth ? '100%' : 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#334155',
                color: '#FFFFFF',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                padding,
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.18)',
                userSelect: 'none',
                boxSizing: 'border-box',
                ...style,
            }}
        >
            {showBadge && (
                <span
                    style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#94A3B8',
                        display: 'inline-block',
                    }}
                />
            )}
            {displayLabel}
        </span>
    );
}
