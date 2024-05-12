'use server'
import Excel from "exceljs";
import { redirect } from "next/navigation";
import path from "path";
import randomString from "./utilities/randomString";
import axios from "axios";
import { env } from "process";
export type Header = {
    key: string; header: string;
}
export async function saveToExcel(headers: Header[], rows: unknown[]) {
    const {
        UPLOAD_DIR: uploadDir,
        UPLOAD_URL_PREFIX: urlPrefix,
    } = process.env;

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
    worksheet.columns = headers;
    rows.forEach((item) => {
        worksheet.addRow(item);
    });
    worksheet.columns.forEach((sheetColumn) => {
        sheetColumn.font = {
            size: 12,
        };
        sheetColumn.alignment = { wrapText: true, vertical: 'middle', horizontal: 'left' };
        // sheetColumn.width = 30;
    });

    worksheet.getRow(1).font = {
        bold: true,
        size: 13,
    };
    const fileName = Date.now().toString() + "_" + randomString(5) + '.xlsx';
    const exportPath = path.join(process.cwd(), `${uploadDir}/${fileName}`);
    // console.log(exportPath);
    try {
        await workbook.xlsx.writeFile(exportPath);
    } catch (error) {
        console.log('写文件错误')
    }
    redirect(`${urlPrefix}/${fileName}`);

}

export async function sendMessage(message: string, users: string) {
    const access_token = await axios
        .get(
            `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${env.WX_APPID}&corpsecret=${env.WX_MESSAGE_CORPSECRET}`
        )
        .then((res) => res.data["access_token"]);

    // console.log(access_token);

    const result = await axios
        .post(
            `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${access_token}`,
            {
                "touser": users,
                "msgtype": "text",
                "agentid": env.WX_MESSAGE_AGENTID,
                "text": {
                    "content": message,
                },
            }
        )
    // console.log(result);
}