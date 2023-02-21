import store from "../../stores/store";
import classNames from './ItemsTab.module.scss'
import {observer} from "mobx-react";
import {Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import Item from "./Item";

const ItemsTab = observer(() => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const addButtonStyle = {
    display: 'block',
    margin: '10px auto',
    opacity: name && count ? '1' : '0.3',
    pointerEvents: name && count ? '' : 'none'
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.text}>
        <Typography
          variant="h5"
          align="center"
          sx={{ marginBottom: '10px'}}
        >
          Доступное оборудование
        </Typography>
        <Typography
          variant="overline"
          sx={{lineHeight: 1.3}}
        >
          Активный узел: {store.activeNodeData.nodeName ? <div className={classNames.activeNode}>{store.activeNodeData.nodeName}</div> : 'не выбран'}
        </Typography>
          {store.activeNodeData.nodeName && (store.getItems().map((item: any) => {
            return (<div style={{margin: '10px 0'}} key={item.id}><Item
              itemCount={item.data.count}
              itemId={item.id}
              itemName={item.data.name}
              onDelete={() => store.deleteItem(item.id)}
              onEdit={(name, count) => store.updateItem(store.activeNodeData.nodeId, name, count)}
            />
            </div>)
        }))}
      </div>
        {store.roomIsChosen && (<div className={classNames.controls}>
        <Typography
          variant="h5"
          align="center"
          sx={{margin: '25px 0 10px 0'}}
        >
          Добавление оборудования
        </Typography>
        <div className={classNames.inputs}>
          <TextField
            label="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Количество"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>
        <Button
          sx={addButtonStyle}
          variant="contained"
          onClick={() => {
            store.addItem(name, count, store.activeNodeData.nodeId)
            setCount(0)
            setName('')
          }}
        >
          Добавить
        </Button>
      </div>)}
    </div>
  )
})

export default ItemsTab