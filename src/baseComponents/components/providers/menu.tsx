import React, { KeyboardEvent, useEffect, useState } from 'react'

import { useEnvironment } from './env'
import { KEY_CODES, equals } from '../../utils/misc'
import { useCheckMidClick } from '../../utils/hooks/useCheckMidClick'
import { useUniqueId } from './uniqueIds'

export enum MENU_ACTION_TYPE {
  SUBMENU = 'SUBMENU',
  LINK = 'LINK',
}

export enum MENU_ORIENTATION {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

type SubmenuAction = {
  type: MENU_ACTION_TYPE.SUBMENU
  submenu: Menu
}

type LinkAction = {
  type: MENU_ACTION_TYPE.LINK
  to: string
}

type Action = SubmenuAction | LinkAction

type MenuItem = {
  id: string
  label: string
  action: Action
}

export type Menu = {
  orientation: MENU_ORIENTATION
  items: MenuItem[]
}

type Path = string[]

// Omiting HTML attributes from types to avoid collision with props
// used on components that might be receiving the attributes
type HtmlAttributes = Omit<React.HTMLAttributes<any>, 'color'>

type MenuContextType = {
  menu: Menu
  activePath: Path
  isOpen: boolean
  open: () => void
  close: () => void
  getMenuItem: (path: Path) => MenuItem | undefined
  getMenuItemProps: (path: Path) => HtmlAttributes
  getMenuProps: (path?: Path) => HtmlAttributes
}

const MenuContext = React.createContext<MenuContextType>({
  menu: { items: [], orientation: MENU_ORIENTATION.HORIZONTAL },
  activePath: [],
  isOpen: false,
  open: () => {},
  close: () => {},
  getMenuItem: () => undefined,
  getMenuItemProps: () => ({}),
  getMenuProps: () => ({}),
})

type MenuProviderProps = {
  menu: Menu
  children: React.ReactNode | ((context: MenuContextType) => React.ReactNode)
}

const getAriaRoleDescription = (orientation: MENU_ORIENTATION) => {
  if (orientation === MENU_ORIENTATION.HORIZONTAL) {
    return 'Menu item, press right arrow to navigate to next item, press enter to select'
  } else {
    return 'Menu item, press down arrow to navigate to next item, press enter to select'
  }
}

export const useMenu = () => React.useContext(MenuContext)

const activeStyles = {
  outline: '2px solid blue',
}

const inactiveStyles = {
  outline: 'none',
}

export const MenuProvider: React.FC<MenuProviderProps> = ({
  menu,
  children,
}) => {
  const { flagInDevelopment } = useEnvironment()
  const menuId = useUniqueId('hcl-menu')
  const { isMidClick, elementProps: checkMidclickProps } = useCheckMidClick()
  const [usingKeyboard, setUsingKeyboard] = useState(false)

  const closeOnBlurTimeout = React.useRef<any>()

  const initialPath = React.useMemo(() => [menu.items[0].id], [menu])
  const [activePath, setActivePath] = useState<string[]>(initialPath)

  const [isOpen, setIsOpen] = useState(false)

  const getItemId = React.useCallback(
    (path: string[]) => `${menuId}-item-${path.join('-')}`,
    [menuId],
  )

  useEffect(() => {
    if (activePath && isOpen) {
      const activeChild = window.document.getElementById(getItemId(activePath))
      activeChild?.focus()
      clearTimeout(closeOnBlurTimeout.current)
    }
  }, [activePath, getItemId, isOpen])

  const open = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = React.useCallback(() => {
    setIsOpen(false)
    setUsingKeyboard(false)
  }, [])

  const getMenuItem = React.useCallback(
    (path: string[]) => {
      let menuItem: MenuItem | undefined = undefined

      for (const pathSegment of path) {
        if (!menuItem) {
          menuItem = menu.items.find((item) => item.id === pathSegment)
        } else if (menuItem.action.type === MENU_ACTION_TYPE.SUBMENU) {
          menuItem = menuItem.action.submenu.items.find(
            (item) => item.id === pathSegment,
          )
        }

        if (!menuItem) {
          return undefined
        }
      }

      return menuItem
    },
    [menu],
  )

  const activeMenuItem: MenuItem | undefined = React.useMemo(
    () => getMenuItem(activePath),
    [activePath, getMenuItem],
  )

  const activeParentMenu: Menu = React.useMemo(() => {
    let parentMenu = menu

    const tempActivePath = [...activePath]
    tempActivePath.pop()

    if (tempActivePath.length > 0) {
      const parentMenuItem = getMenuItem(tempActivePath)

      if (parentMenuItem?.action.type === MENU_ACTION_TYPE.SUBMENU) {
        parentMenu = parentMenuItem?.action.submenu
      } else {
        flagInDevelopment('')
      }
    }

    return parentMenu
  }, [activePath, menu, getMenuItem, flagInDevelopment])

  const activeIndex: number = React.useMemo(() => {
    return activeParentMenu.items.findIndex(
      (item) => item.id === activePath[activePath.length - 1],
    )
  }, [activeParentMenu, activePath])

  const currentMenuLength = activeParentMenu.items.length

  const onFocus = React.useCallback(() => {
    if (!isMidClick.current) {
      setUsingKeyboard(true)
      open()
    }
  }, [isMidClick, open])

  const onBlur = React.useCallback(() => {
    closeOnBlurTimeout.current = setTimeout(() => {
      close()
      setActivePath(initialPath)
    }, 300)
  }, [close, initialPath])

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      const navigateNext = () => {
        const nextIndex = (activeIndex + 1) % currentMenuLength

        const nextId = activeParentMenu.items[nextIndex].id
        setActivePath([...activePath.slice(0, activePath.length - 1), nextId])
      }

      const navigatePrevious = () => {
        if (activeIndex === 0) {
          navigateOut()
        } else {
          const prevIndex = activeIndex - 1

          const prevId = activeParentMenu.items[prevIndex].id
          setActivePath([...activePath.slice(0, activePath.length - 1), prevId])
        }
      }

      const navigateIn = () => {
        if (activeMenuItem?.action?.type === MENU_ACTION_TYPE.SUBMENU) {
          setActivePath([
            ...activePath,
            activeMenuItem.action.submenu.items[0].id,
          ])
        } else {
          navigateNext()
        }
      }

      const navigateOut = () => {
        if (activePath.length > 1) {
          setActivePath(activePath.slice(0, activePath.length - 1))
        }
      }

      const select = () => {
        if (activeMenuItem?.action.type === MENU_ACTION_TYPE.SUBMENU) {
          setActivePath(activePath.concat([activeMenuItem?.id]))
        } else if (activeMenuItem?.action.type === MENU_ACTION_TYPE.LINK) {
          window.location.href = activeMenuItem.action.to
        }
      }

      const isVertical =
        activeParentMenu.orientation === MENU_ORIENTATION.VERTICAL

      if (e.key === KEY_CODES.ENTER) {
        if (activeMenuItem?.action.type === MENU_ACTION_TYPE.LINK) {
          select()
        } else if (activeMenuItem?.action.type === MENU_ACTION_TYPE.SUBMENU) {
          navigateIn()
        }
      } else {
        setUsingKeyboard(true)
      }

      if (e.key === KEY_CODES.ESCAPE) {
        if (activePath.length > 1) {
          navigateOut()
        } else {
          const activeChild = window.document.getElementById(
            getItemId(activePath),
          )
          activeChild?.blur()
        }
      }

      if (e.key === KEY_CODES.ARROW_DOWN) {
        if (isVertical) {
          navigateNext()
        } else {
          navigateIn()
        }
      }

      if (e.key === KEY_CODES.ARROW_UP) {
        if (isVertical) {
          navigatePrevious()
        } else {
          navigateOut()
        }
      }

      if (e.key === KEY_CODES.ARROW_RIGHT) {
        if (isVertical) {
          navigateIn()
        } else {
          navigateNext()
        }
      }

      if (e.key === KEY_CODES.ARROW_LEFT) {
        if (isVertical) {
          navigateOut()
        } else {
          navigatePrevious()
        }
      }
    },
    [
      activePath,
      activeIndex,
      activeMenuItem,
      activeParentMenu,
      currentMenuLength,
      getItemId,
    ],
  )

  const getMenuProps = React.useCallback(
    (path?: string[]): HtmlAttributes => {
      const isTopLevel = !path

      let _menu: Menu | undefined = menu
      let menuItem: MenuItem | undefined = undefined

      if (path) {
        menuItem = getMenuItem(path)

        if (menuItem?.action.type === MENU_ACTION_TYPE.SUBMENU) {
          _menu = menuItem.action.submenu
        }
      }

      const isVertical = _menu.orientation === MENU_ORIENTATION.VERTICAL

      const topLevelProps = {
        ...checkMidclickProps,
        onKeyDown,
        onFocus,
        onBlur,
      }

      return {
        role: 'menu',
        'aria-orientation': isVertical ? 'vertical' : 'horizontal',
        tabIndex: isTopLevel ? 0 : -1,
        ...(isTopLevel ? topLevelProps : {}),
      }
    },
    [menu, onFocus, onBlur, checkMidclickProps, getMenuItem, onKeyDown],
  )

  const getMenuItemProps = React.useCallback(
    (path: Path) => {
      const isTopLevel = path.length === 1
      const isActivePath = equals(path, activePath)

      return {
        ...checkMidclickProps,
        role: 'menuitem',
        'aria-roledescription': getAriaRoleDescription(
          activeParentMenu.orientation,
        ),
        id: getItemId(path),
        onKeyDown: equals(path, activePath) ? onKeyDown : undefined,
        tabIndex: -1,
        onFocus: () => {
          // Screen readers will send focus to buttons without firing keydown or click
          // Call setActivePath to sync
          if (!isMidClick) {
            setActivePath(path)
          }
        },
        onMouseDown: () => {
          checkMidclickProps.onMouseDown()

          const menuItem = getMenuItem(path)

          // Because blurring will close the dropdown menu, link navigation should be
          // triggered before that happened. Mousedown is used instead of click because
          // it is triggered before blur event
          if (menuItem?.action.type === MENU_ACTION_TYPE.LINK) {
            window.location.href = menuItem.action.to
          }
        },
        onClick: (e: React.MouseEvent) => {
          const menuItem = getMenuItem(path)
          const isSubmenu = menuItem?.action.type === MENU_ACTION_TYPE.SUBMENU

          if (!isSubmenu) {
            // Link menu items should not trigger navigation because that is handled by mousedown listener
            e.preventDefault()
          }

          // If user is using a mouse, clicking the top level menu that is open
          // should close the menu
          if (
            isSubmenu &&
            isActivePath &&
            isTopLevel &&
            !usingKeyboard &&
            isOpen
          ) {
            close()

            // Clicking a top level menu that is closed or not the active menu should
            // open that menu
          } else if (isSubmenu && isTopLevel && !usingKeyboard && !isOpen) {
            setActivePath(path)
            open()

            // If user is using a mouse, or if the menu is a link, handle the same way
            // as enter key press
          } else {
            onKeyDown({
              key: KEY_CODES.ENTER,
            } as any)
          }
        },
        style:
          isOpen && usingKeyboard && equals(path, activePath)
            ? activeStyles
            : inactiveStyles,
      }
    },
    [
      getItemId,
      getMenuItem,
      activePath,
      isOpen,
      checkMidclickProps,
      close,
      open,
      onKeyDown,
      usingKeyboard,
      activeParentMenu,
      isMidClick,
    ],
  )

  const contextValue: MenuContextType = {
    menu,
    isOpen,
    open,
    close,
    activePath,
    getMenuItem,
    getMenuProps,
    getMenuItemProps,
  }

  return (
    <MenuContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </MenuContext.Provider>
  )
}
