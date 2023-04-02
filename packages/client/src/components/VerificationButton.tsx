import { useEffect, useMemo, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";

import WhitelistContract from "../contracts/whitelist";

export interface Props {
  address: string;
  disabled?: boolean;
}

export const VerificationButton = ({ address, disabled }: Props) => {
  const [verified, setVerified] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => setChecked(false);
  const verify = async () => {
    setLoading(true);
    try {
      setVerified(await WhitelistContract.verify(address));
      setChecked(true);
    } catch (err) {
      toast(`Unexpected error: ${err}`, { type: "error" });
    }
    setLoading(false);
  };

  const buttonViewState = useMemo((): {
    icon: JSX.Element | null;
    text: string;
  } => {
    if (loading) return { icon: null, text: "Verifying" };
    if (!checked) return { icon: null, text: "Verify" };
    if (verified)
      return {
        icon: <Icon color="green" name="check circle" />,
        text: "Whitelisted",
      };
    return {
      icon: <Icon color="red" name="close" />,
      text: "Not whitelisted",
    };
  }, [loading, checked, verified]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Button
      onClick={verify}
      size="huge"
      loading={loading}
      secondary
      fluid
      disabled={disabled || checked}
    >
      {buttonViewState.text} {buttonViewState.icon}
    </Button>
  );
};
