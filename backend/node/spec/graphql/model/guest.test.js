import assert from "assert";
import gql from "graphql-tag";
import EasyGraphQLTester from "easygraphql-tester";
import {describe, it} from "mocha";
import guestResolvers from "../../../graphQL/model/guest/guest.resolver.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import typeDefs from "../../../graphQL/model/typeDefs.js";
import resolvers from "../../../graphQL/model/resolvers.js";
import {AUTHORITY_TYPE_GUEST} from "../../../constants/authorityTypes.js";
import HostFixtures from "../../fixtures/HostFixtures.js";
import EventFixtures from "../../fixtures/EventFixtures.js";
import GuestFixtures from "../../fixtures/GuestFixtures.js";

describe("graphql yoga guest model", () => {
	new SequelizeTestHelper().autoSetup();
	const gqlTester = new EasyGraphQLTester(typeDefs, resolvers);

	describe("guests", () => {
		it("query", async () => {
			const event = await EventFixtures.activeEvent();
			const EventId = event.id;
			const guest = await GuestFixtures.guest(event);

			const root = null;
			const context = null;
			const query = gql`
				query getGuests($EventId: ID!) {
					guests(EventId: $EventId) {
						id
						name
						isAnonymous
						company
						email
					}
				}
			`;

			const variables = {
				EventId,
			};

			let res = await gqlTester.graphql(query, root, context, variables);

			// to remove [Object: null prototype]
			res = JSON.parse(JSON.stringify(res));

			const {
				data: {guests: realGuests},
			} = res;

			const expected = [
				{
					company: null,
					email: null,
					id: guest.id.toString(),
					isAnonymous: guest.isAnonymous,
					name: guest.name,
				},
			];

			assert.deepStrictEqual(realGuests, expected);
		});

		it("scheme", async () => {
			const query = gql`
				query getGuests($EventId: ID!) {
					guests(EventId: $EventId) {
						id
						name
						isAnonymous
						company
						email
					}
				}
			`;

			const variables = {
				EventId: 2,
			};

			await gqlTester.test(true, query, variables);
		});

		it("resolver", async () => {
			// given
			const event = await EventFixtures.activeEvent();
			const EventId = event.id;
			const guest = await GuestFixtures.guest(event);

			// when
			const real = await guestResolvers.Query.guests(null, {EventId});

			// than
			const expected = [guest];

			assert.deepStrictEqual(real, expected);
		});
	});

	describe("guestInEvent", () => {
		it("query", async () => {
			// given
			const oauthId = "oauth-id";
			const host = await HostFixtures.host(oauthId);
			const event = await EventFixtures.activeEvent(host);
			const guest = await GuestFixtures.guest(event);
			const guestSid = guest.guestSid;
			const authority = {sub: AUTHORITY_TYPE_GUEST, guestSid};

			// when
			const root = null;
			const context = authority;
			const query = gql`
				query {
					guestInEvent {
						event {
							id
							eventCode
							startAt
							endAt
							eventName
							HostId
						}
						guest {
							id
							name
							email
							company
						}
					}
				}
			`;
			const variables = {};
			let res = await gqlTester.graphql(query, root, context, variables);

			// to remove [Object: null prototype]
			res = JSON.parse(JSON.stringify(res));

			const {
				data: {guestInEvent: real},
			} = res;

			// than
			// todo: 일관적이지 않은 graphql type 해결하기
			// pk, fk 인 id 값이 number 와 string 이 혼용됨
			const expected = {
				event: {
					id: event.id,
					eventCode: event.eventCode,
					startAt: event.startAt.getTime().toString(),
					endAt: event.endAt.getTime().toString(),
					eventName: event.eventName,
					HostId: event.HostId.toString(),
				},
				guest: {
					id: guest.id.toString(),
					name: guest.name,
					email: guest.email,
					company: guest.company,
				},
			};

			assert.deepStrictEqual(real, expected);
		});

		it("scheme", async () => {
			const query = gql`
				query {
					guestInEvent {
						event {
							id
							eventCode
							startAt
							endAt
							eventName
							HostId
						}
						guest {
							id
							name
							email
							company
						}
					}
				}
			`;

			const variables = {
				EventId: 2,
			};

			await gqlTester.test(true, query, variables);
		});

		it("resolver", async () => {
			// given
			const oauthId = "oauth-id";
			const host = await HostFixtures.host(oauthId);
			const event = await EventFixtures.activeEvent(host);
			const guest = await GuestFixtures.guest(event);
			const guestSid = guest.guestSid;
			const authority = {sub: AUTHORITY_TYPE_GUEST, guestSid};

			const real = await guestResolvers.Query.guestInEvent(
				null,
				null,
				authority,
			);

			const expected = {
				guest,
				event,
			};

			assert.deepStrictEqual(real, expected);
		});
	});
});
