import { NavMenu } from '.'
import { Button } from '../../elements/Button'
import { Row } from '../../elements/layout/Row'
import {
  MENU_ACTION_TYPE,
  MENU_ORIENTATION,
  Menu,
  MenuProvider,
} from '../../providers/menu'

const demoMenu: Menu = {
  orientation: MENU_ORIENTATION.HORIZONTAL,
  items: [
    {
      id: 'test-menu-1',
      label: 'test menu 1',
      action: {
        type: MENU_ACTION_TYPE.LINK,
        to: '/',
      },
    },
    {
      id: 'test-menu-2',
      label: 'test menu 2',
      action: {
        type: MENU_ACTION_TYPE.SUBMENU,
        submenu: {
          orientation: MENU_ORIENTATION.HORIZONTAL,
          items: [
            {
              label: 'test submenu 1',
              id: 'test-submenu-1',
              action: {
                type: MENU_ACTION_TYPE.SUBMENU,
                submenu: {
                  orientation: MENU_ORIENTATION.VERTICAL,
                  items: [
                    {
                      label: 'test leaf 1',
                      id: 'test-leaf-1',
                      action: {
                        type: MENU_ACTION_TYPE.LINK,
                        to: '/',
                      },
                    },
                    {
                      label: 'test leaf 2',
                      id: 'test-leaf-2',
                      action: {
                        type: MENU_ACTION_TYPE.LINK,
                        to: '/',
                      },
                    },
                  ],
                },
              },
            },
            {
              action: {
                type: MENU_ACTION_TYPE.SUBMENU,
                submenu: {
                  orientation: MENU_ORIENTATION.VERTICAL,
                  items: [
                    {
                      label: 'test leaf 3',
                      id: 'test-leaf-3',
                      action: {
                        type: MENU_ACTION_TYPE.LINK,
                        to: '/',
                      },
                    },
                    {
                      label: 'test leaf 4',
                      id: 'test-leaf-4',
                      action: {
                        type: MENU_ACTION_TYPE.LINK,
                        to: '/',
                      },
                    },
                  ],
                },
              },
              label: 'test submenu 2',
              id: 'test-submenu-2',
            },
          ],
        },
      },
    },
  ],
}

// This is needed because NavMenu doesn't control rendering of top-level menu items
export const DemoMenuImplementation = () => (
  <MenuProvider menu={demoMenu}>
    {({ menu, getMenuProps, getMenuItemProps }) => (
      <>
        <Row {...getMenuProps()}>
          {menu.items.map((menuItem) => (
            <Button
              {...getMenuItemProps([menuItem.id])}
              sx={{ m: 1 }}
              key={menuItem.id}
            >
              {menuItem.label}
            </Button>
          ))}
        </Row>
        <NavMenu />
      </>
    )}
  </MenuProvider>
)
