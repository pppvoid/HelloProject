export function getURLParams(): Map<string, any> {
  let qs = window.location.search;
  qs = qs.split('+').join(' ');

  let params = new Map<string, any>();
  let tokens: any;
  let re = /[?&]?([^=]+)=([^&]*)/g;

  while ((tokens = re.exec(qs))) {
    params.set(decodeURIComponent(tokens[1]), decodeURIComponent(tokens[2]));
  }

  return params;
}
