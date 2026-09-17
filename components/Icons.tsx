/* ── SVG Icon Kit — Journal of Self-Discovery
   All icons: 24×24 viewBox, stroke-based, brand purple
   ─────────────────────────────────────────────────── */

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const defaultProps = {
  size: 22,
  color: "currentColor",
  strokeWidth: 1.6,
};

/* Crosshair / Target — Saboteur Assessment */
export function IconTarget({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
    </svg>
  );
}

/* Document with lines — Reflection Questionnaires */
export function IconReflection({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
      <line x1="8" y1="9" x2="10" y2="9" />
    </svg>
  );
}

/* Heart with pulse line — Emotion Journaling */
export function IconHeartPulse({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      <polyline points="7.5 12 9.5 10 11.5 14 13.5 10 15.5 12" />
    </svg>
  );
}

/* Rising bar chart — Progress Trackers */
export function IconBarChart({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="9" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
      <polyline points="6 14 12 9 18 12" />
    </svg>
  );
}

/* Neural rewire arrows — PQ Exercises */
export function IconRewire({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
      <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

/* Lightning bolt — High-performing / Energy */
export function IconLightning({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

/* Brain waves — Overthinking */
export function IconBrainWave({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Brain outline */}
      <path d="M9.5 2a2.5 2.5 0 0 1 2.45 2H12a5 5 0 0 1 5 5c0 .56-.09 1.1-.26 1.6A4 4 0 0 1 18 14a4 4 0 0 1-3 3.87V19a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1.13A4 4 0 0 1 4 14a4 4 0 0 1 1.26-2.9A5 5 0 0 1 5 10a5 5 0 0 1 5-5h.05A2.5 2.5 0 0 1 9.5 2z" />
      {/* Pulse through brain */}
      <polyline points="7 13 9 11 11 14 13 11 15 13" />
    </svg>
  );
}

/* Compass — Meant for more / Direction */
export function IconCompass({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

/* Shield with checkmark — Guarantee */
export function IconShield({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

/* Checkmark in a circle — Included / Verified items */
export function IconCheck({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="7 12.5 10.5 16 17 8.5" />
    </svg>
  );
}

/* Padlock — Secure checkout */
export function IconLock({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* Download arrow into tray — Download Now */
export function IconDownload({ size = defaultProps.size, color = defaultProps.color, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* Wrapper that renders the icon with a styled background pill */
interface IconBadgeProps extends IconProps {
  icon: React.ReactNode;
  variant?: "light" | "dark";
}

export function IconBadge({ icon, variant = "light" }: IconBadgeProps) {
  return (
    <div className={`icon-badge icon-badge--${variant}`}>
      {icon}
    </div>
  );
}
