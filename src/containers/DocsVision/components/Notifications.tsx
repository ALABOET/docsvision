import { Alert, Snackbar} from "@mui/material";
import store from "../stores/store";
import {observer} from "mobx-react";

const Notifications = observer(() => {
  return (
    <>
      <Snackbar
        open={store.notificationIsShown}
        onClose={() => store.setNotificationIsShown(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => store.setNotificationIsShown(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {store.notificationMessage}
        </Alert>
      </Snackbar>
    </>
  )
})

export default Notifications