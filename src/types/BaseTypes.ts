export interface Meta {
    buildDate: string|null
}

export interface User {
    identity:  object
    isLoggedIn: boolean|null
}

export interface Collection<Type> {
    [key: string]: Type;
}