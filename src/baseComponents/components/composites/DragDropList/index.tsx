import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
  DragStart,
} from 'react-beautiful-dnd'
import _DragIndicator from '@mui/icons-material/DragIndicator'

import { StylesProp } from '../../../theme'
import { BUTTON_TYPE, Button, ButtonProps } from '../../elements/Button'
import { Column } from '../../elements/layout/Column'
import { Row } from '../../elements/layout/Row'
import { useUniqueId } from '../../providers/uniqueIds'
import { importedDefaultComponentShim } from '../../../utils/misc'

const DragIndicator = importedDefaultComponentShim(_DragIndicator)

type DraggableItem = {
  accessibleLabel: string
}

type DragDropListProps<Item extends DraggableItem> = {
  onReorder: (params: { reorderedList: Item[]; dropEvent: DropResult }) => void
  items: Item[]
  itemIdKey?: keyof Item
  wrapperStyles?: StylesProp
  itemStyles?: StylesProp
  disabled?: boolean
  children: (params: { item: Item; index: number }) => React.ReactNode
}

export const DragHandle: React.FC<ButtonProps> = ({ sx, ...props }) => {
  return (
    <Button
      type={BUTTON_TYPE.TEXT}
      primaryIcon={DragIndicator}
      disableFocusStyles
      sx={{
        cursor: 'inherit',
        ...sx,
      }}
      {...props}
    />
  )
}

export function DragDropList<Item extends DraggableItem>({
  items,
  itemIdKey = 'id' as any,
  wrapperStyles,
  itemStyles,
  children: renderChild,
  onReorder,
  disabled,
}: DragDropListProps<Item>) {
  const id = useUniqueId('dnd-list')
  return (
    <DragDropContext
      onDragStart={(start: DragStart, provided: ResponderProvided) => {
        const selectedItem = items.find(
          (item) => String(item[itemIdKey]) === start.draggableId,
        )
        provided.announce(`Selected item: ${selectedItem?.accessibleLabel}`)
      }}
      onDragEnd={(e) => {
        if (
          e.destination &&
          e.source &&
          e.destination.index !== e.source.index
        ) {
          const reordered = Array.from(items)
          const [removed] = reordered.splice(e.source.index, 1)
          reordered.splice(e.destination.index, 0, removed)
          onReorder({
            reorderedList: reordered,
            dropEvent: e,
          })
        }
      }}
    >
      <Droppable droppableId={id}>
        {(droppable) => (
          <Column
            {...droppable.droppableProps}
            sx={wrapperStyles}
            ref={droppable.innerRef}
          >
            <>
              {items.map((item, index) => (
                <Draggable
                  draggableId={String(item[itemIdKey])}
                  isDragDisabled={disabled}
                  index={index}
                  key={String(item[itemIdKey])}
                >
                  {(draggable) => {
                    return (
                      <Row
                        sx={{
                          alignItems: 'center',
                          itemStyles,
                        }}
                        ref={draggable.innerRef}
                        {...draggable.draggableProps}
                        {...draggable.dragHandleProps}
                        aria-describedby={`item-${index}`}
                      >
                        <Row sx={{ mt: 1 }} id={`item-${index}`}>
                          {renderChild({ item, index })}
                        </Row>
                      </Row>
                    )
                  }}
                </Draggable>
              ))}
              {droppable.placeholder}
            </>
          </Column>
        )}
      </Droppable>
    </DragDropContext>
  )
}
