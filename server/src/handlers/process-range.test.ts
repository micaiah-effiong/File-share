import processRange from "./process-range";

describe("Process Range functioin", () => {
	it("should return and object with start and end properties as numbers", () => {
		const rangeData = processRange("bytes=32324-44353", 55045);

		expect(rangeData).toBeDefined();
		expect(rangeData.start).toBeDefined();
		expect(typeof rangeData.start === "number").toEqual(true);
		expect(rangeData.end).toBeDefined();
		expect(typeof rangeData.end === "number").toEqual(true);
	});
	it("should return end value with range", () => {
		const length = 55045;
		const { end } = processRange(`bytes=32324-${length + 10}`, length);

		expect(end).toBeDefined();
		expect(typeof end === "number").toEqual(true);
		expect(end).toBeLessThan(length);
	});
	it("should always have end value", () => {
		const { end } = processRange("bytes=32324-44353", 55045);
		expect(end).toBeDefined();
		expect(typeof end === "number").toEqual(true);
	});
});
