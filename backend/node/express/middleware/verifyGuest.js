import VerifyGuestError from "./VerifyGuestError.js";

/**
 *
 * @param guest {object}
 * @param event {object}
 */
export default function verifyGuest(guest, event) {
	if (guest === null) {
		throw new VerifyGuestError("존재하지 않는 guest");
	}

	if (guest.EventId !== event.id) {
		throw new VerifyGuestError("이벤트에 속하지 않는 guest");
	}
}
