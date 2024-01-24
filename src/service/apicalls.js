import APIKit from "./baseApi";


export async function registerApi(payload) {
    try {
      const response = await APIKit.post(
        `/user/register`,
        payload,
      );
      return response.data;
    } catch (error) {
      return console.log(error);
    }
}

export async function loginApi(payload) {
    try {
      const response = await APIKit.post(
        `/user/login`,
        payload,
      );
      return response?.data;
    } 
    catch (error) {
      return error?.response?.data;
    }
}

export async function verifyotpApi(payload) {
    try {
      const response = await APIKit.post(
        `/user/verify-pin`,
        payload,
      );
      return response.data;
    } catch (error) {
      console.log(error?.response?.data)
      return error?.response?.data;
    }
}

export async function getuser(id) {
  console.log(id)
    try {
      const response = await APIKit.get(
        `/user/${id}`,
      );
      return response.data;
    } catch (error) {
      return console.log( error);
    }
}

export async function updateUser(payload) {
    try {
      const response = await APIKit.put(
        `/user/update`,
        payload,
        {
          headers : {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
}

export async function createChallange(payload) {
    try {
      const response = await APIKit.post(
        `/challenge/create`,
        payload,
      );
      return response.data;
    } catch (error) {
      return console.log(error);
    }
}
  
export async function myChallange(payload) {
    try {
      const response = await APIKit.post(
        `/challenge/my-challenges`,
        payload,
      );
      return response.data;
    } catch (error) {
      return console.log(error);
    }
}
export async function challange(id) {
    try {
      const response = await APIKit.get(
        `/challenge/${id}`
      );
      return response.data;
    } catch (error) {
      return console.log(error);
    }
}
  
export async function getChallange() {
    try {
      const response = await APIKit.get(
        `/challenge`,
      );
      return response.data;
    } catch (error) {
      return error;
    }
}  
  
export async function updateChallange(payload) {
    try {
      const response = await APIKit.put(
        `/challenge/update`,
        payload,
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
}
  
export async function updateResult(payload) {
  console.log("payload", payload)
    try {
      const response = await APIKit.put(
        `/challenge/update-result`,
        payload,
      );
      return response.data;
    } catch (error) {
      return console.log(error);
    }
}

export async function myPayment(payload) {
    try {
      const response = await APIKit.post(
        `/payment/my-payments`,
        payload
      );
      return response.data;
    } catch (error) {
      return console.log(error, payload);
    }
}

export async function deposit(payload) {
    try {
      const response = await APIKit.post(
        `/payment/deposit`,
        payload
      );
      return response.data;
    } catch (error) {
      return error;
    }
}

export async function withdrawal(payload) {
    try {
      const response = await APIKit.post(
        `/payment/withdrawal`,
        payload
      );
      return response.data;
    } catch (error) {
      return error;
    }
}

