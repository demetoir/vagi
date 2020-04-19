/**
 *
 * @param res
 * @return {object|null}
 */
export function plainOne(res) {
	if (res !== null) {
		return res.get({plain: true});
	}

	return res;
}

/**
 *
 * @param res
 * @return {object[]}
 */
export function plainFindAll(res) {
	return res.map(x => x.get({plain: true}));
}

/**
 *
 * @param res
 * @return {[object, Boolean]}
 */
export function plainFindOrCreate(res) {
	return [res[0].get({plain: true}), res[1]];
}
