import { FC, useEffect, useRef, useState } from "react";
import { Exchange, Description } from "@react-vant/icons";
import { Button, Loading, Toast } from "react-vant";

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
  const [loading, setLoading] = useState(false);
  const [translateList, setTranslateList] = useState([
    {
      role: "user",
      content: "帮我用英文翻译一下下面这段话",
    },
  ]);
  const translateListRef = useRef<any>();
  useEffect(() => {
    translateListRef.current = translateList;
  }, [translateList]);
  const getTranslate = async function () {
    var thenable = {
      then: function (resolve: any) {
        if (chineseText.trim() == "") {
          throw new Error("不能为空");
        } else {
          resolve();
        }
      },
    };
    Promise.resolve(thenable)
      .then(() => {
        setLoading(true);
        setTranslateList([
          {
            role: "user",
            content: "帮我用英文翻译一下下面这段话",
          },
          {
            role: "user",
            content: chineseText,
          },
        ]);
      })
      .then(async () => {
        let { data }: any = await getFetch(
          "https://15w3mfnipx.hk.aircode.run/hello",
          {
            messages: translateListRef.current,
          }
        );
        setEnglisgText(data.choices[0].message.content);
        setLoading(false);
      });
  };
  const engRef = useRef<any>();
  const theCopy = () => {
    engRef.current.select();
    document.execCommand("copy");
    Toast.info("success");
  };
  return (
    <div className="translate">
      <p>translate</p>
      <textarea
        placeholder="请输入需要翻译的中文"
        className="my_textarea"
        onChange={(val) => setChineseText(val.target.value)}
      ></textarea>
      {loading ? (
        <Loading type="ball" />
      ) : (
        <div className="translate_btn" onClick={getTranslate}>
          <Exchange color="#fff" fontSize="30px" rotate={90} />
        </div>
      )}
      <textarea
        ref={engRef}
        className="my_textarea"
        readOnly
        value={englishText}
      ></textarea>
      {englishText != "" ? (
        <Button
          style={{ margin: "10px 0" }}
          type="primary"
          onClick={theCopy}
          icon={<Description />}
        >
          copy
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Translate;
