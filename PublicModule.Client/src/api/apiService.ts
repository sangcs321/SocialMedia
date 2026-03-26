import axios, { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import { dayjsToPost } from "utils/formatDatetime";
import queryString from "query-string";
import { isFirefox } from "react-device-detect";
import { showErrors } from "utils";

axios.defaults.withCredentials = true;

// Cờ ngăn việc gọi Refresh Token 10 lần một lúc nếu có 10 API cùng tèo (401) lúc
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Đặt trạm gác rình mò mọi Response từ Server
axios.interceptors.response.use(
  (response) => {
    // Nếu Server báo 200 OK bình thường thì cứ cho qua
    return response;
  },
  async (error) => {
    // Bị Server tóm cổ trả về lỗi!
    const originalRequest = error.config;

    // 1. Kiểm tra xem có đúng là lỗi 401 (Hết hạn Access Token) chưa?
    // Và cái API rớt có phải là API refresh không? (Tránh vòng lặp vô tận)
    if (
      error.response?.status === 401 &&
      !originalRequest.url.includes("/api/auth/refresh") &&
      !originalRequest._retry // Cờ đánh dấu tránh 1 request bị thử lại 2 lần rồi rớt miết
    ) {
      if (isRefreshing) {
        // Đang có một thằng khác đứng xin cấp Token mới rồi, tụi mày chỉ việc xếp hàng chờ nó xin giùm thôi
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 2. Chạy đi xin Token mới! (Không truyền tham số gì vì lấy từ Cookie)
        // Lưu ý: Sửa lại đường dẫn localhost của backend bạn cho đúng nhé
        await axios.post("https://localhost:5229/api/auth/refresh");

        // 3. Xin thành công! Trình duyệt vừa tự đè Cookie mới lên.
      // Hô hào tụi xếp hàng đang chờ: "Anh em chạy lại Request đi!"
        processQueue(null);

        // Chạy lại chính cái Request vừa rớt ban nãy
        return axios(originalRequest);
      } catch (refreshError) {
        // 4. Toang! Xin lại không được (Refresh Token cũng hết hạn luôn rồi)
        processQueue(refreshError, null);

        // Gọi hàm clearAuth() của bạn, đá văng về màn hình Login
        clearAuth();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

interface RequestOptions {
  method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
  url: string;
  data?: any;
  extention?: string;
  headers?: any;
  isFile?: boolean;
  fileName?: string;
  fullResponse?: boolean;
  abortSignal?: () => AbortSignal;
  isNotShowError?: boolean;
  params?: any;
}

export class Result<T = any> {
  public value: T;
  public errors: any[];

  public get success(): boolean {
    return !this.errors || this.errors?.length === 0;
  }

  public get hasErrors(): boolean {
    return (
      this.errors !== undefined &&
      Array?.isArray(this.errors) &&
      this.errors.length > 0
    );
  }

  constructor(value: T, ...errors: any[]) {
    this.value = value;

    // Cứu cánh vòng đời:
    // 1. flat(Infinity) đập tan mọi array lồng nhau [ [Lỗi 1, Lỗi 2] ] thành [Lỗi 1, Lỗi 2]
    // 2. filter loại bỏ sạch sẽ các chữ undefined hay null bị ném vào
    this.errors = errors
      .flat(Infinity)
      .filter((e) => e !== undefined && e !== null);
  }
}

const PRODUCTION_MODE = !location.hostname.includes("localhost");

export function ErrorRequest(error: any[]): Result<any> {
  const err: Result = {
    errors: error,
    hasErrors: true,
    success: false,
    value: undefined,
  };
  return err;
}

const clearAuth = () => {
  window.location.href = "/login";
};

const refreshToken = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export async function apiRequest<T = any>(
  opts: RequestOptions,
): Promise<Result<T>> {
  let axiosResult: any = undefined;
  let result: any = undefined;

  try {
    if (opts.data) {
      for (const [key, value] of Object.entries(opts.data)) {
        if (dayjs.isDayjs(value)) {
          const dateData = dayjsToPost(value);
        }
      }
    }
    const processQuery = (url: string, data: any): string => {
      if (data) {
        return `${url}?${queryString.stringify(data)}`;
      }
      return url;
    };

    let axiosRequestConfig: AxiosRequestConfig | undefined = undefined;

    if (!axiosRequestConfig) {
      axiosRequestConfig = {
        headers: opts.headers,
      };
      if (opts.isFile) {
        axiosRequestConfig.headers = {
          ...axiosRequestConfig.headers,
          "Content-Type": "multipart/form-data",
        };
      }
    }
    axiosRequestConfig.headers = {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      ...axiosRequestConfig.headers,
    };

    // const isAuthEndpoint =
    //   opts.url.includes("/login") || opts.url.includes("/refresh");

    // if (!isAuthEndpoint) {
    //   axiosRequestConfig.headers = {
    //     ...axiosRequestConfig.headers,
    //     Authorization: `Bearer `,
    //   };
    // }
    let api = `${opts.url}`;
    try {
      switch (opts.method) {
        case "GET":
          if (opts.params) {
            opts.params.lang = "vi";
          }
          if (opts.isFile) {
            opts.params["isFirefox"] = isFirefox;
          }
          axiosResult = await axios.get(processQuery(api, opts.params), {
            method: "GET",
            headers: axiosRequestConfig.headers,
            signal: opts.abortSignal && opts.abortSignal(),
          });
          break;
        case "POST":
          axiosResult = await axios.post(
            processQuery(api, opts.params),
            opts.data,
            {
              headers: axiosRequestConfig.headers,
            },
          );
          break;
        case "PUT":
          axiosResult = await axios.put(
            processQuery(api, opts.params),
            opts.data,
            {
              headers: axiosRequestConfig.headers,
            },
          );
          break;
        case "PATCH":
          axiosResult = await axios.patch(
            processQuery(api, opts.params),
            opts.data,
            {
              headers: axiosRequestConfig.headers,
            },
          );
          break;
        case "DELETE":
          axiosResult = await axios.delete(processQuery(api, opts.params), {
            headers: axiosRequestConfig.headers,
            data: opts.data,
          });
          break;
      }
      result = new Result<T>(
        !opts.fullResponse && axiosResult.data.value?.length > 0
          ? axiosResult.data.value
          : axiosResult.data,
        axiosResult.data.errors && axiosResult.data.errors.length > 0
          ? [...axiosResult.data.errors]
          : undefined,
      );
    } catch (error: any) {
      if (
        error?.response?.data?.type ===
        "https://tools.ietf.org/html/rfc9110#section-15.5.1"
      ) {
        sessionStorage.removeItem("X-XSRF-TOKEN");
        return apiRequest<T>(opts);
      }
      if (error.message === "Network Error") {
        errorConfirm();
      } else if (
        error.message === "Request failed with status code 400" &&
        error?.response?.data &&
        error.response.data.type ===
          "https://tools.ieft.org/html/rfc7231#section-6.5.1"
      ) {
        sessionStorage.clear();
        return apiRequest(opts);
      }
      result = new Result(undefined, error.response.data);
    }

    if (result.hasErrors && !opts.isNotShowError) {
      showErrors(...result.errors);
    }

    if (result.hasErrors) {
      throw result;
    }
    return result as any;
  } catch (error: any) {
    // result = new Result(undefined, "loi truy xuat");
    throw result;
  }
}

function errorConfirm() {
  sessionStorage.clear();
}
