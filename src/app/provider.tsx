import {ReactNode, Suspense, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {queryConfig} from "@/lib/tanstack-query.ts";
import {Box, Spinner, Theme} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '../index.css'
import {ErrorBoundary} from "react-error-boundary";
import {MainErrorFallback} from "@/components/errors/main.tsx";

type AppProviderProps = {
    children: ReactNode;
};
const SuspenseFallback = () =>{
    return (
        <Box>
            <Spinner size="3"/>
        </Box>
    )
}
export const AppProvider = ({children}: AppProviderProps) =>{
    const [queryClient] = useState(()=> new QueryClient({
        defaultOptions: queryConfig
    }))
    return (
        <Suspense fallback={<SuspenseFallback/>}>
            <ErrorBoundary fallback={<MainErrorFallback/>}>
                <QueryClientProvider client={queryClient}>
                    <Theme appearance="dark" accentColor="orange">
                        {children}
                    </Theme>
                </QueryClientProvider>
            </ErrorBoundary>
        </Suspense>
    )
}