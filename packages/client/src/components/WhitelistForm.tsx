import { useState } from "react";
import { utils } from "ethers";
import { Segment, Grid, Header, Input } from "semantic-ui-react";

import { AddButton } from "./AddButton";
import { VerificationButton } from "./VerificationButton";

export const WhitelistForm = () => {
  const [address, setAddress] = useState<string>("");
  const isAddressValid = utils.isAddress(address);

  const reset = () => setAddress("");
  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <Segment padded>
      <Header>
        Hello Admin 👋! Please, use this form to interact with whitelist
        contract
      </Header>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={16}>
            <Input
              placeholder="Enter address here"
              onChange={changeAddress}
              value={address}
              size="huge"
              fluid
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <AddButton
              onSuccess={reset}
              disabled={!isAddressValid}
              address={address}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <VerificationButton disabled={!isAddressValid} address={address} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
