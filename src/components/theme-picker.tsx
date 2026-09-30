import { Moon, Sun, SunMoon } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { useTheme, type Theme } from '@/lib/theme';
import { PopoverMenu, type PopoverMenuOption } from '@/ui/popover-menu';

export function ThemePicker() {
	const { theme, setTheme } = useTheme();
	const { t } = useLocale();

	const options: PopoverMenuOption<Theme>[] = [
		{ value: 'light', label: t('light'), icon: <Sun /> },
		{ value: 'dark', label: t('dark'), icon: <Moon /> }
	];

	return (
		<PopoverMenu
			label={t('theme')}
			icon={theme === 'dark' ? <Moon /> : <SunMoon />}
			options={options}
			value={theme}
			onChange={setTheme}
		/>
	);
}
