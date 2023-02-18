
type APIResponse = {
    status: number,
    body: unknown,
}

interface GraphqlResponse {
    data: unknown
}

type FetchOptions = {
    headers?: Record<string, string>,
    signerServiceInfo?: string,
    timeout?: number,
    withCredentials?: boolean,
    responseType?: string
}

type UpdateOptions = FetchOptions | {
    body?: string | Blob,
    "Content-type"?: string 
}

declare const API: {
    /** HTTP GET METHOD */
    get:<T extends APIResponse = APIResponse>(apiName: string, path: string, init?: FetchOptions) => Promise<T>,
    /** HTTP HEAD METHOD */
    head:<T extends APIResponse = APIResponse>(apiName: string, path: string, init?: FetchOptions) => Promise<T>,
    /** HTTP DELETE METHOD */
    delete:<T extends APIResponse = APIResponse>(apiName: string, path: string, init?: FetchOptions) => Promise<T>,
    /** HTTP OPTIONS METHOD */
    options:<T extends APIResponse = APIResponse>(apiName: string, path: string, init?: FetchOptions) => Promise<T>,
    /** HTTP POST METHOD */
    post:<T extends APIResponse = APIResponse>(apiName: string, path: string, init?: UpdateOptions) => Promise<T>,
    /** HTTP PUT METHOD */
    put:<T extends APIResponse = APIResponse>(apiName: string, path: string, init?: UpdateOptions) => Promise<T>,
    /** HTTP PATH METHOD */
    patch:<T extends APIResponse = APIResponse>(apiName: string, path: string, init?: UpdateOptions) => Promise<T>,
    /** Cancel HTTP Request */
    cancel:(request: Promise<unknown>, message: string) => boolean,
    /** Check if error was because of a cancelled HTTP request */
    isCancel: (err: Error) => boolean,
    /** */
    query:<T extends GraphqlResponse = GraphqlResponse>({ document, variables }: { document: string, variables?: object}) => Promise<T>,
    mutation:<T extends GraphqlResponse = GraphqlResponse>({ document, variables }: { document: string, variables?: object}) => Promise<T>,
    subscription: <T extends GraphqlSubscriptionMessage = GraphqlSubscriptionMessage>({ document, variables }: { document: string, variables?: object}) => Observable<T>;
} 

type Observable<T = object> = {
    subscribe: (observer: Observer<T>) => {
        unsubscribe: () => void
    }
}

type Observer<T = object> = {
    next?: (data: T) => void,
    error?: (err: Error) => void,
    done?: () => void
}

type GraphqlSubscriptionMessage = {
    data: unknown,
    timestamp: number
}

API.query({ document: '', variables: { }}).then(result => { result })

export { API };
