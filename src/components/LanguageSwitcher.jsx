import { Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'mr', label: 'MR' },
  { code: 'hi', label: 'HI' }
];

export default function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation();

  return (
    <div className={`flex items-center gap-2 ${compact ? 'justify-center' : ''}`} aria-label="Language switcher">
      <Globe2 size={16} aria-hidden="true" />
      <div className="flex rounded-full border border-current/20 p-1">
        {languages.map((language) => (
          <button
            key={language.code}
            type="button"
            onClick={() => i18n.changeLanguage(language.code)}
            className={`focus-ring rounded-full px-2.5 py-1 text-[0.68rem] font-bold transition ${
              i18n.language === language.code ? 'bg-dark text-white' : 'text-current hover:bg-dark/10'
            }`}
          >
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
}
