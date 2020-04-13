import moment from "moment";
import {eventQuery} from "../../DB/modelQuerys";

let count = 0;

function getCount() {
	count += 1;
	return count;
}

export default class EventFixtures {
	static async activeEvent(host = {}) {
		const HostId = host.id || null;
		const before = moment().add("h", -1);
		const after = moment().add("h", 1);

		return eventQuery.create({
			eventCode: `eventCode${getCount()}`,
			eventName: `eventName${getCount()}`,
			HostId,
			startAt: before,
			endAt: after,
		});
	}

	static async closedEvent(host = {}) {
		const HostId = host.id || null;
		const before = moment().add("h", -2);
		const after = moment().add("h", -1);

		return eventQuery.create({
			eventCode: `eventCode${getCount()}`,
			eventName: `eventName${getCount()}`,
			HostId,
			startAt: before,
			endAt: after,
		});
	}
}
