const API_URL = "https://wedev-api.sky.pro/api/transactions";

const buildHeaders = (token, hasBody = false) => {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (hasBody) headers["Content-Type"] = "application/json";
  return headers;
};

export async function handleResponse(res) {
  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
      console.error("Ошибка от API:", errorData);
    } catch {
      errorData = await res.text();
      console.error("Ошибка от API:", errorData);
    }

    const message = (errorData && errorData.error) || errorData || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = errorData;
    throw err;
  }
  return await res.json();
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
/* export const fetchTransactionsByPeriod = async (token, start, end) => {
  const res = await fetch(`${API_URL}/period`, {
    method: "POST",
    headers: buildHeaders(token, true),
    body: JSON.stringify({ start, end }),
  });
  return handleResponse(res);
}; */

export const fetchTransactionsByPeriod = async (token, start, end) => {
  try {
    const res = await fetch(`${API_URL}/period`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        start: start.toISOString(),
        end: end.toISOString(),
      }),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Ошибка fetchTransactionsByPeriod:", error);
    throw error;
  }
};
