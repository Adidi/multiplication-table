import { Shuffle } from "lucide-react";
import { useState } from "react";
import { ExerciseGrid } from "../components/exercise-grid";
import { NumberNav } from "../components/number-nav";
import { PageHeader } from "../components/page-header";
import { ShuffleButton } from "../components/shuffle-button";
import { useLocale } from "../lib/i18n";
import { randomExercises } from "../lib/shuffle";

const MIX_SIZE = 12;

export function MixPage() {
  const { t } = useLocale();
  const [round, setRound] = useState(0);
  const [exercises, setExercises] = useState(() => randomExercises(MIX_SIZE));

  function reshuffle() {
    setExercises(randomExercises(MIX_SIZE));
    setRound((r) => r + 1);
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-4 sm:pb-4">
      <PageHeader
        badge={<Shuffle className="size-6 sm:size-8" />}
        badgeClassName="bg-linear-to-br from-rose-400 via-amber-400 to-sky-500"
        title={t("mixTitle")}
        hint={t("mixHint")}
        action={<ShuffleButton onClick={reshuffle} />}
      />

      <div className="pb-6">
        <ExerciseGrid exercises={exercises} round={round} />
      </div>

      <NumberNav showMix={false} />
    </section>
  );
}
