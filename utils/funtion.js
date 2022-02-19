export const difTime = (
  comparedTime,
  isPass = true,
  fullword = false,
  isDayUnit = false
) => {
  if (!comparedTime) return "";
  const compared = new Date(comparedTime);
  const now = new Date();
  const Difference_In_Time = isPass
    ? (now.getTime() - compared.getTime()) / 1000
    : (compared.getTime() - now.getTime()) / 1000; // second
  if (Difference_In_Time < 0) {
    return `0 ${fullword ? "day" : "d"}`;
  }
  if (isDayUnit) {
    return `${Math.round(Difference_In_Time / 86400)} ${
      fullword ? "days" : "d"
    }`;
  }
  if (Difference_In_Time > 31536000) {
    return `${Math.round(Difference_In_Time / 31536000)} ${
      fullword ? "years" : "y"
    }`;
  }
  if (Difference_In_Time > 2629746) {
    return `${Math.round(Difference_In_Time / 2629746)} ${
      fullword ? "months" : "m"
    }`;
  }
  if (Difference_In_Time > 604800) {
    return `${Math.round(Difference_In_Time / 604800)} ${
      fullword ? "weeks" : "w"
    }`;
  }
  if (Difference_In_Time > 86400) {
    return `${Math.round(Difference_In_Time / 86400)} ${
      fullword ? "days" : "d"
    }`;
  }
  if (Difference_In_Time > 3600) {
    return `${Math.round(Difference_In_Time / 3600)} ${
      fullword ? "hours" : "h"
    }`;
  }
  if (Difference_In_Time > 60) {
    return `${Math.round(Difference_In_Time / 60)} ${
      fullword ? "minutes" : "m"
    }`;
  }
  return `${Math.round(Difference_In_Time)} ${fullword ? "seconds" : "s"}`;
};
