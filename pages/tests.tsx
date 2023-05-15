
//////////////////////////////////////////////////////get object attributes///////////////////////////////////////////
// import { JsonRpcProvider } from '@mysten/sui.js';
// const provider = new JsonRpcProvider();
// const objects = await provider.getObject(
//   '982e4ad7844f702c4000344cd236dc024bd849a5',
// );

// console.log(objects)
//////////////////////////////////////////////////////get object attributes///////////////////////////////////////////

import { useCallback } from 'react'
import { ethos } from 'ethos-connect'

function Test() {
  const contractAddress = '0xbab38c12704a07b3c4c2cbd066e550f33165549b'
  const { wallet } = ethos.useWallet()

  const mint = useCallback(async () => {
    if (!wallet) return

    try {
      const signableTransaction = {
        kind: 'moveCall' as const,
        data: {
          packageObjectId: contractAddress,
          module: 'clock',
          function: 'get_time',
          typeArguments: [],
          arguments: [],
          gasBudget: 10000,
        },
      }

      // wallet.signAndExecuteTransaction(signableTransaction)
    } catch (error) {
      console.log(error)
    }
  }, [wallet])

  return <>...</>
}

export default Test
