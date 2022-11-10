const Cookie = {
  get: (name) => {
    let c = document.cookie.match(
      `(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`
    )[1];
    if (c) return decodeURIComponent(c);
  },
  set: (name, value, opts = {}) => {
    if (opts.days) {
      opts["max-age"] = opts.days * 60 * 60 * 24;
      delete opts.days;
    }
    opts = Object.entries(opts).reduce(
      (accumulatedStr, [k, v]) => `${accumulatedStr}; ${k}=${v}`,
      ""
    );
    document.cookie = name + "=" + encodeURIComponent(value) + opts;
  },
  delete: (name, opts) => Cookie.set(name, "", { "max-age": -1, ...opts }),
};
export default Cookie;
