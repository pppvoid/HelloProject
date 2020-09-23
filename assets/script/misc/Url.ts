export function getURLParams(): Map<string, any> {
    let qs = window.location.search;
    qs = qs.split("+").join(" ");

    const params = new Map<string, any>();
    let tokens: any;
    const re = /[?&]?([^=]+)=([^&]*)/g;

    while ((tokens = re.exec(qs))) {
        params.set(decodeURIComponent(tokens[1]), decodeURIComponent(tokens[2]));
    }

    return params;
}
