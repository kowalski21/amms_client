import {
  Message,
  useToaster,
  ButtonToolbar,
  SelectPicker,
  Button,
  toaster,
} from "rsuite";

export const useNotify = () => {
  const message = (msg, type) => {
    return (
      <Message showIcon type={type}>
        {msg}
      </Message>
    );
  };

  const showError = (msg) => {
    toaster.push(message(msg, "error"), {
      placement: "topEnd",
      duration: 5000,
    });
  };
  const showMsg = (msg) => {
    toaster.push(message(msg, "success"), {
      placement: "topEnd",
      duration: 5000,
    });
  };

  return { showError, showMsg };
};
