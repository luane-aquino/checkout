
type TabItemType = {
  text: string
  active: boolean
}

type TabsType = {
  tabsItems: TabItemType[]
}

const Tabs = ({tabsItems}: TabsType) => {
  return (
    <div>
      <button></button>
      <button></button>
      <button></button>
    </div>
  );
}
 
export default Tabs;