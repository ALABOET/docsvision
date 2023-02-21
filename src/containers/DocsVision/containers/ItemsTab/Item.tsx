import classNames from './ItemsTab.module.scss'
import {Button, Modal, Typography, Box, TextField} from "@mui/material";
import {useState} from "react";
import {useMedia} from "react-use";
export interface ItemData {
  itemName: string,
  itemId: string,
  itemCount: number,
  onDelete:(id: string) => void,
  onEdit: (name: string, count: number) => void,
}
const Item = ({itemName, itemId, itemCount, onDelete, onEdit}: ItemData) => {
  const isMobile = useMedia('(max-width: 1300px)');
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? 250 : 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  };
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [count, setCount] = useState(0)
  return (
    <>
      <div className={classNames.item}>
        {itemName ? <Typography
          variant="overline"
          sx={{ color: 'rebeccapurple', lineHeight: 2 }}
        >
          {itemName}
        </Typography>
        : '*имя не найдено*'}, {itemCount} шт.
          <div className={classNames.buttons}>
            <Button
              variant="contained"
              onClick={() => setIsOpen(true)}
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              onClick={() => onDelete(itemId)}
            >
              Удалить
            </Button>
          </div>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
         <Box sx={style}>
           <TextField
             label="Имя оборудования"
             onChange={(e) => setName(e.target.value)}
             value={name}
           />
           <TextField
             label="Количество оборудования"
             onChange={(e) => setCount(Number(e.target.value))}
             value={count}
           />
           <Button
             variant="outlined"
             onClick={() => onEdit(name, count)}
             sx={{ pointerEvents: name && count ? '' : 'none', opacity: name && count ? '1' : '0.4'}}
           >
             Изменить
           </Button>
         </Box>
      </Modal>
    </>
  )
}

export default Item