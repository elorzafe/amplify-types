type httpStatusSuccessful = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226;
type httpStatusClientError = 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451;
type httpStatusServerError = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

type APIResponse<T extends unknown = unknown> = {
    httpStatusCode: httpStatusSuccessful
    body: T,
    headers: Record<string, string>
}

class HTTPError extends Error {
    httpStatusCode: httpStatusClientError | httpStatusServerError;
    body: unknown;
    headers: Record<string, string>;
    constructor({ name, message, code, headers, body }: { name?: string, message?: string, code: httpStatusClientError | httpStatusServerError, headers: Record<string, string>, body: unknown }) {
        super();
        if (name) {
            this.name = name;
        }
        if (message) {
            this.message = message;
        }
        this.httpStatusCode = code;
        this.headers = headers;
        this.body = body
    }
}

class NetworkError extends Error {
    name = 'Network error';
    constructor() {
        super();
    }
}

class BlockedError extends Error {
    name = 'Network error';
    constructor() {
        super();
    }
}

class CancelledError extends Error {
    name = 'Request cancelled'
    constructor() {
        super();
    }
}

type FetchOptions = {
    headers?: Record<string, string>,
    signerServiceInfo?: string,
    timeout?: number,
}

interface JSONArray extends Array<JSONValue> { }
interface JSONObject {
    [x: string]: JSONValue;
}
type JSONValue = boolean | number | string | null | JSONArray | JSONObject;

type UpdateOptionsJSON<BodyType extends JSONValue = JSONValue> = FetchOptions | {
    body: BodyType,
    headers: {
        "Content-type": `application/json${string}`
    } & Record<string, string>
}

type UpdateOptionsString<BodyType extends string = string> = FetchOptions | {
    body: BodyType,
    headers: {
        "Content-type": `text/plain${string}`;
    }
}

type APIParam = {
    apiName: string,
    path: string
}

type Location = {
    line: number,
    column: number,
}

type GraphQLError = {
    message: string,
    path: Array<string>,
    locations: Array<Location>,
    extensions?: { [key: string]: string }
} // this will be from `graphql` package only the type

type GraphqlResult<T extends JSONObject = JSONObject> = {
    data?: T,
    errors?: Array<GraphQLError>,
    extensions?: { [key: string]: unknown }
}

declare class API {
    /** HTTP GET METHOD */
    static get<ResponseBody extends unknown>(params: APIParam, init?: FetchOptions): Promise<APIResponse<ResponseBody>>;
    /** HTTP HEAD METHOD */
    static head<ResponseBody extends unknown>(params: APIParam, init?: FetchOptions): Promise<APIResponse<ResponseBody>>;
    /** HTTP DELETE METHOD */
    static delete<ResponseBody extends unknown>(params: APIParam, init?: FetchOptions): Promise<APIResponse<ResponseBody>>;
    /** HTTP OPTIONS METHOD */
    static options<ResponseBody extends unknown>(params: APIParam, init?: FetchOptions): Promise<APIResponse<ResponseBody>>;
    /** HTTP PUT METHOD */
    static put<RequestBody extends JSONValue = JSONValue, ResponseBody extends unknown = unknown>(params: APIParam, init: UpdateOptionsJSON<RequestBody>): Promise<APIResponse<ResponseBody>>
    static put<RequestBody extends string = string, ResponseBody extends unknown = unknown>(params: APIParam, init: UpdateOptionsString<RequestBody>): Promise<APIResponse<ResponseBody>>
    /** HTTP POST METHOD */
    static post<RequestBody extends JSONValue = JSONValue, ResponseBody extends unknown = unknown>(params: APIParam, init: UpdateOptionsJSON<RequestBody>): Promise<APIResponse<ResponseBody>>
    static post<RequestBody extends string = string, ResponseBody extends unknown = unknown>(params: APIParam, init: UpdateOptionsString<RequestBody>): Promise<APIResponse<ResponseBody>>
    /** HTTP PATCH METHOD */
    static patch<RequestBody extends JSONValue = JSONValue, ResponseBody extends unknown = unknown>(params: APIParam, init: UpdateOptionsJSON<RequestBody>): Promise<APIResponse<ResponseBody>>
    static patch<RequestBody extends string = string, ResponseBody extends unknown = unknown>(params: APIParam, init: UpdateOptionsString<RequestBody>): Promise<APIResponse<ResponseBody>>
    /** Cancel HTTP Request */
    static cancel: (request: Promise<unknown>, message: string) => void
    /** */
    static query: <GraphqlData extends JSONObject = JSONObject>({ document, variables }: { document: string, variables?: JSONObject }) => Promise<GraphqlResult<GraphqlData>>
    static mutation: <GraphqlData extends JSONObject = JSONObject>({ document, variables }: { document: string, variables?: JSONObject }) => Promise<GraphqlResult<GraphqlData>>

    static subscription: <GraphqlData extends JSONObject = JSONObject>({ document, variables }: { document: string, variables?: JSONObject }) => Observable<GraphqlResult<GraphqlData>>;
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

export { API };

// ------ EXAMPLES -----

API.put<Array<number>, { data: Array<number> }>({
    apiName: '',
    path: '/'
}, {
    headers: {
        "Content-type": "application/json",
    },
    body: [122]
}).then(result => {
    result.body.data.forEach(value => console.log(value));
});

API.get<{ firstName: string, lastName: string }>({
    apiName: '',
    path: ''
}, {
    headers: {
        "content-type": "application/json"
    }
}).then(x => {
    console.log(`The name is ${x.body.firstName} ${x.body.lastName}`)
}).catch((err: unknown) => {
    if (err instanceof NetworkError) {
        // Maybe I want to retry
    } else if (err instanceof HTTPError) {

    } else if (err instanceof CancelledError) {
        // this is fine 
    } else if (err instanceof BlockedError) {
        // This is CORS stuff
    }
});

API.get<"SUCCESS" | "FAILED">({
    apiName: '',
    path: '/'
}, {
    headers: {
        "content-type": "text/plain"
    }
}).then(result => {
    const data = result.body;
    if (data === "SUCCESS") {

    } else {
        data // data = FAILED
    }
}).catch((err: unknown) => {
    if (err instanceof NetworkError) {
        // Maybe I want to retry
    } else if (err instanceof HTTPError) {

    } else if (err instanceof CancelledError) {
        // this is fine 
    } else {
        // other error
    }
});

type Todo = {
    id: number, 
    name: string, 
    description: string,
    done: boolean
};

API.query<Todo>({ document: `my graphql document`, variables: { input: { done: false } } })
.then(result => {
    console.log(`Todo : ${result.data?.id}: ${result.data?.name} (${result.data?.description})`);
});

API.subscription<Todo>({ document: `my graphql document`, variables: { input: { test: 0 } } })
.subscribe({
    next: (result) => console.log(`Todo info: ${result.data?.id}: ${result.data?.name} (${result.data?.description})`),
});