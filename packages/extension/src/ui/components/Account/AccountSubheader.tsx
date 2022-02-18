import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { FC } from "react"
import styled from "styled-components"

import { getNetwork } from "../../../shared/networks"
import { AccountStatus } from "../../utils/accounts"
import { formatAddress, truncateAddress } from "../../utils/addresses"
import { CopyTooltip } from "../CopyTooltip"
import { EditableHeader } from "../EditableHeader"
import {
  AccountAddressIconsWrapper,
  AccountAddressLink,
  AccountAddressWrapper,
} from "./Address"

const AccountStatusText = styled.p<{ color?: string }>`
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  text-align: center;
  margin-top: 6px;
  color: ${({ color }) => color};
`

const AccountName = styled(EditableHeader)`
  font-weight: 600;
  font-size: 32px;
  line-height: 38.4px;
  margin: 0;
`

interface AccountSubheaderProps {
  networkId: string
  status: AccountStatus
  accountName?: string
  accountAddress: string
  onChangeName: (name: string) => void
}

export const AccountSubHeader: FC<AccountSubheaderProps> = ({
  networkId,
  status,
  accountAddress,
  onChangeName,
  accountName,
}) => (
  <>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          alignSelf: "center",
          width: 200,
        }}
      >
        <AccountName
          value={accountName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeName(e.target.value)
          }
        />
      </div>
      {status.code !== "CONNECTED" && status.code !== "DEFAULT" && (
        <AccountStatusText color={status.code === "ERROR" ? "red" : undefined}>
          {status.text}
        </AccountStatusText>
      )}
    </div>
    <AccountAddressWrapper>
      <AccountAddressLink
        href={`${getNetwork(networkId).explorerUrl}/contract/${accountAddress}`}
        target="_blank"
      >
        {truncateAddress(accountAddress)}
        <OpenInNewIcon style={{ fontSize: 10 }} />
      </AccountAddressLink>
      <CopyTooltip copyValue={formatAddress(accountAddress)} message="Copied!">
        <AccountAddressIconsWrapper>
          <ContentCopyIcon style={{ fontSize: 12 }} />
        </AccountAddressIconsWrapper>
      </CopyTooltip>
    </AccountAddressWrapper>
  </>
)