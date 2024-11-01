import React, { useState, useEffect } from 'react';
import { Calendar, Droplets, Sprout, AlertCircle, Check, Plus, Loader, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  type: 'irrigation' | 'fertilization' | 'pesticide' | 'other';
  date: string;
  status: 'pending' | 'completed';
  resourceUsage?: {
    type: string;
    amount: number;
    unit: string;
  };
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Irrigate North Field',
    type: 'irrigation',
    date: '2024-03-20',
    status: 'pending',
    resourceUsage: {
      type: 'Water',
      amount: 5000,
      unit: 'liters'
    }
  },
  {
    id: '2',
    title: 'Apply NPK Fertilizer',
    type: 'fertilization',
    date: '2024-03-21',
    status: 'pending',
    resourceUsage: {
      type: 'NPK 20-20-20',
      amount: 50,
      unit: 'kg'
    }
  },
  {
    id: '3',
    title: 'Pest Control - Wheat Field',
    type: 'pesticide',
    date: '2024-03-19',
    status: 'completed',
    resourceUsage: {
      type: 'Organic Pesticide',
      amount: 20,
      unit: 'liters'
    }
  }
];

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setTasks(MOCK_TASKS);
      setLoading(false);
    }, 1000);
  }, []);

  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'irrigation':
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'fertilization':
        return <Sprout className="w-4 h-4 text-green-500" />;
      case 'pesticide':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : task.status === filter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(['all', 'pending', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filter === status
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border ${
              task.status === 'completed'
                ? 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    task.status === 'completed'
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {task.status === 'completed' && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>
                
                <div>
                  <div className="flex items-center gap-2">
                    {getTaskIcon(task.type)}
                    <h4 className={`font-medium ${
                      task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h4>
                  </div>
                  
                  <div className="mt-1 text-sm text-gray-500">
                    <span>{new Date(task.date).toLocaleDateString()}</span>
                    {task.resourceUsage && (
                      <>
                        <span className="mx-2">•</span>
                        <span>
                          {task.resourceUsage.type}: {task.resourceUsage.amount} {task.resourceUsage.unit}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
}