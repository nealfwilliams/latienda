import { Column } from "@/baseComponents"

export const MaxWidth = ({ children }: any) => {
  return (
    <Column sx={{width: '100vw'}} align="center">
      <Column sx={{maxWidth: '1000px', width: '100%', px: 4}}>
        {children}
      </Column>
    </Column>
  )
}