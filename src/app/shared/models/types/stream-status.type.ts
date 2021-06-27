export interface StreamStatus<T> {
    loading?: boolean;
    value?: T;
    error?: string;
}
