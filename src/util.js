const formatInt = int => int < 10 ? `0${int}` : int;

module.exports.formatDuration = secs => {
  if (!secs || !Number(secs)) return "00:00";
  const seconds = Math.floor(secs % 60000);
  const minutes = Math.floor(secs % 3600000 / 60);
  const hours = Math.floor(secs / 3600);
  if (hours > 0) {
    return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
  }
  if (minutes > 0) {
    return `${formatInt(minutes)}:${formatInt(seconds)}`;
  }
  return `00:${formatInt(seconds)}`;
};

module.exports.toSecond = string => {
  if (!string) return 0;
  if (typeof string !== "string") return parseInt(string) || 0;
  let h = 0, m = 0, s = 0;
  if (string.match(/:/g)) {
    const time = string.split(":");
    if (time.length === 2) {
      m = parseInt(time[0], 10);
      s = parseInt(time[1], 10);
    } else if (time.length === 3) {
      h = parseInt(time[0], 10);
      m = parseInt(time[1], 10);
      s = parseInt(time[2], 10);
    }
  } else s = parseInt(string, 10);
  // eslint-disable-next-line no-mixed-operators
  return h * 60 * 60 + m * 60 + s;
};

module.exports.parseNumber = string => (typeof string === "string" ? Number(string.replace(/\D+/g, "")) : Number(string)) || 0;

const merge = module.exports.mergeObject = (def, opt) => {
  if (!opt) return def;
  for (const key in def) {
    if (!Object.prototype.hasOwnProperty.call(opt, key) || opt[key] === undefined) {
      opt[key] = def[key];
    } else if (opt[key] === Object(opt[key])) {
      opt[key] = merge(def[key], opt[key]);
    }
  }
  return opt;
};

module.exports.isURL = string => {
  if (string.includes(" ")) return false;
  try {
    const url = new URL(string);
    if (!["https:", "http:"].includes(url.protocol) ||
      url.origin === "null" || !url.host
    ) return false;
  } catch { return false }
  return true;
};

module.exports.isVoiceChannelEmpty = queue => {
  const voiceChannel = queue.connection.channel;
  const members = voiceChannel.members.filter(m => !m.user.bot);
  return !members.size;
};
