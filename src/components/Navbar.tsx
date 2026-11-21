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
        className="pointer-events-auto w-full max-w-6xl bg-white/84 backdrop-blur-[20px] border border-[#DDE7DC] rounded-full soft-card-shadow px-4 sm:px-5 h-14 sm:h-16 flex items-center justify-between gap-3"
      >
        {/* Zone 1: Two-leaf V Vanvita botanical logo + wordmark */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleLinkClick('home')}
          className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 rounded-full"
        >
          <VanvitaLogo size={30} />
          <span className="text-[17px] sm:text-[18px] font-medium tracking-[-0.025em] text-[#18241C]">
            VANVITA
          </span>
        </motion.button>

        {/* Zone 2: Clean single-line brief menu links */}
        <nav
          aria-label="Primary pages"
          className="hidden lg:flex items-center gap-5 xl:gap-6 text-[13.5px] font-medium text-[#526458]"
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
                  isActive ? 'text-[#18241C]' : 'hover:text-[#B84D1D]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="vanvitaNavUnderline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#B84D1D]"
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
                ? 'bg-[#B84D1D] border-[#B84D1D] text-[#F7FAF6]'
                : 'bg-[#F8EDE6] border-[#B84D1D]/25 text-[#18241C] hover:bg-[#F2DFD3]'
            }`}
          >
            <Building2
              className={`w-3.5 h-3.5 shrink-0 ${
                isBusinessActive ? 'text-[#F7FAF6]' : 'text-[#B84D1D]'
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
            className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 text-[12.5px] font-medium text-[#F7FAF6] bg-[#18241C] hover:bg-[#B84D1D] rounded-full transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer min-h-[38px]"
          >
            Free Intro
          </motion.button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#18241C] hover:bg-[#EBF3EA] rounded-full transition-colors cursor-pointer"
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
            className="pointer-events-auto lg:hidden fixed top-22 left-4 right-4 bg-white/95 backdrop-blur-xl border border-[#DDE7DC] rounded-[2rem] soft-card-shadow p-5 z-40"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleLinkClick('home')}
                className={`text-left px-4 py-3 rounded-2xl text-[15px] font-medium transition-colors min-h-[44px] ${
                  currentPage === 'home'
                    ? 'bg-[#EBF3EA] text-[#18241C]'
                    : 'text-[#526458] hover:bg-[#F7FAF6] hover:text-[#18241C]'
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
                        ? 'bg-[#F8EDE6] text-[#B84D1D]'
                        : 'text-[#526458] hover:bg-[#F7FAF6] hover:text-[#18241C]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div className="mt-3 pt-3 border-t border-[#EBF3EA] grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onBusinessClick();
                  }}
                  className={`inline-flex items-center justify-center gap-1.5 py-3 px-4 text-[13px] font-medium rounded-full border transition-colors min-h-[44px] ${
                    isBusinessActive
                      ? 'bg-[#B84D1D] border-[#B84D1D] text-[#F7FAF6]'
                      : 'bg-[#F8EDE6] border-[#B84D1D]/25 text-[#18241C]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#B84D1D]" />
                  <span>For Business</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onBookClick();
                  }}
                  className="py-3 px-4 text-[13px] font-medium text-[#F7FAF6] bg-[#18241C] hover:bg-[#B84D1D] rounded-full transition-colors min-h-[44px]"
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


