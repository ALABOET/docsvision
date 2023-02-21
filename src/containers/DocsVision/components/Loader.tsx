import {Fade, Typography, LinearProgress} from "@mui/material";
import store from "../stores/store";
import classNames from './Components.module.scss'
import {observer} from "mobx-react";

const Loader = observer(() => {
  return (
    <Fade
      in={!store.locationsTree.length}
      unmountOnExit
    >
      <div className={classNames.loader}>
        <div className={classNames.text}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
          >
            Загрузка данных...
          </Typography>
          <LinearProgress />
        </div>
      </div>
    </Fade>
  )
})

export default Loader