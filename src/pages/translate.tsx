import { FC, useState } from "react";
import { Exchange } from "@react-vant/icons";

async function getFetch(url = "", data = {}) {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          response.json().then((json) => resolve(json));
        } else {
          response.json().then((json) => reject(json));
        }
      })
      .catch(async (error) => {
        reject(error);
      });
  });
}
const Translate: FC = function () {
  const [chineseText, setChineseText] = useState<string>("");
  const [englishText, setEnglisgText] = useState("");
  const [translateList, setTranslateList] = useState([
    {
      role: "user",
      content: "帮我用英文翻译一下下面这段话",
    },
  ]);
  const getTranslate = async function () {
    setTranslateList(
      translateList.concat([
        {
          role: "user",
          content: chineseText,
        },
      ])
    );
    let { data }: any = await getFetch(
      "https://15w3mfnipx.hk.aircode.run/hello",
      {
        messages: translateList,
      }
    );
    setEnglisgText(data.choices[0].message.content);
  };

  return (
    <div className="translate">
      <p>translate</p>
      <textarea
        className="my_textarea"
        onChange={(val) => setChineseText(val.target.value)}
      ></textarea>
      <div className="translate_btn" onClick={getTranslate}>
        <Exchange color="#fff" fontSize="30px" rotate={90} />
      </div>
      <textarea className="my_textarea" readOnly value={englishText}></textarea>
    </div>
  );
};

export default Translate;
