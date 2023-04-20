import { FC, useEffect, useRef, useState } from "react";
import { hooks, Input } from "react-vant";
import { pinyin } from "pinyin-pro";
import HanziWriter from "hanzi-writer";
interface State {
  text: string;
  brcolor: string;
  chinese: string[];
}
const Pinyin: FC = function () {
  const zhong = useRef<any>();
  const guo = useRef<any>();
  const [state, updateState] = hooks.useSetState<State>({
    text: "",
    brcolor: "#ddd",
    chinese: [],
  });
  useEffect(() => {
    if (state.text == "") {
      updateState({ chinese: [] });
    }
  }, [state.text]);
  let [char1, setChar1] = useState<any>();
  let [char2, setChar2] = useState<any>();
  const infoChar1 = useRef<any>();
  const infoChar2 = useRef<any>();
  useEffect(() => {
    infoChar1.current = char1;
    infoChar2.current = char2;
    getannimate();
  }, [char2]);
  const inithanzi = () => {
    setChar1(
      HanziWriter.create(zhong.current, "汉", {
        width: 100,
        height: 100,
        padding: 5,
        strokeAnimationSpeed: 5, // 5x normal speed
        delayBetweenStrokes: 10, // milliseconds
      })
    );
    setChar2(
      HanziWriter.create(guo.current, "字", {
        width: 100,
        height: 100,
        padding: 5,
        strokeAnimationSpeed: 5, // 5x normal speed
        delayBetweenStrokes: 10, // milliseconds
      })
    );
  };
  const getannimate = () => {
    if (infoChar2.current) {
      let delayBetweenAnimations = 0; // milliseconds
      infoChar1.current.hideCharacter();
      infoChar2.current.hideCharacter();
      infoChar1.current.animateCharacter({
        onComplete: function () {
          setTimeout(function () {
            infoChar2.current.animateCharacter();
          }, delayBetweenAnimations);
        },
      });
    }
  };
  useEffect(() => {
    inithanzi();
  }, []);
  const onKeyup = (e: any) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };
  const handleClick = () => {
    let newText = state.text.replace(/[u4e00-u9fa5|,]+/gi, "");
    if (newText == "") {
      updateState({ chinese: [], text: "" });
      return;
    }
    let chinese = pinyin(newText, { type: "array" });
    updateState({ text: newText, chinese });
    getannimate();
  };
  return (
    <div className="pinyin">
      <div className="zhongguo">
        <div ref={zhong}></div>
        <div ref={guo}></div>
      </div>
      <div className="ch-input" style={{ borderColor: state.brcolor }}>
        <Input
          value={state.text}
          onFocus={() => updateState({ brcolor: "#3f45ff" })}
          onBlur={() => updateState({ brcolor: "#ddd" })}
          onChange={(text) => updateState({ text })}
          onKeyUp={onKeyup}
          clearable
          placeholder="请输入文本回车查询"
        />
      </div>
      <div className="ch-list">
        {state.chinese.map((e, i) => (
          <div className="china" key={i}>
            <div className="pinyins">{e}</div>
            <div className="hanzi">{state.text.split("")[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pinyin;
