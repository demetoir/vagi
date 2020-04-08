export default class CookieJar {
	constructor() {
		this.cookies = {};
	}

	get(key) {
		return this.cookies[key];
	}

	set(key, value) {
		this.cookies[key] = value;
	}

	toEncodedString() {
		return Object.keys(this.cookies)
			.map(k => `${k}=${this.cookies[k]}`)
			.join(";");
	}
}
