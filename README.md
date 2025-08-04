# 🎉 AlertGlass.js - Glass Morphism Alert System

**Made by Frank I.**

A unique, modern alert system with glass morphism design. Features integrated CSS and multiple alert types with a distinctive glass-themed appearance.

## ✨ Features

- **🎨 Glass Morphism Design**: Beautiful backdrop blur effects with glass-like transparency
- **📱 Responsive**: Works perfectly on all devices
- **⚡ Lightweight**: Self-contained with integrated CSS
- **🔄 Auto-close**: Configurable duration with smooth animations
- **🎯 Multiple Types**: Success, Error, Warning, Info, and Dialog
- **🔧 Customizable**: Flexible options for advanced use cases
- **🔄 Legacy Support**: Backward compatible with existing code
- **🌐 Unique Name**: GlassMorph to avoid conflicts with existing libraries

## 🚀 Quick Start

### 1. Include the Script

```html
<script src="AlertGlass.js"></script>
```

### 2. Basic Usage

```javascript
// Success alert
AlertGlass.success('Operation completed successfully!');

// Error alert
AlertGlass.error('Something went wrong!');

// Warning alert
AlertGlass.warning('Please check your input.');

// Info alert
AlertGlass.info('Here is some information.');
```

## 📚 API Reference

### Basic Alert Methods

#### `AlertGlass.success(message, title, options)`
Shows a success alert with green styling.

```javascript
AlertGlass.success('User profile updated!', 'Profile Updated');
```

#### `AlertGlass.error(message, title, options)`
Shows an error alert with red styling.

```javascript
AlertGlass.error('Database connection failed', 'Connection Error');
```

#### `AlertGlass.warning(message, title, options)`
Shows a warning alert with yellow styling.

```javascript
AlertGlass.warning('Low disk space detected', 'System Warning');
```

#### `AlertGlass.info(message, title, options)`
Shows an info alert with blue styling.

```javascript
AlertGlass.info('New features available', 'Update Available');
```

### Dialog Alerts

#### `AlertGlass.dialog(message, title, callback, options)`
Shows a dialog with Yes/No options.

```javascript
AlertGlass.dialog(
    'Are you sure you want to delete this item?',
    'Confirm Delete',
    function(action) {
        if (action === 'confirm') {
            AlertGlass.success('Item deleted successfully!');
        } else {
            AlertGlass.info('Delete cancelled.');
        }
    }
);
```

### Advanced Methods

#### `AlertGlass.show(options)`
Shows a custom alert with full configuration.

```javascript
AlertGlass.show({
    type: 'success',
    title: 'Custom Alert',
    message: 'This is a custom alert.',
    duration: 10000, // 10 seconds
    closable: true
});
```

#### `AlertGlass.close(alertId)`
Closes a specific alert by ID.

```javascript
const alertId = AlertGlass.success('This will be closed manually');
setTimeout(() => AlertGlass.close(alertId), 2000);
```

#### `AlertGlass.closeAll()`
Closes all active alerts.

```javascript
AlertGlass.closeAll();
```

## ⚙️ Configuration Options

### Alert Options

```javascript
{
    type: 'success',           // 'success', 'error', 'warning', 'info', 'dialog'
    title: 'Alert Title',      // Optional title
    message: 'Alert message',  // Required message
    duration: 5000,           // Auto-close duration (0 = no auto-close)
    closable: true,           // Show close button
    actions: []               // Custom action buttons (for dialogs)
}
```

### Action Button Configuration

```javascript
{
    key: 'confirm',           // Action identifier
    text: 'Confirm',          // Button text
    primary: true             // Primary button styling
}
```

## 🎨 Glass Morphism Styling

The alert system includes its own CSS with:

- **Glass morphism** design with backdrop blur effects
- **Smooth animations** with cubic-bezier easing
- **Color-coded** alert types with glass transparency
- **Responsive** design for mobile devices
- **Hover effects** and transitions
- **Auto-positioning** in top-right corner
- **Unique glass-themed** class names to avoid conflicts

## 📱 Responsive Design

- **Desktop**: Fixed position in top-right corner
- **Mobile**: Full-width alerts with adjusted padding
- **Tablet**: Optimized spacing and sizing

## 🔄 Legacy Compatibility

The system maintains backward compatibility with the old `showAlert` function:

```javascript
// Old way (still works)
showAlert('Success message', 'success');
showAlert('Error message', 'error');

// New way (recommended)
AlertGlass.success('Success message');
AlertGlass.error('Error message');
```

## 🎯 Usage Examples

### Basic Alerts

```javascript
// Simple success alert
AlertGlass.success('User profile updated successfully!');

// Error with custom title
AlertGlass.error('Database connection failed', 'Connection Error');

// Warning with custom duration
AlertGlass.warning('Low disk space detected', 'System Warning', { duration: 10000 });
```

### Dialog Alerts

```javascript
// Delete confirmation
AlertGlass.dialog(
    'Are you sure you want to delete this item? This action cannot be undone.',
    'Confirm Delete',
    function(action) {
        if (action === 'confirm') {
            // Delete the item
            AlertGlass.success('Item deleted successfully!');
        } else {
            AlertGlass.info('Delete cancelled.');
        }
    }
);

// Save changes dialog
AlertGlass.dialog(
    'Do you want to save your changes before leaving?',
    'Save Changes',
    function(action) {
        if (action === 'confirm') {
            saveChanges();
            AlertGlass.success('Changes saved successfully!');
        } else {
            AlertGlass.warning('Changes not saved.');
        }
    }
);
```

### Custom Alerts

```javascript
// Custom alert with specific options
AlertGlass.show({
    type: 'info',
    title: 'Custom Alert',
    message: 'This is a custom alert with specific configuration.',
    duration: 0, // No auto-close
    closable: true
});

// Custom dialog with multiple options
AlertGlass.show({
    type: 'dialog',
    title: 'Choose Action',
    message: 'Select your preferred action:',
    duration: 0,
    closable: false,
    actions: [
        { key: 'option1', text: 'Option 1' },
        { key: 'option2', text: 'Option 2' },
        { key: 'option3', text: 'Option 3', primary: true }
    ]
});
```

### Advanced Usage

```javascript
// Multiple alerts
AlertGlass.success('First alert!');
setTimeout(() => AlertGlass.error('Second alert!'), 500);
setTimeout(() => AlertGlass.warning('Third alert!'), 1000);

// Persistent alert
AlertGlass.show({
    type: 'info',
    title: 'Important Notice',
    message: 'This alert will not auto-close. Click X to dismiss.',
    duration: 0,
    closable: true
});

// Close all alerts
AlertGlass.closeAll();
```

## 🎨 Customization

### CSS Variables

You can customize the appearance by overriding CSS variables:

```css
.glass-morph-item {
    --glass-success-color: #22c55e;
    --glass-error-color: #ef4444;
    --glass-warning-color: #fbbf24;
    --glass-info-color: #3b82f6;
    --glass-dialog-color: #8b5cf6;
}
```

### Configuration

Modify the default configuration:

```javascript
// Change default duration
AlertGlass.config.defaultDuration = 3000;

// Change max alerts
AlertGlass.config.maxAlerts = 3;

// Custom icons
AlertGlass.config.icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    dialog: '❓'
};
```

## 🧪 Testing

Visit `alert-glass.html` to see all alert types in action!

## 📋 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🌟 Unique Features

1. **Glass Morphism Design**: Beautiful backdrop blur with glass-like transparency
2. **Unique Naming**: GlassMorph to avoid conflicts with existing libraries
3. **Self-Contained**: All CSS included in the JavaScript file
4. **Modern Aesthetics**: Contemporary glass morphism design
5. **Performance Optimized**: Lightweight and fast
6. **Accessibility**: Proper ARIA labels and keyboard navigation

## 🎉 Benefits

1. **Unique Identity**: GlassMorph name distinguishes it from other alert libraries
2. **Consistent Design**: All alerts look the same across the application
3. **Better UX**: Smooth animations and professional glass appearance
4. **Reduced Code**: No need to write alert HTML/CSS in each file
5. **Maintainable**: Single source of truth for alert styling
6. **Flexible**: Easy to customize and extend
7. **Independent**: Works without external CSS dependencies

---

**🎯 Ready to use!** Just include `AlertGlass.js` in your HTML and start using the unique AlertGlass alert system! 
