// ================================================================
// 剑网三烟花成就记录 - Google Apps Script 后端
// 使用方法：
//   1. 打开 Google Sheet，菜单「扩展程序」→「Apps Script」
//   2. 将此文件内容粘贴进去，保存
//   3. 点击「部署」→「新建部署」
//      - 类型：网络应用
//      - 执行身份：我
//      - 谁可以访问：任何人
//   4. 点击「部署」，复制生成的网址
//   5. 在网页右上角 ⚙ 设置里粘贴该网址
// ================================================================

const SHEET_NAME = 'data';

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

// 读取数据
function doGet(e) {
  try {
    const val = getSheet().getRange('A1').getValue();
    return ContentService
      .createTextOutput(val || '{}')
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 写入数据
function doPost(e) {
  try {
    const data = e.postData.contents;
    // 写入 A1，同时在 B1 记录最后同步时间
    const sheet = getSheet();
    sheet.getRange('A1').setValue(data);
    sheet.getRange('B1').setValue(new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
