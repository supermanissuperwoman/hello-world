// 获取sessionstorage的值
function getItem(key) {
    let data = window.sessionStorage.getItem(key);
    data = JSON.parse(data);
    return data;
}
// 设置sessionstorage的值
function setItem(key, val) {
    const data = JSON.stringify(val);
    window.sessionStorage.setItem(key, data);
}
export {
    getItem,
    setItem
}