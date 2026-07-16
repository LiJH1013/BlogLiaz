"use client";

import { FormEvent, PointerEvent, useRef, useState } from "react";
import styles from "./hello.module.css";

const topics = [
  { id: "frontend", label: "前端", mark: "</>" },
  { id: "crawler", label: "爬虫", mark: "◎" },
  { id: "ai", label: "AI", mark: "✦" },
  { id: "life", label: "生活", mark: "□" },
] as const;

type Topic = typeof topics[number]["id"];
type ActiveField = "name" | "age" | "message" | null;

export function HelloClient() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState<Topic>("frontend");
  const [activeField, setActiveField] = useState<ActiveField>(null);
  const [generated, setGenerated] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const pointerFrame = useRef<number | null>(null);

  const ageNumber = Number(age);
  const ageIsValid = /^\d{1,3}$/.test(age) && ageNumber >= 1 && ageNumber <= 120;
  const ageHasError = age.length > 0 && !ageIsValid;
  const displayName = name.trim() || "匿名探索者";
  const topicLabel = topics.find((item) => item.id === topic)?.label ?? "前端";

  function updateEyes(event: PointerEvent<HTMLDivElement>) {
    if (!stageRef.current) return;
    const target = stageRef.current;
    const bounds = target.getBoundingClientRect();
    const x = Math.max(-10, Math.min(10, ((event.clientX - bounds.left) / bounds.width - 0.5) * 20));
    const y = Math.max(-7, Math.min(7, ((event.clientY - bounds.top) / bounds.height - 0.5) * 14));

    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      target.style.setProperty("--cursor-x", `${x.toFixed(2)}px`);
      target.style.setProperty("--cursor-y", `${y.toFixed(2)}px`);
    });
  }

  function resetEyes() {
    const target = stageRef.current;
    if (!target) return;
    target.style.setProperty("--cursor-x", "0px");
    target.style.setProperty("--cursor-y", "0px");
  }

  function selectTopic(nextTopic: Topic) {
    setTopic(nextTopic);
    setGenerated(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ageHasError) {
      setActiveField("age");
      ageRef.current?.focus();
      return;
    }
    setGenerated(true);
    setActiveField(null);
  }

  return (
    <section className={styles.visitorDesk} aria-label="生成访客签">
      <form className={styles.visitorForm} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <span>01 / YOUR NOTE</span>
          <b aria-hidden="true">LIAZ</b>
        </div>

        <label className={styles.field} data-active={activeField === "name"}>
          <span><b>怎么称呼你</b><small>可选</small></span>
          <input
            autoComplete="nickname"
            maxLength={24}
            onBlur={() => setActiveField(null)}
            onChange={(event) => { setName(event.target.value); setGenerated(false); }}
            onFocus={() => setActiveField("name")}
            placeholder="匿名也完全可以"
            type="text"
            value={name}
          />
        </label>

        <label className={styles.field} data-active={activeField === "age"} data-error={ageHasError}>
          <span><b>你的年龄</b><small>不会保存</small></span>
          <input
            aria-describedby="age-note"
            aria-invalid={ageHasError}
            inputMode="numeric"
            maxLength={3}
            onBlur={() => setActiveField(null)}
            onChange={(event) => { setAge(event.target.value.replace(/[^0-9]/g, "")); setGenerated(false); }}
            onFocus={() => setActiveField("age")}
            placeholder="输入后，看看右边"
            ref={ageRef}
            type="text"
            value={age}
          />
          <em id="age-note">{ageHasError ? "请输入 1 到 120 之间的数字" : "只用来触发纸片人的反应"}</em>
        </label>

        <fieldset className={styles.topicField}>
          <legend>你最近在关注什么</legend>
          <div>
            {topics.map((item) => (
              <button
                aria-pressed={topic === item.id}
                key={item.id}
                onClick={() => selectTopic(item.id)}
                type="button"
              >
                <span aria-hidden="true">{item.mark}</span>{item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className={styles.field} data-active={activeField === "message"}>
          <span><b>留下一句话</b><small>{message.length}/120</small></span>
          <textarea
            maxLength={120}
            onBlur={() => setActiveField(null)}
            onChange={(event) => { setMessage(event.target.value); setGenerated(false); }}
            onFocus={() => setActiveField("message")}
            placeholder="最近在解决什么问题？"
            rows={3}
            value={message}
          />
        </label>

        <button className={styles.generateButton} type="submit">
          <span>{generated ? "重新盖章" : "生成访客签"}</span>
          <b aria-hidden="true">↗</b>
        </button>
      </form>

      <div
        className={styles.characterStage}
        data-focus={activeField ?? "idle"}
        data-generated={generated}
        data-topic={topic}
        onPointerLeave={resetEyes}
        onPointerMove={updateEyes}
        ref={stageRef}
      >
        <div className={styles.stageLabel}><span>02 / LIAZ IS WATCHING</span><i aria-hidden="true" /></div>
        <svg className={styles.paperPerson} viewBox="0 0 520 560" role="img" aria-label="会看向输入框并根据内容做出反应的纸片人 LIAZ">
          <g className={styles.confetti} aria-hidden="true">
            <rect x="82" y="98" width="20" height="8" />
            <rect x="423" y="120" width="8" height="24" />
            <path d="M58 245l22-12 8 19-24 7z" />
            <path d="M428 310l27 5-7 20-24-10z" />
            <circle cx="111" cy="425" r="9" />
            <circle cx="443" cy="438" r="7" />
          </g>

          <rect className={styles.bodyShadow} x="132" y="183" width="280" height="302" />
          <path className={styles.bodyPaper} d="M112 161h280l20 23v300H132l-20-22z" />
          <path className={styles.paperFold} d="M392 161v25h20" />

          <g className={styles.headGroup}>
            <rect className={styles.headShadow} x="139" y="64" width="248" height="208" />
            <path className={styles.headPaper} d="M122 46h244l21 22v204H143l-21-19z" />
            <rect className={styles.tape} x="212" y="36" width="70" height="24" />

            <path className={styles.eyebrowLeft} d="M171 119l54-9" />
            <path className={styles.eyebrowRight} d="M285 110l54 9" />
            <g className={`${styles.eye} ${styles.eyeLeft}`}>
              <ellipse cx="202" cy="158" rx="39" ry="31" />
              <circle className={styles.pupil} cx="202" cy="158" r="13" />
              <circle className={styles.eyeShine} cx="208" cy="151" r="4" />
            </g>
            <g className={`${styles.eye} ${styles.eyeRight}`}>
              <ellipse cx="309" cy="158" rx="39" ry="31" />
              <circle className={styles.pupil} cx="309" cy="158" r="13" />
              <circle className={styles.eyeShine} cx="315" cy="151" r="4" />
            </g>
            <path className={styles.mouthIdle} d="M229 218c19 12 40 12 59 0" />
            <path className={styles.mouthWow} d="M243 220c0-17 31-17 31 0s-31 17-31 0z" />
            <path className={styles.mouthSmile} d="M222 212c24 29 51 29 75 0" />
          </g>

          <path className={styles.armLeft} d="M134 286c-43 10-55 46-24 77" />
          <path className={styles.armRight} d="M392 281c47 4 59 42 32 78" />
          <circle className={styles.handLeft} cx="111" cy="369" r="16" />
          <circle className={styles.handRight} cx="421" cy="365" r="16" />

          <g className={styles.frontendProp} aria-hidden="true">
            <rect x="155" y="317" width="212" height="62" />
            <path d="M195 339l-17 10 17 10M325 339l17 10-17 10M274 332l-23 34" />
          </g>
          <g className={styles.crawlerProp} aria-hidden="true">
            <circle cx="261" cy="346" r="31" />
            <path d="M239 325l-28-24M283 325l28-24M231 347h-39M291 347h39M239 369l-28 24M283 369l28 24M261 315v62" />
          </g>
          <g className={styles.aiProp} aria-hidden="true">
            <path d="M261 299l13 35 35 13-35 13-13 35-13-35-35-13 35-13z" />
            <rect x="188" y="312" width="13" height="13" />
            <rect x="320" y="377" width="11" height="11" />
          </g>
          <g className={styles.lifeProp} aria-hidden="true">
            <rect x="194" y="305" width="135" height="91" />
            <circle cx="228" cy="336" r="13" />
            <path d="M205 380l34-30 23 19 19-13 36 24" />
          </g>

          <text className={styles.liazMark} x="260" y="438" textAnchor="middle">LIAZ</text>
          <g className={styles.stamp} aria-hidden="true">
            <circle cx="348" cy="423" r="55" />
            <circle cx="348" cy="423" r="46" />
            <text x="348" y="418" textAnchor="middle">VISITOR</text>
            <text x="348" y="438" textAnchor="middle">APPROVED</text>
          </g>
        </svg>

        <div className={styles.characterCaption} aria-live="polite">
          <span>{generated ? "访客签已盖章" : activeField === "age" ? "等一下，让我看清楚" : "纸片人正在值班"}</span>
          <strong>{generated ? displayName : ageIsValid ? `${ageNumber} 岁的探索者` : topic === "life" ? "偶尔也要看看生活" : `正在关注${topicLabel}`}</strong>
          <p>{generated ? (message.trim() || `今天来野路子手记逛了逛，最近关注${topicLabel}。`) : "移动鼠标，它会看向你；聚焦年龄输入框，眼睛会明显放大。"}</p>
        </div>
      </div>
    </section>
  );
}
