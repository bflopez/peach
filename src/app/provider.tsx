import {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {queryConfig} from "@/lib/tanstack-query.ts";
import {Theme} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '../index.css'

type AppProviderProps = {
    children: ReactNode;
};
export const AppProvider = ({children}: AppProviderProps) =>{
    const queryClient = new QueryClient({
        defaultOptions: queryConfig
    });
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Theme appearance="dark" accentColor="orange">
                    {children}
                </Theme>
            </QueryClientProvider>
        </>
    )
}