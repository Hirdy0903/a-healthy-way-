// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENTRALIZED THEME — Mental Health Design System
// Calm · Soft · Lavender · Non-clinical
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const theme = {
  colors: {
    // Core
    primary:       '#C084FC',  // Soft lavender purple
    primaryHover:  '#A78BFA',  // Lighter violet on hover
    secondary:     '#F9A8D4',  // Pastel pink
    accent:        '#A78BFA',  // Light violet highlights

    // Backgrounds
    background:    '#F8F6FB',  // Very light lavender tint (page bg)
    surface:       '#F3F0F9',  // Secondary surface / widgets
    card:          '#FFFFFF',  // Card background

    // Borders & Track
    border:        '#E9E6F2',  // Soft lavender border
    track:         '#E9E6F2',  // Progress track

    // Text
    textPrimary:   '#2D2A32',  // Deep charcoal (not pure black)
    textSecondary: '#7E7A8A',  // Muted lavender-grey
    placeholder:   '#B5B2C2',  // Light placeholder

    // Functional
    success:       '#6EE7B7',  // Mint green
    warning:       '#FCD34D',  // Warm yellow
    error:         '#FCA5A5',  // Soft coral red

    // Gradients (use with CSS linear-gradient)
    graphFrom:     '#C084FC',
    graphTo:       '#F9A8D4',
  },
  shadow: {
    sm:   '0 2px 8px rgba(192,132,252,0.08)',
    md:   '0 4px 16px rgba(192,132,252,0.10)',
    lg:   '0 8px 32px rgba(192,132,252,0.14)',
  },
  radius: {
    sm:   '8px',
    md:   '12px',
    lg:   '16px',
    xl:   '24px',
    full: '9999px',
  },
};
export default theme;
