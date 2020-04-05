import moment from "moment";
import ValidationError from "./ValidationError.js";

export default class Validator {
	static isExistEvent(event) {
		if (event === null) {
			throw new ValidationError("존재하지 않는 이벤트");
		}
	}

	static isExistGuest(guest) {
		if (guest === null) {
			throw new ValidationError("존재하지 않는 guest");
		}
	}

	static isGuestBelongToEvent(guest, event) {
		if (guest.EventId !== event.id) {
			throw new ValidationError("이벤트에 속하지 않는 guest");
		}
	}

	static isActiveEvent(event) {
		const endAt = moment(event.endAt);
		const current = moment();
		const diff = endAt.diff(current, "minute");
		const isActive = diff > 0;

		if (!isActive) {
			throw new ValidationError("이벤트 만료기간이 지났습니다.");
		}
	}

	static isExistHost(host) {
		if (host === null) {
			throw new ValidationError(`존재하지않는 host`);
		}
	}
}
