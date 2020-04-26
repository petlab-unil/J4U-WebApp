export function parseServerError(msg) {
  const re = /CODE\(([0-9]*)\)\sMSG\((.*)\)/g;
  const match = re.exec(msg);
  if (match) {
    return { code: Number(match[1]), errorMsg: match[2] };
  } else {
    return { code: null, errorMsg: null };
  }
}
