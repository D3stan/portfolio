import { ChevronRight, Check } from "lucide-react";

/**
 * Standard bullet point
 */
export function Bullet({ children }) {
  return (
    <li className="flex gap-2 leading-relaxed text-[15px]">
      <ChevronRight className="mt-1 h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
      <span>{children}</span>
    </li>
  );
}

/**
 * Impact bullet point with checkmark icon
 */
export function ImpactBullet({ children }) {
  return (
    <li className="flex gap-2 leading-relaxed text-[15px]">
      <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: 'var(--highlight)' }} />
      <span>{children}</span>
    </li>
  );
}
