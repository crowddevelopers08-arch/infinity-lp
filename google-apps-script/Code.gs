const SHEET_NAME = "Submissions";
const HEADERS = [
  "Timestamp",
  "Source",
  "Name",
  "Phone",
  "Concern",
  "URL",
  "TeleCRM",
];

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) throw new Error("SPREADSHEET_ID Script Property is not configured");
  return SpreadsheetApp.openById(spreadsheetId);
}

function getOrCreateSheet_() {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function isAuthorized_(providedSecret) {
  const expectedSecret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
  return !expectedSecret || providedSecret === expectedSecret;
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!isAuthorized_(String(payload.webhookSecret || ""))) {
      return jsonResponse_({ success: false, error: "Unauthorized" });
    }

    const name = String(payload.name || "").trim();
    const phone = String(payload.phone || "").trim();
    const concern = String(payload.concern || "").trim();
    if (!name || !phone || !concern) {
      return jsonResponse_({ success: false, error: "Name, phone, and concern are required" });
    }

    const row = [
      String(payload.timestamp || new Date().toISOString()),
      String(payload.source || "Website"),
      name,
      phone,
      concern,
      String(payload.pageUrl || payload.url || ""),
      String(payload.telecrm || "Not configured"),
    ];

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getOrCreateSheet_().appendRow(row);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse_({ success: true, message: "Submission saved" });
  } catch (error) {
    return jsonResponse_({ success: false, error: String(error && error.message ? error.message : error) });
  }
}

function doGet(e) {
  try {
    const key = String((e && e.parameter && e.parameter.key) || "");
    if (!isAuthorized_(key)) {
      return jsonResponse_({ success: false, error: "Unauthorized" });
    }

    const values = getOrCreateSheet_().getDataRange().getDisplayValues();
    if (values.length <= 1) return jsonResponse_({ success: true, submissions: [] });

    const headers = values[0];
    const submissions = values.slice(1).map(function (row) {
      return headers.reduce(function (record, header, index) {
        record[header] = row[index] || "";
        return record;
      }, {});
    });

    return jsonResponse_({ success: true, submissions: submissions });
  } catch (error) {
    return jsonResponse_({ success: false, error: String(error && error.message ? error.message : error) });
  }
}
