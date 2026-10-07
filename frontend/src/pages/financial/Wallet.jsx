import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const Wallet = () => {
  const [wallet, setWallet] = useState({
    balance: 0,
    vault_savings: 0,
    vault_goal: 2000,
    reward_points: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topupAmount, setTopupAmount] = useState('');
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [walletRes, historyRes] = await Promise.allSettled([
        axiosInstance.get('/payments/wallet'),
        axiosInstance.get('/payments/history'),
      ]);

      if (walletRes.status === 'fulfilled' && walletRes.value.data) {
        setWallet(walletRes.value.data);
      }
      if (historyRes.status === 'fulfilled' && Array.isArray(historyRes.value.data)) {
        setTransactions(historyRes.value.data);
      }
    } catch (err) {
      console.error('Error fetching wallet details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTopup = async (e) => {
    e.preventDefault();
    const amt = parseFloat(topupAmount);
    if (!amt || amt <= 0) return;

    try {
      setProcessing(true);
      const res = await axiosInstance.post('/payments/wallet/topup', { amount: amt });
      setMessage({ type: 'success', text: res.data?.message || 'Top-up successful!' });
      setShowTopupModal(false);
      setTopupAmount('');
      await fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'Top-up failed' });
    } finally {
      setProcessing(false);
    }
  };

  const vaultPercent = Math.min(100, Math.round(((wallet.vault_savings || 0) / (wallet.vault_goal || 1)) * 100));

  return (
    <div className="flex-1 pb-24">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h2 className="font-display-lg text-4xl md:text-display-lg text-ink-black">Wallet &amp; Payments</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage your counselling funds, vault, and rewards securely.</p>
        </div>
      </header>

      {message && (
        <div className={`mb-6 p-4 rounded-xl memphis-border ${message.type === 'success' ? 'bg-accent-sage text-on-background' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Balance Card */}
        <div className="md:col-span-8 bg-primary text-on-primary rounded-xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[280px] shadow-subtle memphis-border">
          <div className="relative z-10">
            <p className="font-label-md text-label-md text-stone-300 mb-2 uppercase tracking-widest">Available Balance</p>
            <h3 className="font-display-lg text-4xl md:text-5xl leading-none">
              ₹{wallet.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </h3>
          </div>

          <div className="relative z-10 flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => setShowTopupModal(true)}
              className="bg-surface text-ink-black px-6 py-3 rounded-xl font-label-bold flex items-center gap-2 memphis-border hover:bg-stone-100 transition-all"
            >
              <span className="material-symbols-outlined">add</span>
              Add Funds
            </button>
            <button
              onClick={() => alert('Withdrawal request submitted to your registered UPI / Bank account.')}
              className="bg-transparent border border-white/40 text-white px-6 py-3 rounded-xl font-label-bold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined">arrow_downward</span>
              Withdraw
            </button>
          </div>
        </div>

        {/* Savings & Points */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Vault Card */}
          <div className="bg-surface-container-lowest border-outline rounded-xl p-6 memphis-border flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-emerald-700">savings</span>
              <h4 className="font-headline-sm text-headline-sm text-ink-black">Care Vault</h4>
            </div>
            <p className="font-headline-md text-2xl text-ink-black">₹{wallet.vault_savings.toFixed(2)}</p>
            <div className="mt-3 w-full h-3 bg-surface-variant rounded-full overflow-hidden border">
              <div style={{ width: `${vaultPercent}%` }} className="h-full bg-emerald-600 transition-all duration-300"></div>
            </div>
            <p className="font-label-md text-xs text-on-surface-variant mt-2 text-right">Goal: ₹{wallet.vault_goal}</p>
          </div>

          {/* Rewards Card */}
          <div className="bg-surface-container-lowest border-outline rounded-xl p-6 memphis-border flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-amber-600">toll</span>
              <h4 className="font-headline-sm text-headline-sm text-ink-black">Karma Points</h4>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="font-headline-md text-2xl text-ink-black">{wallet.reward_points}</p>
              <span className="text-xs text-amber-700 font-bold uppercase">pts</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">Earn points with every session &amp; daily check-in.</p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="col-span-1 md:col-span-12 bg-surface-container-lowest border-outline rounded-xl p-6 md:p-8 memphis-border">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline">
            <h3 className="font-headline-md text-xl md:text-2xl text-ink-black">Transaction Activity</h3>
            <span className="text-xs font-semibold text-on-surface-variant">{transactions.length} records</span>
          </div>

          {loading ? (
            <p className="text-center py-8 text-on-surface-variant">Loading transaction history...</p>
          ) : transactions.length === 0 ? (
            <div className="text-center py-10">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">receipt_long</span>
              <p className="font-headline-sm text-sm text-on-surface-variant">No transactions yet.</p>
              <p className="text-xs text-on-surface-variant mt-1">Book a session or add funds to get started.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {transactions.map((tx) => (
                <div key={tx.payment_id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-stone-200 hover:border-black transition-all bg-white gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-ink-black">
                        {tx.payment_method === 'upi' ? 'account_balance_wallet' : 'credit_card'}
                      </span>
                    </div>
                    <div>
                      <p className="font-label-bold text-sm text-ink-black">{tx.transaction_id}</p>
                      <p className="text-xs text-on-surface-variant">
                        {tx.transaction_date ? new Date(tx.transaction_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Completed'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-base text-ink-black">
                      ₹{tx.amount?.toFixed(2)}
                    </p>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top-up Modal */}
      {showTopupModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl max-w-md w-full memphis-border shadow-dialog">
            <h3 className="font-headline-sm text-xl mb-4 text-ink-black">Top Up Wallet</h3>
            <form onSubmit={handleTopup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Enter Amount (₹ INR)</label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  placeholder="e.g. 500"
                  required
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-black font-semibold text-lg"
                />
              </div>
              <div className="flex gap-2">
                {[200, 500, 1000, 2000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTopupAmount(preset.toString())}
                    className="flex-1 py-1.5 text-xs rounded-lg border border-stone-200 hover:border-black font-medium"
                  >
                    +₹{preset}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowTopupModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm memphis-border disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Add Funds'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
