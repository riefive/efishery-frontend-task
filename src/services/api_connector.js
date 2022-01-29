import SteinStore from 'stein-js-client';

const dataUrl = process.env.REACT_APP_DATA_URL || null;
const StoreApi = dataUrl ? new SteinStore(dataUrl) : null;

export default StoreApi