"use client";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "@/lib/App.store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  // eslint-disable-next-line react-hooks/refs
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  // eslint-disable-next-line react-hooks/refs
  return <Provider store={storeRef.current}>{children}</Provider>;
}
