export function formatDate(date, options = {}) {
  const currentLanguage = document.documentElement.lang;
  const formatRegion = currentLanguage === "ar" ? "ar-eg" : "en-us";
  const dateObj = new Date(date);
  const formatOptions =
    Object.values(options).length !== 0
      ? options
      : {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };

  const dateString = dateObj.toLocaleDateString(formatRegion, formatOptions);
  return dateString;
}
