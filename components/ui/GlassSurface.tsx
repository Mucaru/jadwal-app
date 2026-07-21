import { forwardRef, type HTMLAttributes } from "react";

type GlassSurfaceVariant = "default" | "strong" | "solid";

type GlassSurfaceRadius = "none" | "card" | "panel" | "pill";

type GlassSurfaceProps = HTMLAttributes<HTMLDivElement> & {
  variant?: GlassSurfaceVariant;
  radius?: GlassSurfaceRadius;
};

const variantClasses: Record<GlassSurfaceVariant, string> = {
  default: "glass-surface",
  strong: "glass-surface-strong",
  solid: [
    "border border-[var(--border-subtle)]",
    "bg-[var(--surface-solid)]",
    "shadow-card",
  ].join(" "),
};

const radiusClasses: Record<GlassSurfaceRadius, string> = {
  none: "",
  card: "rounded-card",
  panel: "rounded-panel",
  pill: "rounded-pill",
};

/**
 * Primitive visual untuk surface aplikasi.
 *
 * Komponen ini hanya mengatur:
 * - material surface;
 * - border;
 * - blur;
 * - shadow;
 * - radius.
 *
 * Spacing dan business logic tetap menjadi
 * tanggung jawab komponen pemakai.
 */
const GlassSurface = forwardRef<HTMLDivElement, GlassSurfaceProps>(
  function GlassSurface(
    {
      variant = "default",
      radius = "card",
      className = "",
      children,
      ...props
    },
    ref,
  ) {
    const classes = [variantClasses[variant], radiusClasses[radius], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  },
);

GlassSurface.displayName = "GlassSurface";

export default GlassSurface;
