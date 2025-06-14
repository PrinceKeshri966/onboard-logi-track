
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { getCustomerById, getProgressPercentage, getStageColor, getStatusColor } from '@/data/mockData';
import { ArrowLeft, Download, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProgressReport = () => {
  const { id } = useParams<{ id: string }>();
  const customer = id ? getCustomerById(id) : undefined;
  const { toast } = useToast();

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Customer Not Found</h1>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = getProgressPercentage(customer.tasks);
  const completedTasks = customer.tasks.filter(t => t.status === 'Done');
  const inProgressTasks = customer.tasks.filter(t => t.status === 'In Progress');
  const overdueTasks = customer.tasks.filter(t => 
    new Date(t.deadline) < new Date() && t.status !== 'Done'
  );

  const startDate = new Date(customer.startDate);
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const exportReport = () => {
    toast({
      title: "Report Generated",
      description: "Progress report has been prepared for download. (PDF export functionality would be implemented here)",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to={`/customer/${customer.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Customer
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Progress Report</h1>
              <p className="text-gray-600">{customer.name} - Generated on {today.toLocaleDateString()}</p>
            </div>
          </div>
          
          <Button onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>

        {/* Executive Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{progress}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{completedTasks.length}</div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{daysSinceStart}</div>
                <div className="text-sm text-gray-600">Days Since Start</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{overdueTasks.length}</div>
                <div className="text-sm text-gray-600">Overdue Tasks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Customer</span>
                  <span className="font-semibold">{customer.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Industry</span>
                  <span>{customer.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Stage</span>
                  <Badge className={getStageColor(customer.stage)}>
                    {customer.stage}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Assigned TPM</span>
                  <span>{customer.assignedTPM}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Blockers & Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {overdueTasks.length > 0 ? (
                  <>
                    <div className="text-sm font-medium text-red-600 mb-2">
                      {overdueTasks.length} Overdue Task{overdueTasks.length > 1 ? 's' : ''}
                    </div>
                    {overdueTasks.map((task) => (
                      <div key={task.id} className="bg-red-50 border border-red-200 rounded p-3">
                        <div className="font-medium text-red-800">{task.name}</div>
                        <div className="text-sm text-red-600">
                          Due: {new Date(task.deadline).toLocaleDateString()} • Assigned: {task.assignedTo}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-green-600 text-sm">No current blockers identified</div>
                )}
                
                {inProgressTasks.length > 0 && (
                  <>
                    <div className="text-sm font-medium text-blue-600 mb-2 mt-4">
                      Tasks Requiring Attention
                    </div>
                    {inProgressTasks.map((task) => (
                      <div key={task.id} className="bg-blue-50 border border-blue-200 rounded p-3">
                        <div className="font-medium text-blue-800">{task.name}</div>
                        <div className="text-sm text-blue-600">
                          Due: {new Date(task.deadline).toLocaleDateString()} • Assigned: {task.assignedTo}
                        </div>
                        {task.comments.length > 0 && (
                          <div className="text-sm text-blue-700 mt-1">
                            Latest: {task.comments[task.comments.length - 1]}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Task Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Task Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Task</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Assignee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Deadline</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Latest Update</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.tasks.map((task) => {
                    const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Done';
                    
                    return (
                      <tr key={task.id} className={`border-b border-gray-100 ${isOverdue ? 'bg-red-50' : ''}`}>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{task.name}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-700">{task.assignedTo}</div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className={`${isOverdue ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                            {new Date(task.deadline).toLocaleDateString()}
                            {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-600">
                            {task.comments.length > 0 
                              ? task.comments[task.comments.length - 1] 
                              : 'No updates'
                            }
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueTasks.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <div className="font-medium text-red-800 mb-2">Immediate Action Required</div>
                  <ul className="text-sm text-red-700 space-y-1">
                    {overdueTasks.map((task) => (
                      <li key={task.id}>• Follow up on "{task.name}" with {task.assignedTo}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {inProgressTasks.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <div className="font-medium text-blue-800 mb-2">Monitor Progress</div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {inProgressTasks.map((task) => (
                      <li key={task.id}>• Check status of "{task.name}" with {task.assignedTo}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="font-medium text-green-800 mb-2">Upcoming Milestones</div>
                <div className="text-sm text-green-700">
                  Continue monitoring progress towards {customer.stage} completion. 
                  Current trajectory shows {progress}% completion rate.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressReport;
