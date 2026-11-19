import { useCallback, useEffect, useState } from "react";
import { listPlants } from "@/services/plants.service";
import type { Plant } from "@/types/plant";

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const result = await listPlants();
      setPlants(result.plants);
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load plants.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load server state once when the hook mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  return { plants, loading, error, refresh };
}
