// const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const router = require("../routes/auth");
const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");

const options = {
  // ignoreAttributes: false,
  ignoreDeclaration: true,
  ignorePiTags: true,
  removeNSPrefix: true,
};

const parser = new XMLParser(options);

exports.login = async (req, res, next) => {
  var data =
    `<?xml version="1.0" encoding="utf-8"?>\r\n  
                  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\r\n   
                    <soap:Body>\r\n    
                      <Login xmlns="http://idm.pea.co.th/">\r\n     
                        <request>\r\n       
                          <InputObject>\r\n          
                            <Username>` +
    req.body.username +
    `</Username>\r\n           
                            <Password>` +
    req.body.password +
    `</Password>\r\n       
                          </InputObject>\r\n        
                          <WSAuthenKey>e3358fc1-99ad-4b21-8237-7c9c8ba1c5dc</WSAuthenKey>\r\n      
                        </request>\r\n    
                      </Login>\r\n  
                    </soap:Body>\r\n
                  </soap:Envelope>`;
  var config = {
    method: "post",
    url: "https://idm.pea.co.th/webservices/IdmServices.asmx",
    headers: {
      "Content-Type": "text/xml",
    },
    data: data,
  };

  let resp = await axios(config)
    .then(function (response) {
      let jsonObj = parser.parse(response.data);
      return jsonObj;
    })
    .catch(function (error) {
      return error;
    });

  if (resp.Envelope.Body.LoginResponse.LoginResult.ResponseMsg === "Success") {
    var data =
      `<?xml version="1.0" encoding="utf-8"?>
                  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                  <soap:Body>
                    <GetEmployeeInfoByEmployeeId xmlns="http://idm.pea.co.th/">
                      <request>
                        <InputObject>
                          <EmployeeId>` +
      req.body.username +
      `</EmployeeId>
                          </InputObject>
                        <WSAuthenKey>93567815-dfbb-4727-b4da-ce42c046bfca</WSAuthenKey>
                        </request>
                      </GetEmployeeInfoByEmployeeId>
                    </soap:Body>
                  </soap:Envelope>`;

    var config2 = {
      method: "post",
      url: "https://idm.pea.co.th/webservices/EmployeeServices.asmx",
      headers: {
        "Content-Type": "text/xml",
      },
      data: data,
    };

    let resp2 = await axios(config2)
      .then(function (response) {
        let jsonObj = parser.parse(response.data);
        return jsonObj;
      })
      .catch(function (error) {
        return error;
      });

    const dataUser = {
      EmployeeId:
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.EmployeeId,
      FullName:
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.FirstName +
        " " +
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.LastName,
      DepartmentShortName:
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.DepartmentShortName,
      DepartmentFullName:
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.DepartmentFullName,
      Position:
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.Position +
        " " +
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.LevelDesc,
      BaCode:
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.BaCode,
      BaName:
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.BaName,
      CostCenterName:
        resp2.Envelope.Body.GetEmployeeInfoByEmployeeIdResponse
          .GetEmployeeInfoByEmployeeIdResult.ResultObject.CostCenterName,
    };
    const token = jwt.sign({ dataUser }, process.env.KEY);
    res.status(200).json({
      token: token,
    });
  } else {
    res.status(401).json({
      status: "false",
    });
  }
};
