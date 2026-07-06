import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import api from '../../services/api';
import { Cpu, ShoppingBag, Truck, Users } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalRevenue: 5240000,
    totalOrders: 12,
    totalProducts: 17,
    totalUsers: 4,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback dummy statistics
        setLoading(false);
      });
  }, []);

  // Admin route protect check
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Chart configuration with neon green/pink line colors
  const lineChartData = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
    datasets: [
      {
        label: 'REVENUE (VND)',
        data: [1500000, 2400000, 1800000, 3100000, 4200000, 3800000, stats.totalRevenue],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ['OS & Recovery', 'Networking', 'Cables', 'Boards', 'Displays', 'GPS'],
    datasets: [
      {
        label: 'SALES BY CATEGORY',
        data: [4, 7, 10, 5, 2, 6],
        backgroundColor: '#06b6d4',
        borderColor: '#06b6d4',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
          font: { family: 'Fira Code', size: 10 },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Fira Code', size: 9 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Fira Code', size: 9 } },
      },
    },
  };

  return (
    <PageWrapper style={{ flexDirection: 'row' }}>
      <Sidebar />

      <div style={{ flexGrow: 1, padding: 'var(--space-xl)' }}>
        <h2 style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xl)' }}>SYS_ADMIN_METRICS</h2>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
          {[
            { label: 'TOTAL_REVENUE', value: formatCurrency(stats.totalRevenue), icon: <Cpu size={24} style={{ color: 'var(--neon-green)' }} /> },
            { label: 'TOTAL_ORDERS', value: stats.totalOrders, icon: <Truck size={24} style={{ color: 'var(--neon-cyan)' }} /> },
            { label: 'TOTAL_PRODUCTS', value: stats.totalProducts, icon: <ShoppingBag size={24} style={{ color: 'var(--neon-pink)' }} /> },
            { label: 'TOTAL_USERS', value: stats.totalUsers, icon: <Users size={24} style={{ color: 'var(--neon-gold)' }} /> },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-card-static"
              style={{
                padding: 'var(--space-md) var(--space-lg)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '9px', fontFamily: 'var(--font-code)', color: 'var(--text-muted)' }}>
                  {stat.label}
                </span>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', fontFamily: 'var(--font-code)' }}>
                  {stat.value}
                </span>
              </div>
              <div>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-xl)' }}>
          {/* Revenue line chart */}
          <div
            className="glass-card-static"
            style={{
              padding: 'var(--space-lg)',
              border: '1px solid var(--glass-border)',
              height: '320px',
            }}
          >
            <h4 style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-green)', marginBottom: 'var(--space-md)' }}>
              MONTHLY_REVENUE_METRIC
            </h4>
            <div style={{ height: '240px' }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          {/* Sales bar chart */}
          <div
            className="glass-card-static"
            style={{
              padding: 'var(--space-lg)',
              border: '1px solid var(--glass-border)',
              height: '320px',
            }}
          >
            <h4 style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-cyan)', marginBottom: 'var(--space-md)' }}>
              INVENTORY_DEMAND_ANALYSIS
            </h4>
            <div style={{ height: '240px' }}>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
