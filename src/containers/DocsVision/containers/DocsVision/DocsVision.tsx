import LocationsTab from "../LocationsTab/LocationsTab";
import ItemsTab from "../ItemsTab/ItemsTab";
import classNames from './DocsVision.module.scss'
import Loader from "../../components/Loader";
import {observer} from "mobx-react";
import Notifications from "../../components/Notifications";
import {useEffect} from "react";
import store from "../../stores/store";

const DocsVision = observer(() => {
  useEffect(() => {
    store.loadData();
  }, [])
  return (
    <>
      <Loader />
      <Notifications />
      <div className={classNames.root}>
        <LocationsTab />
        <ItemsTab />
      </div>
    </>
  )
})

export default DocsVision