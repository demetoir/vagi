import {isActiveEvent} from "../utils.js";
import VerifyEventError from "./VerifyEventError.js";

/**
 *
 * @param event {object}
 */
export default function verifyEvent(event) {
	if (event === null) {
		throw new VerifyEventError("존재하지 않는 이벤트");
	}

	if (!isActiveEvent(event)) {
		throw new VerifyEventError("이벤트 만료기간이 지났습니다.");
	}
}
