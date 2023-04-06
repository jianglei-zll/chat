import {
  createContext,
  FC,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, Dialog, Input, Loading, Typography } from "react-vant";
import { Replay } from "@react-vant/icons";
import chatlogo from "../assets/ChatGPT.png";
import MyReactMarkdown from "../components/MyReactMarkdown";
import { useNavigate } from "react-router-dom";
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
interface ChatMsgList {
  scrollToBottom: any;
  ref: any;
}
interface HotListType {
  selcetQuestion: any;
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
  const chatRef = useRef<any>(null);
  const scrollToBottom = () => {
    setTimeout(() => {
      // 计算滚动到底部的距离
      const scrollTop =
        chatRef.current.scrollHeight - chatRef.current.clientHeight;
      // 进行滚动
      chatRef.current.scrollTop = scrollTop;
    }, 50);
  };
  const selcetQuestion = (val: string) => {
    MsgListRef.current.setMsginfo(val);
  };
  const MsgListRef = useRef<any>(null);
  return (
    <Context.Provider value={state}>
      <div className="chat_index" ref={chatRef}>
        <ChatDetail changeState={changeState}></ChatDetail>
        <HotList selcetQuestion={selcetQuestion}></HotList>
        <MsgList scrollToBottom={scrollToBottom} ref={MsgListRef}></MsgList>
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
const HotList: FC<HotListType> = function (props) {
  const [list, setList] = useState([]);
  const count = useContext(Context);
  useEffect(() => {
    if (count < 5) {
      setList([]);
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
  return list.length != 0 ? (
    <div className="hot_list">
      {list.map((item: CategoryItem) => (
        <div
          className="hot_list_item"
          key={item.id}
          onClick={() => {
            props.selcetQuestion(item.content);
          }}
        >
          <Typography.Text ellipsis={2}>{item.content}</Typography.Text>
        </div>
      ))}
    </div>
  ) : (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <Loading type="ball" />
      </div>
    </div>
  );
};
const MsgList: FC<ChatMsgList> = forwardRef((props, ref) => {
  const [msgList, setMsgList] = useState<Array<any>>([
    // {
    //   role: "assistant",
    //   content:
    //     "1. push/pop：向数组尾部添加/删除元素\n\n```javascript\nlet arr = [1, 2, 3];\narr.push(4); // [1, 2, 3, 4]\narr.pop();   // [1, 2, 3]\n```\n\n2. unshift/shift：向数组头部添加/删除元素\n\n```javascript\nlet arr = [1, 2, 3];\narr.unshift(0); // [0, 1, 2, 3]\narr.shift();    // [1, 2, 3]\n```\n\n3. splice：数组插入、删除、替换\n\n```javascript\nlet arr = [1, 2, 3, 4];\narr.splice(1, 2);          // [1, 4] （从索引1开始删除2个元素）\narr.splice(1, 0, 2, 3);    // [1, 2, 3, 4] （从索引1开始添加2、3）\narr.splice(1, 2, 'a', 'b'); // [1, 'a', 'b', 4]（从索引1开始删除2个元素，然后添加'a'和'b'）\n```\n\n4. slice：数组截取\n\n```javascript\nlet arr = [1, 2, 3, 4];\narr.slice(1);     // [2, 3, 4] （从索引1开始截取到末尾）\narr.slice(1, 3);  // [2, 3] （从索引1开始截取到索引3，不包括3）\narr.slice(-2);    // [3, 4] （从末尾开始截取2个元素）\n```\n\n5. concat：数组合并\n\n```javascript\nlet a = [1, 2, 3];\nlet b = [4, 5, 6];\na.concat(b); // [1, 2, 3, 4, 5, 6]\n```\n\n6. join/split：数组转换为字符串、字符串转换为数组\n\n```javascript\nlet arr = [1, 2, 3];\narr.join();   // '1,2,3'\narr.join('-'); // '1-2-3'\n\nlet str = '1,2,3';\nstr.split();   // ['1,2,3']\nstr.split(','); // [1, 2, 3]\n```\n\n7. filter：数组筛选\n\n```javascript\nlet arr = [1, 2, 3, 4, 5];\narr.filter(item => item % 2 === 0); // [2, 4]（筛选出偶数）\n```\n\n8. map：数组遍历与修改\n\n```javascript\nlet arr = [1, 2, 3];\narr.map(item => item * 2); // [2, 4, 6]\n```\n\n9. reduce：数组归并\n\n```javascript\nlet arr = [1, 2, 3];\narr.reduce((prev, current) => prev + current, 0); // 6（从0开始累加求和）\n```",
    // },
    // {
    //   role: "user",
    //   content: "好的，我知道了",
    // }
  ]);
  const [msginfo, setMsginfo] = useState("");
  const [loading, setLoading] = useState(false);
  const msgListRef = useRef<any>();
  useEffect(() => {
    msgListRef.current = msgList;
    props.scrollToBottom();
  }, [msgList]);
  const navigate = useNavigate();
  const sendMsg = async function () {
    var thenable = {
      then: function (resolve: any) {
        if (msginfo.trim() == "") {
          throw new Error("不能为空");
        } else if (msginfo.trim() == "0315") {
          navigate("/msgList");
        } else {
          resolve();
        }
      },
    };
    Promise.resolve(thenable)
      .then(() => {
        setMsgList(msgList.concat([{ role: "user", content: msginfo }]));
      })
      .then(async () => {
        setMsginfo("");
        setLoading(true);
        let { data }: any = await getFetch(
          "https://15w3mfnipx.hk.aircode.run/hello",
          {
            messages: msgListRef.current,
          }
        );
        setMsgList(msgListRef.current.concat([data.choices[0].message]));
        setLoading(false);
      });
  };
  useImperativeHandle(ref, () => ({ setMsginfo }));
  const hanledKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      sendMsg();
    }
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
          {/* <MarkedHighlight msg={item.content}></MarkedHighlight> */}
          <MyReactMarkdown content={item.content}></MyReactMarkdown>
        </div>
      ))}
      {loading ? (
        <div className="assistant">
          <img src={chatlogo} alt="" />
          <div
            style={{
              paddingLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Loading type="ball" />
            <div style={{ marginLeft: "5px" }}>AI正在全力加载</div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div style={{ height: "52px", width: "100%" }}>
        <div style={{ height: "52px", width: "100%" }}></div>
      </div>
      <div className="send_input">
        <Input
          value={msginfo}
          onChange={(text) => setMsginfo(text)}
          onKeyUp={hanledKeyUp}
          suffix={
            <Button
              loading={loading}
              size="small"
              type="primary"
              onClick={sendMsg}
            >
              发送
            </Button>
          }
          placeholder="请输入"
        />
      </div>
    </>
  );
});
export default Index;
