import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { format, parseISO } from 'date-fns';

const EarningsDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dashRes, payRes] = await Promise.all([
        axiosInstance.get('/counsellor/dashboard'),
        axiosInstance.get('/counsellor/payments?limit=5')
      ]);
      setDashboardData(dashRes.data);
      setPayments(payRes.data.payments || []);
    } catch (err) {
      console.error('Error fetching earnings data', err);
      setError('Failed to load earnings dashboard.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      
      
      {error && (
        <div className="p-4 bg-error-container text-on-error-container rounded-xl border-error">
          {error}
        </div>
      )}

      {/* Hero Row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Total Earnings Hero */}
        <div className="col-span-1 lg:col-span-5 bg-primary p-6 md:p-8 rounded-xl border-outline text-on-primary shadow-subtle relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <p className="font-label-md text-on-primary-container opacity-80 mb-1">Total Earnings (YTD)</p>
              <h2 className="font-display-lg text-4xl md:text-5xl">${dashboardData?.revenue || '0.00'}</h2>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-2 py-1 rounded border-outline">+12.4% vs last year</span>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 transition-transform group-hover:">monetization_on</span>
        </div>

        {/* Available Balance */}
        <div className="col-span-1 lg:col-span-4 bg-white p-6 md:p-8 rounded-xl border-outline shadow-subtle flex flex-col justify-between">
          <div>
            <p className="font-label-md text-on-surface-variant mb-1">Available Balance</p>
            <h2 className="font-headline-md text-headline-md text-ink-black">${(dashboardData?.revenue * 0.2).toFixed(2) || '0.00'}</h2>
          </div>
          <button className="w-full mt-6 bg-secondary-container text-on-secondary-container border-outline py-3 rounded-xl font-label-bold shadow-subtle interactive-press flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            Withdraw Funds
          </button>
        </div>

        {/* Next Payout Details */}
        <div className="col-span-1 lg:col-span-3 bg-accent-sage p-6 md:p-8 rounded-xl border-outline shadow-subtle">
          <p className="font-label-md text-on-surface-variant mb-1">Next Payout</p>
          <h3 className="font-headline-sm text-headline-sm text-ink-black mb-4">In 7 Days</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Estimated Amount</span>
              <span className="font-bold text-ink-black">${(dashboardData?.revenue * 0.1).toFixed(2) || '0.00'}</span>
            </div>
            <div className="w-full bg-background border-outline h-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-on-surface-variant">75% of processing window completed</p>
          </div>
        </div>
      </section>

      {/* Middle Row: Analytics & List */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Revenue Chart */}
        <div className="col-span-1 lg:col-span-8 bg-white p-6 md:p-8 rounded-xl border-outline shadow-subtle">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-ink-black">Monthly Revenue</h3>
              <p className="text-on-surface-variant">Performance over the last 6 months</p>
            </div>
            <select className="bg-background border-outline rounded-lg text-sm px-3 py-1 focus:ring-0 focus:border-primary transition-all">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          {/* Simplified Visual Chart (Neo-Memphis Bars) */}
          <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2 md:px-4">
            {[
              { label: 'JAN', height: '60%', color: 'bg-surface' },
              { label: 'FEB', height: '75%', color: 'bg-surface' },
              { label: 'MAR', height: '85%', color: 'bg-secondary-container' },
              { label: 'APR', height: '65%', color: 'bg-accent-sage' },
              { label: 'MAY', height: '95%', color: 'bg-primary' },
              { label: 'JUN', height: '40%', color: 'bg-surface' }
            ].map(bar => (
              <div key={bar.label} className="flex flex-col items-center flex-1 gap-2">
                <div className={`chart-bar w-full ${bar.color} border-x-[1.5px] border-t-[1.5px] border-outline rounded-t-lg hover:brightness-110`} style={{ height: bar.height }}></div>
                <span className="text-xs font-bold text-on-surface-variant">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payouts */}
        <div className="col-span-1 lg:col-span-4 bg-white p-6 md:p-8 rounded-xl border-outline shadow-subtle">
          <h3 className="font-headline-sm text-headline-sm text-ink-black mb-6">Recent Payments</h3>
          <div className="space-y-4">
            {payments.length === 0 ? (
              <p className="text-on-surface-variant text-center py-4">No recent payments.</p>
            ) : (
              payments.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border-outline rounded-xl hover:bg-background transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary-fixed rounded-lg border-outline flex items-center justify-center">
                      <span className="material-symbols-outlined text-ink-black">account_balance</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-ink-black">{format(parseISO(p.payment_date || p.created_at), 'MMM dd, yyyy')}</p>
                      <p className="text-xs text-on-surface-variant">Bank Transfer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-ink-black">${p.amount}</p>
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 border-green-700 text-[10px] font-extrabold rounded-full">
                      {p.payment_status || 'Processed'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="w-full mt-6 text-primary font-bold text-sm hover:underline">View History</button>
        </div>
      </section>

      {/* Bottom Row: Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* New Patients Metric */}
        <div className="bg-surface p-6 md:p-8 rounded-xl border-outline shadow-subtle flex items-center justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="font-label-md text-on-tertiary-fixed-variant mb-1 uppercase tracking-wider">New Patients</p>
            <h4 className="font-display-lg text-4xl text-ink-black">12</h4>
            <p className="text-sm font-medium mt-2 text-on-tertiary-fixed-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +2 since last month
            </p>
          </div>
          <div className="w-24 h-24 bg-white/30 rounded-full border-outline flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl text-ink-black" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
          </div>
        </div>

        {/* Sessions Done Metric */}
        <div className="bg-surface p-6 md:p-8 rounded-xl border-outline shadow-subtle flex items-center justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="font-label-md text-on-tertiary-fixed-variant mb-1 uppercase tracking-wider">Sessions Done</p>
            <h4 className="font-display-lg text-4xl text-ink-black">{dashboardData?.total_sessions || 0}</h4>
            <p className="text-sm font-medium mt-2 text-on-tertiary-fixed-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">task_alt</span>
              98% completion rate
            </p>
          </div>
          <div className="w-24 h-24 bg-white/30 rounded-full border-outline flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl text-ink-black" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EarningsDashboard;
