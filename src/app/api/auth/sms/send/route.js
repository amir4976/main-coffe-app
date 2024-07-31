import ConnectToDb from "../../../../../../configs/db";
const request = require("request");
export async function POST(req) {
  ConnectToDb();
  const body = await req.json();
  const { phone } = body;
  const nowDate = new Date();
  const ExpTime = nowDate.getTime() + 300_000;
  const code = Math.floor(Math.randome() * 99999);
  request.post(
    {
      url: "http://ippanel.com/api/select",
      body: {
        op: "pattern",
        user: "YOUR_USERNAME",
        pass: "YOUR_PASSWORD",
        fromNum: "1000XXXX",
        toNum: "YOUR_STRING_DESTINATION_NUMBER",
        patternCode: "YOUR_PATTERN_ID",
        inputData: [{ code: 3000 }, { brand: "bmw" }],
      },
      json: true, 
    },
    async function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
        await OTPModel.create({
            phone,
            code,
            ExpTime
        })
      } else {
        console.log("whatever you want");
      }
    }
  );
  return Response.json({
    Massage:"succsess fully sended "
  });
}
