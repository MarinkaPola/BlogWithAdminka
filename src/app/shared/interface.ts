export interface User {
   email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: string;
}

export interface Post {
    id?: string;
    title: string;
    text?: string;
    author: string;
    date: Date;
    messages?: [Message];

}
export interface FbCreateResponse {
    name: string;
}
export interface  Message {
   idmes?: string;
    textmes: string;
   namemes: string;
   datemes: Date;
}
export interface FbCreateResponsemes {
    name: string;
}
export interface FbsaveNametextResponsemes {
    name: string;
    datemes: Date;
    textmes: string;
    namemes: string;
}
