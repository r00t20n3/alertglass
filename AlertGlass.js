// AlertGlass.js - Glass Morphism Alert System
// Made by Frank I.
// A unique, modern alert system with glass morphism design
// Supports: success, error, warning, info, and dialog (yes/no) alerts

(function() {
    'use strict';

    // Inject CSS styles
    const styles = `
        .glass-morph-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            width: 100%;
        }

        .glass-morph-item {
            background: rgba(0, 0, 0, 0.95);
            -webkit-backdrop-filter: blur(20px);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 12px;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
            opacity: 0;
            -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .glass-morph-item.show {
            -webkit-transform: translateX(0);
            transform: translateX(0);
            opacity: 1;
        }

        .glass-morph-item.hide {
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
            opacity: 0;
        }

        .glass-morph-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        }

        .glass-morph-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .glass-morph-title {
            font-weight: 600;
            font-size: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .glass-morph-icon {
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 12px;
        }

        .glass-morph-close {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.7);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            transition: all 0.2s ease;
        }

        .glass-morph-close:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            -webkit-transform: scale(1.05);
            transform: scale(1.05);
        }

        .glass-morph-message {
            line-height: 1.5;
            margin-bottom: 12px;
        }

        .glass-morph-actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
        }

        .glass-morph-btn {
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            border: 1px solid;
            transition: all 0.2s ease;
            background: transparent;
            color: inherit;
        }

        .glass-morph-btn:hover {
            -webkit-transform: translateY(-1px);
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* Alert Types */
        .glass-morph-success {
            border-color: rgba(34, 197, 94, 0.3);
            background: rgba(34, 197, 94, 0.1);
        }

        .glass-morph-success .glass-morph-icon {
            background: rgba(34, 197, 94, 0.2);
            color: #22c55e;
        }

        .glass-morph-success .glass-morph-btn {
            border-color: rgba(34, 197, 94, 0.3);
            color: #22c55e;
        }

        .glass-morph-success .glass-morph-btn:hover {
            background: rgba(34, 197, 94, 0.1);
        }

        .glass-morph-error {
            border-color: rgba(239, 68, 68, 0.3);
            background: rgba(239, 68, 68, 0.1);
        }

        .glass-morph-error .glass-morph-icon {
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
        }

        .glass-morph-error .glass-morph-btn {
            border-color: rgba(239, 68, 68, 0.3);
            color: #ef4444;
        }

        .glass-morph-error .glass-morph-btn:hover {
            background: rgba(239, 68, 68, 0.1);
        }

        .glass-morph-warning {
            border-color: rgba(251, 191, 36, 0.3);
            background: rgba(251, 191, 36, 0.1);
        }

        .glass-morph-warning .glass-morph-icon {
            background: rgba(251, 191, 36, 0.2);
            color: #fbbf24;
        }

        .glass-morph-warning .glass-morph-btn {
            border-color: rgba(251, 191, 36, 0.3);
            color: #fbbf24;
        }

        .glass-morph-warning .glass-morph-btn:hover {
            background: rgba(251, 191, 36, 0.1);
        }

        .glass-morph-info {
            border-color: rgba(59, 130, 246, 0.3);
            background: rgba(59, 130, 246, 0.1);
        }

        .glass-morph-info .glass-morph-icon {
            background: rgba(59, 130, 246, 0.2);
            color: #3b82f6;
        }

        .glass-morph-info .glass-morph-btn {
            border-color: rgba(59, 130, 246, 0.3);
            color: #3b82f6;
        }

        .glass-morph-info .glass-morph-btn:hover {
            background: rgba(59, 130, 246, 0.1);
        }

        /* Dialog specific styles */
        .glass-morph-dialog {
            border-color: rgba(139, 92, 246, 0.3);
            background: rgba(139, 92, 246, 0.1);
        }

        .glass-morph-dialog .glass-morph-icon {
            background: rgba(139, 92, 246, 0.2);
            color: #8b5cf6;
        }

        .glass-morph-dialog .glass-morph-btn {
            border-color: rgba(139, 92, 246, 0.3);
            color: #8b5cf6;
        }

        .glass-morph-dialog .glass-morph-btn:hover {
            background: rgba(139, 92, 246, 0.1);
        }

        .glass-morph-dialog .glass-morph-btn.btn-primary {
            background: rgba(139, 92, 246, 0.2);
            color: #8b5cf6;
        }

        .glass-morph-dialog .glass-morph-btn.btn-primary:hover {
            background: rgba(139, 92, 246, 0.3);
        }

        /* Responsive */
        @media (max-width: 480px) {
            .glass-morph-container {
                right: 20px;
                left: 5%;
                max-width: 90%;
                width: 90%;
            }
            
            .glass-morph-item {
                padding: 14px 16px;
                font-size: 13px;
            }
            
            .glass-morph-title {
                font-size: 14px;
            }
        }

        /* Animation keyframes */
        @-webkit-keyframes slideIn {
            from {
                -webkit-transform: translateX(100%);
                opacity: 0;
            }
            to {
                -webkit-transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideIn {
            from {
                -webkit-transform: translateX(100%);
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                -webkit-transform: translateX(0);
                transform: translateX(0);
                opacity: 1;
            }
        }

        @-webkit-keyframes slideOut {
            from {
                -webkit-transform: translateX(0);
                opacity: 1;
            }
            to {
                -webkit-transform: translateX(100%);
                opacity: 0;
            }
        }

        @keyframes slideOut {
            from {
                -webkit-transform: translateX(0);
                transform: translateX(0);
                opacity: 1;
            }
            to {
                -webkit-transform: translateX(100%);
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;

    // Inject styles
    if (!document.getElementById('glass-morph-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'glass-morph-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Create container if it doesn't exist
    function getContainer() {
        let container = document.getElementById('glass-morph-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'glass-morph-container';
            container.className = 'glass-morph-container';
            document.body.appendChild(container);
        }
        return container;
    }

    // Alert configuration
    const config = {
        defaultDuration: 5000,
        maxAlerts: 5,
        icons: {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ',
            dialog: '?'
        }
    };

    // Alert queue
    let alertQueue = [];
    let alertCounter = 0;

    // Create alert element
    function createAlert(options) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = config.defaultDuration,
            closable = true,
            actions = null
        } = options;

        const alertId = `glass-morph-${++alertCounter}`;
        const container = getContainer();
        
        // Remove old alerts if too many
        const existingAlerts = container.querySelectorAll('.glass-morph-item');
        if (existingAlerts.length >= config.maxAlerts) {
            existingAlerts[0].remove();
        }

        const alertEl = document.createElement('div');
        alertEl.id = alertId;
        alertEl.className = `glass-morph-item glass-morph-${type}`;
        
        const icon = config.icons[type] || config.icons.info;
        
        alertEl.innerHTML = `
            <div class="glass-morph-header">
                <div class="glass-morph-title">
                    <span class="glass-morph-icon">${icon}</span>
                    ${title}
                </div>
                ${closable ? '<button class="glass-morph-close" onclick="AlertGlass.close(\'' + alertId + '\')">×</button>' : ''}
            </div>
            <div class="glass-morph-message">${message}</div>
            ${actions ? '<div class="glass-morph-actions">' + actions.map(action => 
                `<button class="glass-morph-btn ${action.primary ? 'btn-primary' : ''}" onclick="AlertGlass.handleAction('${alertId}', '${action.key}')">${action.text}</button>`
            ).join('') + '</div>' : ''}
        `;

        container.appendChild(alertEl);

        // Show animation
        setTimeout(() => {
            alertEl.classList.add('show');
        }, 10);

        // Auto-close if duration is set
        if (duration > 0) {
            setTimeout(() => {
                close(alertId);
            }, duration);
        }

        return alertId;
    }

    // Close alert
    function close(alertId) {
        const alertEl = document.getElementById(alertId);
        if (alertEl) {
            alertEl.classList.add('hide');
            setTimeout(() => {
                if (alertEl.parentNode) {
                    alertEl.remove();
                }
            }, 300);
        }
    }

    // Handle dialog actions
    function handleAction(alertId, actionKey) {
        const alertEl = document.getElementById(alertId);
        if (alertEl) {
            const callback = alertEl._callback;
            if (callback && typeof callback === 'function') {
                callback(actionKey);
            }
            close(alertId);
        }
    }

    // Public API
    window.AlertGlass = {
        // Show success alert
        success: function(message, title = 'Success', options = {}) {
            return createAlert({
                type: 'success',
                title,
                message,
                ...options
            });
        },

        // Show error alert
        error: function(message, title = 'Error', options = {}) {
            return createAlert({
                type: 'error',
                title,
                message,
                ...options
            });
        },

        // Show warning alert
        warning: function(message, title = 'Warning', options = {}) {
            return createAlert({
                type: 'warning',
                title,
                message,
                ...options
            });
        },

        // Show info alert
        info: function(message, title = 'Info', options = {}) {
            return createAlert({
                type: 'info',
                title,
                message,
                ...options
            });
        },

        // Show dialog with yes/no options
        dialog: function(message, title = 'Confirm', callback, options = {}) {
            const alertId = createAlert({
                type: 'dialog',
                title,
                message,
                duration: 0, // No auto-close for dialogs
                closable: false,
                actions: [
                    { key: 'cancel', text: 'Cancel' },
                    { key: 'confirm', text: 'Confirm', primary: true }
                ],
                ...options
            });

            // Store callback
            const alertEl = document.getElementById(alertId);
            if (alertEl) {
                alertEl._callback = callback;
            }

            return alertId;
        },

        // Show custom alert
        show: function(options) {
            return createAlert(options);
        },

        // Close specific alert
        close: close,

        // Close all alerts
        closeAll: function() {
            const container = getContainer();
            const alerts = container.querySelectorAll('.glass-morph-item');
            alerts.forEach(alert => {
                alert.classList.add('hide');
            });
            setTimeout(() => {
                container.innerHTML = '';
            }, 300);
        },

        // Handle action (internal use)
        handleAction: handleAction
    };

    // Legacy compatibility - keep old showAlert function
    window.showAlert = function(message, type) {
        const alertMap = {
            'success': () => AlertGlass.success(message),
            'error': () => AlertGlass.error(message),
            'warning': () => AlertGlass.warning(message),
            'info': () => AlertGlass.info(message)
        };

        const alertFunction = alertMap[type] || alertMap['info'];
        return alertFunction();
    };

})(); 
