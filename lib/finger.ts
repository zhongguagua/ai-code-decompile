import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "js-cookie";

const COOKIE_NAME = "JSUNPACK_TMP_UID";

export async function getOrGenerateFingerprint() {
  // 尝试从 Cookie 中获取指纹
  let tmpUid = Cookies.get(COOKIE_NAME);

  // 如果 Cookie 中没有，则生成新的指纹
  if (!tmpUid) {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    tmpUid = result.visitorId; // 获取生成的指纹 ID

    // 将指纹存入 Cookie，设置有效期为 365 天
    Cookies.set(COOKIE_NAME, tmpUid, { expires: 365, path: "/" });
    console.log("没有获取到指纹，生成新的指纹", tmpUid);
  }

  return tmpUid;
}
