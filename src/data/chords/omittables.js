export const addOmittables = (selected) => {
	const displayIntervals = selected.map((n) => n.displayInterval);
	return selected.map((n) => {
		let isOmittable;
		switch (n.displayInterval) {
			case "5":
				isOmittable = selected.length >= 4;
				break;
			case "7":
				isOmittable =
					displayIntervals.includes("♯11") || displayIntervals.includes("♭13");
				break;
			case "9":
				isOmittable =
					displayIntervals.includes("11") ||
					displayIntervals.includes("♯11") ||
					displayIntervals.includes("13") ||
					displayIntervals.includes("♭13");
				break;
			case "11":
				isOmittable =
					displayIntervals.includes("13") || displayIntervals.includes("♭13");
				break;
			default:
				isOmittable = false;
		}
		return { ...n, isOmittable };
	});
};
