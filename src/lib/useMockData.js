/** Enable mock catalog when backend is unavailable (VITE_USE_MOCK_DATA=true). */
export const useMockData = () => import.meta.env.VITE_USE_MOCK_DATA === 'true';
