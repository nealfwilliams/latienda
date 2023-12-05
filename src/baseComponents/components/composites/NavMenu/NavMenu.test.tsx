import { fireEvent } from '@testing-library/react'
import { render } from '../../../utils/test'
import { KEY_CODES } from '../../../utils/misc'
import { DemoMenuImplementation } from './demo'

describe('NavMenu', () => {
  it('can be navigated with events', () => {
    const { getByRole } = render(<DemoMenuImplementation />)

    const menu = getByRole('menu')

    const firstMenuItem = getByRole('menuitem', {
      name: 'test menu 1',
    })

    const secondMenuItem = getByRole('menuitem', {
      name: 'test menu 2',
    })

    fireEvent.focus(menu)

    expect(firstMenuItem).toHaveFocus()

    fireEvent.keyDown(firstMenuItem, {
      key: KEY_CODES.ARROW_RIGHT,
    })

    expect(secondMenuItem).toHaveFocus()

    const firstSubmenuItem = getByRole('menuitem', {
      name: 'test submenu 1',
    })
    const secondSubmenuItem = getByRole('menuitem', {
      name: 'test submenu 2',
    })
    const firstLeaf = getByRole('menuitem', {
      name: 'test leaf 1',
    })
    const secondLeaf = getByRole('menuitem', {
      name: 'test leaf 2',
    })

    fireEvent.keyDown(secondMenuItem, {
      key: KEY_CODES.ARROW_DOWN,
    })

    expect(firstSubmenuItem).toHaveFocus()

    fireEvent.keyDown(firstMenuItem, {
      key: KEY_CODES.ARROW_RIGHT,
    })

    expect(secondSubmenuItem).toHaveFocus()

    fireEvent.keyDown(secondMenuItem, {
      key: KEY_CODES.ARROW_LEFT,
    })

    expect(firstSubmenuItem).toHaveFocus()

    fireEvent.keyDown(secondMenuItem, {
      key: KEY_CODES.ENTER,
    })

    expect(firstLeaf).toHaveFocus()

    fireEvent.keyDown(firstLeaf, {
      key: KEY_CODES.ARROW_DOWN,
    })

    expect(secondLeaf).toHaveFocus()

    fireEvent.keyDown(secondLeaf, {
      key: KEY_CODES.ARROW_UP,
    })

    expect(firstLeaf).toHaveFocus()

    fireEvent.keyDown(firstLeaf, {
      key: KEY_CODES.ARROW_UP,
    })

    expect(firstSubmenuItem).toHaveFocus()

    fireEvent.keyDown(firstSubmenuItem, {
      key: KEY_CODES.ARROW_UP,
    })

    expect(secondMenuItem).toHaveFocus()
  })

  it('can be navigated with keyboard events', () => {
    const { getByRole } = render(<DemoMenuImplementation />)

    const secondMenuItem = getByRole('menuitem', {
      name: 'test menu 2',
    })

    fireEvent.mouseDown(secondMenuItem)
    fireEvent.click(secondMenuItem)
    fireEvent.mouseUp(secondMenuItem)

    getByRole('menuitem', {
      name: 'test submenu 1',
    })
    getByRole('menuitem', {
      name: 'test submenu 2',
    })
    getByRole('menuitem', {
      name: 'test leaf 1',
    })
    getByRole('menuitem', {
      name: 'test leaf 2',
    })

    fireEvent.mouseDown(secondMenuItem)
    fireEvent.click(secondMenuItem)
    fireEvent.mouseUp(secondMenuItem)

    expect(() => {
      getByRole('menuitem', {
        name: 'test submenu 1',
      })
    }).toThrow()
  })
})
