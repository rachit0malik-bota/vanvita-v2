import { PageRoute } from '../types/vanvita';
import { VanvitaLogo } from './VanvitaLogo';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#F2EAE5] border-t border-[#D8CEC4] mt-10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#D8CEC4]">
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 mb-4 cursor-pointer"
            >
              <VanvitaLogo size={36} />
              <span className="text-[22px] font-semibold tracking-[-0.01em] text-[#51372E]">
                VANVITA Wellbeing
              </span>
            </button>
            <p className="text-[14px] leading-[1.7] text-[#72584D] max-w-sm">
              Expert-led wellness for individuals, companies, and new mothers—delivered live online
              at times that suit Europe and the USA, and through retreats in India with licensed
              partners.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-[14px]">
            <p className="text-[12px] text-[#752D43] font-medium mb-3">Explore VANVITA</p>
            <div className="flex flex-col items-start gap-2.5 text-[#72584D]">
              <button
                type="button"
                onClick={() => onNavigate('online-wellness')}
                className="hover:text-[#752D43] transition-colors cursor-pointer"
              >
                Online Wellness & Programmes
              </button>
              <button
                type="button"
                onClick={() => onNavigate('business')}
                className="hover:text-[#752D43] transition-colors cursor-pointer"
              >
                Corporate Burnout & India Retreats
              </button>
              <button
                type="button"
                onClick={() => onNavigate('herway')}
                className="hover:text-[#752D43] transition-colors cursor-pointer"
              >
                HerWAY Postpartum Pilot
              </button>
              <button
                type="button"
                onClick={() => onNavigate('experts')}
                className="hover:text-[#752D43] transition-colors cursor-pointer"
              >
                Our Experts
              </button>
              <button
                type="button"
                onClick={() => onNavigate('schedule')}
                className="hover:text-[#752D43] transition-colors cursor-pointer"
              >
                Schedule (Europe & USA)
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="hover:text-[#752D43] transition-colors cursor-pointer"
              >
                About & Contact
              </button>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-[14px]">
            <p className="text-[12px] text-[#752D43] font-medium mb-3">Live Regions & Contact</p>
            <p className="text-[#51372E]">Europe (GMT / CET) · USA (EST / PST)</p>
            <p className="text-[#72584D]">hello@vanvitawellbeing.com</p>
            <button
              type="button"
              onClick={() => onNavigate('concierge')}
              className="mt-3 inline-flex items-center px-5 py-2.5 text-[13px] font-medium text-[#F2EAE5] bg-[#752D43] hover:bg-[#5A1E31] rounded-full transition-colors cursor-pointer"
            >
              Book a Free Intro Session
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px] text-[#8A7367]">
          <p>© {new Date().getFullYear()} VANVITA Wellbeing. Wellbeing, made personal.</p>
          <p className="font-cursive text-[24px] text-[#752D43] leading-none">
            Live well. Live fully.
          </p>
        </div>
      </div>
    </footer>
  );
}

