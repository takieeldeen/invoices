export default class AppLanguage {
  get #userLanguage() {
    return localStorage.getItem("lang");
  }

  set #_userLanguage(lang) {
    localStorage.setItem("lang", lang);
    // localStorage.setItem("i18nextLng", lang);
  }

  get #systemLanguage() {
    return navigator.language.split("-")[0];
  }

  get appliedLanguage() {
    return this.#userLanguage || this.#systemLanguage;
  }

  get targetLanguage() {
    return this.appliedLanguage === "ar" ? "en" : "ar";
  }

  get targetI18() {
    return this.appliedLanguage === "ar" ? "en-US" : "ar-EG";
  }

  get #targetDirection() {
    return this.targetLanguage === "ar" ? "rtl" : "ltr";
  }

  toggleLanguage() {
    // Define the targeted language
    document.documentElement.lang = this.targetLanguage;
    // Define the targeted Direction
    document.documentElement.dir = this.#targetDirection;
    // Set the current Language in the local storage
    this.#_userLanguage = this.targetLanguage;
  }

  applyCurrentLanguage() {
    // get the current direction of the app
    const currentDirection = this.appliedLanguage === "en" ? "ltr" : "rtl";
    document.documentElement.lang = this.appliedLanguage;
    this.#_userLanguage = this.appliedLanguage;
    document.documentElement.dir = currentDirection;
  }
}
