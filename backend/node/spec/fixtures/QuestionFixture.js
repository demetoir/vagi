import {createQuestion} from "../../DB/queries/question.js";

export default class QuestionFixture {
	static async question({event = {}, guest = {}} = {}) {
		const EventId = event.id || null;
		const GuestId = guest.id || null;
		const content = "content";

		return createQuestion({EventId, GuestId, content, QuestionId: null});
	}
}
