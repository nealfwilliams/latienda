import React from 'react'
import _ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { List, ListItem } from '../../elements/List'
import { StyledElementProps } from '../../../theme'
import { MENU_ACTION_TYPE, useMenu } from '../../providers/menu'
import { Row } from '../../elements/layout/Row'
import { Column } from '../../elements/layout/Column'
import { HEADING_SIZE, Heading } from '../../elements/text/Heading'
import { Link } from '../../elements/Link'
import { LINE_HEIGHT } from '../../../theme/typography'
import { COLOR } from '../../../theme/colors'
import { importedDefaultComponentShim } from '../../../utils/misc'
// import { Column, HEADING_SIZE, Heading, LINE_HEIGHT, Link, Row } from "../../.."

const ChevronRightIcon = importedDefaultComponentShim(_ChevronRightIcon)

type NavMenuProps = StyledElementProps<HTMLDivElement>

export const NavMenu: React.FC<NavMenuProps> = (props) => {
  const { isOpen, activePath, getMenuItem, getMenuItemProps, getMenuProps } =
    useMenu()

  if (!isOpen) {
    return null
  }

  const topLevelMenuId = activePath[0]
  const activeTopLevelMenu = getMenuItem([topLevelMenuId])

  if (
    !activeTopLevelMenu ||
    !(activeTopLevelMenu.action.type === MENU_ACTION_TYPE.SUBMENU)
  ) {
    return null
  }

  const submenu = activeTopLevelMenu.action.submenu

  return (
    <Row
      {...props}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        border: 'solid 1px',
        borderColor: COLOR.EXTRA_LIGHT_GRAY,
        borderRadius: '4px',
      }}
    >
      <Column sx={{ flexGrow: 1 }} />
      {submenu.items.map((submenuItem) => {
        if (!(submenuItem.action.type === MENU_ACTION_TYPE.SUBMENU)) {
          return null
        }

        const leafMenuItems = submenuItem.action.submenu.items
        const submenuPath = [topLevelMenuId, submenuItem.id]

        return (
          <Column
            sx={{ flexBasis: '275px', p: 2, flexShrink: 0, flexGrow: 0 }}
            key={submenuItem.id}
          >
            <Heading
              standalone
              size={HEADING_SIZE.SM}
              underline
              {...getMenuItemProps(submenuPath)}
            >
              {submenuItem.label}
            </Heading>
            <List {...getMenuProps(submenuPath)} icon={ChevronRightIcon}>
              {leafMenuItems.map((leafMenuItem, i) => {
                const leafMenuPath = submenuPath.concat(leafMenuItem.id)

                return (
                  <ListItem
                    index={i}
                    key={leafMenuItem.id}
                    sx={{ mt: 1 }}
                    {...getMenuItemProps(leafMenuPath)}
                  >
                    <Link to="/" sx={{ lineHeight: LINE_HEIGHT.CONDENSED }}>
                      {leafMenuItem.label}
                    </Link>
                  </ListItem>
                )
              })}
            </List>
          </Column>
        )
      })}
      <Column sx={{ flexGrow: 1 }} />
    </Row>
  )
}
