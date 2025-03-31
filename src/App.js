


import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
// import QRCode from "react-qr-code";
import React from "react";
import QRCode from 'qrcode'
// const { createCanvas } = require('canvas')
import { createCanvas } from 'canvas';
// import { QR } from "react-qr-rounded";
import clipboard from 'clipboardy';
// import { ncp } from 'copy-paste';
import { toPng } from 'html-to-image';

import './App.css';
// var ncp = require('copy-paste');

function App() {
  const [qrRes, setQrRes] = useState();
  const [pasteString, setPasteString] = useState('');
  const [infos, setIinfos] = useState([]);

  const copyss = () => {
    clipboard.writeSync('STR STR STR STR STR STR STR');
  }

  // const pastess = () => {
  //   clipboard.readSync(str => setIinfos([...infos, `readSync: ${str}`]));
  //   // ncp.paste((error, str) => { setIinfos(error); setPasteString(str) })
  // }

  const pastess2 = (e) => {
    window.navigator.clipboard.readText().then(text => {
      setPasteString(text);
      setIinfos([...infos, `w22222: ${text}`]);
    });
  }

  const pastess3 = (e) => {
    navigator.clipboard.readText().then(text => {
      setPasteString(text);
      setIinfos([...infos, `w22222: ${text}`]);
    });
  }

  const pastess = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await window.navigator.permissions.query({ name: 'clipboard-read' });
      console.log('Clipboard read permission: ', result);
      setIinfos([...infos, `Clipboard read permission: ${JSON.stringify(result)}`]);

      if (result.state !== 'granted') {
        try {
          const text = await window.navigator.clipboard.readText();
          console.log('Clipboard read successfully:', text);
          setIinfos([...infos, `Clipboard read successfully: ${text}`]);
          setPasteString(text);
          console.log('Clipboard read permission granted after read attempt.');
          setIinfos([...infos, 'Clipboard read permission granted after read attempt.']);
        } catch (error) {
          console.log('Clipboard read permission denied after read attempt:', error);
          setIinfos([...infos, `Clipboard read permission denied after read attempt: ${error}`]);
        }
      } else {
        console.log('Clipboard read permission was already granted.');
        setIinfos([...infos, 'Clipboard read permission was already granted.']);
        window.navigator.clipboard.readText().then(text => {
          setPasteString(text);
          setIinfos([...infos, 'w22222']);
        });

      }
    } catch (error) {
      console.error('Error checking clipboard permission:', error);
      setIinfos([...infos, `Error checking clipboard permission: ${error}`]);
      window.navigator.clipboard.readText().then(text => {
        setPasteString(text);
        setIinfos([...infos, 'w3333']);
      });
    }
  }
  const pastess5 = () => {
    window.Telegram.WebApp.readTextFromClipboard(str => {
      console.log('str', str);
      setPasteString(str);
      setIinfos([...infos, `str: ${str}`]);
    });
  }

  // const tg = window.Telegram.WebApp;

  // const onScan = (res) => {
  //   console.log('res', res);
  //   // tg.sendData(JSON.stringify(res));
  //   setQrRes(res);
  //   tg.closeScanQrPopup();
  // }

  // const scanQr = () => {
  //   tg.showScanQrPopup({ text: 'TestText Text' }, onScan)
  // }

  // useEffect(() => {
  //   const html5QrCode = new Html5Qrcode("QrReader__reader");
  //   const fileinput = document.getElementById('QrReader__input-file');
  //   const readQr = e => {
  //     if (e.target.files.length === 0) {
  //       return;
  //     }

  //     const imageFile = e.target.files[0];
  //     html5QrCode.scanFile(imageFile, true)
  //       .then(decodedText => {
  //         console.log(decodedText);
  //         setQrRes(decodedText);
  //       })
  //       .catch(err => {
  //         console.log(`Error scanning file. Reason: ${err}`)
  //       });
  //   }
  //   fileinput.addEventListener('change', readQr);

  //   return () => {
  //     fileinput.removeEventListener('change', readQr);
  //   }
  // }, []);

  const generateQR = async text => {
    try {
      const qrCanvas = document.createElement('canvas');
      qrCanvas.height = 600; // set canvas heigh
      qrCanvas.width = 200; // set canvas width
      const qrContext = qrCanvas.getContext('2d'); // context of the canvas
      // const mycanvas = document.getElementById('qrcode');
      const canvas1 = document.getElementById('canvas1');
      const mycanvas = createCanvas(200, 200)
      await QRCode.toCanvas(canvas1, '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v');


      // console.log(await QRCode.toDataURL('1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v'))
      // console.log(await QRCode.toCanvas('1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v'))
      // // setQrRes(await QRCode.toDataURL('1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v'))
      // setQrRes(await QRCode.toCanvas('1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v'))
    } catch (err) {
      console.error(err)
    }
  }

  const [dataUrl, setDataUrl] = useState(null);
  const ref = useRef(null);

  const convert = () => {
    toPng(ref.current, { canvasWidth: 300, canvasHeight: 300 }).then((dataUrl) => {
      console.log('dataUrl', dataUrl);
      // const img = new Image();
      // img.src = dataUrl;
      setDataUrl(dataUrl);
      // document.body.appendChild(img);
    })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
  }

  return (
    <div className="App">
      {/* <button onClick={scanQr}>SCAN</button> */}
      {/* <div>qrRes: {qrRes}</div>

      <button className='Image' onClick={generateQR}>Image</button>

      <img src={qrRes} />
      <div id='qrcode'></div>
      <canvas id='canvas1'></canvas>
      <QR>1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v</QR> */}
      {/* <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "550px", width: "550px" }}
        value={'1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v'}
        viewBox={`0 0 256 256`}
        level='H'
      /> */}


      {/* <button onClick={scanQr}>READ</button> */}
      {/* <div className='QrReader'>
        <div id="QrReader__reader"></div>
        <label htmlFor='QrReader__input-file'>
          <div className='QrReader__button'>Up</div>
        </label>
        <input type="file" id="QrReader__input-file" accept="image/*"></input>
      </div> */}

      {/* <script src="./dist/html5-qrcode.js"></script> */}

      <button className='qwerty' onClick={copyss}>Copy</button>
      <button className='qwerty' onClick={pastess}>Paste</button>
      <button className='qwerty' onClick={pastess2}>Paste2</button>
      <button className='qwerty' onClick={pastess3}>Paste3</button>
      <button className='qwerty' onClick={pastess3}>Paste3</button>
      <button className='qwerty' onClick={pastess5}>Paste5</button>
      <div>P: {pasteString}</div>
      <div>infos:</div>
      <div className='icon' ref={ref}>BP</div>
      <button onClick={convert}>convert</button>
      <img src={dataUrl} alt="qwe" />
      {infos.map(info => <div>{info}</div>)}
    </div>
  );
}

export default App;
