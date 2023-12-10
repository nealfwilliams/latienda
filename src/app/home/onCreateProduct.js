export const onCreateProduct = ({
  metamask,
  product
}) => {
  const { sdk, account, chainId } = metamask

  console.log(product, sdk, account, chainId)

  // Gavin code goes here
}