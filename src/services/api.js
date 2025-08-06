const API_URL = "https://wedev-api.sky.pro/api/transactions";

const getAuthHeaders = (token, method = "GET") => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};


export const fetchTransactions = async ({ token, sortBy, filterBy } = {}) => {
  if (!token) {
    console.warn("Нет токена, запрос к API не выполняется");
    return [];
  }

  let url = API_URL;
  const params = new URLSearchParams();

  if (sortBy) params.append("sortBy", sortBy);
  if (filterBy) params.append("filterBy", filterBy);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, { headers: getAuthHeaders(token, "GET") });

  if (response.status === 401) {
    throw new Error("Не авторизован. Пожалуйста, войдите в систему.");
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Ошибка загрузки (${response.status}): ${errorText || "Неизвестная ошибка"}`
    );
  }

  return response.json();
};

export async function deleteTransaction(token, id) {
  if (!id) throw new Error("Не передан ID транзакции");
  if (!token) throw new Error("Нет токена авторизации");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token, "DELETE"),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Не удалось удалить транзакцию: ${response.status} ${text}`
    );
  }
  return response.json();
}

export const addTransaction = async (token, transaction) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(token, "POST"),
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Ошибка добавления");
  }

  return response.json();
};

export const updateTransaction = async (token, id, transaction) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(token, "PATCH"),
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Ошибка обновления");
  }

  return response.json();
};

export const fetchTransactionsByPeriod = async (token, start, end) => {
  const response = await fetch(`${API_URL}/period`, {
    method: "POST",
    headers: getAuthHeaders(token, "POST"),
    body: JSON.stringify({ start, end }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Ошибка получения за период");
  }

  return response.json();
};