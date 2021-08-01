function processRange(res, ranges, len) {
  let rangeArray = ranges.split("-");

  let start = parseInt(rangeArray[0].substr(6));
  let end = parseInt(rangeArray[1]);

  if (isNaN(start)) {
    start = 0;
  }
  if (isNaN(end)) {
    end = len - 1;
  }

  if (start > len - 1) {
    res.setHeader("Content-Range", "bytes */" + len);
    res.status(416);
    res.end();
  }

  if (end > len - 1) {
    end = len - 1;
  }

  console.log("bytes", start, end, len);
  return { start, end };
}

module.exports = processRange;
