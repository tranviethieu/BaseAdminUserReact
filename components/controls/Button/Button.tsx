import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";
import { useStyleClass } from "~/common/hooks/usStyleClass";

interface props {
  onClick?: () => void;
  children?: React.ReactNode;
  href?: string;
  notButton?: boolean;
  [props: string]: any;
}

function Button({
  children,
  onClick,
  href,
  className,
  target,
  notButton,
  ...props
}: props): JSX.Element {
  const styleClass = useStyleClass(props, styles);

  let onClickHandler = null;

  let Wapper: any = notButton ? "div" : "button";
  let Comp: any = "div";

  if (href) {
    Wapper = Link;
    Comp = "a";
  }

  const handleClick = (e: any) => {
    if (props.disable) {
      e.preventDefault();
    }

    if (!props.disable && onClick) {
      onClick();
    }
  };

  if (!href) {
    onClickHandler = {
      onClick: handleClick,
    };
  }

  return (
    <Wapper
      className={clsx(styles.container, {
        [styles.maxContent]: props.maxContent,
      })}
      href={href as string}
      {...onClickHandler}
    >
      <Comp className={clsx(styleClass, styles.btn, className)} target={target}>
        <div className={styles.text}>{children}</div>
      </Comp>
    </Wapper>
  );
}

export default Button;
