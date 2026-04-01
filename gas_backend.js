// Google Apps Script (GAS) 後端處理程式
// 請將此程式碼貼到您的 Google Sheets -> 擴充功能 -> Apps Script 中

const SHEET_ID = '1VOufUmfDeufKGmk0A053PnCWpO7Mt_0xhuI3-eCTJII';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === 'add') {
      // 欄位順序: 編號(A), 姓名(B), 餐點(C), 飲料(D)
      sheet.appendRow([data.id, data.name, data.meal, data.drink]);
      return createJsonResponse({ status: 'success', message: '新增成功' });
      
    } else if (action === 'edit' || action === 'delete') {
      // 尋找對應的 ID 進行修改或刪除
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      
      let rowIndex = -1;
      // 假設第一行為標題，從第二行找起 (i = 1)
      for (let i = 1; i < values.length; i++) {
        if (values[i][0] == data.id) {
          rowIndex = i + 1; // getValues() 是 0-indexed，工作表行號是 1-indexed
          break;
        }
      }

      if (rowIndex !== -1) {
        if (action === 'edit') {
          // 更新 B, C, D 欄
          sheet.getRange(rowIndex, 2).setValue(data.name);
          sheet.getRange(rowIndex, 3).setValue(data.meal);
          sheet.getRange(rowIndex, 4).setValue(data.drink);
          return createJsonResponse({ status: 'success', message: '修改成功' });
        } else if (action === 'delete') {
          sheet.deleteRow(rowIndex);
          return createJsonResponse({ status: 'success', message: '刪除成功' });
        }
      } else {
        return createJsonResponse({ status: 'error', message: '找不到對應的 ID' });
      }
    }
    
    return createJsonResponse({ status: 'error', message: '未知的操作' });
    
  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  }
}

// 支援讀取資料 (GET 請求)
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    let result = [];
    // 假設第一行是標題，從第二行開始讀取 (i=1)
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] && String(values[i][0]).trim() !== '') {
        result.push({
          id: values[i][0],
          name: values[i][1],
          meal: values[i][2],
          drink: values[i][3]
        });
      }
    }
    return createJsonResponse({ status: 'success', data: result });
  } catch(err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  }
}

// 產生 JSON 回應的輔助函數
function createJsonResponse(responseObject) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}
