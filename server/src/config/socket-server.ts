const user = {
	name: "Alex",
	age: 3,
};

export const getUser = () => user;
export const setUser = <T extends keyof typeof user>(key: T, value: typeof user[T]) => {
	user[key] = value;
	const f = user[key];
};
