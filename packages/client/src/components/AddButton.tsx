import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";

import * as api from "../api";

export interface Props {
  address: string;
  disabled?: boolean;
  onSuccess: () => void;
}

export const AddButton = ({ address, disabled, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);

  const add = async () => {
    setLoading(true);
    try {
      await api.whitelist(address);
      toast(`Successfully whitelisted ${address}`, { type: "success" });
      onSuccess();
    } catch (err) {
      toast(`Unexpected api error: ${err}`, { type: "error" });
    }
    setLoading(false);
  };

  return (
    <Button
      disabled={disabled}
      loading={loading}
      onClick={add}
      size="huge"
      primary
      fluid
    >
      Whitelist
    </Button>
  );
};
