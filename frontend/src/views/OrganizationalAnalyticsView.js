// src/views/OrganizationalAnalyticsView.js
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Briefcase,
    Award,
    TrendingUp,
    AlertCircle,
    ChevronRight,
    CheckCircle,
    BarChart2,
    Clock,
    Target,
    Zap,
    Calendar,
    Layers,
    FileCheck,
    Loader2, // Added for loading state
} from 'lucide-react';

// Component Imports
import UserHeader from '../components/UserHeader';
import Card from '../components/ui/Card';

// Hook Imports
import { useUserProfile, useOrganizationData } from '../hooks/useApi';

// --- Constants ---
const TIME_RANGES = {
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
};

const SKILL_AREAS = {
    TECHNICAL: 'technical',
    BUSINESS: 'business',
    SOFT: 'soft',
};

const COMPLIANCE_STATUS = {
    COMPLIANT: 'Compliant',
    AT_RISK: 'At Risk',
    NON_COMPLIANT: 'Non-Compliant',
};

const CRITICAL_GAP_THRESHOLD = 20;

// --- Mock Data (Move to separate file or replace with API data) ---

const mockDepartmentData = [
    { name: 'Marketing', avgMinutes: 120, completionRate: 78, targetSkills: 14, members: 42 },
    { name: 'Engineering', avgMinutes: 180, completionRate: 85, targetSkills: 22, members: 67 },
    { name: 'Sales', avgMinutes: 90, completionRate: 65, targetSkills: 12, members: 55 },
    { name: 'Operations', avgMinutes: 105, completionRate: 72, targetSkills: 16, members: 38 },
    { name: 'HR', avgMinutes: 95, completionRate: 90, targetSkills: 10, members: 15 },
    { name: 'Finance', avgMinutes: 75, completionRate: 68, targetSkills: 8, members: 25 }
];

const mockRoiData = {
    [TIME_RANGES.MONTHLY]: { learningInvestment: 12500, productivityGain: 18700, roi: 49.6, engagementScore: 78, skillProficiency: 72, performanceImprovement: 12, timeToCompetency: -15 },
    [TIME_RANGES.QUARTERLY]: { learningInvestment: 37500, productivityGain: 62400, roi: 66.4, engagementScore: 81, skillProficiency: 76, performanceImprovement: 15, timeToCompetency: -22 },
    [TIME_RANGES.YEARLY]: { learningInvestment: 150000, productivityGain: 283000, roi: 88.7, engagementScore: 85, skillProficiency: 82, performanceImprovement: 23, timeToCompetency: -34 }
};

const mockHighImpactCourses = [
    { name: "Advanced Project Management", completionRate: 87, impact: "high", roi: 210 },
    { name: "Leadership Masterclass", completionRate: 72, impact: "high", roi: 180 },
    { name: "Data Analysis Fundamentals", completionRate: 94, impact: "medium", roi: 145 },
    { name: "Strategic Communication", completionRate: 68, impact: "medium", roi: 125 }
];

const mockSkillGapData = {
    [SKILL_AREAS.TECHNICAL]: [
        { skill: 'Data Analysis', current: 65, required: 80, gap: 15 },
        { skill: 'Cloud Computing', current: 45, required: 75, gap: 30 },
        { skill: 'Machine Learning', current: 35, required: 60, gap: 25 },
        { skill: 'Cybersecurity', current: 50, required: 85, gap: 35 },
        { skill: 'DevOps', current: 40, required: 65, gap: 25 }
    ],
    [SKILL_AREAS.BUSINESS]: [
        { skill: 'Project Management', current: 70, required: 80, gap: 10 },
        { skill: 'Business Analysis', current: 60, required: 75, gap: 15 },
        { skill: 'Strategic Planning', current: 50, required: 70, gap: 20 },
        { skill: 'Financial Acumen', current: 45, required: 65, gap: 20 },
        { skill: 'Change Management', current: 55, required: 75, gap: 20 }
    ],
    [SKILL_AREAS.SOFT]: [
        { skill: 'Leadership', current: 60, required: 85, gap: 25 },
        { skill: 'Communication', current: 70, required: 90, gap: 20 },
        { skill: 'Collaboration', current: 75, required: 85, gap: 10 },
        { skill: 'Critical Thinking', current: 65, required: 80, gap: 15 },
        { skill: 'Adaptability', current: 60, required: 85, gap: 25 }
    ]
};

const mockComplianceData = [
    { department: 'Marketing', requiredTrainings: 3, completedTrainings: 3, completionRate: 100, status: COMPLIANCE_STATUS.COMPLIANT, expiringCertifications: 1 },
    { department: 'Engineering', requiredTrainings: 5, completedTrainings: 4, completionRate: 80, status: COMPLIANCE_STATUS.AT_RISK, expiringCertifications: 2 },
    { department: 'Sales', requiredTrainings: 3, completedTrainings: 2, completionRate: 67, status: COMPLIANCE_STATUS.NON_COMPLIANT, expiringCertifications: 0 },
    { department: 'Operations', requiredTrainings: 4, completedTrainings: 4, completionRate: 100, status: COMPLIANCE_STATUS.COMPLIANT, expiringCertifications: 0 },
    { department: 'HR', requiredTrainings: 6, completedTrainings: 6, completionRate: 100, status: COMPLIANCE_STATUS.COMPLIANT, expiringCertifications: 3 },
    { department: 'Finance', requiredTrainings: 5, completedTrainings: 4, completionRate: 80, status: COMPLIANCE_STATUS.AT_RISK, expiringCertifications: 1 }
];


// --- Reusable Helper Components (Optional but good practice) ---

// Example: Reusable Tab Button
const TabButton = ({ label, isActive, onClick }) => (
    <button
        className={`px-4 py-2 text-sm rounded-lg transition-all ${isActive
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
        onClick={onClick}
    >
        {label}
    </button>
);

// Example: Progress Bar Component
const ProgressBar = ({ value, max = 100, colorClass = 'bg-amber-500', backgroundClass = 'bg-gray-100 dark:bg-gray-700', heightClass = 'h-2' }) => (
    <div
        className={`${heightClass} w-full ${backgroundClass} rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
        aria-label={`${value}% complete`}
    >
        <div
            className={`h-full ${colorClass} rounded-full transition-all duration-500`}
            style={{ width: `${(value / max) * 100}%` }}
        ></div>
    </div>
);

// --- Analytics Sub-Components ---

// Department Learning Comparison Component
const DepartmentLearningComparison = ({ departmentData }) => {
    const [highlightedDeptIndex, setHighlightedDeptIndex] = useState(null);

    // Memoize calculations based on departmentData
    const { topDept, averageMinutes, averageCompletionRate, maxAvgMinutes } = useMemo(() => {
        if (!departmentData || departmentData.length === 0) {
            return { topDept: null, averageMinutes: 0, averageCompletionRate: 0, maxAvgMinutes: 1 }; // Avoid division by zero
        }
        const sortedDepts = [...departmentData].sort((a, b) => b.completionRate - a.completionRate);
        const topDept = sortedDepts[0];
        const totalMinutes = departmentData.reduce((sum, dept) => sum + dept.avgMinutes, 0);
        const totalCompletion = departmentData.reduce((sum, dept) => sum + dept.completionRate, 0);
        const maxAvgMinutes = Math.max(...departmentData.map(d => d.avgMinutes), 1); // Ensure at least 1 to avoid division by zero

        return {
            topDept,
            averageMinutes: Math.round(totalMinutes / departmentData.length),
            averageCompletionRate: Math.round(totalCompletion / departmentData.length),
            maxAvgMinutes
        };
    }, [departmentData]);

    if (!departmentData || departmentData.length === 0) {
        return <Card title="Department Learning Patterns" icon={Users}><p className="text-gray-500 dark:text-gray-400">No department data available.</p></Card>;
    }

    const chartHeight = 180; // px
    const barMaxHeight = chartHeight * 0.8; // Use 80% of chart height for bars

    return (
        <Card title="Department Learning Patterns" icon={Users} collapsible>
            {/* Department comparison chart */}
            <div>
                <div className="mb-3 flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Weekly Learning Time by Department</span>
                    <span className="text-amber-600 dark:text-amber-400 font-medium">Org average: {averageMinutes} min/week</span>
                </div>

                <div className="relative mt-3">
                    {/* Average line - absolute positioning */}
                    <div
                        className="absolute w-full border-t-2 border-dashed border-amber-300 dark:border-amber-700 z-10"
                        // Position based on average relative to max, clamped to prevent going off chart
                        style={{ bottom: `${Math.min(100, Math.max(0, (averageMinutes / maxAvgMinutes) * 100 * (barMaxHeight / chartHeight)))}%` }}
                    >
                        <div className="absolute right-0 -bottom-5 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded shadow">
                            Avg
                        </div>
                    </div>

                    {/* Chart Bars */}
                    <div className="flex justify-between items-end relative" style={{ height: `${chartHeight}px` }}>
                        {departmentData.map((dept, index) => {
                            const isTopDept = topDept && dept.name === topDept.name;
                            const isHighlighted = highlightedDeptIndex === index;
                            // Calculate height relative to the maximum average minutes
                            const heightPercentage = (dept.avgMinutes / maxAvgMinutes) * (barMaxHeight / chartHeight) * 100;
                            const barHeight = Math.max(5, (heightPercentage / 100) * chartHeight); // Min height 5px

                            return (
                                <div
                                    key={dept.name || index} // Use unique key
                                    className="flex flex-col items-center px-1 flex-1 cursor-pointer group"
                                    onMouseEnter={() => setHighlightedDeptIndex(index)}
                                    onMouseLeave={() => setHighlightedDeptIndex(null)}
                                >
                                    {/* Tooltip (visible on hover/highlight) */}
                                    {isHighlighted && (
                                        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-30 shadow-lg">
                                            <div className="font-medium">{dept.name}</div>
                                            <div>{dept.avgMinutes} min/week</div>
                                            <div className="text-xs opacity-75">{dept.completionRate}% completion</div>
                                            {/* Tooltip Arrow */}
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                                        </div>
                                    )}

                                    {/* Activity bar */}
                                    <div className="w-full flex justify-center items-end" style={{ height: `${barMaxHeight}px` }}>
                                        <div
                                            className={`w-10 md:w-12 relative rounded-t-md transition-all duration-300 ${isTopDept || isHighlighted
                                                    ? 'bg-amber-500 dark:bg-amber-500'
                                                    : 'bg-amber-400 dark:bg-amber-600 group-hover:bg-amber-500 dark:group-hover:bg-amber-500'
                                                }`}
                                            style={{ height: `${barHeight}px` }}
                                        >
                                            {/* Indicator for top dept */}
                                            {isTopDept && (
                                                <div className="absolute -right-1 -top-1 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-amber-100 dark:bg-amber-900 rounded-full border-2 border-amber-500 dark:border-amber-400 z-20"></div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Department label */}
                                    <div className={`text-xs text-center font-medium mt-2 break-words transition-colors ${isHighlighted || isTopDept
                                            ? 'text-amber-600 dark:text-amber-400'
                                            : 'text-gray-500 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                                        }`}>
                                        {dept.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Organization summary card */}
            <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-gray-50 dark:from-amber-900/10 dark:to-gray-800/60 rounded-xl border border-amber-100/50 dark:border-amber-800/30">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Left Side: Avg Time */}
                    <div className="flex-1 sm:pr-4 sm:border-r sm:border-gray-200 dark:sm:border-gray-700">
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Org. Avg. Learning Time</div>
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{averageMinutes} min/week</div>
                        {/* TODO: Replace static trend with real data */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                                <TrendingUp size={12} className="mr-1" />
                                +12%
                            </span>
                            <span className="ml-1">from last month</span>
                        </div>
                    </div>

                    {/* Right Side: Avg Completion & Progress Circle */}
                    <div className="flex-1 pl-0 sm:pl-4 flex items-center">
                        <div className="mr-3">
                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Org. Avg. Completion</div>
                            <div className="text-2xl font-bold text-gray-800 dark:text-white">{averageCompletionRate}%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                of training goals
                            </div>
                        </div>

                        {/* Progress circle */}
                        <div className="relative w-16 h-16 ml-auto shrink-0">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    className="text-gray-200 dark:text-gray-700 stroke-current"
                                    strokeWidth="10"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                />
                                <circle
                                    className="text-amber-500 stroke-current"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    strokeDasharray="251.2" // Circumference: 2 * pi * 40
                                    strokeDashoffset={251.2 - (251.2 * (averageCompletionRate / 100))}
                                    transform="rotate(-90 50 50)"
                                >
                                    {/* Optional: Add animation if desired, but be mindful of performance */}
                                    {/* <animate attributeName="stroke-dashoffset" from="251.2" to={251.2 - (251.2 * (averageCompletionRate / 100))} dur="1s" fill="freeze" /> */}
                                </circle>
                            </svg>
                            {/* Center Text or Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {averageCompletionRate >= 100 ? (
                                    <Award size={20} className="text-amber-500 dark:text-amber-400" />
                                ) : (
                                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                                        {averageCompletionRate}%
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top performers section */}
            {topDept && ( // Only show if topDept is calculated
                <div className="mt-6">
                    <div className="flex items-center mb-3">
                        <Award size={16} className="text-amber-500 dark:text-amber-400 mr-2" />
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">Department Achievements</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* TODO: Dynamically find top departments based on different metrics */}
                        <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-200">
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Most engaged team</div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">Engineering</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">180 min avg. weekly learning</div>
                        </div>
                        <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-200">
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Highest completion rate</div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">{topDept.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{topDept.completionRate}% training completion</div>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

// Skill Gap Analysis Component
const SkillGapAnalysis = ({ skillData }) => {
    const [selectedSkillArea, setSelectedSkillArea] = useState(SKILL_AREAS.TECHNICAL);

    // Memoize calculations based on skillData and selectedSkillArea
    const { currentSkillSet, criticalGapsCount, averageGap } = useMemo(() => {
        const currentSet = skillData?.[selectedSkillArea] ?? [];
        if (currentSet.length === 0) {
            return { currentSkillSet: [], criticalGapsCount: 0, averageGap: 0 };
        }
        const criticalGaps = currentSet.filter(item => item.gap > CRITICAL_GAP_THRESHOLD).length;
        const totalGap = currentSet.reduce((sum, item) => sum + item.gap, 0);
        const avgGap = Math.round(totalGap / currentSet.length);

        return {
            currentSkillSet: currentSet,
            criticalGapsCount: criticalGaps,
            averageGap: avgGap,
        };
    }, [skillData, selectedSkillArea]);

    if (!skillData) {
        return <Card title="Skill Gap Analysis" icon={Target}><p className="text-gray-500 dark:text-gray-400">No skill gap data available.</p></Card>;
    }


    // Helper to determine color based on gap size
    const getGapColor = (gap) => {
        if (gap > 25) return 'bg-red-500 dark:bg-red-600';
        if (gap > 15) return 'bg-amber-500 dark:bg-amber-600';
        return 'bg-green-500 dark:bg-green-600';
    };

    return (
        <Card title="Skill Gap Analysis" icon={Target} collapsible>
            {/* Skill category tabs */}
            {/* Consider extracting tabs into a reusable component */}
            <div className="flex flex-wrap gap-2 mb-6">
                {[
                    { id: SKILL_AREAS.TECHNICAL, label: 'Technical Skills' },
                    { id: SKILL_AREAS.BUSINESS, label: 'Business Skills' },
                    { id: SKILL_AREAS.SOFT, label: 'Soft Skills' }
                ].map(category => (
                    <TabButton
                        key={category.id}
                        label={category.label}
                        isActive={selectedSkillArea === category.id}
                        onClick={() => setSelectedSkillArea(category.id)}
                    />
                ))}
            </div>

            {/* Skill gap list/visualization */}
            <div className="space-y-3 mb-6">
                {currentSkillSet.length > 0 ? currentSkillSet.map((skill) => (
                    <div key={skill.skill} className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors">
                        <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium text-gray-800 dark:text-white">{skill.skill}</div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Gap: <span className={skill.gap > CRITICAL_GAP_THRESHOLD ? "text-red-500 dark:text-red-400 font-semibold" : "text-amber-500 dark:text-amber-400"}>
                                    {skill.gap}%
                                </span>
                            </div>
                        </div>

                        <div
                            className="relative h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"
                            role="meter"
                            aria-valuenow={skill.current}
                            aria-valuemin="0"
                            aria-valuemax="100" // Assuming required is the target max, but 100 is safer for meter
                            aria-label={`${skill.skill}: Current ${skill.current}%, Required ${skill.required}%`}
                        >
                            {/* Current proficiency */}
                            <div
                                className="absolute h-full bg-blue-400 dark:bg-blue-500 rounded-l-full transition-all duration-500 flex items-center justify-end pr-1"
                                style={{ width: `${skill.current}%` }}
                            >
                                <span className="text-xs text-white font-medium leading-6">
                                    {skill.current}%
                                </span>
                            </div>

                            {/* Gap visualization (Subtle background) */}
                            <div
                                className={`absolute h-full ${getGapColor(skill.gap)} opacity-20 transition-all duration-500`}
                                style={{
                                    left: `${skill.current}%`,
                                    width: `${skill.gap}%`
                                }}
                            ></div>

                             {/* Required level indicator */}
                             <div
                                className="absolute top-0 h-full w-1 bg-gray-700 dark:bg-gray-300 z-10 transform -translate-x-1/2"
                                style={{ left: `${skill.required}%` }}
                                title={`Required: ${skill.required}%`}
                            >
                                {/* Optional: Add a small label for required */}
                                {/* <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-1 rounded">Req</div> */}
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No skills data available for this category.</p>
                )}
            </div>

            {/* Summary statistics */}
            {/* TODO: Add real trend data */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Critical Gaps</div>
                    <div className="text-2xl font-bold text-red-500 dark:text-red-400">{criticalGapsCount}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
    {`Skills with gap > ${CRITICAL_GAP_THRESHOLD}%`}
</div>
                </div>
                <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Gap</div>
                    <div className="text-2xl font-bold text-amber-500 dark:text-amber-400">{averageGap}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Across selected skills
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Gap Improvement</div>
                    <div className="text-2xl font-bold text-green-500 dark:text-green-400">+5%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Since last quarter (mock)
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            {/* TODO: Generate recommendations dynamically */}
            <div>
                <div className="flex items-center mb-3">
                    <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-2 text-amber-500 dark:text-amber-400">
                        <Zap size={14} />
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">Skill Development Recommendations</div>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                        <ChevronRight size={14} className="mr-2 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span>Focus training initiatives on <span className="font-medium text-red-500 dark:text-red-400">Cybersecurity</span> and <span className="font-medium text-red-500 dark:text-red-400">Cloud Computing</span> to address largest technical skill gaps.</span>
                    </li>
                    <li className="flex items-start">
                        <ChevronRight size={14} className="mr-2 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span>Implement peer mentoring program to improve <span className="font-medium">Leadership</span> and <span className="font-medium">Communication</span> soft skills.</span>
                    </li>
                     <li className="flex items-start">
                        <ChevronRight size={14} className="mr-2 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span>Schedule quarterly skills assessments to track progress on closing critical gaps.</span>
                    </li>
                </ul>
            </div>
        </Card>
    );
};

// Compliance Tracking Component
const ComplianceTracking = ({ complianceData }) => {
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    // Memoize calculations based on complianceData
    const {
        overallComplianceRate,
        totalExpiringCertifications,
        compliantDepartmentsCount,
        nonCompliantDepartmentsCount,
        atRiskDepartmentsCount
    } = useMemo(() => {
        if (!complianceData || complianceData.length === 0) {
            return { overallComplianceRate: 0, totalExpiringCertifications: 0, compliantDepartmentsCount: 0, nonCompliantDepartmentsCount: 0, atRiskDepartmentsCount: 0 };
        }

        const totalRequired = complianceData.reduce((sum, dept) => sum + dept.requiredTrainings, 0);
        const totalCompleted = complianceData.reduce((sum, dept) => sum + dept.completedTrainings, 0);
        const overallRate = totalRequired > 0 ? Math.round((totalCompleted / totalRequired) * 100) : 0;
        const expiring = complianceData.reduce((sum, dept) => sum + dept.expiringCertifications, 0);
        const compliant = complianceData.filter(dept => dept.status === COMPLIANCE_STATUS.COMPLIANT).length;
        const nonCompliant = complianceData.filter(dept => dept.status === COMPLIANCE_STATUS.NON_COMPLIANT).length;
        const atRisk = complianceData.filter(dept => dept.status === COMPLIANCE_STATUS.AT_RISK).length;

        return {
            overallComplianceRate: overallRate,
            totalExpiringCertifications: expiring,
            compliantDepartmentsCount: compliant,
            nonCompliantDepartmentsCount: nonCompliant,
            atRiskDepartmentsCount: atRisk, // Added for potential use
        };
    }, [complianceData]);

    if (!complianceData || complianceData.length === 0) {
        return <Card title="Compliance Tracking" icon={FileCheck}><p className="text-gray-500 dark:text-gray-400">No compliance data available.</p></Card>;
    }

    // Helper to get status color
    const getStatusStyle = (status) => {
        switch (status) {
            case COMPLIANCE_STATUS.COMPLIANT: return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
            case COMPLIANCE_STATUS.AT_RISK: return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
            case COMPLIANCE_STATUS.NON_COMPLIANT: return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
            default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
        }
    };

        // Helper to get completion bar color
    const getCompletionBarColor = (rate) => {
        if (rate === 100) return 'bg-green-500';
        if (rate >= 75) return 'bg-amber-500';
        return 'bg-red-500';
    };


    return (
        <Card title="Compliance Tracking" icon={FileCheck} collapsible>
            {/* Overall compliance metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Consider creating a reusable StatCard component */}
                <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Overall Compliance</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">{overallComplianceRate}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Required trainings completed</div>
                </div>
                <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Compliant Depts</div>
                    <div className="text-2xl font-bold text-green-500 dark:text-green-400">
                        {compliantDepartmentsCount}/{complianceData.length}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Meeting all requirements</div>
                </div>
                <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Non-Compliant Depts</div>
                    <div className="text-2xl font-bold text-red-500 dark:text-red-400">
                        {nonCompliantDepartmentsCount}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Missing required trainings</div>
                </div>
                 <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Expiring Certs (30d)</div>
                    <div className="text-2xl font-bold text-amber-500 dark:text-amber-400">{totalExpiringCertifications}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Across all departments</div>
                </div>
            </div>

            {/* Department compliance table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expiring Certs</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {complianceData.map((dept, index) => (
                                <tr
                                    key={dept.department || index} // Use unique key
                                    className={`hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${highlightedIndex === index ? 'bg-gray-50 dark:bg-gray-750' : ''}`}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    onMouseLeave={() => setHighlightedIndex(null)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{dept.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                                                {dept.completedTrainings}/{dept.requiredTrainings}
                                            </div>
                                            {/* Using the reusable ProgressBar */}
                                             <ProgressBar
                                                value={dept.completionRate}
                                                colorClass={getCompletionBarColor(dept.completionRate)}
                                                heightClass="h-1.5" // Make it slightly thinner for table context
                                             />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-block text-xs leading-tight rounded-full ${getStatusStyle(dept.status)}`}>
                                            {dept.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {dept.expiringCertifications > 0 ? (
                                            <div className="flex items-center text-amber-500 dark:text-amber-400">
                                                <AlertCircle size={14} className="mr-1 shrink-0" />
                                                <span className="font-medium">{dept.expiringCertifications}</span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {/* TODO: Add Compliance Recommendations Section */}
        </Card>
    );
};


// Learning ROI Component
const LearningROI = ({ roiData, highImpactCoursesData }) => {
    const [timeRange, setTimeRange] = useState(TIME_RANGES.QUARTERLY);

    // Memoize current data based on selected time range
    const currentData = useMemo(() => {
        return roiData?.[timeRange] ?? { // Provide default structure if data is missing
            learningInvestment: 0,
            productivityGain: 0,
            roi: 0,
            engagementScore: 0,
            skillProficiency: 0,
            performanceImprovement: 0,
            timeToCompetency: 0
        };
    }, [roiData, timeRange]);

     if (!roiData || !highImpactCoursesData) {
        return <Card title="Learning ROI Analysis" icon={TrendingUp}><p className="text-gray-500 dark:text-gray-400">No ROI data available.</p></Card>;
    }

    // Helper for impact color
    const getImpactStyle = (impact) => {
        switch (impact?.toLowerCase()) {
            case 'high': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
            case 'medium': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
            default: return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'; // Default for low or other
        }
    };

    return (
        <Card title="Learning ROI Analysis" icon={TrendingUp} collapsible>
            {/* Time range selector */}
             {/* Consider extracting tabs into a reusable component */}
            <div className="flex flex-wrap gap-2 mb-6">
                {[
                    { id: TIME_RANGES.MONTHLY, label: 'Monthly View' },
                    { id: TIME_RANGES.QUARTERLY, label: 'Quarterly View' },
                    { id: TIME_RANGES.YEARLY, label: 'Yearly View' }
                ].map(range => (
                     <TabButton
                        key={range.id}
                        label={range.label}
                        isActive={timeRange === range.id}
                        onClick={() => setTimeRange(range.id)}
                    />
                ))}
            </div>

            {/* ROI summary */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
                {/* Left column - Investment & Return */}
                 {/* Consider extracting this card into a sub-component */}
                <div className="flex-1 bg-white dark:bg-gray-750 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Investment & Return</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Learning Investment</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                ${currentData.learningInvestment.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total training costs</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Productivity Gain</div>
                            <div className="text-2xl font-bold text-green-500 dark:text-green-400 mt-1">
                                ${currentData.productivityGain.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Estimated value added</div>
                        </div>
                    </div>

                    {/* ROI calculation display */}
                    <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-amber-700 dark:text-amber-300">Return on Investment (ROI)</div>
                                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                                    {currentData.roi}%
                                </div>
                            </div>
                             {/* Simple SVG trend line */}
                            <div className="text-amber-500 dark:text-amber-400">
                                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 35 Q 15 10, 30 20 T 55 5" />
                                    <circle cx="55" cy="5" r="3" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-300 opacity-80 mt-1">
                            (Gain - Investment) / Investment
                        </div>
                    </div>
                </div>

                {/* Right column - Performance Metrics */}
                 {/* Consider extracting this card into a sub-component */}
                <div className="flex-1 bg-white dark:bg-gray-750 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Performance Metrics</h3>
                    {/* TODO: Add real trend data */}
                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Employee Engagement</span>
                                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{currentData.engagementScore}%</span>
                            </div>
                            <ProgressBar value={currentData.engagementScore} colorClass="bg-green-500" />
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <span className="inline-flex items-center text-green-600 dark:text-green-400"><TrendingUp size={12} className="mr-1" />+5%</span> from previous period (mock)
                            </div>
                        </div>
                         <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skill Proficiency</span>
                                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{currentData.skillProficiency}%</span>
                            </div>
                             <ProgressBar value={currentData.skillProficiency} colorClass="bg-blue-500" />
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <span className="inline-flex items-center text-green-600 dark:text-green-400"><TrendingUp size={12} className="mr-1" />+8%</span> from previous period (mock)
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-3">
                             <div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Performance Boost</div>
                                <div className="text-xl md:text-2xl font-bold text-green-500 dark:text-green-400 mt-1">+{currentData.performanceImprovement}%</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">In employee output</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Time to Competency</div>
                                <div className="text-xl md:text-2xl font-bold text-green-500 dark:text-green-400 mt-1">{currentData.timeToCompetency}%</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reduced onboarding time</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* High impact courses */}
            {/* Consider extracting table into a sub-component */}
            <div className="bg-white dark:bg-gray-750 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Highest ROI Courses</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="py-3 pr-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course Name</th>
                                <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion</th>
                                <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Impact</th>
                                <th className="py-3 pl-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Est. ROI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {highImpactCoursesData.map((course) => (
                                <tr key={course.name} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="py-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">{course.name}</td>
                                    <td className="py-4 px-3">
                                        <div className="flex items-center">
                                            <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">{course.completionRate}%</span>
                                            <ProgressBar value={course.completionRate} heightClass="h-1.5" />
                                        </div>
                                    </td>
                                    <td className="py-4 px-3">
                                        <span className={`px-2 py-1 inline-block text-xs leading-tight rounded-full capitalize ${getImpactStyle(course.impact)}`}>
                                            {course.impact}
                                        </span>
                                    </td>
                                    <td className="py-4 pl-3 text-sm font-medium text-green-600 dark:text-green-400">{course.roi}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

             {/* Business recommendations */}
             {/* TODO: Generate recommendations dynamically */}
            <div className="p-4 bg-white dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700">
                 <div className="flex items-center mb-3">
                    <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-2 text-amber-500 dark:text-amber-400">
                        <Zap size={14} />
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">ROI Improvement Recommendations</div>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                   <li className="flex items-start">
                        <ChevronRight size={14} className="mr-2 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span>Expand <span className="font-medium">Leadership Masterclass</span> to middle management for highest potential ROI boost.</span>
                    </li>
                    <li className="flex items-start">
                        <ChevronRight size={14} className="mr-2 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span>Increase Sales team completion rate of <span className="font-medium">Strategic Communication</span> course to improve client conversion rates.</span>
                    </li>
                    <li className="flex items-start">
                        <ChevronRight size={14} className="mr-2 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span>Develop integrated learning paths combining high-ROI courses for compounded benefits.</span>
                    </li>
                </ul>
            </div>
        </Card>
    );
};


// --- Main View Component ---

const OrganizationalAnalyticsView = () => {
    const navigate = useNavigate();

    // Fetch user and organization data
    // Assume hooks provide { data, isLoading, error }
    const { data: userProfile, isLoading: isLoadingUser, error: userError } = useUserProfile();
    const { data: organizationData, isLoading: isLoadingOrg, error: orgError } = useOrganizationData();

    const isLoading = isLoadingUser || isLoadingOrg;
    const error = userError || orgError;

    // TODO: Replace mock data with data derived from organizationData
    const depData = mockDepartmentData;
    const skData = mockSkillGapData;
    const compData = mockComplianceData;
    const rData = mockRoiData;
    const hicData = mockHighImpactCourses;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-amber-500" />
                <span className="ml-4 text-lg text-gray-600 dark:text-gray-400">Loading Analytics...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center p-4">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Error Loading Data</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Could not load organizational analytics. Please try again later.
                </p>
                {/* Provide more specific error if available */}
                {error.message && (
                     <p className="text-sm text-gray-500 dark:text-gray-500 bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
                        Details: {error.message}
                     </p>
                )}
            </div>
        );
    }

     // If data is loaded but potentially empty/null (adjust check as needed based on API)
    if (!userProfile || !organizationData) {
         return (
             <div className="flex flex-col items-center justify-center h-screen text-center p-4">
                 <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
                 <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">No Data Available</h2>
                 <p className="text-gray-600 dark:text-gray-400">
                     Organizational data could not be retrieved or is currently empty.
                 </p>
             </div>
        );
    }


    return (
        <div className="w-full max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Header with User Info */}
            {/* Pass userProfile to UserHeader if needed */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                 <div>
                    {/* TODO: Use organization name from organizationData if available */}
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                         <Layers size={28} className="mr-3 text-amber-500" />
                         Organizational Learning Analytics
                    </h1>
                    <p className="mt-1 text-sm md:text-base text-gray-500 dark:text-gray-400">
                         Monitor learning patterns, skill gaps, and ROI across your organization.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 shrink-0">
                    <UserHeader userProfile={userProfile} />
                </div>
            </div>

            {/* Main analytics grid layout */}
            <div className="grid grid-cols-1 gap-6">
                {/* Department Learning Comparison */}
                 {/* TODO: Pass real data from organizationData */}
                <DepartmentLearningComparison departmentData={depData} />

                {/* Skill Gap Analysis */}
                {/* TODO: Pass real data from organizationData */}
                <SkillGapAnalysis skillData={skData} />

                {/* Compliance Tracking */}
                {/* TODO: Pass real data from organizationData */}
                <ComplianceTracking complianceData={compData} />

                {/* Learning ROI Analysis */}
                {/* TODO: Pass real data from organizationData */}
                <LearningROI roiData={rData} highImpactCoursesData={hicData} />
            </div>
        </div>
    );
};

export default OrganizationalAnalyticsView;