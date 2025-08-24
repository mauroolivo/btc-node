export function toDateString(ts: number): string {

    const ts_ms = ts * 1000;
    return new Date(ts_ms).toUTCString();
}
export function hex2a(hexx: string): string {
    const hex = hexx.toString();//force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}