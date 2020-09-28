/*
 * @Author: sizhou
 * @Date: 2020-09-12 14:12:31
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-12 14:18:29
 */

import CryptoJS from 'crypto-js'
const ENCRYPT_KEY = 'secret'

const encrypt = (dataToStorage:any):any => {
  return CryptoJS.AES.encrypt(JSON.stringify(dataToStorage), ENCRYPT_KEY)
}

const decrypt = (dataFromStorage:any):any => {
  const bytes = CryptoJS.AES.decrypt(dataFromStorage, ENCRYPT_KEY)
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

const storageHelper = {
  get: (key:any) => {
    try {
      const formatted = decrypt(localStorage.getItem(key))
      return formatted
    } catch (e) {
      return undefined
    }
  },
  set: (key:string, value:any) => {
    localStorage.setItem(key, encrypt(value))
  },
  clear: (key:string) => {
    localStorage.removeItem(key)
  },
}

export default storageHelper