export default function compareTime(now, then) {
  if (then + 172800 < parseInt(now)) return true;
  return false;
}
