'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { formatLabel, formatMonth } from '@/lib/public-api';
import type { SeverityCount, CategoryCount, TrendPoint } from '@/lib/public-api';

const SEVERITY_COLORS: Record<string, string> = {
  high: '#B71C1C',
  medium: '#D4A017',
  low: '#2E7D32',
};

const CHART_CARD =
  'bg-white rounded-2xl border-2 border-border/40 p-6 shadow-sm';

function ChartHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-display text-xl font-bold text-primary-dark">{title}</h3>
      <p className="text-sm text-text-muted mt-1">{subtitle}</p>
    </div>
  );
}

export function SeverityDonut({ data }: { data: SeverityCount[] }) {
  const chartData = data.map((d) => ({ ...d, label: formatLabel(d.severity) }));

  return (
    <div className={CHART_CARD}>
      <ChartHeading
        title="Findings by Severity"
        subtitle="How raised findings break down by assessed severity."
      />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={3}
              strokeWidth={2}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.severity}
                  fill={SEVERITY_COLORS[entry.severity] ?? '#6B7280'}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, 'Findings']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CategoryBars({ data }: { data: CategoryCount[] }) {
  const chartData = [...data]
    .sort((a, b) => b.count - a.count)
    .map((d) => ({ ...d, label: formatLabel(d.category) }));

  return (
    <div className={CHART_CARD}>
      <ChartHeading
        title="Findings by Category"
        subtitle="The control areas where findings are most frequently raised."
      />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 16, bottom: 0, left: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="label"
              width={140}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value) => [value, 'Findings']} />
            <Bar dataKey="count" fill="#2E7D32" radius={[0, 6, 6, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TrendChart({ data }: { data: TrendPoint[] }) {
  const chartData = data.map((d) => ({ ...d, label: formatMonth(d.month) }));

  return (
    <div className={CHART_CARD}>
      <ChartHeading
        title="Raised vs Closed — Last 12 Months"
        subtitle="Monthly findings raised against findings closed or verified."
      />
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="trendRaised" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A017" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#D4A017" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="trendClosed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2E7D32" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#2E7D32" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="raised"
              name="Raised"
              stroke="#D4A017"
              strokeWidth={2.5}
              fill="url(#trendRaised)"
            />
            <Area
              type="monotone"
              dataKey="closed"
              name="Closed"
              stroke="#2E7D32"
              strokeWidth={2.5}
              fill="url(#trendClosed)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
