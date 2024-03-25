export default class AppTheme {
  get #userTheme() {
    return localStorage.getItem("theme");
  }

  set #_userTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  get #systemTheme() {
    return window.matchMedia("prefers-color-scheme: dark").matches
      ? "dark"
      : "light";
  }
  get #appliedTheme() {
    return this.#userTheme || this.#systemTheme;
  }

  applyCurrentTheme() {
    document.documentElement.classList.add(this.#appliedTheme);
  }

  toggleTheme() {
    //Remove the previous applied theme class
    document.documentElement.classList.remove(this.#appliedTheme);
    const newTheme = this.#appliedTheme === "dark" ? "light" : "dark";
    //set the new user theme
    this.#_userTheme = newTheme;
    //Apply the newly applied theme class
    document.documentElement.classList.add(this.#appliedTheme);
  }
}
