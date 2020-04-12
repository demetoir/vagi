export function plainOne(res) {
	if (res !== null) {
		return res.get({plain: true});
	}

	return res;
}

export function plainFindAll(res) {
	return res.map(x => x.get({plain: true}));
}

export function plainFindOrCreate(res) {
	return [res[0].get({plain: true}), res[1]];
}
