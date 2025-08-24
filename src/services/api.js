const API_URL = "https://wedev-api.sky.pro/api/transactions";

const buildHeaders = (token, hasBody = false) => {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (hasBody) headers["Content-Type"] = "application/json";
  return headers;
};

export async function handleResponse(res) {
  const raw = await res.text();

  if (!res.ok) {
    let parsed;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = null;
    }

    const message = (parsed && parsed.error) || raw || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = parsed ?? raw;
    throw err;
  }

  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return raw;
  }
}

export async function fetchTransactions({ token }) {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Ошибка при fetchTransactions:", error);
    throw error;
  }
}

export const addTransaction = async (token, transaction) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(transaction),
  });
  return handleResponse(res);
};

export const updateTransaction = async (token, id, transaction) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: buildHeaders(token, true),
    body: JSON.stringify(transaction),
  });
  return handleResponse(res);
};

export const deleteTransaction = async (token, id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });
  return handleResponse(res);
};

const toMDY = (d) => `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;

export const fetchTransactionsByPeriod = async (token, start, end) => {
  if (!token) {
    const err = new Error("Не авторизован");
    err.status = 401;
    throw err;
  }

  const res = await fetch(`${API_URL}/period`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      start: toMDY(start),
      end: toMDY(end),
    }),
  });

  return handleResponse(res);
};
