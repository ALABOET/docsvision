import { makeAutoObservable } from "mobx";
import { firebaseConfig } from "../modules/firebaseConnection";
export interface ActiveNodeInfoData {
  nodeId?: string,
  nodeName?: string
}
interface LocationData {
  parts: string[];
  name: string,
}
interface ItemData {
  id: undefined | string;
  name: string;
  count: number;
  place?: {id: string},
}
export interface LocationsData {
  id: string;
  data: () => LocationData;
  name: string;
  parts: string[];
}
export interface ItemsData {
  id: string;
  data: () => ItemData;
  placeId: string;
}

class Store {
    public locationsTree: LocationsData[] = []
    public items: ItemsData[] = []
    public activeNodeData: ActiveNodeInfoData = {}
    public roomIsChosen = false;
    public notificationMessage = ''
    public notificationIsShown = false;

    constructor() {
      makeAutoObservable(this, {}, { autoBind: true });
    }

    public loadData() {
      //@ts-ignore
      firebase.initializeApp(firebaseConfig)
      //@ts-ignore
      firebase.firestore().collection("places").get().then(response => {
        // @ts-ignore
          let docs = response.docs.map((x: LocationsData) => ({
          id: x.id,
          data: x.data(),
          name: x.data().name,
          parts: x.data().parts && x.data().parts.map((part) => part.id),
          parent_id: undefined,
        }));

        for (let i = 0; i < docs.length; i++) {
          for (let j = 0; j < docs.length; j++) {
            if (docs[i].parts && docs[i].parts.includes(docs[j].id)) {
              docs[j].parent_id = docs[i].id
            }
          }
        }

          const arrayToTree = ((items: any, id = undefined, link = 'parent_id') =>
          items.filter((item: any) => item[link] === id)
            .map((item: ItemData) => ({ ...item, children: arrayToTree(items, item.id) })))

        this.setLocationsTree(arrayToTree([...docs]))
      });
      //@ts-ignore
      firebase.firestore().collection("inventory").get().then(response => {
        let docs = response.docs.map((x: ItemsData) => ({
          id: x.id,
          data: x.data(),
          placeId: x.data().place?.id
      }));
        this.setItems(docs)
      });
    }

    public setLocationsTree(data: LocationsData[]): void {
      this.locationsTree = data
    }

    public getItems() {
      return this.items.filter((item: ItemsData) => item.placeId === this.activeNodeData.nodeId)
    }

    public setRoomIsChosen(value: boolean): void {
      this.roomIsChosen = value;
    }

    public deleteItem(id: string): void {
      //@ts-ignore
      firebase.firestore().collection("inventory").doc(id).delete();
      this.setNotificationIsShown(true);
      this.setNotificationMessage('Оборудование было успешно удалено');
    }

    public updateItem(id: string | undefined, name: string, count: number): void{
      //@ts-ignore
      let filestore = firebase.firestore();
      filestore.collection("inventory").doc(id).set({
        name,
        count,
        place: filestore.collection("places").doc(id)
      })
      this.setNotificationIsShown(true)
      this.setNotificationMessage('Оборудование было успешно обновлено');
    }

    public nodeIsEmpty(nodeId:string) {
      return !this.items.filter((item: ItemsData) => item.placeId === nodeId).length
    }

    public setItems(data: ItemsData[]): void {
      this.items = data
    }

    public addItem(name: string, count: number, id: string | undefined): void {
      //@ts-ignore
      let filestore = firebase.firestore();
      filestore.collection("inventory").doc().set({
        name,
        count,
        place: filestore.collection("places").doc(id)
      })
      this.setNotificationIsShown(true)
      this.setNotificationMessage('Оборудование было успешно добавлено');
    }

    public setActiveNodeData(data:ActiveNodeInfoData): void {
      this.activeNodeData = {nodeId: data.nodeId, nodeName: data.nodeName}
    }

    public setNotificationMessage(message: string): void {
      this.notificationMessage = message
    }

    public setNotificationIsShown(value: boolean): void {
      this.notificationIsShown = value
    }
}
const store = new Store();
export default store;