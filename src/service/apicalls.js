import APIKit from "./baseApi";

export async function registerApi(payload) {
  try {
    const response = await APIKit.post(`/user/register`, payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: 'No response from the server' };
    } else {
      return { error: 'Request setup error' };
    }
  }
}

export async function loginApi(payload) {
  try {
    const response = await APIKit.post(`/user/login`, payload);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function verifyotpApi(payload) {
  try {
    const response = await APIKit.post(`/user/verify-pin`, payload);
    return response.data;
  } catch (error) {
    console.log(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getuser(id) {
  try {
    const response = await APIKit.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: 'No response from the server' };
    } else {
      return { error: 'Request setup error' };
    }
  }
}

export async function updateUser(payload) {
  try {
    const response = await APIKit.put(`/user/update`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function createChallange(payload) {
  try {
    const response = await APIKit.post(`/challenge/create`, payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: 'No response from the server' };
    } else {
      return { error: 'Request setup error' };
    }
  }
}

export async function myChallange(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString();
    const response = await APIKit.post(`/challenge/my-challenges/?${queryString}`);
    return response.data;
  } catch (error) {
    return console.log(error);
  }
}
export async function challange(id) {
  try {
    const response = await APIKit.get(`/challenge/${id}`);
    return response.data;
  } catch (error) {
    return console.log(error);
  }
}

export async function getChallange(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString();
    const response = await APIKit.get(`/challenge/?${queryString}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function acceptChallange(payload) {
  try {
    const response = await APIKit.put(`/challenge/accept`, payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: 'No response from the server' };
    } else {
      return { error: 'Request setup error' };
    }
  }
}

export async function updateChallange(payload) {
  try {
    const response = await APIKit.put(`/challenge/update`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateResult(payload) {
  try {
    const response = await APIKit.put(`/challenge/update-result`, payload, {
      headers: {
        "Content-Type": false,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: 'No response from the server' };
    } else {
      return { error: 'Request setup error' };
    }
  }
}

export async function myPayment(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString();
    const response = await APIKit.post(`/payment/my-payments/?${queryString}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: 'No response from the server' };
    } else {
      return { error: 'Request setup error' };
    }
  }
}

export async function deposit(payload) {
  try {
    const response = await APIKit.post(`/payment/deposit`, payload, {
      headers: {
        "Content-Type": false,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: 'No response from the server' };
    } else {
      return { error: 'Request setup error' };
    }
  }
}

export async function withdraw(payload) {
  try {
    const response = await APIKit.post(`/payment/withdraw`, payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: 'No response from the server' };
    } else {
      return { error: 'Request setup error' };
    }
  }
}

export async function leaderboardapi(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString();
    const response = await APIKit.get(`/user/leaderboard?${queryString}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
