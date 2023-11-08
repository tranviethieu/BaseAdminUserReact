import styles from "./TextEdit.module.scss";
import { PropsTextEdit } from "./interfaces";
import { useContext, useRef, useState } from "react";
import { ContextData } from "../Input/interfaces";
import { FormContext } from "../../contexts";
import ContentEditable from "react-contenteditable";
import { useStyleClass } from "~/common/hooks/usStyleClass";
import clsx from "clsx";

function TextEdit({ name, className, ...props }: PropsTextEdit) {
  const ref = useRef();
  const styleClass = useStyleClass(props, styles);
  const data = useContext<ContextData>(FormContext);

  const handleChange = (e: any) => {
    const { value } = e.target;

    data.setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ContentEditable
      innerRef={ref.current}
      disabled={false}
      onChange={handleChange}
      html={data.form[name] || ""}
      placeholder={props.placeholder}
      className={clsx(styleClass, styles.container, className)}
    />
  );
}

export default TextEdit;
