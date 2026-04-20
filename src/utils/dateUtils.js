/**
 * Date formatting utilities
 */

export function formatDate(date, format = 'short') {
  const d = new Date(date);
  if (isNaN(d)) return '';

  switch (format) {
    case 'full':
      return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    case 'medium':
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    case 'short':
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'time':
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    case 'iso':
      return d.toISOString().split('T')[0];
    default:
      return d.toLocaleDateString();
  }
}

export function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function getDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export function getDayOfWeek(date) {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
}

export function getRelativeTime(date) {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date, 'short');
}
