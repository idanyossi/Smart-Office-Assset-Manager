import { makeAutoObservable, runInAction} from "mobx";
import agent, { type Asset } from "../api/agent";

export default class AssetStore{
    assets: Asset[] = [];
    loading = false;
    
    constructor(){
        makeAutoObservable(this);
    }

    loadAssets = async () => {
        this.loading = true;
        try {
            const assets = await agent.Assets.list();
            runInAction(() => {
                this.assets = assets;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            });
            console.error("Failed to load assets", error);
        }
    }

    createAsset = async (asset: Asset) => {
        this.loading = true;
        try {
            await agent.Assets.create(asset);
            await this.loadAssets();
            runInAction(() => {
                this.loading = false;
            });
        } catch (error) {
            console.error("Failed to create asset", error);
            runInAction(() => {
                this.loading = false;
            });
            throw error;
        }
   }
}