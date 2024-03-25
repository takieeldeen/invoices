export function formatPrice(currency) {
  const currentLanguage = document.documentElement.lang;
  const formatRegion = currentLanguage === "ar" ? "ar-eg" : "en-us";
  const currencyNum = +currency;
  return currencyNum.toLocaleString("eg-ar", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
