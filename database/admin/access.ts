

export interface ADMIN_ACCESS_INTERFACE {
    full: "full";
    dl: "dl";
    ping: "ping";
}

export type ADMIN_ACCESS_TYPE = "full" | "dl" | "ping"

export const ADMIN_ACCESS:ADMIN_ACCESS_INTERFACE = {
    full: "full",
    dl: "dl",
    ping: "ping"
}
