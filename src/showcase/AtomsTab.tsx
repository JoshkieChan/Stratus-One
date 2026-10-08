import { useState } from 'react';
import { StratusButton } from '../components/StratusButton';
import { StratusInput } from '../components/StratusInput';
import { StratusCard } from '../components/StratusCard';
import { StratusBadge } from '../components/StratusBadge';
import { StratusLogo } from '../components/StratusLogo';

export function AtomsTab() {
  const [filledInputValue, setFilledInputValue] = useState('Filled input');

  return (
    <div className="flex flex-col gap-12">
      {/* Button Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Buttons</h2>
        <p className="text-[#6A6D72] mb-6">All button variants and states</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Button States */}
          <StratusCard>
            <h3 className="mb-4">Primary Button</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Default</p>
                <StratusButton variant="primary">Primary Button</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Hover (hover over button)</p>
                <StratusButton variant="primary">Hover State</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Disabled</p>
                <button disabled className="px-6 py-3 rounded-lg bg-[#E8EAED] text-[#8B8F99] cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Loading</p>
                <button className="px-6 py-3 rounded-lg bg-[#0057FF] text-white flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </button>
              </div>
            </div>
          </StratusCard>

          {/* Secondary Button States */}
          <StratusCard>
            <h3 className="mb-4">Secondary Button</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Default</p>
                <StratusButton variant="secondary">Secondary Button</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Hover (hover over button)</p>
                <StratusButton variant="secondary">Hover State</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Disabled</p>
                <button disabled className="px-6 py-3 rounded-lg border-2 border-[#D9DCE1] text-[#8B8F99] cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Loading</p>
                <button className="px-6 py-3 rounded-lg border-2 border-[#0057FF] text-[#0057FF] flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0057FF] border-t-transparent rounded-full animate-spin" />
                  Loading...
                </button>
              </div>
            </div>
          </StratusCard>

          {/* Ghost Button States */}
          <StratusCard>
            <h3 className="mb-4">Ghost Button</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Default</p>
                <StratusButton variant="ghost">Ghost Button</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Hover (hover over button)</p>
                <StratusButton variant="ghost">Hover State</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Disabled</p>
                <button disabled className="px-6 py-3 rounded-lg text-[#8B8F99] cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Loading</p>
                <button className="px-6 py-3 rounded-lg text-[#0057FF] flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0057FF] border-t-transparent rounded-full animate-spin" />
                  Loading...
                </button>
              </div>
            </div>
          </StratusCard>
        </div>
      </section>

      {/* Input Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Inputs</h2>
        <p className="text-[#6A6D72] mb-6">Input field variants and states</p>

        <StratusCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Default</p>
              <StratusInput placeholder="Enter text..." />
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Filled</p>
              <StratusInput
                value={filledInputValue}
                onChange={(e) => setFilledInputValue(e.target.value)}
              />
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Focus (click to focus)</p>
              <StratusInput placeholder="Click to focus" />
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Error State</p>
              <input
                placeholder="Invalid input"
                className="w-full h-[44px] px-4 rounded-md border-2 border-[#D9534F] placeholder:text-[#8B8F99] focus:outline-none focus:ring-2 focus:ring-[#D9534F]/20"
              />
              <p className="text-sm text-[#D9534F] mt-1">This field is required</p>
            </div>
          </div>
        </StratusCard>
      </section>

      {/* Badge Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Badges</h2>
        <p className="text-[#6A6D72] mb-6">Status and category badges</p>

        <StratusCard>
          <div className="flex flex-wrap items-center gap-3">
            <StratusBadge variant="winnable">Winnable (92%)</StratusBadge>
            <StratusBadge variant="moderate">Moderate (68%)</StratusBadge>
            <StratusBadge variant="avoid">Avoid (34%)</StratusBadge>
            <StratusBadge variant="info">Information</StratusBadge>
          </div>
        </StratusCard>
      </section>

      {/* Card Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Cards</h2>
        <p className="text-[#6A6D72] mb-6">Card variants and states</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StratusCard>
            <h3 className="mb-2">Default Card</h3>
            <p className="text-[#6A6D72]">Standard card with white background and subtle shadow.</p>
          </StratusCard>

          <StratusCard onClick={() => {}}>
            <h3 className="mb-2">Hover Card</h3>
            <p className="text-[#6A6D72]">Hover to see elevated shadow effect.</p>
          </StratusCard>

          <StratusCard className="border-2 border-[#0057FF] bg-[#0057FF]/5">
            <h3 className="mb-2">Selected Card</h3>
            <p className="text-[#6A6D72]">Active/selected state with border.</p>
          </StratusCard>
        </div>
      </section>

      {/* Logo Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Logo Concepts</h2>
        <p className="text-[#6A6D72] mb-6">Four logo variations for STRATUSONE OS</p>

        <StratusCard>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-[#F7F9FA] rounded-lg">
                <StratusLogo variant="loop" size={60} />
              </div>
              <p className="text-sm text-[#6A6D72] text-center">OS Loop</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-[#F7F9FA] rounded-lg">
                <StratusLogo variant="layers" size={60} />
              </div>
              <p className="text-sm text-[#6A6D72] text-center">Stacked Layers</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-[#F7F9FA] rounded-lg">
                <StratusLogo variant="snode" size={60} />
              </div>
              <p className="text-sm text-[#6A6D72] text-center">S-Node Matrix</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-[#F7F9FA] rounded-lg">
                <StratusLogo variant="lightning" size={60} />
              </div>
              <p className="text-sm text-[#6A6D72] text-center">Lightning Command</p>
            </div>
          </div>
        </StratusCard>
      </section>
    </div>
  );
}
