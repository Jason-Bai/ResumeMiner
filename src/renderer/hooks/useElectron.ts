// src/renderer/hooks/useElectron.ts
import { useCallback } from "react";

function useElectron() {
  const getVersion = useCallback(async () => {
    try {
      // 添加日志帮助调试
      console.log("Hook: Fetching version...");
      const version = await window.electronAPI?.getAppVersion();
      console.log("Hook: Version received:", version);
      return version;
    } catch (error) {
      console.error("Hook: Error getting version:", error);
      return "Error";
    }
  }, []);

  return { getVersion };
}

export default useElectron;
