import { BackHomeLink } from "../components/back-home-link";
import { useLocale } from "../lib/i18n";

export function NotFound() {
  const { t } = useLocale();
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-8 text-center">
      <h1 className="text-4xl">{t("notFound")}</h1>
      <BackHomeLink className="mt-8" />
    </section>
  );
}
