import React from 'react';

const AccountData = () => {
  return (
    <div className="flex flex-col gap-8">
      
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Export Data Section */}
        <section className="col-span-1 md:col-span-12 lg:col-span-7 border-outline rounded-xl p-6 md:p-8 bg-surface-container-low shadow-subtle">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-primary text-3xl">cloud_download</span>
            <h3 className="font-headline-md text-2xl text-ink-black">Download Your Data</h3>
          </div>
          <p className="text-body-md text-on-surface-variant mb-6">
            Get a copy of your MindSpace data. We'll email you a link to download a file with your mood entries, chat history, and account information.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white border-outline rounded-2xl">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-outline text-primary focus:ring-0" defaultChecked />
              <div>
                <p className="font-label-bold">Mood Tracker History</p>
                <p className="text-sm text-on-surface-variant">All check-ins, journal entries, and AI analyses.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white border-outline rounded-2xl">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-outline text-primary focus:ring-0" defaultChecked />
              <div>
                <p className="font-label-bold">Session Records</p>
                <p className="text-sm text-on-surface-variant">Therapy session summaries, notes, and prescriptions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white border-outline rounded-2xl">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-outline text-primary focus:ring-0" defaultChecked />
              <div>
                <p className="font-label-bold">Account Activity</p>
                <p className="text-sm text-on-surface-variant">Login history, payment records, and settings.</p>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full sm:w-auto px-6 py-3 bg-primary text-white font-label-bold rounded-xl border-outline shadow-subtle active:scale-[0.98] flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">request_page</span>
            Request Data Archive
          </button>
        </section>

        {/* Danger Zone Section */}
        <section className="col-span-1 md:col-span-12 lg:col-span-5 border-error bg-error-container rounded-xl p-6 md:p-8 shadow-subtle h-fit">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            <h3 className="font-headline-md text-2xl text-on-error-container">Danger Zone</h3>
          </div>
          <p className="text-body-md text-on-error-container mb-6">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <div className="space-y-4">
            <button className="w-full text-left p-4 bg-white border-outline rounded-2xl flex items-center justify-between group hover:bg-error hover:text-white transition-all active:scale-[0.98]">
              <div>
                <p className="font-label-bold">Delete Account</p>
                <p className="text-label-md opacity-70">Permanently remove all data</p>
              </div>
              <span className="material-symbols-outlined">delete_forever</span>
            </button>
            <button className="w-full text-left p-4 bg-white border-outline rounded-2xl flex items-center justify-between group hover:bg-outline hover:text-white transition-all active:scale-[0.98]">
              <div>
                <p className="font-label-bold">Deactivate Temporarily</p>
                <p className="text-label-md opacity-70">Take a break without losing data</p>
              </div>
              <span className="material-symbols-outlined">pause_circle</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AccountData;
