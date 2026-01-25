"use client";
import { setupListeners } from "@reduxjs/toolkit/query";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/lib/App.store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // configure listeners using the provided defaults
    // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
    const unsubscribe = setupListeners(store.dispatch);
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LoaderIcon />}>
        {children}
      </PersistGate>
    </Provider>
  );
}
