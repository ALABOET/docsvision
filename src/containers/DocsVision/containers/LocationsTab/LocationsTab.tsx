import classNames from './LocationsTab.module.scss'
import {useEffect, useState} from "react";
import { observer } from "mobx-react";
import store from "../../stores/store";
import { NodeRendererProps, Tree } from "react-arborist";
import {Typography} from "@mui/material";
import {useMedia} from "react-use";

const Node = observer(({ node, style, dragHandle }: NodeRendererProps<any>) => {
  const isMobile = useMedia('(max-width: 1300px)');
  return (
    <div className={classNames.nodeRoot}>
      <div
        className={classNames.node}
        style={style}
        ref={dragHandle}
        onClick={() => {
          node.toggle()
          store.setActiveNodeData({nodeId: node.data.id, nodeName: node.data.name})
          store.setRoomIsChosen(!node.children?.length)
        }}
      >
        <Typography
          variant="overline"
          sx={{fontSize: isMobile ? '12px' : '20px', color: node.isSelected ? 'red' : '', lineHeight: isMobile ? 0 : '', textTransform: 'unset'}}
          className={classNames.text}
        >
          {node.isOpen ? '🗁' : '🗀'} {node.data.name} {!store.nodeIsEmpty(node.data.id) && !node.children?.length ? '🟢' : store.nodeIsEmpty(node.data.id) && !node.children?.length ?  '🔴' : ''}
        </Typography>
      </div>
    </div>
  );
})

const LocationsTab = observer(() => {
  const [dataIsLoaded, setDataIsLoaded] = useState(false)
  const isMobile = useMedia('(max-width: 1300px)');
  useEffect(() => {
    if (store.locationsTree.length) setDataIsLoaded(true)
  }, [store.locationsTree.length])

  return (
    <div className={classNames.root}>
      {dataIsLoaded &&
        <Tree
          initialData={store.locationsTree}
          openByDefault={false}
          width={isMobile ? '100%' : 800}
          indent={44}
          rowHeight={isMobile ? 42: 48}
          height={isMobile ? 300: 600}
        >
          {Node}
        </Tree>
      }
    </div>
  )
})

export default LocationsTab