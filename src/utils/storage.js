/**
 * 本地存储数据
 * @param {*} key
 * @param {*} value
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * 获取本地存储数据
 * @param {*} key
 * @returns
 */
export const getItem = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除单个本地存储的数据
 * @param {*} key
 */
export const removeItem = (key) => {
  localStorage.removeItem(key)
}

/**
 * 删除本地所有数据
 */
export const removeAllItem = () => {
  localStorage.clear()
}
