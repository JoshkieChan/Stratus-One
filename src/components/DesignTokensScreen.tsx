import { StratusCard } from './StratusCard';

export function DesignTokensScreen() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="mb-2">Design Tokens</h2>
        <p className="text-[var(--color-fg-secondary)]">
          The complete token system for STRATUSONE OS. All values are stored as CSS custom properties.
        </p>
      </div>

      {/* Color Tokens */}
      <section>
        <h2 className="mb-4">Color Tokens</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="mb-4">Foreground (Text)</h3>
            <div className="flex flex-col gap-3">
              <ColorToken 
                name="--color-fg-primary" 
                description="Primary text color"
                color="var(--color-fg-primary)"
              />
              <ColorToken 
                name="--color-fg-secondary" 
                description="Secondary text color"
                color="var(--color-fg-secondary)"
              />
              <ColorToken 
                name="--color-fg-tertiary" 
                description="Tertiary/placeholder text"
                color="var(--color-fg-tertiary)"
              />
              <ColorToken 
                name="--color-fg-inverse" 
                description="Text on dark backgrounds"
                color="var(--color-fg-inverse)"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4">Background</h3>
            <div className="flex flex-col gap-3">
              <ColorToken 
                name="--color-bg-primary" 
                description="Primary background"
                color="var(--color-bg-primary)"
                border
              />
              <ColorToken 
                name="--color-bg-secondary" 
                description="Page background"
                color="var(--color-bg-secondary)"
                border
              />
              <ColorToken 
                name="--color-bg-tertiary" 
                description="Hover states"
                color="var(--color-bg-tertiary)"
                border
              />
              <ColorToken 
                name="--color-bg-card" 
                description="Card backgrounds"
                color="var(--color-bg-card)"
                border
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4">Borders</h3>
            <div className="flex flex-col gap-3">
              <ColorToken 
                name="--color-border-default" 
                description="Default borders"
                color="var(--color-border-default)"
                border
              />
              <ColorToken 
                name="--color-border-strong" 
                description="Strong emphasis borders"
                color="var(--color-border-strong)"
                border
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4">Accent Colors</h3>
            <div className="flex flex-col gap-3">
              <ColorToken 
                name="--color-accent-primary" 
                description="Primary brand color"
                color="var(--color-accent-primary)"
              />
              <ColorToken 
                name="--color-accent-primary-hover" 
                description="Primary hover state"
                color="var(--color-accent-primary-hover)"
              />
              <ColorToken 
                name="--color-accent-secondary" 
                description="Secondary accent"
                color="var(--color-accent-secondary)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spacing Tokens */}
      <section>
        <h2 className="mb-4">Spacing Tokens</h2>
        <StratusCard>
          <div className="flex flex-col gap-4">
            <SpacingToken name="--spacing-xs" value="8px" />
            <SpacingToken name="--spacing-s" value="12px" />
            <SpacingToken name="--spacing-m" value="20px" />
            <SpacingToken name="--spacing-l" value="32px" />
            <SpacingToken name="--spacing-xl" value="48px" />
          </div>
        </StratusCard>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="mb-4">Border Radius</h2>
        <StratusCard>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RadiusToken name="--radius-s" value="6px" />
            <RadiusToken name="--radius-m" value="8px" />
            <RadiusToken name="--radius-l" value="12px" />
            <RadiusToken name="--radius-xl" value="16px" />
          </div>
        </StratusCard>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="mb-4">Shadow Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ShadowToken 
            name="--shadow-card" 
            value="0 1px 3px rgba(0, 0, 0, 0.08)"
          />
          <ShadowToken 
            name="--shadow-card-hover" 
            value="0 4px 12px rgba(0, 0, 0, 0.12)"
          />
          <ShadowToken 
            name="--shadow-popover" 
            value="0 8px 24px rgba(0, 0, 0, 0.16)"
          />
        </div>
      </section>

      {/* Component Dimensions */}
      <section>
        <h2 className="mb-4">Component Dimensions</h2>
        <StratusCard>
          <div className="flex flex-col gap-4">
            <DimensionToken name="--button-height" value="44px" />
            <DimensionToken name="--input-height" value="44px" />
          </div>
        </StratusCard>
      </section>

      {/* Usage Example */}
      <section>
        <h2 className="mb-4">Usage in CSS</h2>
        <StratusCard className="bg-[var(--color-bg-secondary)]">
          <pre className="text-sm overflow-x-auto">
            <code>{`/* Using design tokens in your CSS */
.button {
  height: var(--button-height);
  padding: 0 var(--spacing-m);
  border-radius: var(--radius-m);
  background: var(--color-accent-primary);
  color: var(--color-fg-inverse);
}

.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-card);
  padding: var(--spacing-m);
}`}</code>
          </pre>
        </StratusCard>
      </section>
    </div>
  );
}

function ColorToken({ name, description, color, border = false }: { 
  name: string; 
  description: string; 
  color: string; 
  border?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div 
        className={`w-12 h-12 rounded-lg flex-shrink-0 ${border ? 'border border-[var(--color-border-default)]' : ''}`}
        style={{ backgroundColor: color }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm text-[var(--color-fg-primary)] break-all">{name}</p>
        <p className="text-sm text-[var(--color-fg-secondary)]">{description}</p>
      </div>
    </div>
  );
}

function SpacingToken({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 flex-1">
        <div 
          className="h-8 bg-[var(--color-accent-primary)] rounded"
          style={{ width: value }}
        />
        <div>
          <p className="font-mono text-sm text-[var(--color-fg-primary)]">{name}</p>
          <p className="text-sm text-[var(--color-fg-secondary)]">{value}</p>
        </div>
      </div>
    </div>
  );
}

function RadiusToken({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div 
        className="w-24 h-24 bg-[var(--color-accent-primary)]"
        style={{ borderRadius: value }}
      />
      <div className="text-center">
        <p className="font-mono text-sm text-[var(--color-fg-primary)]">{name}</p>
        <p className="text-sm text-[var(--color-fg-secondary)]">{value}</p>
      </div>
    </div>
  );
}

function ShadowToken({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div 
        className="h-32 bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border-default)]"
        style={{ boxShadow: value }}
      />
      <div>
        <p className="font-mono text-sm text-[var(--color-fg-primary)] mb-1">{name}</p>
        <p className="text-sm text-[var(--color-fg-secondary)] break-all">{value}</p>
      </div>
    </div>
  );
}

function DimensionToken({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div 
        className="bg-[var(--color-accent-primary)] rounded-lg flex items-center justify-center text-white text-sm px-4"
        style={{ height: value }}
      >
        {value}
      </div>
      <p className="font-mono text-sm text-[var(--color-fg-primary)]">{name}</p>
    </div>
  );
}
