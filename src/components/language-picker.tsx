import { Languages } from 'lucide-react';
import { LANGS, useLocale, type Lang } from '@/providers/i18n';
import { PopoverMenu, type PopoverMenuOption } from '@/ui/popover-menu';

const OPTIONS: PopoverMenuOption<Lang>[] = (Object.keys(LANGS) as Lang[]).map(code => ({
	value: code,
	label: LANGS[code].name
}));

export function LanguagePicker() {
	const { lang, setLang, t } = useLocale();
	return <PopoverMenu label={t('language')} icon={<Languages />} options={OPTIONS} value={lang} onChange={setLang} />;
}
