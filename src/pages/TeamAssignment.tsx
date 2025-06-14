
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { mockCustomers, teamMembers, TeamMember } from '@/data/mockData';
import { Users, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeamAssignment = () => {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleAssignment = (taskId: string, memberId: string) => {
    setAssignments(prev => ({
      ...prev,
      [taskId]: memberId
    }));
  };

  const saveAssignments = () => {
    toast({
      title: "Assignments Updated",
      description: "Team member assignments have been saved successfully.",
    });
  };

  const getTeamMemberById = (id: string): TeamMember | undefined => {
    return teamMembers.find(member => member.id === id);
  };

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'TPM':
        return 'bg-blue-100 text-blue-800';
      case 'Developer':
        return 'bg-green-100 text-green-800';
      case 'QA':
        return 'bg-yellow-100 text-yellow-800';
      case 'Customer Success':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Assignment</h1>
          <p className="text-gray-600">
            Assign team members to customer onboarding tasks and manage workload distribution.
          </p>
        </div>

        {/* Team Members Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Available Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <Badge className={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Current tasks: {
                      mockCustomers.reduce((count, customer) => 
                        count + customer.tasks.filter(task => 
                          task.assignedTo === member.name && task.status !== 'Done'
                        ).length, 0
                      )
                    }
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Assignments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <UserPlus className="h-5 w-5 mr-2" />
                Task Assignments
              </CardTitle>
              <Button onClick={saveAssignments}>
                Save Assignments
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockCustomers.map((customer) => (
                <div key={customer.id} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {customer.name} - {customer.stage}
                  </h3>
                  
                  <div className="space-y-4">
                    {customer.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{task.name}</h4>
                          <p className="text-sm text-gray-600">
                            Currently: {task.assignedTo} • Due: {new Date(task.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Badge className={`${task.status === 'Done' ? 'bg-green-100 text-green-800' : task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                            {task.status}
                          </Badge>
                          
                          <Select
                            value={assignments[task.id] || ''}
                            onValueChange={(value) => handleAssignment(task.id, value)}
                            disabled={task.status === 'Done'}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Reassign to..." />
                            </SelectTrigger>
                            <SelectContent>
                              {teamMembers.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  <div className="flex items-center space-x-2">
                                    <span>{member.name}</span>
                                    <Badge className={`${getRoleColor(member.role)} text-xs`}>
                                      {member.role}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamAssignment;
