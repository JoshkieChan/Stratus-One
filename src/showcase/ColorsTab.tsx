import { StratusCard } from '../components/StratusCard';

export function ColorsTab() {
  const colorGroups = [
    {
      title: 'Core Brand Colors',
      colors: [
        { name: 'Stratus Blue', hex: '#0057FF', var: '--color-stratus-blue' },
        { name: 'Stratus Navy', hex: '#01204A', var: '--color-stratus-navy' },
        { name: 'Stratus Cyan', hex: '#35CFFF', var: '--color-stratus-cyan' }
      ]
    },
    {
      title: 'Neutral System',
      colors: [
        { name: 'Black', hex: '#0A0A0A', var: '--color-black' },
        { name: 'Dark Grey', hex: '#1E1F22', var: '--color-dark-grey' },
        { name: 'Mid Grey', hex: '#6A6D72', var: '--color-mid-grey' },
        { name: 'Light Grey', hex: '#E8EAED', var: '--color-light-grey' },
        { name: 'Off White', hex: '#F7F9FA', var: '--color-off-white' }
      ]
    },
    {
      title: 'Functional Colors',
      colors: [
        { name: 'Success', hex: '#27AE60', var: '--color-success' },
        { name: 'Warning', hex: '#E2B93B', var: '--color-warning' },
        { name: 'Danger', hex: '#D9534F', var: '--color-danger' },
        { name: 'Information', hex: '#3378FF', var: '--color-information' }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-12">
      {colorGroups.map((group) => (
        <section key={group.title}>
          <h2 className="text-[#01204A] mb-2">{group.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {group.colors.map((color) => (
              <StratusCard key={color.hex}>
                <div className="flex flex-col gap-3">
                  <div 
                    className="h-24 rounded-lg"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="mb-1">{color.name}</p>
                    <p className="text-sm text-[#6A6D72] font-mono">{color.hex}</p>
                    <p className="text-sm text-[#6A6D72] font-mono break-all">{color.var}</p>
                  </div>
                </div>
              </StratusCard>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
