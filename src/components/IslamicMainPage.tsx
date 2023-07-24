import IslamicCards from "./IslamicCards";
import "../styles/islamicHomePage.css";
import { headers } from "../services/axios";
import React, { useState } from "react";
import { defaulState } from "../constants/creadientias";
export default function IslamicMainPage() {
  const [search, setSearch] = useState("");

  function objectToArray(obj: any) {
    const result: any = [];
    console.log("obj", obj.Hadith.Bukhari);
    if (obj.Hadith.Bukhari) {
      if (obj.Hadith.Bukhari) {
        const hadith = {
          type: "Hadith",
          name: "Bukhari and Muslim",
          text: obj.Hadith.Bukhari,
        };
        result.push(hadith);
      }

      if (obj.Hadith.Muslim) {
        const hadith = {
          type: "Hadith",
          name: "Bukhari and Muslim",
          text: obj.Hadith.Muslim,
        };
        result.push(hadith);
      }
      if (obj.Zakat.Arabic) {
        const hadith = {
          type: "Dua",
          text: obj.Zakat.Arabic,
        };
        result.push(hadith);
      }
    } else {
      if (obj.Hadith) {
        const hadith = {
          type: "Hadith",
          name: obj.Source,
          text: obj.Hadith,
        };
        result.push(hadith);
      }
      if (obj.Dua) {
        const hadith = {
          type: "Dua",
          text: obj.Dua,
        };
        result.push(hadith);
      }
    }

    return result;
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setCards([]);
    const BasePrompted = `give me one Hadith from Bukhari and Muslim that ${search} and dua that${search} in arabic in json format`;
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: BasePrompted,
          temperature: 0,
          max_tokens: 300,
        }),
      });
      const data = await response.json();
      try {
        console.log("jsonObj", JSON.parse(data.choices[0].text));
        const arr = objectToArray(JSON.parse(data.choices[0].text));
        setCards(arr);
      } catch (error) {
        console.log("error", error);
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const [cards, setCards] = useState<any>(defaulState);
  return (
    <div className="main">
      <div className="mainContainer">
        <div className="mainWrapper">
          بِسْمِ اللَّـهِ الرَّ‌حْمَـٰنِ الرَّ‌حِيمِ
        </div>
        <div className="textJustifyText">I'm your companion</div>
      </div>
      <div className="textJustification">
        You can tell me a situation you’re going through and I’ll tell you the
        Duas that can help
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="What is happening in your life?"
          className="inputStyle"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="btnSubmit"
          onClick={handleSubmit}
        ></button>
      </div>
      <div style={{ paddingBottom: "10px" }}>
        {cards?.map((card: any) => {
          return <IslamicCards card={card} />;
        })}
      </div>
    </div>
  );
}

// const jsonData = json5.parse(jsonString);

//     .replace(/'/g, '"')
//     .replace(/\n/g, "");
//   const unescapedJsonString = jsonString.replace(
//     /\\([\s\S])|(")/g,
//     "\\$1$2"
//   );
//   jsonData = JSON.parse(unescapedJsonString);
//   console.log("we",JSON.parse(unescapedJsonString))

// jsonData?.map((item:any)=>{
//   console.log(item)
// })

// jsonData[0].forEach((obj: any, key: any) => {
//   console.log("obj", obj, key);
//   if (obj.Dua) {
//     const hadith = {
//       type: "Dua",
//       name: obj.DuaName,
//       book: null,
//       text: obj.Dua,
//     };
//     setCards((prev: any) => [...prev, hadith]);
//   }

//   if (obj.HadithName) {
//     const hadith = {
//       type: "Hadith",
//       name: obj.HadithName,
//       book: null,
//       text: obj.HadithText,
//     };
//     setCards((prev: any) => [...prev, hadith]);
//   }
// });

// console.log("mama",JSON.parse(data.choices[0].text))
// console.log("data", makeValidJSON(data.choices[0].text));
// const mydata=makeValidJSON(data.choices[0].text);
// setCards(JSON.parse(mydata))
// console.log(JSON.parse(mydata));

// if(response.status === 200){
//    const pointsOfInterestPrompt = 'put all of these in json like array of object' + data.choices[0].text
//   const response2 = await axios.post<any>(
//     "https://api.openai.com/v1/completions",
//     {
//       model: "text-davinci-003",
//       prompt: pointsOfInterestPrompt,
//       temperature: 0,
//       max_tokens: 550,
//     },
//     {
//       headers: headers,
//     }
//   );
//   const text = response2?.data.choices[0].text;
//   setCards(response2?.data.choices[0].text)

//   // const jsonData = JSON.parse(text);
//   // console.log("jsonData", text);
//   // Object.keys(text).forEach((key) => {
//   //   console.log("key", key);
//   // });

// }

// const jsonDataRegex = /{.*}/s; // regular expression to match JSON data
// const match = text.match(jsonDataRegex);

// const cleanedText = match[0].replace(/[^\x20-\x7E]/g, ''); // remove any non-printable characters

// console.log("jsonData", jsonData);
// const hadithMuslimData = Object.keys(jsonData).map((key) => {
//   console.log("key", key);
//   if (key === "Hadith") {
//     return {
//       type: "hadith",
//       book: key,
//       text: jsonData[key],
//     };
//   } else {
//     return null;
//   }
// }).filter(obj => obj !== null);

// const duaData = Object.keys(jsonData).map((key) => {
//   if (key === "Dua") {
//     return {
//       type: "dua",
//       text: jsonData[key],
//     };
//   } else {
//     return null;
//   }
// }).filter(obj => obj !== null);

// const newArray: any = [];

// hadithMuslimData.forEach((obj) => {
//   if (obj) {
//     console.log("obj", obj);
//     Object.keys(obj.text).forEach((key) => {
//       if (obj.type === "hadith") {
//         const hadith = {
//           type: "hadith",
//           book: "Bukhari",
//           author: obj.text[key].author,
//           name: obj.text[key].Name,
//           text: obj.text[key],
//         };
//         setCards((prev: any) => [...prev, hadith]);
//         // newArray.push(hadith);
//       } else if (key === "Dua") {
//         const hadith = {
//           type: "hadith",
//           book: "Muslim",
//           text: obj.text[key],
//         };
//         setCards((prev: any) => [...prev, hadith]);
//         newArray.push(hadith);
//       }
//     });
//   }
// });

// duaData.forEach((obj: any) => {
//   console.log("objof dua", obj);
//   if (obj.type == "dua") {
//     const hadith = {
//       type: "Dua",
//       name: obj.text.Name,
//       book: null,
//       text: obj.text.Text,
//     };
//     setCards((prev: any) => [...prev, hadith]);
//   }
// });

// console.log("newArray", newArray);
