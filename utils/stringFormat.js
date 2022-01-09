export const toPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "" + match[1] + "-" + match[2] + "-" + match[3];
  }
  return null;
};

export const toCreditCard = (value) => {
  let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  let matches = v.match(/\d{4,16}/g);
  let match = (matches && matches[0]) || "";
  let parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

export const toExpDate = (expDate) => {
  return (
    expDate.replace(/\//g, "").substring(0, 2) +
    (expDate.length > 2 ? "/" : "") +
    expDate.replace(/\//g, "").substring(2, 4)
  );
};

export const getExpMonth = (expDate) => {
  return expDate.replace(/\//g, "").substring(0, 2);
};

export const getExpYear = (expDate) => {
  return expDate.replace(/\//g, "").substring(2, 4);
};
