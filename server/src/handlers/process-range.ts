import config from "../config/env";

type BufferRange = {
	start: number;
	end: number;
};

function processRange(ranges: string, len: number, MAX_SIZE: number = config.STREAM_CUNK_SIZE): BufferRange {
	let [startRange, endRange] = ranges.split("=")[1].split("-"); //"bytes=32324-44353"
	let start = parseInt(startRange) || 0;
	let end = parseInt(endRange) || Math.min(start + MAX_SIZE, len - 1);

	if (end > len - 1) {
		end = len - 1;
	}

	console.log("bytes", start, end, len);
	const result: BufferRange = { start, end };
	return result;
}

export default processRange;
