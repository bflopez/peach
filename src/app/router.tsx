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
        },
    }
]);
export const AppRouter = () => {

    return <RouterProvider router={router} />;
};