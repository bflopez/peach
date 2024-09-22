import {
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        lazy: async () => {
            const { LandingRoute } = await import('./routes/landing');
            return { Component: LandingRoute };
        }
    },
    {
        path: '/search-results',
        lazy: async () => {
            const { SearchResultsRoute } = await import('./routes/movie-search-results.tsx');
            return { Component: SearchResultsRoute };
        },
    },
]);
export const AppRouter = () => {

    return <RouterProvider router={router} />;
};