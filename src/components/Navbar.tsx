import { useState } from 'react';
import { Building2, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PageRoute } from '../types/vanvita';
import { VanvitaLogo } from './VanvitaLogo';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onBusinessClick: () => void;
  onBookClick: () => void;
}

const NAV_ITEMS: Array<{ label: string; page: PageRoute }> = [
  { label: 'Online Wellness', page: 'online-wellness' },
  { label: 'HerWAY', page: 'herway' },
  { label: 'Our Experts', page: 'experts' },
  { label: 'Schedule', page: 'schedule' },
  { label: 'About', page: 'about' },
];

export function Navbar({
  currentPage,
  onNavigate,
  onBusinessClick,
  onBookClick,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (page: PageRoute) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  const isBusinessActive = currentPage === 'business';

  return (
    <div className="fixed top-4 left-0 right-0 z-40 w-full flex justify-center px-4 pointer-events-none">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto w-full max-w-6xl bg-[#752D43]/94 backdrop-blur-[20px] border border-[#DC7188]/30 rounded-full shadow-[0_16px_40px_rgba(117,45,67,0.32)] px-4 sm:px-5 h-14 sm:h-16 flex items-center justify-between gap-3 text-[#FAF6F3]"
      >
        {/* Zone 1: Signature nautilus emblem + wordmark */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleLinkClick('home')}
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 rounded-full"
        >
          <VanvitaLogo size={34} inverted={true} />
          <span className="font-display text-[17px] sm:text-[18px] tracking-[0.16em] font-medium text-[#FAF6F3]">
            VANVITA
          </span>
        </motion.button>

        {/* Zone 2: Clean single-line brief menu links */}
        <nav
          aria-label="Primary pages"
          className="hidden lg:flex items-center gap-5 xl:gap-6 text-[13.5px] font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleLinkClick(item.page)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  isActive ? 'text-[#FAF6F3] font-semibold' : 'text-[#F2EAE5]/82 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="vanvitaNavUnderline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#FF9EBA]"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: For Business capsule right beside Free Intro / Contact */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setMobileOpen(false);
              onBusinessClick();
            }}
            aria-current={isBusinessActive ? 'page' : undefined}
            className={`hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 text-[12.5px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[38px] ${
              isBusinessActive
                ? 'bg-white text-[#752D43] border-white shadow-xs'
                : 'bg-white/12 border-white/20 text-[#FAF6F3] hover:bg-white/20'
            }`}
          >
            <Building2
              className={`w-3.5 h-3.5 shrink-0 ${
                isBusinessActive ? 'text-[#752D43]' : 'text-[#FF9EBA]'
              }`}
            />
            <span>For Business</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setMobileOpen(false);
              onBookClick();
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 text-[12.5px] font-semibold text-[#752D43] bg-[#FAF6F3] hover:bg-white rounded-full transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer min-h-[38px] shadow-sm"
          >
            Free Intro
          </motion.button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#FAF6F3] hover:bg-white/15 rounded-full transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Floating Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto lg:hidden fixed top-22 left-4 right-4 bg-white/95 backdrop-blur-xl border border-[#D8CEC4] rounded-[2rem] soft-card-shadow p-5 z-40"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleLinkClick('home')}
                className={`text-left px-4 py-3 rounded-2xl text-[15px] font-medium transition-colors min-h-[44px] ${
                  currentPage === 'home'
                    ? 'bg-[#EAE1DA] text-[#51372E]'
                    : 'text-[#72584D] hover:bg-[#F2EAE5] hover:text-[#51372E]'
                }`}
              >
                Home
              </button>
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => handleLinkClick(item.page)}
                    className={`text-left px-4 py-3 rounded-2xl text-[15px] font-medium transition-colors min-h-[44px] ${
                      isActive
                        ? 'bg-[#FBF0F2] text-[#752D43]'
                        : 'text-[#72584D] hover:bg-[#F2EAE5] hover:text-[#51372E]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div className="mt-3 pt-3 border-t border-[#EAE1DA] grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onBusinessClick();
                  }}
                  className={`inline-flex items-center justify-center gap-1.5 py-3 px-4 text-[13px] font-medium rounded-full border transition-colors min-h-[44px] ${
                    isBusinessActive
                      ? 'bg-[#752D43] border-[#752D43] text-[#F2EAE5]'
                      : 'bg-[#FBF0F2] border-[#752D43]/25 text-[#51372E]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#752D43]" />
                  <span>For Business</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onBookClick();
                  }}
                  className="py-3 px-4 text-[13px] font-medium text-[#F2EAE5] bg-[#51372E] hover:bg-[#752D43] rounded-full transition-colors min-h-[44px]"
                >
                  Free Intro
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


