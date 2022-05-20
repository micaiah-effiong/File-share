type BufferRange = {
  start: number;
  end: number;
};

function processRange(ranges: string, len: number): BufferRange {
  let rangeArray = ranges.split("-");

  let start = parseInt(rangeArray[0].substring(6)) || 0;
  let end = parseInt(rangeArray[1]) || len - 1;

  if (end > len - 1) {
    end = len - 1;
  }

  console.log("bytes", start, end, len);
  const result: BufferRange = { start, end };
  return result;
}

export default processRange;
