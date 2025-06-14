
export interface Task {
  id: string;
  name: string;
  assignedTo: string;
  status: 'To Do' | 'In Progress' | 'Done';
  deadline: string;
  comments: string[];
}

export interface Customer {
  id: string;
  name: string;
  industry: string;
  startDate: string;
  stage: 'Kick-off Scheduled' | 'API Integration' | 'Training Completed' | 'Go-Live' | 'Complete';
  assignedTPM: string;
  tasks: Task[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'TPM' | 'Developer' | 'QA' | 'Customer Success';
}

export const teamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Johnson', role: 'TPM' },
  { id: '2', name: 'Mike Chen', role: 'Developer' },
  { id: '3', name: 'Emily Rodriguez', role: 'QA' },
  { id: '4', name: 'David Kim', role: 'Customer Success' },
  { id: '5', name: 'Anna Patel', role: 'Developer' },
  { id: '6', name: 'Chris Wilson', role: 'TPM' },
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Polyplex Ltd.',
    industry: 'Manufacturing',
    startDate: '2024-05-15',
    stage: 'API Integration',
    assignedTPM: 'Sarah Johnson',
    tasks: [
      {
        id: '1-1',
        name: 'Initial API documentation review',
        assignedTo: 'Mike Chen',
        status: 'Done',
        deadline: '2024-06-01',
        comments: ['Documentation looks comprehensive', 'Ready for integration phase']
      },
      {
        id: '1-2',
        name: 'Set up development environment',
        assignedTo: 'Mike Chen',
        status: 'Done',
        deadline: '2024-06-03',
        comments: ['Environment configured successfully']
      },
      {
        id: '1-3',
        name: 'Implement core API endpoints',
        assignedTo: 'Anna Patel',
        status: 'In Progress',
        deadline: '2024-06-18',
        comments: ['70% complete', 'Need clarification on shipment tracking endpoint']
      },
      {
        id: '1-4',
        name: 'API testing and validation',
        assignedTo: 'Emily Rodriguez',
        status: 'To Do',
        deadline: '2024-06-20',
        comments: []
      },
      {
        id: '1-5',
        name: 'Integration testing with client system',
        assignedTo: 'David Kim',
        status: 'To Do',
        deadline: '2024-06-25',
        comments: []
      }
    ]
  },
  {
    id: '2',
    name: 'Sun Pharma',
    industry: 'Pharmaceuticals',
    startDate: '2024-06-01',
    stage: 'Kick-off Scheduled',
    assignedTPM: 'Chris Wilson',
    tasks: [
      {
        id: '2-1',
        name: 'Kick-off meeting preparation',
        assignedTo: 'Chris Wilson',
        status: 'In Progress',
        deadline: '2024-06-14',
        comments: ['Agenda prepared', 'Waiting for client availability confirmation']
      },
      {
        id: '2-2',
        name: 'Requirements gathering session',
        assignedTo: 'David Kim',
        status: 'To Do',
        deadline: '2024-06-16',
        comments: []
      },
      {
        id: '2-3',
        name: 'Technical architecture review',
        assignedTo: 'Mike Chen',
        status: 'To Do',
        deadline: '2024-06-18',
        comments: []
      },
      {
        id: '2-4',
        name: 'Project timeline finalization',
        assignedTo: 'Chris Wilson',
        status: 'To Do',
        deadline: '2024-06-20',
        comments: []
      }
    ]
  },
  {
    id: '3',
    name: 'Lupin',
    industry: 'Pharmaceuticals',
    startDate: '2024-04-20',
    stage: 'Training Completed',
    assignedTPM: 'Sarah Johnson',
    tasks: [
      {
        id: '3-1',
        name: 'User training sessions',
        assignedTo: 'David Kim',
        status: 'Done',
        deadline: '2024-05-30',
        comments: ['All 3 sessions completed successfully', 'Users are confident with the system']
      },
      {
        id: '3-2',
        name: 'Admin panel training',
        assignedTo: 'David Kim',
        status: 'Done',
        deadline: '2024-06-02',
        comments: ['Admin team fully trained']
      },
      {
        id: '3-3',
        name: 'User acceptance testing',
        assignedTo: 'Emily Rodriguez',
        status: 'Done',
        deadline: '2024-06-05',
        comments: ['All test cases passed', 'Minor UI feedback incorporated']
      },
      {
        id: '3-4',
        name: 'Go-live preparation',
        assignedTo: 'Sarah Johnson',
        status: 'In Progress',
        deadline: '2024-06-15',
        comments: ['Deployment checklist 80% complete']
      },
      {
        id: '3-5',
        name: 'Production deployment',
        assignedTo: 'Anna Patel',
        status: 'To Do',
        deadline: '2024-06-18',
        comments: []
      }
    ]
  }
];

export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find(customer => customer.id === id);
};

export const getProgressPercentage = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0;
  const completedTasks = tasks.filter(task => task.status === 'Done').length;
  return Math.round((completedTasks / tasks.length) * 100);
};

export const getStageColor = (stage: string): string => {
  switch (stage) {
    case 'Kick-off Scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'API Integration':
      return 'bg-yellow-100 text-yellow-800';
    case 'Training Completed':
      return 'bg-green-100 text-green-800';
    case 'Go-Live':
      return 'bg-purple-100 text-purple-800';
    case 'Complete':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'To Do':
      return 'bg-gray-100 text-gray-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Done':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
