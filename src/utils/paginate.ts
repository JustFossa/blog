export const paginate = <T>(items: T[], page: number, limit: number) => {
	const start = (page - 1) * limit;
	const end = start + limit;
	const paginatedItems = items.slice(start, end);
	const totalPages = Math.ceil(items.length / limit);

	return {
		paginatedItems,
		totalPages,
	};
};
