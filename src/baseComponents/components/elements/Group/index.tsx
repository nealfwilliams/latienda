/** @jsxImportSource theme-ui */
import React, { useEffect, useMemo, useRef } from 'react'
import { useEnvironment } from '../../providers/env'
import { StyledElementProps } from '../../../theme'

type GroupContextType = {
  level: number
  labelId: string
  trackHeadingRendered: () => void
  labelTargetId: string
  type?: GROUP_TYPE
}

export enum GROUP_TYPE {
  REGION = 'region',
  GROUP = 'group',
  RAW = 'raw',
}

const GROUP_TYPE_ROLE_MAP = {
  [GROUP_TYPE.REGION]: 'region',
  [GROUP_TYPE.GROUP]: 'group',
  [GROUP_TYPE.RAW]: 'group',
}

const GroupContext = React.createContext<GroupContextType>({
  level: 0,
  labelId: '',
  labelTargetId: '',
  trackHeadingRendered: () => {},
})

export const useGroup = () => React.useContext(GroupContext)

type GroupProps = Omit<
  StyledElementProps<
    HTMLDivElement,
    {
      type?: GROUP_TYPE
    }
  >,
  'children'
> & {
  children: React.ReactNode | ((context: GroupContextType) => React.ReactNode)
}

export const Group: React.FC<GroupProps> = ({
  type: typeProp,
  children,
  sx,
  ...rest
}) => {
  const { level: parentLevel } = useGroup()
  const { flagInDevelopment } = useEnvironment()

  const type = typeProp || GROUP_TYPE.REGION

  const randomSlug = useMemo(() => Math.random().toString().slice(2), [])
  const labelId = `group-label-${randomSlug}`
  const labelTargetId = `labeled-${randomSlug}`

  const headingRenderTracker = useRef({
    hasHeadingRendered: false,
  })

  const trackHeadingRendered = () => {
    headingRenderTracker.current.hasHeadingRendered = true
  }

  useEffect(() => {
    if (type === GROUP_TYPE.REGION) {
      setTimeout(() => {
        if (!headingRenderTracker.current.hasHeadingRendered) {
          flagInDevelopment(
            'Every <Group> component of type "region" must render a <Heading> component within it',
          )
        }
      }, 500)
    }
  }, [flagInDevelopment, type])

  const level = Math.min(parentLevel + (type === GROUP_TYPE.REGION ? 1 : 0), 5)

  const contextValue = {
    level,
    type,
    trackHeadingRendered,
    labelId,
    labelTargetId,
  }

  const Main = (
    <GroupContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </GroupContext.Provider>
  )

  if (type === GROUP_TYPE.RAW) {
    return Main
  }

  return (
    <div
      role={GROUP_TYPE_ROLE_MAP[type]}
      aria-labelledby={labelId}
      sx={{
        my: 2,
        ...sx,
      }}
      {...rest}
    >
      {Main}
    </div>
  )
}
