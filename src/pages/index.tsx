import { createContext, FC, useContext, useEffect, useState } from "react";
import { Dialog, Typography } from "react-vant";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Replay } from "@react-vant/icons";
import chatlogo from "../assets/ChatGPT.png";
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});
let Context = createContext(0);
interface CategoryItem {
  category_id?: number;
  content: string;
  id?: number;
  sort?: number;
}
interface ChatDetails {
  changeState: any;
}
interface MarkedHljs {
  msg: any;
}
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
const Index: FC = function () {
  const [state, setState] = useState(0);
  const changeState = () => {
    setState(state + 1);
  };
  return (
    <Context.Provider value={state}>
      <div className="chat_index">
        <ChatDetail changeState={changeState}></ChatDetail>
        <HotList></HotList>
        <MsgList></MsgList>
      </div>
    </Context.Provider>
  );
};
const ChatDetail: FC<ChatDetails> = function (props) {
  const handleClick = function () {
    props.changeState();
  };
  return (
    <div className="chat_details">
      <div className="title">
        <img src={chatlogo} alt="" />
        <div>ChatGpt</div>
      </div>
      <div className="update">
        <div></div>
        <div>你可以试着这样问我</div>
        <div onClick={handleClick}>
          换一换
          <Replay />
        </div>
      </div>
    </div>
  );
};
const HotList: FC = function () {
  const [list, setList] = useState([]);
  const count = useContext(Context);
  useEffect(() => {
    if (count < 5) {
      (async () => {
        let { data }: any = await getFetch(
          "https://15w3mfnipx.hk.aircode.run/category"
        );
        let listLength = data.length;
        let arr: any = [];
        for (let index = 0; index < 6; index++) {
          let num = Math.floor(Math.random() * listLength);
          arr.push(data[num]);
        }
        setList(arr);
      })();
    } else {
      Dialog.show({
        title: "提示",
        message: "操作频繁",
      });
    }
  }, [count]);
  return (
    <div className="hot_list">
      {list.map((item: CategoryItem) => (
        <div className="hot_list_item" key={item.id}>
          <Typography.Text ellipsis={2}>{item.content}</Typography.Text>
        </div>
      ))}
    </div>
  );
};
const MsgList: FC = function () {
  const [msgList, setMsgList] = useState([
    {
      role: "user",
      content: "怎么能花最少的钱买房？",
    },
    {
      role: "assistant",
      content:
        "以下是一些可能能帮助您花最少的钱买房的建议：\n\n1. 了解当地房地产市场。了解当地的房地产市场并确定您想要的房子类型和价格范围。这很重要，因为不同的地区具有不同的价格点。\n\n2. 尽早储蓄。 提前储蓄，以便有足够的首付款。如果您能够全款购买房子，那么您可以省去贷款利息和抵押保险费用。\n\n3. 选择合适的地点。 要减少购房成本，可以考虑选择较偏远的郊区或地区。这样可以更容易找到价格较便宜且满足需求的房子。\n\n4. 找出令人满意的房子。要花最少的钱买房，需要找到满足需求的房子。必须确定您所需的房间大小和其他必要因素，例如靠近学校和运输的距离以及其他特殊需求和要求。\n\n5. 在房屋质量和价格之间做出权衡。更便宜的房子不一定意味着更好的买卖，因此您必须找到一个可以与质量和价格之间达到平衡的房子。\n\n6. 寻找特别优惠。可以寻找可能提供特别优惠（例如优惠券、节省抵押利率等）的开发商或房地产经纪人等相关方。\n\n7. 谈判。最后，一定要展现出你的谈判技巧，争取到最适合自己的价格，或者有一些可能会以更低的价格出售房子的房主。\n\n需要注意的是，购房是一项长期决策，不要只看价格，而应考虑自己和家人的需求和未来规划。",
    },
    {
      role: "user",
      content: "好滴",
    },
    {
      role: "assistant",
      content: "如果您还有其他需要帮助的问题，请随时联系我！",
    },
    {
      role: "assistant",
      content:
        "在 Node.js 中，可以使用 `jsonwebtoken` 模块来进行 JWT 的校验。\n\n1. 安装 `jsonwebtoken` 模块：\n\n```bash\nnpm install jsonwebtoken --save\n```\n\n2. 在代码中引入模块：\n\n```javascript\nconst jwt = require('jsonwebtoken');\n```\n\n3. 使用 `jwt.verify()` 方法来校验 JWT：\n\n```javascript\nconst token = '*********'; // 待校验的 JWT\nconst secretKey = '******'; // JWT 签名的密钥\n\njwt.verify(token, secretKey, function (err, decoded) {\n  if (err) {\n    // JWT 校验失败，处理错误\n    console.log('JWT 校验失败：', err.message);\n  } else {\n    // JWT 校验成功，decoded 中包含 JWT 中的数据\n    console.log('JWT 校验成功：', decoded);\n  }\n});\n```\n\n说明：\n\n- `jwt.verify()` 方法用于校验 JWT，第一个参数是待校验的 JWT，第二个参数是 JWT 签名的密钥，第三个参数是回调函数；\n- 如果 JWT 校验成功，回调函数的第二个参数 `decoded` 中包含了 JWT 中编码的数据；\n- 如果 JWT 校验失败，回调函数的第一个参数 `err` 中包含了错误信息。\n\n需要注意的是，在进行 JWT 校验时，一定要保证密钥与原 JWT 签名的密钥是一致的，否则校验会失败。",
    },
  ]);
  const sendMsg = async function () {
    let { data }: any = await getFetch(
      "https://15w3mfnipx.hk.aircode.run/hello",
      {
        messages: msgList,
      }
    );
    setMsgList([msgList, ...data.choices[0].message]);
  };
  return (
    <>
      {msgList.map((item, index) => (
        <div key={index} className={item.role == "user" ? "user" : "assistant"}>
          <img
            src={
              item.role == "user"
                ? "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                : chatlogo
            }
            alt=""
          />
          <MarkedHighlight msg={item.content}></MarkedHighlight>
        </div>
      ))}
    </>
  );
};

const MarkedHighlight: FC<MarkedHljs> = function (props: any) {
  return (
    <div
      className="hljs"
      dangerouslySetInnerHTML={{
        __html: marked(props.msg).replace(/<pre>/g, "<pre class='hljs'>"),
      }}
    ></div>
  );
};
export default Index;
