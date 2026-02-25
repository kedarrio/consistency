import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import TopNav from '../components/navigation/TopNav';
import { format, parseISO } from 'date-fns';

const DayDetail = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { habits } = useApp();

  const formattedDate = format(parseISO(date), 'eeee, MMMM d, yyyy');

  const dayEntries = habits.flatMap(h => 
    h.entries.filter(e => e.date === date).map(e => ({
      ...e,
      habitName: h.name,
      habitColor: h.color,
      habitType: h.type
    }))
  ).sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary pb-24">
      <TopNav title={format(parseISO(date), 'MMMM d')} showBack />

      <main className="px-6 py-8 space-y-8">
        <header>
          <h1 className="text-3xl font-heading font-semibold">{formattedDate}</h1>
          <p className="text-text-secondary font-body mt-1">{dayEntries.length} activities logged</p>
        </header>

        {/* Timeline View */}
        <section className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border-divider">
          {dayEntries.length > 0 ? (
            dayEntries.map((entry, i) => (
              <div key={i} className="relative">
                {/* Dot */}
                <div 
                  className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-2 border-bg-primary z-10"
                  style={{ backgroundColor: `var(--color-habit-${entry.habitColor})` }}
                />
                
                <div className="bg-bg-surface p-4 rounded-xl border border-border-divider shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-body text-text-secondary uppercase tracking-wider">
                      {entry.startTime ? `${entry.startTime} - ${entry.endTime}` : 'All Day'}
                    </span>
                    <span className="text-xs font-body px-2 py-0.5 rounded-full bg-black/20 text-text-placeholder uppercase">
                      {entry.habitType}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2">{entry.habitName}</h3>
                  <div className="text-lg font-body font-bold text-accent-primary">
                    {entry.duration ? `${entry.duration} minutes` : entry.count ? `${entry.count} units` : 'Logged'}
                  </div>
                  {entry.notes && (
                    <p className="text-sm text-text-secondary font-body mt-3 border-t border-border-divider pt-2 italic">
                      "{entry.notes}"
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4 -ml-8">
              <p className="text-text-placeholder italic font-body">No activity logged for this day.</p>
              <button 
                onClick={() => navigate('/')}
                className="text-accent-primary font-body border-b border-accent-primary"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DayDetail;
