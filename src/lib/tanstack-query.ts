export const queryConfig = {
    queries:{
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 // 1 minute
    }
};

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
    ReturnType<T>,
    'queryKey' | 'queryFn'
>;