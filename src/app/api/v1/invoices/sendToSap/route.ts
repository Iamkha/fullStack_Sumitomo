import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { InvoiceModel } from "@/backEnd/models/invoice";
import { LogModel } from "@/backEnd/models/log";
import axios from "axios";
import moment from "moment";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  return NextResponse.json(
    {
      error: true,
    },
    {
      status: 500,
    }
  );
  // }
  // try {
  //   await connectToDB();
  //   const { pdf, invoiceId } = await request.json();
  //   let InvoiceDetails = {};
  //   let idInvoiceDetail = "";
  //   try {
  //     const invoice: any = await InvoiceModel.findById(invoiceId);
  //     if (invoice) {
  //       idInvoiceDetail = invoice["invoiceId"] || "";
  //       let date = "";
  //       try {
  //         date = moment(invoice["issueDate"]).format("DD/MM/YYYY");
  //       } catch (error) {}
  //       InvoiceDetails = {
  //         Barcode: invoice["invoiceId"] || "",
  //         InvoiceNumber: invoice["invoiceId"] || "",
  //         InvoiceDate: date,
  //         InvCurrency: invoice["currency"] || "",
  //         InvReceivedDate: date,
  //         VendorNumber: invoice["companycode"] || "",
  //         VendorName: invoice["vendor"] || "",
  //         TotalAmount: invoice["amount"] || "",
  //         DocumentTitle: `${invoiceId}.pdf`,
  //       };
  //     }
  //   } catch (error) {
  //     return NextResponse.json(
  //       {
  //         error: true,
  //         message: "Invoice something went wrong!",
  //       },
  //       {
  //         status: 400,
  //       }
  //     );
  //   }
  //   const bodyFormData = new FormData();
  //   bodyFormData.append("file", `${pdf}`);
  //   bodyFormData.append("InvoiceDetails", JSON.stringify(InvoiceDetails));
  //   try {
  //     const response = await axios({
  //       method: "POST",
  //       url: "http://10.54.61.11:9080/RESTfulWS/rest/scainvoice/upload",
  //       data: bodyFormData,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     if (response?.status == 200) {
  //       if (response?.data.includes("Document Failed")) {
  //         //Write Log
  //         LogModel.create({
  //           name: idInvoiceDetail,
  //           type: "SEND TO SAP",
  //           logType: "Error",
  //           error: response?.data || "Send to SAP fail!",
  //         })
  //           .then()
  //           .catch((error) => {
  //             console.log("Write Log: ", error.message);
  //           });
  //         return NextResponse.json(
  //           {
  //             error: true,
  //             message: response?.data,
  //           },
  //           {
  //             status: 200,
  //           }
  //         );
  //       } else {
  //         const idSap = findDocumentId(response?.data || "");
  //         InvoiceModel.findByIdAndUpdate(invoiceId, {
  //           idSap,
  //           timeSentFileNet: new Date().getTime(),
  //         })
  //           .then()
  //           .catch((error) =>
  //             console.log("Error Save ID SAP: ", error.message)
  //           );
  //         // Write Log
  //         LogModel.create({
  //           name: idInvoiceDetail,
  //           type: "SEND TO SAP",
  //           logType: "Operation",
  //           error: "Send to SAP success!",
  //         })
  //           .then()
  //           .catch((error) => {
  //             console.log("Write Log: ", error.message);
  //           });
  //         return NextResponse.json(
  //           {
  //             error: false,
  //             message: findDocumentId(response?.data) || "Success",
  //           },
  //           {
  //             status: 200,
  //           }
  //         );
  //       }
  //     }
  //   } catch (error: any) {
  //     LogModel.create({
  //       name: idInvoiceDetail,
  //       type: "SEND TO SAP",
  //       logType: "Error",
  //       error: error.response?.data || error.message,
  //     })
  //       .then()
  //       .catch((error) => {
  //         console.log("Write Log: ", error.message);
  //       });
  //     return NextResponse.json(
  //       {
  //         error: true,
  //         message: error.response?.data || error.message,
  //       },
  //       {
  //         status: 400,
  //       }
  //     );
  //   }
  // } catch (e: any) {
  //   return NextResponse.json(
  //     {
  //       error: true,
  //       message: e.message,
  //     },
  //     {
  //       status: 500,
  //     }
  //   );
  // }
};

// export function findDocumentId(str: any) {
//   const re = /{(.*?)}/g;
//   const result = [];
//   let current;
//   while ((current = re.exec(str))) {
//     result.push(current.pop());
//   }
//   if (result.length > 0) {
//     return result[0];
//   }
//   return "";
// }
