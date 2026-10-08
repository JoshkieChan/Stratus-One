import { useState } from 'react';
import { StratusButton } from '../components/StratusButton';
import { StratusInput } from '../components/StratusInput';
import { StratusCard } from '../components/StratusCard';

export function EmailBuilderScreen() {
  const [emailTo, setEmailTo] = useState('client@acmecorp.com');
  const [emailSubject, setEmailSubject] = useState('Proposal for Enterprise CRM Implementation');
  const [emailContent, setEmailContent] = useState(`Hi [Client Name],

Thank you for the opportunity to propose on your Enterprise CRM Implementation project.

Based on our initial discussion, I've prepared a comprehensive proposal that outlines:

• Project timeline and milestones
• Technical approach and architecture
• Team composition and expertise
• Detailed pricing breakdown

I believe this project aligns perfectly with your goals, and my experience with similar implementations positions me to deliver exceptional results.

I'd love to schedule a call to walk through the proposal and answer any questions you may have.

Best regards,
Joshkie`);

  return (
    <div className="max-w-6xl">
      <StratusCard>
        <div className="mb-6">
          <h2 className="text-[#01204A] mb-1">Email Builder</h2>
          <p className="text-[#6A6D72]">Craft the perfect outreach email</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-[#1E1F22]">Compose</h3>
            
            <StratusInput 
              label="To" 
              value={emailTo} 
              onChange={(e) => setEmailTo(e.target.value)}
            />
            <StratusInput 
              label="Subject" 
              value={emailSubject} 
              onChange={(e) => setEmailSubject(e.target.value)}
            />
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#1E1F22]">Message</label>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full h-64 px-4 py-3 rounded-md border border-[#D9DCE1] placeholder:text-[#8B8F99] focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/20 transition-all resize-none"
              />
            </div>

            <div className="flex gap-3">
              <StratusButton variant="primary">Send Email</StratusButton>
              <StratusButton variant="secondary">Copy to Clipboard</StratusButton>
              <StratusButton variant="ghost">Save Draft</StratusButton>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[#1E1F22]">Preview</h3>
            
            <StratusCard className="bg-[#F7F9FA]">
              <div className="mb-4 pb-4 border-b border-[#E8EAED]">
                <p className="text-sm text-[#6A6D72] mb-1">From: you@yourdomain.com</p>
                <p className="text-sm text-[#6A6D72] mb-1">To: {emailTo}</p>
                <p className="text-sm mb-1">Subject: {emailSubject}</p>
              </div>
              
              <div className="whitespace-pre-wrap text-sm">
                {emailContent}
              </div>
            </StratusCard>

            <div className="bg-[#35CFFF]/10 border border-[#35CFFF] rounded-lg p-4">
              <h3 className="text-[#01204A] mb-2">AI Suggestions</h3>
              <ul className="text-sm text-[#6A6D72] flex flex-col gap-2">
                <li>• Consider adding a specific timeline for response</li>
                <li>• Mention 2-3 key differentiators</li>
                <li>• Include a clear call-to-action</li>
              </ul>
            </div>
          </div>
        </div>
      </StratusCard>
    </div>
  );
}
