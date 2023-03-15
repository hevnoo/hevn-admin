export default {
  setItem(key: any, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getItem(key: any): any {
    return JSON.parse(localStorage.getItem(key) as string)
  },
  removeItem(key: any) {
    localStorage.removeItem(key)
  },
  //sessionStorage
  setItem_s(key: any, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getItem_s(key: any): any {
    return JSON.parse(sessionStorage.getItem(key) as string)
  },
  removeItem_s(key: any): void {
    sessionStorage.removeItem(key)
  }
}
