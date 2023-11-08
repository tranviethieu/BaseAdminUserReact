import styles from "./CheckBox.module.scss";

interface PropsCheckBox {
  onChange: (data: any) => void;
  checked?: boolean;
  name?: any;
}

function CheckBox({ onChange, checked, name }: PropsCheckBox) {
  return (
    <div className={styles.container}>
      <input
        name={name}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <span className={styles.checkmark}></span>
    </div>
  );
}

export default CheckBox;
