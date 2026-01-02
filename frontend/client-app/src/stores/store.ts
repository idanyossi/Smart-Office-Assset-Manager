import { createContext, useContext } from "react";
import UserStore from "./UserStore";
import AssetStore from "./AssetStore";

interface Store {
  userStore: UserStore;
  assetStore: AssetStore;
}

export const store:Store = {
  userStore: new UserStore(),
  assetStore: new AssetStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};