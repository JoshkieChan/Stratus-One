import { StratusCard } from '../components/StratusCard';

export function TypographyTab() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="text-[#01204A] mb-2">Headings</h2>
        <StratusCard className="mb-6">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">H1 - 32px / Bold</p>
              <h1>The quick brown fox jumps over the lazy dog</h1>
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">H2 - 26px / SemiBold</p>
              <h2>The quick brown fox jumps over the lazy dog</h2>
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">H3 - 22px / Medium</p>
              <h3>The quick brown fox jumps over the lazy dog</h3>
            </div>
          </div>
        </StratusCard>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Body Text</h2>
        <StratusCard className="mb-6">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Body L - 18px</p>
              <p style={{ fontSize: '18px' }}>The quick brown fox jumps over the lazy dog. This is large body text used for emphasis or introductory paragraphs.</p>
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Body M - 16px (Default)</p>
              <p>The quick brown fox jumps over the lazy dog. This is the standard body text size used throughout the interface.</p>
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Body S - 14px</p>
              <p style={{ fontSize: '14px' }}>The quick brown fox jumps over the lazy dog. This is small body text used for captions and secondary information.</p>
            </div>
          </div>
        </StratusCard>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Monospace (JetBrains Mono)</h2>
        <StratusCard>
          <p className="text-sm text-[#6A6D72] mb-2">For numbers, tables, and calculators</p>
          <p className="font-mono">$45,000.00 | 2025-12-15 | 92% | ID: ABC-123-XYZ</p>
        </StratusCard>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Font Weights</h2>
        <StratusCard>
          <div className="flex flex-col gap-3">
            <p style={{ fontWeight: 400 }}>Regular (400) - The quick brown fox</p>
            <p style={{ fontWeight: 500 }}>Medium (500) - The quick brown fox</p>
            <p style={{ fontWeight: 600 }}>SemiBold (600) - The quick brown fox</p>
            <p style={{ fontWeight: 700 }}>Bold (700) - The quick brown fox</p>
          </div>
        </StratusCard>
      </section>
    </div>
  );
}
