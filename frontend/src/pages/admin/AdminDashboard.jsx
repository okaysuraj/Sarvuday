import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [telemetry, setTelemetry] = useState([60, 65, 55, 80, 75, 90, 85, 70, 50, 95]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosInstance.get('/admin/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to load admin dashboard', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();

    const interval = setInterval(() => {
      setTelemetry(prev => prev.map(currentHeight => {
        const variance = Math.floor(Math.random() * 20) - 10;
        let newHeight = currentHeight + variance;
        if (newHeight < 30) newHeight = 35;
        if (newHeight > 95) newHeight = 90;
        return newHeight;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px' }}>
        <span className="material-symbols-rounded" style={{
          fontSize: '28px',
          color: 'var(--color-on-surface-variant)',
          animation: 'spin 1s linear infinite',
        }}>autorenew</span>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Community',
      value: dashboardData?.total_active_users || 0,
      trend: '+12.4%',
      trendIcon: 'trending_up',
      bg: 'var(--color-sage-bg)',
      accent: 'var(--color-sage-text)',
    },
    {
      label: 'Licensed Staff',
      value: dashboardData?.active_therapists || 0,
      trend: 'Active Now',
      trendIcon: 'groups',
      bg: 'var(--color-sky-bg)',
      accent: 'var(--color-sky-text)',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {statCards.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: stat.bg,
            border: `1px solid rgba(0,0,0,0.06)`,
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '140px',
          }}>
            <div>
              <p style={{
                fontSize: '11px',
                fontWeight: 500,
                color: stat.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '6px',
              }}>{stat.label}</p>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.03em',
              }}>{stat.value}</h3>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 500,
              color: stat.accent,
              marginTop: '12px',
            }}>
              <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>{stat.trendIcon}</span>
              <span>{stat.trend}</span>
            </div>
          </div>
        ))}

        {/* Revenue Card - wider */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          boxShadow: 'var(--shadow-subtle)',
          gridColumn: 'span 2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--color-on-surface-variant)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '6px',
              }}>Monthly Revenue</p>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.03em',
              }}>${dashboardData?.total_revenue || 0}</h3>
            </div>
            <div style={{ height: '48px', display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
              {[40, 60, 50, 80, 90].map((h, i) => (
                <div key={i} style={{
                  width: '6px',
                  height: `${h}%`,
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '2px',
                  opacity: 0.6 + (i * 0.1),
                }} />
              ))}
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--color-on-surface-variant)',
            marginTop: '12px',
          }}>
            <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>info</span>
            <span>Forecasted: +5% from previous month</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
        {/* Safety Snapshot */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          boxShadow: 'var(--shadow-subtle)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.01em',
              }}>Safety Snapshot</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                Live monitoring of high-priority intervention triggers.
              </p>
            </div>
            <button className="btn-secondary" style={{ fontSize: '13px', padding: '8px 16px' }}>View Full Logs</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {/* Critical Incident Cards */}
            {[
              { title: 'Suicidal Ideation', priority: 'Critical Priority', count: '04', label: 'Active Alerts', icon: 'warning', bg: 'var(--color-rose-bg)', accent: 'var(--color-rose-text)' },
              { title: 'Harassment', priority: 'Moderate Risk', count: '12', label: 'In Moderation', icon: 'block', bg: 'var(--color-sand-bg)', accent: 'var(--color-sand-text)' },
            ].map((incident, i) => (
              <div key={i} style={{
                backgroundColor: incident.bg,
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                border: `1px solid rgba(0,0,0,0.04)`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span className="material-symbols-rounded" style={{ fontSize: '18px', color: incident.accent }}>{incident.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)' }}>{incident.title}</p>
                    <p style={{ fontSize: '11px', color: incident.accent }}>{incident.priority}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-on-surface)', letterSpacing: '-0.03em' }}>{incident.count}</span>
                  <span className="pill-badge" style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--border-color)',
                    fontSize: '11px',
                  }}>{incident.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Telemetry */}
          <div style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: 'var(--color-surface-container)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
          }}>
            <h5 style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--color-on-surface-variant)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '14px',
            }}>Platform Health Telemetry</h5>
            <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '4px', overflow: 'hidden' }}>
              {telemetry.map((h, i) => (
                <div key={i} style={{
                  flex: 1,
                  height: `${h}%`,
                  backgroundColor: i === 8 ? 'var(--color-sage-text)' : 'var(--color-primary)',
                  borderRadius: '3px 3px 0 0',
                  transition: 'height 0.5s ease',
                  opacity: 0.7 + (i * 0.03),
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
              <span>00:00</span>
              <span>Session Throughput (Peak: 14.2k/s)</span>
              <span>23:59</span>
            </div>
          </div>
        </div>

        {/* AI Risk Sidebar */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          boxShadow: 'var(--shadow-subtle)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.01em',
            }}>AI Risk Distribution</h4>
            <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
              Real-time classification by GuardBot AI
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
            {[
              { label: 'High Risk', value: '1.2%', width: '12%', color: 'var(--color-rose-text)', bg: 'var(--color-rose-bg)' },
              { label: 'Monitoring Needed', value: '18.5%', width: '45%', color: 'var(--color-sage-text)', bg: 'var(--color-sage-bg)' },
              { label: 'Stable', value: '80.3%', width: '80%', color: 'var(--color-primary)', bg: 'var(--color-surface-container)' },
            ].map((risk, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: risk.color }}>{risk.label}</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>{risk.value}</span>
                </div>
                <div style={{
                  height: '8px',
                  width: '100%',
                  backgroundColor: 'var(--color-surface-container)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: risk.width,
                    backgroundColor: risk.color,
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* AI Insight */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: 'var(--color-surface-container)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span className="material-symbols-rounded" style={{ fontSize: '18px', color: 'var(--color-sage-text)' }}>psychology</span>
              <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5', fontStyle: 'italic' }}>
                AI prediction accuracy for suicide risk has increased to 94.2% following last night's model update.
              </p>
            </div>
          </div>

          {/* Recent Activities */}
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h5 style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--color-on-surface-variant)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--border-color)',
            }}>Recent Activities</h5>
            {[
              { label: 'New Critical Incident #8921', time: '2m ago', color: 'var(--color-rose-text)' },
              { label: 'Therapist #203 Verified', time: '14m ago', color: 'var(--color-primary)' },
              { label: 'Payouts Processed (Manual)', time: '1h ago', color: 'var(--color-sage-text)' },
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: activity.color,
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-on-surface)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{activity.label}</span>
                <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', flexShrink: 0 }}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crisis Center Banner */}
      <div style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-on-primary)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.06 }}>
          <span className="material-symbols-rounded" style={{ fontSize: '200px' }}>emergency_share</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}>Crisis Response Center</h3>
          <p style={{ fontSize: '14px', opacity: 0.8, maxWidth: '480px' }}>
            3 rapid-response teams are currently active. Average connection time is <span style={{ fontWeight: 600, opacity: 1 }}>24 seconds</span>.
          </p>
        </div>
        <button style={{
          backgroundColor: 'var(--color-rose-bg)',
          color: 'var(--color-rose-text)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          padding: '12px 24px',
          fontWeight: 500,
          fontSize: '14px',
          fontFamily: 'var(--font-body)',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
          transition: 'opacity 0.15s ease, transform 0.15s ease',
        }}>
          Manage Escalations
        </button>
      </div>

      
    </div>
  );
};

export default AdminDashboard;
