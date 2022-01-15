import Cookies from "js-cookie";

export const POST = async (body) => {
  const token = Cookies.get("token");

  const response = await fetch(`${process.env.API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });

  return response;
};
