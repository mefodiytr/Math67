/**
 * Хост-компонент церемонии — слушает CustomEvent("9moons:ceremony")
 * и монтирует CeremonyOverlay.
 *
 * Подключается в BaseLayout как client:only="react".
 */
import { useEffect, useState } from "react";
import CeremonyOverlay from "./CeremonyOverlay.tsx";

interface CeremonyEvent extends CustomEvent {
  detail: { moduleId: number };
}

export default function CeremonyHost(): JSX.Element | null {
  const [moduleId, setModuleId] = useState<number | null>(null);

  useEffect(() => {
    function onCeremony(e: Event): void {
      const ce = e as CeremonyEvent;
      if (typeof ce.detail?.moduleId === "number") {
        setModuleId(ce.detail.moduleId);
      }
    }
    window.addEventListener("9moons:ceremony", onCeremony);
    return () => window.removeEventListener("9moons:ceremony", onCeremony);
  }, []);

  if (moduleId === null) return null;

  return (
    <CeremonyOverlay
      moduleId={moduleId}
      onClose={() => setModuleId(null)}
    />
  );
}
