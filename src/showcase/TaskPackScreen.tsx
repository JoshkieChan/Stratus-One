import { useState } from 'react';
import { StratusButton } from '../components/StratusButton';
import { StratusCard } from '../components/StratusCard';
import { StratusBadge } from '../components/StratusBadge';

export function TaskPackScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review project requirements', completed: true },
    { id: 2, title: 'Research client background', completed: true },
    { id: 3, title: 'Draft proposal outline', completed: false },
    { id: 4, title: 'Calculate project pricing', completed: false },
    { id: 5, title: 'Prepare case studies', completed: false },
    { id: 6, title: 'Schedule follow-up call', completed: false }
  ]);

  return (
    <div className="max-w-4xl">
      <StratusCard>
        <div className="mb-6">
          <h2 className="text-[#01204A] mb-1">Task Pack</h2>
          <p className="text-[#6A6D72]">Enterprise CRM Implementation - Step by step execution</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-2 bg-[#E8EAED] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0057FF] transition-all duration-300"
                style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-mono text-[#6A6D72]">
              {tasks.filter(t => t.completed).length}/{tasks.length}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {tasks.map((task, index) => (
            <div key={task.id}>
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${task.completed ? 'bg-[#27AE60]' : 'bg-[#E8EAED]'}`}>
                  <span className={`text-sm ${task.completed ? 'text-white' : 'text-[#6A6D72]'}`}>
                    {index + 1}
                  </span>
                </div>

                <StratusCard className={`flex-1 ${task.completed ? 'bg-[#F7F9FA]' : 'border-2 border-[#0057FF]'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`mb-2 ${task.completed ? 'text-[#6A6D72] line-through' : 'text-[#01204A]'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-[#6A6D72] mb-3">
                        {index === 0 && 'Read through the complete project requirements document'}
                        {index === 1 && 'Research the client company, industry, and decision makers'}
                        {index === 2 && 'Create a structured outline for your proposal'}
                        {index === 3 && 'Use the quote generator to calculate accurate pricing'}
                        {index === 4 && 'Select relevant case studies that demonstrate your expertise'}
                        {index === 5 && 'Book a call to discuss the proposal with the client'}
                      </p>
                      {!task.completed && (
                        <StratusButton
                          variant="primary"
                          onClick={() => {
                            const newTasks = [...tasks];
                            newTasks[index].completed = true;
                            setTasks(newTasks);
                          }}
                        >
                          Complete Step
                        </StratusButton>
                      )}
                      {task.completed && (
                        <StratusBadge variant="winnable">
                          ✓ Completed
                        </StratusBadge>
                      )}
                    </div>
                  </div>
                </StratusCard>
              </div>

              {index < tasks.length - 1 && (
                <div className="ml-4 h-6 w-px bg-[#E8EAED]" />
              )}
            </div>
          ))}
        </div>
      </StratusCard>
    </div>
  );
}
