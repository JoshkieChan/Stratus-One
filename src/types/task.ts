export interface Task {
  id: string;
  opportunityId: string;
  taskPackId?: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPack {
  id: string;
  opportunityId: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'archived';
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreateInput {
  opportunityId: string;
  taskPackId?: string;
  title: string;
  description?: string;
  priority: Task['priority'];
  dueDate?: string;
}

export interface TaskUpdateInput extends Partial<TaskCreateInput> {
  status?: Task['status'];
  assignedTo?: string;
  completedAt?: string;
}
