import { FC, useEffect, useRef, useState } from "react";
import { Button, Loading, PullRefresh, Typography } from "react-vant";
type Msg = {
  createdAt: string;
  msg: string;
  num: number;
  updatedAt: string;
  _id: string;
};
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
const MsgList: FC = function () {
  const [list, setList] = useState<Msg[]>([]);
  const pageNum = useRef(1);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      let { result }: any = await getFetch(
        "https://15w3mfnipx.hk.aircode.run/msglist",
        {
          pageNum: pageNum.current,
          pageSize: 10,
        }
      );
      setList(result);
      setLoading(true);
    })();
  }, []);
  const handleMore = async () => {
    pageNum.current += 1;
    let { result }: any = await getFetch(
      "https://15w3mfnipx.hk.aircode.run/msglist",
      {
        pageNum: pageNum.current,
        pageSize: 10,
      }
    );
    if (result.length == 0) {
      setShow(false);
      return;
    }
    setList(list.concat(result));
  };
  const onRefresh = () => {
    return new Promise(async (resolve) => {
      pageNum.current = 1;
      setLoading(false);
      setShow(true);
      let { result }: any = await getFetch(
        "https://15w3mfnipx.hk.aircode.run/msglist",
        {
          pageNum: pageNum.current,
          pageSize: 10,
        }
      );
      setList(result);
      setLoading(true);
      resolve(true);
    });
  };
  return (
    <div className="msglist_app">
      <PullRefresh
        style={{ height: "100%", overflowY: "scroll" }}
        onRefresh={() => onRefresh()}
        onRefreshEnd={() => console.log("onRefreshEnd")}
      >
        {loading ? (
          list.map((item: Msg) => (
            <div key={item._id}>
              <div className="msg_list">
                <Typography.Text
                  ellipsis={{
                    rows: 2,
                    collapseText: "收起",
                    expandText: "展开",
                  }}
                >
                  {item.msg}
                </Typography.Text>
                <div>检索次数：{item.num}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="loading_div">
            <Loading type="ball" />
          </div>
        )}
        {loading ? (
          <div className="getMore">
            {show ? (
              <Button size="mini" type="primary" onClick={handleMore}>
                加载更多{show}
              </Button>
            ) : (
              <div>没有更多了</div>
            )}
          </div>
        ) : (
          ""
        )}
      </PullRefresh>
    </div>
  );
};

export default MsgList;
