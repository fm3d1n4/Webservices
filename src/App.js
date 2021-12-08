import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import { React, useState } from "react";

/*function soapXmlHttp() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(
    "POST",
    "https://aplicacionsgd.net/110_WMS_Android_a/Service.asmx",
    true
  );
  xmlhttp.withCredentials = true;

  // build SOAP request
  var sr =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    "<soap:Body>" +
    '<E_InfoSesion xmlns="http://www.sistalguido.com/">' +
    "<sMod>110</sMod>" +
    "<sU>96</sU>" +
    "<sE>224</sE>" +
    "<sRes>0</sRes>" +
    "<sResDesc>0</sResDesc>" +
    "<sC5>0</sC5>" +
    "</E_InfoSesion>" +
    "</soap:Body>" +
    "</soap:Envelope>";

  console.log(sr);

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        alert(xmlhttp.responseText);
        // alert('done. use firebug/console to see network response');
      }
    }
  };
  // Send the POST request
  //xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
  xmlhttp.setRequestHeader(
    "SOAPAction",
    "urn:schemas-upnp-org:service:RenderingControl:1#GetVolume"
  );
  xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
  /*xmlhttp.setRequestHeader('Company', '0001');
    xmlhttp.setRequestHeader('Language', 'es-MX');
    xmlhttp.setRequestHeader('MessageId', '6dacc3cb-0c36-48e6-acc2-85112b1d3409');
    xmlhttp.setRequestHeader('PartitionKey', 'initial');***
  //xmlhttp.setRequestHeader('Authorization', 'Basic myusername/password here');
  xmlhttp.send(sr);
  // send request
  // ...
}*/

/*function soapFetch(file) {
  const WSDL =
    "https://devwalton67c6eeb009a04241devaos.cloudax.dynamics.com/soap/services/FesLedgerJournalWs";

  var body =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://schemas.microsoft.com/dynamics/2013/01/datacontracts" xmlns:fes="FesCreateLedgerJournal">' +
    "<soapenv:Header>" +
    "<dat:CallContext>" +
    "<dat:Company>0001</dat:Company>" +
    "<dat:Language>es-MX</dat:Language>" +
    "<dat:MessageId>0741e805-5ac9-4127-acd4-8c0d0e917fef</dat:MessageId>" +
    "<dat:PartitionKey>initial</dat:PartitionKey>" +
    "</dat:CallContext>" +
    "</soapenv:Header>" +
    "<soapenv:Body>" +
    "<fes:FesCreateLedgerJournal>" +
    "<fes:xmlFileStr><![CDATA[" +
    file +
    "]]></fes:xmlFileStr>" +
    "</fes:FesCreateLedgerJournal>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";

  var headers = new Headers();
  headers.append("Content-Type", "text/xml");
  headers.append("Access-Control-Allow-Origin", "*");
  /*headers.append('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  headers.append('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');***
  //headers.append('SOAPAction', SOAP_ACTION);
  //headers.append('Authorization', 'Be')

  fetch(WSDL, {
    body: body,
    method: "POST",
    mode: "cors",
    //redirect: 'follow',
    headers: headers,
    credentials: "include",
    //"secure": false,
  })
    .then((response) => console.log("Success=> " + response))
    .catch(function (error) {
      console.log(error);
    });
}*/

const getRandomId = () => {
  var array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0].toString();
};

function App() {
  const [xml, setXml] = useState([]);
  const [tkn, setTkn] = useState("");
  const [messageId, setMessageId] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setXml(file);

    fetch(file)
      .then((res) => console.log(res.text().toString()))
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => console.log("DATA", data))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeToken = (e) => {
    const value = e.target.value;
    setTkn(value);
  };

  const handleChangeMessageId = (e) => {
    const value = e.target.value;
    setMessageId(value);
  };

  const soapAxios = (file) => {
    const WSDL =
      "https://devwalton67c6eeb009a04241devaos.cloudax.dynamics.com/soap/services/FesLedgerJournalWs";

    file =
      '<?xml version="1.0" encoding="utf-8"?><XML><WebService><NombreWS>FesLedgerJournalWs</NombreWS><MetodoWS>FesCreate</MetodoWS><Parameters>2</Parameters><Obligatorio>0</Obligatorio><DiarioExistente>0</DiarioExistente></WebService><Message><Record Journal="1"><ReferenciaDeDiario></ReferenciaDeDiario><Record Number="1"><JournalName>DG</JournalName><TransDate>28/04/2010</TransDate><CurrencyCode>MxN</CurrencyCode><fieldExchRate>1</fieldExchRate><AccountType>1</AccountType><AccountNum>1021063</AccountNum><Accionistas_PersonaFisicas></Accionistas_PersonaFisicas><Accionistas_PersonalMoral></Accionistas_PersonalMoral><Centro_Costo></Centro_Costo><Empleado></Empleado><Intercompania></Intercompania><Inversiones></Inversiones><Minor></Minor><Operaciones_Inversion></Operaciones_Inversion><Serie></Serie><Txt>Cascada</Txt><Invoice></Invoice><Serie></Serie><CFDIUUID_MX></CFDIUUID_MX><AmountCurDebit>500</AmountCurDebit><AmountCurCredit></AmountCurCredit><RFC></RFC><TaxGroup></TaxGroup><TaxItemGroup></TaxItemGroup><PaymMode></PaymMode><PaymMethodSAT></PaymMethodSAT><PurposeCFDI></PurposeCFDI><MarkedInvoice></MarkedInvoice><OffsetAccountType>1</OffsetAccountType><OffsetAccount>2000001</OffsetAccount><OffsetAccionistas_PersonaFisicas></OffsetAccionistas_PersonaFisicas><OffsetAccionistas_PersonalMoral></OffsetAccionistas_PersonalMoral><OffsetCentro_Costo></OffsetCentro_Costo><OffsetEmpleado></OffsetEmpleado><OffsetIntercompania></OffsetIntercompania><OffsetInversiones></OffsetInversiones><OffsetMinor></OffsetMinor><OffsetOperaciones_Inversion></OffsetOperaciones_Inversion><OffsetSerie></OffsetSerie></Record><Record Number="2"><JournalName>DG</JournalName><TransDate>20/07/2020</TransDate><CurrencyCode>MxN</CurrencyCode><fieldExchRate>1</fieldExchRate><AccountType>1</AccountType><AccountNum>1320201</AccountNum><Accionistas_PersonaFisicas></Accionistas_PersonaFisicas><Accionistas_PersonalMoral></Accionistas_PersonalMoral><Centro_Costo></Centro_Costo><Empleado></Empleado><Intercompania></Intercompania><Inversiones></Inversiones><Minor></Minor><Operaciones_Inversion></Operaciones_Inversion><Serie></Serie><Txt>Cascada</Txt><Invoice></Invoice><Serie></Serie><CFDIUUID_MX></CFDIUUID_MX><AmountCurDebit>500</AmountCurDebit><AmountCurCredit> </AmountCurCredit><RFC></RFC><TaxGroup></TaxGroup><TaxItemGroup></TaxItemGroup><PaymMode></PaymMode><PaymMethodSAT></PaymMethodSAT><PurposeCFDI></PurposeCFDI><MarkedInvoice></MarkedInvoice><OffsetAccountType>1</OffsetAccountType><OffsetAccount>3100002</OffsetAccount><OffsetAccionistas_PersonaFisicas></OffsetAccionistas_PersonaFisicas><OffsetAccionistas_PersonalMoral></OffsetAccionistas_PersonalMoral><OffsetCentro_Costo></OffsetCentro_Costo><OffsetEmpleado></OffsetEmpleado><OffsetIntercompania></OffsetIntercompania><OffsetInversiones></OffsetInversiones><OffsetMinor></OffsetMinor><OffsetOperaciones_Inversion></OffsetOperaciones_Inversion><OffsetSerie></OffsetSerie></Record></Record></Message></XML>';

    var body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://schemas.microsoft.com/dynamics/2013/01/datacontracts" xmlns:fes="FesCreateLedgerJournal">' +
      "<soapenv:Header>" +
      "<dat:CallContext>" +
      "<dat:Company>0001</dat:Company>" +
      "<dat:Language>es-MX</dat:Language>" +
      "<dat:MessageId>" +
      messageId +
      "</dat:MessageId>" +
      "<dat:PartitionKey>initial</dat:PartitionKey>" +
      "</dat:CallContext>" +
      "</soapenv:Header>" +
      "<soapenv:Body>" +
      "<fes:FesCreateLedgerJournal>" +
      "<fes:xmlFileStr><![CDATA[" +
      file +
      "]]></fes:xmlFileStr>" +
      "</fes:FesCreateLedgerJournal>" +
      "</soapenv:Body>" +
      "</soapenv:Envelope>";

    console.log("body => ", body);

    axios
      .post(WSDL, {
        headers: {
          "Content-Type": "text/xml",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          Authorization: tkn,
        },
        body,
      })
      .then((response) => {
        console.log("Success ========>", response);
      })
      .catch((error) => console.log("Error ========>", error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <h3 className="App-link">Select a XML File to Upload!</h3>
          <div className="form">
            <input
              value={messageId}
              type="text"
              onChange={handleChangeMessageId}
              placeholder="Message Id ..."
            />
            <textarea
              value={tkn}
              type="text"
              row="5"
              onChange={handleChangeToken}
              placeholder="Bearer ..."
            />
            <input
              type="file"
              accept="application/xml"
              onChange={() => handleChange}
            />
            <button onClick={() => soapAxios(xml)}>Upload!{xml}</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
