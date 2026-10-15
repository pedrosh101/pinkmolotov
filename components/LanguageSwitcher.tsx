'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('LanguageSwitcher');
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(newLocale: 'pt' | 'en') {
    if (newLocale === locale) return;

    const pathWithoutLocale =
      pathname.replace(/^\/(pt|en)(?=\/|$)/, '') || '/';

    router.replace(`/${newLocale}${pathWithoutLocale}`);
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-sm"
      aria-label={t('label')}
    >
      <button
        type="button"
        onClick={() => changeLocale('pt')}
        disabled={locale === 'pt'}
        aria-current={locale === 'pt' ? 'page' : undefined}
        className={`
          rounded-full px-3 py-1.5 font-codiar text-xs tracking-wide
          transition-all duration-200
          ${
            locale === 'pt'
              ? 'bg-[#F7F4E4] text-black shadow-sm'
              : 'text-white/60 hover:bg-white/10 hover:text-[#F7F4E4]'
          }
        `}
      >
        PT
      </button>

      <button
        type="button"
        onClick={() => changeLocale('en')}
        disabled={locale === 'en'}
        aria-current={locale === 'en' ? 'page' : undefined}
        className={`
          rounded-full px-3 py-1.5 font-codiar text-xs tracking-wide
          transition-all duration-200
          ${
            locale === 'en'
              ? 'bg-[#F7F4E4] text-black shadow-sm'
              : 'text-white/60 hover:bg-white/10 hover:text-[#F7F4E4]'
          }
        `}
      >
        EN
      </button>
    </div>
  );
}