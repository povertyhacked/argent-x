import { useEffect, useMemo } from "react"

import { updateBaseMultisigAccount } from "../../../../shared/multisig/store"
import { BaseWalletAccount } from "../../../../shared/wallet.model"
import { Multisig } from "../Multisig"
import { useMultisigWalletAccount } from "../multisig.state"
import { useMultisigDataForSigner } from "./useMultisigDataForSigner"
import { MultisigStatus, useMultisigStatus } from "./useMultisigStatus"

export interface IMultisigInfo {
  multisig?: Multisig
  status: MultisigStatus
}

export function useMultisigInfo(account: BaseWalletAccount): IMultisigInfo {
  const multisigAccount = useMultisigWalletAccount(account)
  const { data: multisigData } = useMultisigDataForSigner(account)
  const multisigStatus = useMultisigStatus(account)

  useEffect(() => {
    if (!multisigAccount || !multisigData) {
      return
    }
    updateBaseMultisigAccount({
      address: multisigAccount.address,
      networkId: multisigAccount.networkId,
      signers: multisigData.signers,
      threshold: multisigData.threshold,
      creator: multisigData.creator,
    })
  }, [multisigAccount, multisigData, multisigStatus])

  return useMemo(() => {
    if (!multisigAccount) {
      return {
        status: multisigStatus,
        multisig: undefined,
      }
    }

    return {
      status: multisigStatus,
      multisig: new Multisig({ ...multisigAccount, ...multisigData }),
    }
  }, [multisigAccount, multisigData, multisigStatus])
}