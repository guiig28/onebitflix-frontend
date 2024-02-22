import profileService from "@/src/services/profileService";
import styles from "@/styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import ToastComponent from "../../common/toast";
import { useRouter } from "next/router";

const UserForm = function () {
  const router = useRouter();

  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [changeEmail, setChangeEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const date = new Date(createdAt);
  const month = date.toLocaleDateString("default", { month: "long" });

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      setEmail(user.email);
      setChangeEmail(user.email);
      setCreatedAt(user.createdAt);
    });
  }, []);

  const handleUserUpdate = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const res = await profileService.userUpdate({
      firstName,
      lastName,
      phone,
      email,
      createdAt,
    });

    if (res === 200 && email === changeEmail) {
      setToastIsOpen(true);
      setErrorMessage("Dados alterados com sucesso!");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    } else if (res === 200 && email !== changeEmail) {
      setToastIsOpen(true);
      setErrorMessage(
        "Dados alterados com sucesso, mas será necessário fazer login novamente."
      );
      setColor("bg-warning");
      setTimeout(() => {
        setToastIsOpen(false);
        sessionStorage.clear();
        router.push("/login");
      }, 1000 * 3);
    } else {
      setToastIsOpen(true);
      setErrorMessage("Você não pode mudar para esse email!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form onSubmit={handleUserUpdate} className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>
            {firstName.slice(0, 1)}
            {lastName.slice(0, 1)}
          </p>
          <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="iconProfile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br />
            {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
          </p>
        </div>

        <hr />

        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Qual o seu primeiro nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Qual o seu último nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
          </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP / TELEGRAM
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="(xx) 9xxxx-xxxx"
              required
              className={styles.input}
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Coloque o seu email"
              required
              className={styles.input}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </FormGroup>

          <Button type="submit" className={styles.formBtn} outline>
            Salvar Alterações
          </Button>
        </div>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
};

export default UserForm;
