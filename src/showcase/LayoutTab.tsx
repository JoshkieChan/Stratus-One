import { StratusCard } from '../components/StratusCard';

export function LayoutTab() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="text-[#01204A] mb-2">Spacing System</h2>
        <StratusCard>
          <div className="flex flex-col gap-4">
            {[
              { label: 'XS', value: '8px' },
              { label: 'S', value: '12px' },
              { label: 'M', value: '20px' },
              { label: 'L', value: '32px' },
              { label: 'XL', value: '48px' }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="w-12 text-[#6A6D72]">{item.label}</span>
                <div 
                  className="h-8 bg-[#0057FF] rounded"
                  style={{ width: item.value }}
                />
                <span className="font-mono text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </StratusCard>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Container & Grid</h2>
        <StratusCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4">Container Width</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-[#6A6D72]">Desktop</span>
                  <span className="font-mono text-sm">1200px</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-[#6A6D72]">Mobile</span>
                  <span className="font-mono text-sm">360–500px</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Grid System</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-[#6A6D72]">Columns</span>
                  <span className="font-mono text-sm">12</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-[#6A6D72]">Gutter</span>
                  <span className="font-mono text-sm">24px</span>
                </div>
              </div>
            </div>
          </div>
        </StratusCard>
      </section>
    </div>
  );
}

// OS SCREENS
