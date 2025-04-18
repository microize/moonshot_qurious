// src/views/OrganizationalAnalyticsView.js
import React from 'react';
import { BarChart2, Users, TrendingUp, Target, FileCheck } from 'lucide-react';
import Card from '../components/ui/Card';

// Simple placeholder component that doesn't rely on React Query
const OrganizationalAnalyticsView = () => {
  return (
    <div className="w-full max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
          HR Analytics Dashboard
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Monitor learning patterns, skill gaps, and ROI across your organization.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Employees", value: "245", icon: Users },
          { label: "Training Hours", value: "4,560", icon: BarChart2 },
          { label: "Completion Rate", value: "78%", icon: TrendingUp },
          { label: "Active Courses", value: "15", icon: Target }
        ].map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mr-3">
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Placeholder Main Content */}
      <div className="grid grid-cols-1 gap-6">
        <Card title="Department Learning Patterns" icon={Users}>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Department learning data visualization will appear here</p>
          </div>
        </Card>

        <Card title="Skill Gap Analysis" icon={Target}>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Skill gap analysis will appear here</p>
          </div>
        </Card>

        <Card title="Compliance Tracking" icon={FileCheck}>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Compliance tracking data will appear here</p>
          </div>
        </Card>

        <Card title="Learning ROI Analysis" icon={TrendingUp}>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">ROI analysis data will appear here</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationalAnalyticsView;