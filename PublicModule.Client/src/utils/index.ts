import { message } from "antd";

export function showErrors(...texts: string[]): void {
  texts.forEach((x) => {
    if (!Array.isArray(x)) {
      if (x?.includes("Lỗi") || x.startsWith("Error:")) {
        message.error(x);
      }
    } else {
      (x as any).forEach((y: string) => message.error(y));
    }
  });
}
