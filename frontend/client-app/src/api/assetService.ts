import axios from 'axios';
import type { Asset } from './agent';


const API_URL = 'https://localhost:7061/api/asset';

export const getAssets = async (): Promise<Asset[]> => {
    const response = await axios.get<Asset[]>(API_URL);
    return response.data;
}

export const createAsset = async (asset: Asset): Promise<{ message: string }> => {
    const response = await axios.post<{ message: string }>(API_URL, asset);
    return response.data; 
}