export default {
  install(app, options) {
    const currencyFilter = (value, currency = "UAH") => {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency,
      }).format(value);
    };
    app.provide("currencyFilter", {
      currencyFilter,
    });
  },
};
