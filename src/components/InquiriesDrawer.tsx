import { useState } from 'react';
import { CalendarClock, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { InquiryType, SavedInquiry } from '../types/vanvita';

interface InquiriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: SavedInquiry[];
  onReschedule: (inquiry: SavedInquiry) => void;
  onCancelInquiry: (id: string) => void;
}

function getInquiryTypeLabel(type: InquiryType): string {
  switch (type) {
    case 'free-intro':
      return 'Free Intro Session';
    case 'herway-pilot':
      return 'HerWAY Pilot';
    case 'business-program':
      return 'Corporate Proposal';
    case 'retreat-hold':
      return 'Retreat Inquiry';
    default:
      return '1-on-1 Coaching';
  }
}

export function InquiriesDrawer({
  isOpen,
  onClose,
  inquiries,
  onReschedule,
  onCancelInquiry,
}: InquiriesDrawerProps) {
  const [tab, setTab] = useState<'confirmed' | 'cancelled'>('confirmed');

  const filtered = inquiries.filter((i) => i.status === tab);
  const confirmedCount = inquiries.filter((i) => i.status === 'confirmed').length;
  const cancelledCount = inquiries.filter((i) => i.status === 'cancelled').length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex justify-end bg-[#51372E]/40 backdrop-blur-[3px]"
          role="dialog"
          aria-modal="true"
          aria-label="My VANVITA Bookings"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-[#F2EAE5] h-full border-l border-[#D8CEC4] flex flex-col justify-between overflow-hidden rounded-l-[2.5rem] ember-card-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-7 py-6 border-b border-[#D8CEC4] flex items-center justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium text-[#5A1E31] mb-0.5">
                  VANVITA Wellbeing Desk
                </p>
                <h3 className="text-[24px] font-medium text-[#51372E] leading-tight">
                  Your Scheduled Sessions
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close bookings panel"
                className="w-10 h-10 inline-flex items-center justify-center text-[#72584D] hover:text-[#51372E] hover:bg-[#FBF0F2] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-7 pt-5">
              <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#EAE1DA] rounded-full">
                <button
                  type="button"
                  onClick={() => setTab('confirmed')}
                  className={`py-2 text-[13px] font-medium rounded-full transition-colors cursor-pointer ${
                    tab === 'confirmed'
                      ? 'bg-[#51372E] text-[#F2EAE5]'
                      : 'text-[#72584D] hover:text-[#51372E]'
                  }`}
                >
                  Active (<span className="tabular-nums-mono">{confirmedCount}</span>)
                </button>
                <button
                  type="button"
                  onClick={() => setTab('cancelled')}
                  className={`py-2 text-[13px] font-medium rounded-full transition-colors cursor-pointer ${
                    tab === 'cancelled'
                      ? 'bg-[#51372E] text-[#F2EAE5]'
                      : 'text-[#72584D] hover:text-[#51372E]'
                  }`}
                >
                  Cancelled (<span className="tabular-nums-mono">{cancelledCount}</span>)
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-4">
              {filtered.length === 0 ? (
                <div className="py-16 text-center border border-[#D8CEC4] bg-white rounded-[2rem] soft-card-shadow px-6">
                  <CalendarClock className="w-7 h-7 text-[#752D43] mx-auto mb-3" />
                  <p className="text-[20px] font-medium text-[#51372E] mb-2">
                    {tab === 'confirmed' ? 'No active bookings yet' : 'No cancelled sessions'}
                  </p>
                  <p className="text-[13px] text-[#72584D] leading-relaxed">
                    {tab === 'confirmed'
                      ? 'Book a Free Intro session, 1-on-1 coaching intake, HerWAY pilot welcome, or corporate briefing from the Contact desk.'
                      : 'Any cancelled sessions or updated bookings will appear here for your records.'}
                  </p>
                </div>
              ) : (
                filtered.map((item) => (
                  <article
                    key={item.id}
                    className="border border-[#D8CEC4] bg-white rounded-[1.75rem] soft-card-shadow p-5 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[12px] text-[#72584D] mb-1">
                          <span className="tabular-nums-mono text-[#51372E]">
                            {item.referenceCode}
                          </span>{' '}
                          ·{' '}
                          <span className="font-medium text-[#5A1E31]">
                            {getInquiryTypeLabel(item.inquiryType)}
                          </span>
                        </p>
                        <h4 className="text-[19px] font-medium text-[#51372E] leading-snug">
                          {item.subjectTitle}
                        </h4>
                      </div>
                      <span
                        className={`text-[12px] font-medium whitespace-nowrap shrink-0 px-2.5 py-1 rounded-full ${
                          item.status === 'confirmed'
                            ? 'bg-[#EAE1DA] text-[#752D43]'
                            : 'bg-[#FBF0F2] text-[#5A1E31]'
                        }`}
                      >
                        {item.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                      </span>
                    </div>

                    <div className="text-[13px] text-[#72584D] space-y-1.5 pt-3 border-t border-[#EAE1DA]">
                      <p>
                        <span className="text-[#8A7367]">When: </span>
                        <span className="text-[#51372E]">
                          {item.formattedLocalDate} ·{' '}
                          <span className="tabular-nums-mono">{item.formattedLocalTime}</span>
                        </span>
                      </p>
                      <p>
                        <span className="text-[#8A7367]">Time Zone: </span>
                        <span className="text-[#51372E]">{item.timezoneCity}</span>
                      </p>
                      {item.suiteName ? (
                        <p>
                          <span className="text-[#8A7367]">Preference: </span>
                          <span className="text-[#51372E]">{item.suiteName}</span>
                        </p>
                      ) : (
                        <p>
                          <span className="text-[#8A7367]">Guide: </span>
                          <span className="text-[#51372E]">{item.preferredMasterName}</span>
                        </p>
                      )}
                      <p>
                        <span className="text-[#8A7367]">Member: </span>
                        <span className="text-[#51372E]">
                          {item.clientName} ({item.clientEmail})
                        </span>
                      </p>
                      {item.notes && (
                        <p className="pt-1 text-[#72584D] italic">“{item.notes}”</p>
                      )}
                    </div>

                    {item.status === 'confirmed' && (
                      <div className="pt-3 border-t border-[#EAE1DA] flex items-center justify-end gap-4">
                        <button
                          type="button"
                          onClick={() => onCancelInquiry(item.id)}
                          className="text-[13px] text-[#72584D] hover:text-[#752D43] transition-colors cursor-pointer py-1"
                        >
                          Cancel Session
                        </button>
                        <button
                          type="button"
                          onClick={() => onReschedule(item)}
                          className="px-5 py-2 text-[12px] font-medium text-[#F2EAE5] bg-[#752D43] hover:bg-[#5A1E31] rounded-full transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Reschedule
                        </button>
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>

            <div className="px-7 py-5 border-t border-[#D8CEC4] bg-white text-[12px] text-[#72584D]">
              Saved locally on this device. Europe &amp; USA desk:{' '}
              <span className="text-[#51372E]">concierge@vanvita.com</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
